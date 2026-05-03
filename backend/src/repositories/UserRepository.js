//class UserRepository {
//  constructor(database) {
//    this.database = database;
//  }

//  findByEmail(email) {
//    return this.database.users.find((user) => user.email === email.toLowerCase()) || null;
//  }

//  findById(id) {
//    return this.database.users.find((user) => user.id === Number(id)) || null;
//  }

//  create(user) {
//    this.database.users.push(user);
//    return user;
//  }

//  findAll() {
//    return [...this.database.users];
//  }

//  findByRole(role) {
//    return this.database.users.filter((user) => user.role === role);
//  }

//  update(user) {
//    const index = this.database.users.findIndex((item) => item.id === user.id);
//    this.database.users[index] = user;
//    return user;
//  }
//}

//module.exports = { UserRepository };












class UserRepository {
    constructor(db) {
        this.db = db;
    }

    toUser(row) {
        if (!row) return null;

        const profile = {};
        if (row.role === "doctor") {
            profile.specialization = row.specialization || "General Medicine";
            profile.department = row.specialization || "General";
            profile.rating = row.doctor_rating;
            profile.licenseNumber = row.license_number;
            profile.availabilityNotes = row.availability_notes;
        }

        if (row.role === "patient") {
            profile.blood = row.blood_group || "Unknown";
            profile.dob = row.date_of_birth || "";
            profile.gender = row.gender || "";
            profile.address = row.address || "";
        }

        return {
            id: row.id,
            name: row.name || row.full_name,
            email: row.email,
            password: row.password,
            passwordHash: row.password,
            phone: row.phone || row.phone_number || "",
            role: row.role,
            cnic: row.cnic || "",
            dob: row.dob || row.date_of_birth || "",
            maritalStatus: row.marital_status || "Single",
            isActive: row.is_active === undefined ? true : Boolean(row.is_active),
            profile,
        };
    }

    async queryUsers(where = "", params = []) {
        const [rows] = await this.db.query(
            `SELECT
                u.id,
                u.full_name AS name,
                u.email,
                u.password,
                u.role,
                u.phone_number AS phone,
                p.gender,
                p.date_of_birth,
                p.blood_group,
                p.address,
                d.specialization,
                d.license_number,
                d.rating AS doctor_rating,
                d.availability_notes
             FROM users u
             LEFT JOIN patients p ON p.user_id = u.id
             LEFT JOIN doctors d ON d.user_id = u.id
             ${where}`,
            params
        );
        return rows.map((row) => this.toUser(row));
    }

    async findByEmail(email) {
        const users = await this.queryUsers("WHERE LOWER(u.email) = LOWER(?)", [email]);
        return users[0] || null;
    }

    async findById(id) {
        const users = await this.queryUsers("WHERE u.id = ?", [Number(id)]);
        return users[0] || null;
    }

    //async create(user) {
    //    const [result] = await db.query(
    //        "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)",
    //        [user.name, user.email, user.password, user.role]// from hash to simple
    //    );

    //    return {
    //        id: result.insertId,
    //        ...user
    //    };
    //}
    async create(user) {
        const password = user.passwordHash || user.password;

        if (!password) {
            throw new Error("Password is missing from request");
        }

        const connection = await this.db.getConnection();

        try {
            await connection.beginTransaction();
            const [result] = await connection.query(
                "INSERT INTO users (full_name, email, password, role, phone_number) VALUES (?, ?, ?, ?, ?)",
                [
                    user.name,
                    user.email,
                    password,
                    user.role,
                    user.phone || null,
                ]
            );

            const createdUser = {
                ...user,
                id: result.insertId,
                password,
                passwordHash: password,
            };

            if (user.role === "patient") {
                await connection.query(
                    "INSERT INTO patients (user_id, date_of_birth, blood_group) VALUES (?, ?, ?)",
                    [result.insertId, user.dob || null, user.profile?.blood || null]
                );
            }

            if (user.role === "doctor") {
                await connection.query(
                    "INSERT INTO doctors (user_id, specialization, license_number, rating, availability_notes) VALUES (?, ?, ?, ?, ?)",
                    [
                        result.insertId,
                        user.profile?.specialization || "General Medicine",
                        `DOC${String(result.insertId).padStart(4, "0")}`,
                        null,
                        user.profile?.timing || null,
                    ]
                );
            }

            await connection.commit();
            return createdUser;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async update(user) {
        const password = user.passwordHash || user.password;
        await this.db.query(
            "UPDATE users SET full_name = ?, email = ?, password = ?, role = ?, phone_number = ? WHERE id = ?",
            [
                user.name,
                user.email,
                password,
                user.role,
                user.phone || null,
                user.id,
            ]
        );
        return { ...user, password, passwordHash: password };
    }

    async findByRole(role) {
        return this.queryUsers("WHERE u.role = ?", [role]);
    }

    async findAll() {
        return this.queryUsers("ORDER BY u.id");
    }

    async getDoctorProfileId(userId) {
        const [rows] = await this.db.query("SELECT id FROM doctors WHERE user_id = ?", [Number(userId)]);
        return rows[0]?.id || null;
    }

    async getPatientProfileId(userId) {
        const [rows] = await this.db.query("SELECT id FROM patients WHERE user_id = ?", [Number(userId)]);
        return rows[0]?.id || null;
    }
}



module.exports = { UserRepository };
