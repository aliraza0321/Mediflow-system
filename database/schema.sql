--I will be responsible for delevoping and maintaining SQL queries.
--Including insertion, updation, deletion and Joins 
--On the system.

--Future Work:
--Will implement advanced queries and optimize database operations.
--Will ensure efficient communication between backend APIs and database.
--Will handle data integrity, validation, and performance improvements.

--Database Design Details:

--The system database will consist of multiple tables including:
--Users (Login), Patients, Staff, Appointments, Admissions, Wards,
--NursingTasks, Prescriptions, Medicines, Inventory,
--LabTests, LabReports, Billing, EmergencyRecords.

--Tables will be connected using primary and foreign keys.
--Normalization will be applied to reduce redundancy.
--Joins will be used to manage relationships and retrieve combined data across modules.

CREATE TABLE users
(
    id INT,
    full_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    role VARCHAR(20),
    phone_number VARCHAR(20),
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE patients
(
    id INT ,
    user_id INT,
    gender VARCHAR(10),
    date_of_birth DATE,
    blood_group VARCHAR(5),
    address VARCHAR(255),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE doctors 
(
    id INT ,
    user_id INT,
    specialization VARCHAR(100),
    license_number VARCHAR(50),
    availability_notes TEXT,
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE appointments 
(
    id INT,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(20),
    reason TEXT,
   created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE medical_records
(
    id INT,
    patient_id INT,
    doctor_id INT,
    diagnosis TEXT,
    treatment TEXT,
    notes TEXT,
    visit_date DATE,
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE bills
(
    id INT,
    patient_id INT,
    appointment_id INT,
    amount DECIMAL(10,2),
    status VARCHAR(20),
    description TEXT,
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE payments 
(
    id INT,
    bill_id INT,
    amount_paid DECIMAL(10,2),
    payment_method VARCHAR(20),
    payment_status VARCHAR(20),
    created_at DATETIME DEFAULT GETDATE()
);
