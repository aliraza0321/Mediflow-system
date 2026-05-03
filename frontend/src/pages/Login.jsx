 import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [role, setRole] = useState("doctor");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            alert("Please enter email and password");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    role, // optional (depends on backend)
                }),
            });

            const data = await res.json();

            console.log(data); // DEBUG (important)

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            // ✅ SAVE DATA
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("user", JSON.stringify(data.user));

            // ✅ REDIRECT BASED ON ROLE
            if (data.user.role === "doctor") navigate("/home");
            if (data.user.role === "patient") navigate("/home");
            if (data.user.role === "staff") navigate("/home");

        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">

            <div className="w-[420px] bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-blue-700">
                    MediFlow Hospital System
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Secure Login Portal
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6">

                    <button
                        onClick={() => setRole("doctor")}
                        className={`p-2 rounded-lg border transition ${
                            role === "doctor" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                    >
                        Doctor
                    </button>

                    <button
                        onClick={() => setRole("patient")}
                        className={`p-2 rounded-lg border transition ${
                            role === "patient" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                    >
                        Patient
                    </button>

                    <button
                        onClick={() => setRole("staff")}
                        className={`p-2 rounded-lg border transition ${
                            role === "staff" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                    >
                        Staff
                    </button>

                </div>

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-3 focus:outline-blue-400"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-5 focus:outline-blue-400"
                />

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    {isLoading ? "Logging in..." : `Login as ${role}`}
                </button>

                <div className="mt-6 text-center space-y-2">

                    <p className="text-sm text-gray-600">
                        New user?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Create account
                        </a>
                    </p>

                    <p className="text-sm text-gray-600">
                        Forgot password?{" "}
                        <a href="/forgot-password" className="text-blue-600 hover:underline">
                            Reset here
                        </a>
                    </p>

                </div>

            </div>
        </div>
    );
}

export default Login;
