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

-- Table 1 staff
CREATE TABLE staff (
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

    full_name VARCHAR(100),
    email VARCHAR(100),

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

    staff_id INT,
    --email VARCHAR(100),

    specialization VARCHAR(100),
    license_number VARCHAR(50),

    rating DECIMAL(3,2),
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
    appointment_id INT,
    doctor_id INT,
    diagnosis TEXT,
    treatment TEXT,
    notes TEXT,
    visit_date DATE,
    created_at DATETIME DEFAULT GETDATE()
);
-- Table 6 prescriptions 
CREATE TABLE prescriptions (
    id INT IDENTITY(1,1),

    appointment_id INT,
    patient_id INT,
    doctor_id INT,

    medicine_name VARCHAR(255),
    dosage VARCHAR(100),
    instructions TEXT,

    created_at DATETIME DEFAULT GETDATE()
);

-- Table 7 pharmacy
CREATE TABLE pharmacy (
    id INT IDENTITY(1,1),

    medicine_name VARCHAR(255),
    stock_quantity INT,
    price DECIMAL(10,2),
    expiry_date DATE,

    created_at DATETIME DEFAULT GETDATE()
);
-- Table 8 support
CREATE TABLE support (
    id INT IDENTITY(1,1),

    patient_id INT,
    staff_id INT,

    issue TEXT,
    status VARCHAR(20),

    created_at DATETIME DEFAULT GETDATE()
);

-- new primary
ALTER TABLE staff ADD CONSTRAINT pk_staff PRIMARY KEY (id);
ALTER TABLE patients ADD CONSTRAINT pk_patients PRIMARY KEY (id);
ALTER TABLE doctors ADD CONSTRAINT pk_doctors PRIMARY KEY (id);
ALTER TABLE appointments ADD CONSTRAINT pk_appointments PRIMARY KEY (id);
ALTER TABLE medical_records ADD CONSTRAINT pk_medical_records PRIMARY KEY (id);
ALTER TABLE prescriptions ADD CONSTRAINT pk_prescriptions PRIMARY KEY (id);
ALTER TABLE pharmacy ADD CONSTRAINT pk_pharmacy PRIMARY KEY (id);
ALTER TABLE support ADD CONSTRAINT pk_support PRIMARY KEY (id);

-- new unqiueness
ALTER TABLE staff ADD CONSTRAINT uq_staff_email UNIQUE (email);
ALTER TABLE patients ADD CONSTRAINT uq_patient_email UNIQUE (email);
ALTER TABLE doctors ADD CONSTRAINT uq_doctor_license UNIQUE (license_number);



-- new null 
-- STAFF
ALTER TABLE staff ALTER COLUMN full_name VARCHAR(100) NOT NULL;
ALTER TABLE staff ALTER COLUMN email VARCHAR(100) NOT NULL;
ALTER TABLE staff ALTER COLUMN password VARCHAR(255) NOT NULL;
ALTER TABLE staff ALTER COLUMN role VARCHAR(20) NOT NULL;

-- PATIENTS
ALTER TABLE patients ALTER COLUMN full_name VARCHAR(100) NOT NULL;
ALTER TABLE patients ALTER COLUMN email VARCHAR(100) NOT NULL;


-- DOCTORS
ALTER TABLE doctors ALTER COLUMN staff_id INT NOT NULL;
ALTER TABLE doctors ALTER COLUMN specialization VARCHAR(100) NOT NULL;
ALTER TABLE doctors ALTER COLUMN license_number VARCHAR(50) NOT NULL;

-- APPOINTMENTS
ALTER TABLE appointments ALTER COLUMN patient_id INT NOT NULL;
ALTER TABLE appointments ALTER COLUMN doctor_id INT NOT NULL;
ALTER TABLE appointments ALTER COLUMN appointment_date DATE NOT NULL;
ALTER TABLE appointments ALTER COLUMN appointment_time TIME NOT NULL;
ALTER TABLE appointments ALTER COLUMN status VARCHAR(20) NOT NULL;

-- MEDICAL RECORDS
ALTER TABLE medical_records ALTER COLUMN patient_id INT NOT NULL;
ALTER TABLE medical_records ALTER COLUMN doctor_id INT NOT NULL;
ALTER TABLE medical_records ALTER COLUMN appointment_id INT NOT NULL;
ALTER TABLE medical_records ALTER COLUMN diagnosis TEXT NOT NULL;

-- PRESCRIPTIONS
ALTER TABLE prescriptions ALTER COLUMN patient_id INT NOT NULL;
ALTER TABLE prescriptions ALTER COLUMN doctor_id INT NOT NULL;
ALTER TABLE prescriptions ALTER COLUMN appointment_id INT NOT NULL;
ALTER TABLE prescriptions ALTER COLUMN medicine_name VARCHAR(255) NOT NULL;

-- SUPPORT
ALTER TABLE support ALTER COLUMN patient_id INT NOT NULL;
ALTER TABLE support ALTER COLUMN staff_id INT NOT NULL;
ALTER TABLE support ALTER COLUMN status VARCHAR(20) NOT NULL;

-- Pharma
ALTER TABLE pharmacy ALTER COLUMN medicine_name VARCHAR(255) NOT NULL;
ALTER TABLE pharmacy ALTER COLUMN stock_quantity INT NOT NULL;
ALTER TABLE pharmacy ALTER COLUMN price DECIMAL(10,2) NOT NULL;


-- new forigen 
ALTER TABLE doctors
ADD CONSTRAINT fk_doctors_staff
FOREIGN KEY (staff_id) REFERENCES staff(id);

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

ALTER TABLE medical_records
ADD CONSTRAINT fk_records_appointment
FOREIGN KEY (appointment_id) REFERENCES appointments(id);

ALTER TABLE prescriptions
ADD CONSTRAINT fk_prescriptions_patient
FOREIGN KEY (patient_id) REFERENCES patients(id);

ALTER TABLE prescriptions
ADD CONSTRAINT fk_prescriptions_doctor
FOREIGN KEY (doctor_id) REFERENCES doctors(id);

ALTER TABLE prescriptions
ADD CONSTRAINT fk_prescriptions_appointment
FOREIGN KEY (appointment_id) REFERENCES appointments(id);

ALTER TABLE support
ADD CONSTRAINT fk_support_patient
FOREIGN KEY (patient_id) REFERENCES patients(id);

ALTER TABLE support
ADD CONSTRAINT fk_support_staff
FOREIGN KEY (staff_id) REFERENCES staff(id);

-- Default values 
ALTER TABLE appointments ADD CONSTRAINT df_status DEFAULT 'pending' FOR status;
ALTER TABLE support ADD CONSTRAINT df_support_status DEFAULT 'pending' FOR status;
-- Rating Check
ALTER TABLE doctors ADD CONSTRAINT chk_rating CHECK (rating BETWEEN 0 AND 5);



