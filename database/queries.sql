--Contains commonly used SQL queries for performing database operations such as data retrieval, insertion, updation, deletion, and JOIN operations. 
--It includes queries that support core system functionalities like patient management, appointment scheduling, billing, and report generation
INSERT INTO users (full_name, email, password, role, phone_number) -- Data insertion for user
VALUES
('Admin Chase Robert', 'adm01@hms.com', '123', 'admin', '1111111111'),
('Admin Eric Foreman', 'adm02@hms.com', '123', 'admin', '2222222222'),

('Doctor Bird Jalali', 'dr001@hms.com', '123', 'doctor', '3333333333'),
('Doctor Schrute Larry', 'dr002@hms.com', '123', 'doctor', '4444444444'),
('Doctor Wilson Meredith', 'dr003@hms.com', '123', 'doctor', '5555555555'),

('Patient Jessica Kataif', 'ip001@hms.com', '123', 'patient', '3346632455'),
('Patient Miranda Cuddy', 'ip002@hms.com', '123', 'patient', '3346732255'),
('Patient Grey Jordan', 'ip003@hms.com', '123', 'patient', '3346982335'),
('Patient James Brown', 'ip004@hms.com', '123', 'patient', '3347632488'),
('Patient George White', 'ip005@hms.com', '123', 'patient', '3346832555'),
('Patient George Jordan', 'ip006@hms.com', '123', 'patient', '3346732785');

INSERT INTO patients (user_id, gender, date_of_birth, blood_group, address, emergency_contact_name, emergency_contact_phone)-- Data insertion for patients
VALUES
(6, 'Female', '1995-05-04', 'A+', 'State Farm', 'Eric Kataif', '3346632455'),
(7, 'Female', '1996-06-01', 'B+', 'Geico', 'Jessica Cuddy', '3346732255'),
(8, 'Male', '1997-08-03', 'O+', 'Progressive', 'Kevin Jordan', '3346982335'),
(9, 'Male', '1994-02-03', 'AB+', 'SP Insurance', 'Lebron Brown', '3347632488'),
(10, 'Male', '1993-09-01', 'A-', 'SP Insurance', 'Betty White', '3346832555'),
(11, 'Male', '1992-07-08', 'B-', 'Geico', 'Betty Jordan', '3346732785');


INSERT INTO doctors (user_id, specialization, license_number, availability_notes)-- Data insertion for Doctor
VALUES
(3, 'General', 'AD001', 'Morning Shift'),
(4, 'Surgeon', 'AD002', 'Evening Shift'),
(5, 'Cardiology', 'AD003', 'Full Day');

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason)-- Data insertion for Appointments
VALUES
(1, 1, '2019-03-03', '10:00', 'completed', 'General Checkup'),
(2, 1, '2019-04-03', '11:00', 'completed', 'Follow-up'),
(3, 2, '2019-05-03', '12:00', 'completed', 'MRI Scan'),
(4, 2, '2019-06-03', '09:00', 'completed', 'Blood Test'),
(5, 3, '2019-07-03', '10:30', 'completed', 'Heart Issue');

INSERT INTO medical_records (patient_id, doctor_id, diagnosis, treatment, notes, visit_date) -- Data insertion for Medical records
VALUES
(1, 1, 'Abortion Case', 'Medication_1', 'Routine case', '2019-03-02'),
(1, 1, 'Abortion Follow-up', 'Procedure_1', 'Stable', '2019-03-03'),
(2, 2, 'MRI Scan', 'Medication_1', 'Scan done', '2019-03-05'),
(3, 1, 'Blood Test', 'Procedure_1', 'Normal', '2019-03-08'),
(4, 2, 'Chemotherapy', 'Medication_1', 'Ongoing', '2019-06-05'),
(5, 3, 'Heart Myopathy', 'Procedure_1', 'Critical', '2019-07-03');


INSERT INTO bills (patient_id, appointment_id, amount, status, description) -- Data insertion for Bills
VALUES
(1, 1, 5000, 'paid', 'Treatment Bill'),
(2, 2, 3000, 'unpaid', 'MRI Bill'),
(3, 3, 7000, 'unpaid', 'Surgery Bill'),
(4, 4, 2000, 'paid', 'Lab Test'),
(5, 5, 10000, 'unpaid', 'Cardiology Treatment');

INSERT INTO payments (bill_id, amount_paid, payment_method, payment_status) -- Data insertion for Payments
VALUES
(1, 5000, 'cash', 'paid'),
(4, 2000, 'cash', 'paid');

