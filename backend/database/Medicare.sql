DROP DATABASE IF EXISTS Medicare;
CREATE DATABASE Medicare;
USE Medicare;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE pharmacy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(255) NOT NULL,
    stock_quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    patient_id INT NOT NULL,
    appointment_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

INSERT INTO users (id, full_name, email, password, role, phone_number) VALUES
(1, 'Dr. Ayesha Khan', 'doctor@mediflow.com', '$2b$10$LGOgZ34We459OavYaxXtfe/ZfkngPuX4puiKUqE5P9jIegP.t5v9.', 'doctor', '03001234567'),
(2, 'Dr. Hamza Ali', 'doctor2@mediflow.com', '$2b$10$LGOgZ34We459OavYaxXtfe/ZfkngPuX4puiKUqE5P9jIegP.t5v9.', 'doctor', '03007654321'),
(3, 'Sara Ahmed', 'patient@mediflow.com', '$2b$10$LGOgZ34We459OavYaxXtfe/ZfkngPuX4puiKUqE5P9jIegP.t5v9.', 'patient', '03111234567'),
(4, 'Bilal Hussain', 'patient2@mediflow.com', '$2b$10$LGOgZ34We459OavYaxXtfe/ZfkngPuX4puiKUqE5P9jIegP.t5v9.', 'patient', '03117654321'),
(5, 'Fatima Noor', 'staff@mediflow.com', '$2b$10$LGOgZ34We459OavYaxXtfe/ZfkngPuX4puiKUqE5P9jIegP.t5v9.', 'staff', '03211234567');

INSERT INTO doctors (id, user_id, specialization, license_number, rating, availability_notes) VALUES
(1, 1, 'Cardiology', 'DOC001', 4.5, '09:00 AM - 03:00 PM'),
(2, 2, 'Neurology', 'DOC002', 4.8, '02:00 PM - 08:00 PM');

INSERT INTO patients (id, user_id, gender, date_of_birth, blood_group, address) VALUES
(1, 3, 'Female', '1997-02-05', 'B+', 'Lahore'),
(2, 4, 'Male', '1990-06-22', 'A-', 'Lahore');

INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES
(1, 1, 1, '2026-05-05', '10:00:00', 'scheduled', 'Routine checkup'),
(2, 2, 1, '2026-05-03', '12:30:00', 'admitted', 'Chest pain review'),
(3, 1, 2, '2026-04-20', '15:00:00', 'completed', 'Migraine follow-up'),
(4, 2, 2, '2026-04-10', '09:00:00', 'completed', 'Neurology consult');

INSERT INTO prescriptions (appointment_id, patient_id, doctor_id, medicine_name, dosage, instructions) VALUES
(2, 2, 1, 'Aspirin', '1 tablet after breakfast', 'Take with water'),
(3, 1, 2, 'Sumatriptan', '50mg when symptoms begin', 'Do not exceed prescribed dose');

INSERT INTO pharmacy (medicine_name, stock_quantity, price, expiry_date) VALUES
('Aspirin', 120, 8.50, '2027-12-31'),
('Paracetamol', 200, 5.00, '2027-09-30'),
('Insulin', 40, 65.00, '2026-11-30'),
('Amoxicillin', 75, 18.00, '2027-03-31');

INSERT INTO support (patient_id, staff_id, issue, status) VALUES
(1, 5, 'Need help downloading my report.', 'Pending'),
(2, 5, 'Appointment time needs confirmation.', 'Resolved');

INSERT INTO ratings (doctor_id, patient_id, appointment_id, rating, comment) VALUES
(2, 4, 4, 5, 'Very helpful consultation');
