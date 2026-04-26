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

--Table 1 users
CREATE TABLE users (
    id INT IDENTITY(1,1),
    full_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    role VARCHAR(20),
    phone_number VARCHAR(20),
    created_at DATETIME DEFAULT GETDATE()
);
--Table 2 patients
CREATE TABLE patients (
    id INT IDENTITY(1,1),
    user_id INT,
    gender VARCHAR(10),
    date_of_birth DATE,
    blood_group VARCHAR(5),
    address VARCHAR(255),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    created_at DATETIME DEFAULT GETDATE()
);
--Table 3 doctors
CREATE TABLE doctors (
    id INT IDENTITY(1,1),
    user_id INT,
    specialization VARCHAR(100),
    license_number VARCHAR(50),
    availability_notes TEXT,
    created_at DATETIME DEFAULT GETDATE()
);
--Table 4 appointments
CREATE TABLE appointments (
    id INT IDENTITY(1,1),
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(20),
    reason TEXT,
    created_at DATETIME DEFAULT GETDATE()
);
--Table 5 medical records
CREATE TABLE medical_records (
    id INT IDENTITY(1,1),
    patient_id INT,
    doctor_id INT,
    diagnosis TEXT,
    treatment TEXT,
    notes TEXT,
    visit_date DATE,
    created_at DATETIME DEFAULT GETDATE()
);
--Table 6 bills
CREATE TABLE bills (
    id INT IDENTITY(1,1),
    patient_id INT,
    appointment_id INT,
    amount DECIMAL(10,2),
    status VARCHAR(20),
    description TEXT,
    created_at DATETIME DEFAULT GETDATE()
);
--Table 7 payments
CREATE TABLE payments (
    id INT IDENTITY(1,1),
    bill_id INT,
    amount_paid DECIMAL(10,2),
    payment_method VARCHAR(20),
    payment_status VARCHAR(20),
    created_at DATETIME DEFAULT
    GETDATE()
);


-- Adding primary keys
ALTER TABLE users ADD CONSTRAINT pk_users PRIMARY KEY (id);
ALTER TABLE patients ADD CONSTRAINT pk_patients PRIMARY KEY (id);
ALTER TABLE doctors ADD CONSTRAINT pk_doctors PRIMARY KEY (id);
ALTER TABLE appointments ADD CONSTRAINT pk_appointments PRIMARY KEY (id);
ALTER TABLE medical_records ADD CONSTRAINT pk_medical_records PRIMARY KEY (id);
ALTER TABLE bills ADD CONSTRAINT pk_bills PRIMARY KEY (id);
ALTER TABLE payments ADD CONSTRAINT pk_payments PRIMARY KEY (id);



-- Adding constraints unique
ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);
ALTER TABLE doctors ADD CONSTRAINT uq_doctors_license UNIQUE (license_number);
ALTER TABLE patients ADD CONSTRAINT uq_patients_user UNIQUE (user_id);
ALTER TABLE doctors ADD CONSTRAINT uq_doctors_user UNIQUE (user_id);
 -- Adding foreign key
--Adding foreign keys
ALTER TABLE patients
ADD CONSTRAINT fk_patients_users
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE doctors
ADD CONSTRAINT fk_doctors_users
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE appointments
ADD CONSTRAINT fk_appointments_patient
FOREIGN KEY (patient_id) REFERENCES patients(id);

ALTER TABLE appointments
ADD CONSTRAINT fk_appointments_doctor
FOREIGN KEY (doctor_id) REFERENCES doctors(id);

ALTER TABLE medical_records
ADD CONSTRAINT fk_records_patient
FOREIGN KEY (patient_id) REFERENCES patients(id);

ALTER TABLE medical_records
ADD CONSTRAINT fk_records_doctor
FOREIGN KEY (doctor_id) REFERENCES doctors(id);

ALTER TABLE bills
ADD CONSTRAINT fk_bills_patient
FOREIGN KEY (patient_id) REFERENCES patients(id);

ALTER TABLE bills
ADD CONSTRAINT fk_bills_appointment
FOREIGN KEY (appointment_id) REFERENCES appointments(id);

ALTER TABLE payments
ADD CONSTRAINT fk_payments_bill
FOREIGN KEY (bill_id) REFERENCES bills(id);

-- Index
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_medical_patient ON medical_records(patient_id);
CREATE INDEX idx_bills_patient ON bills(patient_id);
