--USE Medicare;  --old one not used

---- STAFF
--CREATE TABLE staff (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    full_name VARCHAR(100) NOT NULL,
--    email VARCHAR(100) NOT NULL UNIQUE,
--    password VARCHAR(255) NOT NULL,
--    role VARCHAR(20) NOT NULL,
--    phone_number VARCHAR(20),
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--);

--CREATE TABLE patients (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    user_id INT,
--    gender VARCHAR(10),
--    date_of_birth DATE,
--    blood_group VARCHAR(5),
--    address VARCHAR(255),
--    emergency_contact_name VARCHAR(100),
--    emergency_contact_phone VARCHAR(20),
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (user_id) REFERENCES staff(id)
--);
---- DOCTORS
--CREATE TABLE doctors (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    staff_id INT NOT NULL,
--    specialization VARCHAR(100) NOT NULL,
--    license_number VARCHAR(50) NOT NULL UNIQUE,
--    rating DECIMAL(3,2),
--    availability_notes TEXT,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (staff_id) REFERENCES staff(id)
--);

---- APPOINTMENTS
--CREATE TABLE appointments (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    patient_id INT NOT NULL,
--    doctor_id INT NOT NULL,
--    appointment_date DATE NOT NULL,
--    appointment_time TIME NOT NULL,
--    status VARCHAR(20) NOT NULL DEFAULT 'pending',
--    reason TEXT,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (patient_id) REFERENCES patients(id),
--    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
--);

---- MEDICAL RECORDS
--CREATE TABLE medical_records (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    patient_id INT NOT NULL,
--    appointment_id INT NOT NULL,
--    doctor_id INT NOT NULL,
--    diagnosis TEXT NOT NULL,
--    treatment TEXT,
--    notes TEXT,
--    visit_date DATE,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (patient_id) REFERENCES patients(id),
--    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
--    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
--);

---- PRESCRIPTIONS
--CREATE TABLE prescriptions (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    appointment_id INT NOT NULL,
--    patient_id INT NOT NULL,
--    doctor_id INT NOT NULL,
--    medicine_name VARCHAR(255) NOT NULL,
--    dosage VARCHAR(100),
--    instructions TEXT,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (patient_id) REFERENCES patients(id),
--    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
--    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
--);

---- PHARMACY
--CREATE TABLE pharmacy (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    medicine_name VARCHAR(255) NOT NULL,
--    stock_quantity INT NOT NULL,
--    price DECIMAL(10,2) NOT NULL,
--    expiry_date DATE,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--);

---- SUPPORT
--CREATE TABLE support (
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    patient_id INT NOT NULL,
--    staff_id INT NOT NULL,
--    issue TEXT,
--    status VARCHAR(20) NOT NULL DEFAULT 'pending',
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (patient_id) REFERENCES patients(id),
--    FOREIGN KEY (staff_id) REFERENCES staff(id)
--);





-- RESET DATABASE (optional but recommended)
DROP DATABASE IF EXISTS Medicare;
CREATE DATABASE Medicare;
USE Medicare;

-- ========================
-- USERS (LOGIN TABLE)
-- ========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- admin, doctor, patient, staff
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- PATIENTS
-- ========================
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    gender VARCHAR(10),
    date_of_birth DATE,
    blood_group VARCHAR(5),
    address VARCHAR(255),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ========================
-- DOCTORS
-- ========================
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    specialization VARCHAR(100),
    license_number VARCHAR(50) UNIQUE,
    rating DECIMAL(3,2) CHECK (rating BETWEEN 0 AND 5),
    availability_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ========================
-- APPOINTMENTS
-- ========================
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- ========================
-- MEDICAL RECORDS
-- ========================
CREATE TABLE medical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_id INT NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    notes TEXT,
    visit_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

-- ========================
-- PRESCRIPTIONS
-- ========================
CREATE TABLE prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    medicine_name VARCHAR(255),
    dosage VARCHAR(100),
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- ========================
-- PHARMACY
-- ========================
CREATE TABLE pharmacy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(255) NOT NULL,
    stock_quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- SUPPORT
-- ========================
CREATE TABLE support (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    staff_id INT NOT NULL,
    issue TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES users(id) ON DELETE CASCADE
);
-- tabel for rating
CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    patient_id INT NOT NULL,
    appointment_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    FOREIGN KEY (patient_id) REFERENCES users(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);
-- ========================
-- OPTIONAL TEST DATA
-- ========================

-- USERS
--INSERT INTO users (full_name, email, password, role) VALUES
--('Admin User', 'admin@medicare.com', '123', 'admin'),
--('Doctor User', 'doctor@medicare.com', '123', 'doctor'),
--('Patient User', 'patient@medicare.com', '123', 'patient');

---- DOCTOR PROFILE
--INSERT INTO doctors (user_id, specialization, license_number, rating)
--VALUES (2, 'Cardiology', 'DOC001', 4.5);

---- PATIENT PROFILE
--INSERT INTO patients (user_id, gender, date_of_birth)
--VALUES (3, 'Male', '2000-01-01');

---- SAMPLE APPOINTMENT
--INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
--VALUES (1, 1, '2025-01-01', '10:00:00');

