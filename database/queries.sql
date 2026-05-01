--Contains commonly used SQL queries for performing database operations such as data retrieval, insertion, updation, deletion, and JOIN operations. 
--It includes queries that support core system functionalities like patient management, appointment scheduling, billing, and report generation
INSERT INTO staff (full_name, email, password, role, phone_number)
VALUES
('Admin Chase Robert', 'adm01@hms.com', '123', 'admin', '1111111111'),
('Admin Eric Foreman', 'adm02@hms.com', '123', 'admin', '2222222222'),

('Doctor Bird Jalali', 'dr001@hms.com', '123', 'doctor', '3333333333'),
('Doctor Schrute Larry', 'dr002@hms.com', '123', 'doctor', '4444444444'),
('Doctor Wilson Meredith', 'dr003@hms.com', '123', 'doctor', '5555555555'),

('Nurse Alex Grey', 'nr001@hms.com', '123', 'nurse', '6666666666');


INSERT INTO patients (full_name, email, gender, date_of_birth, blood_group, address, emergency_contact_name, emergency_contact_phone)
VALUES
('Jessica Kataif', 'ip001@hms.com', 'Female', '1995-05-04', 'A+', 'State Farm', 'Eric Kataif', '3346632455'),
('Miranda Cuddy', 'ip002@hms.com', 'Female', '1996-06-01', 'B+', 'Geico', 'Jessica Cuddy', '3346732255'),
('Grey Jordan', 'ip003@hms.com', 'Male', '1997-08-03', 'O+', 'Progressive', 'Kevin Jordan', '3346982335'),
('James Brown', 'ip004@hms.com', 'Male', '1994-02-03', 'AB+', 'SP Insurance', 'Lebron Brown', '3347632488'),
('George White', 'ip005@hms.com', 'Male', '1993-09-01', 'A-', 'SP Insurance', 'Betty White', '3346832555');

INSERT INTO doctors (staff_id, specialization, license_number, rating, availability_notes)
VALUES
(3, 'General', 'AD001', 4.5, 'Morning Shift'),
(4, 'Surgeon', 'AD002', 4.2, 'Evening Shift'),
(5, 'Cardiology', 'AD003', 4.8, 'Full Day');

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason)
VALUES
(1, 1, '2024-03-03', '10:00', 'completed', 'General Checkup'),
(2, 1, '2024-04-03', '11:00', 'completed', 'Follow-up'),
(3, 2, '2024-05-03', '12:00', 'completed', 'MRI Scan'),
(4, 2, '2024-06-03', '09:00', 'completed', 'Blood Test'),
(5, 3, '2024-07-03', '10:30', 'completed', 'Heart Issue');


INSERT INTO medical_records (patient_id, doctor_id, appointment_id, diagnosis, treatment, notes, visit_date)
VALUES
(1, 1, 1, 'Flu', 'Medication A', 'Stable', '2024-03-03'),
(2, 1, 2, 'Checkup', 'Routine meds', 'Normal', '2024-04-03'),
(3, 2, 3, 'MRI Scan', 'Observation', 'Scan done', '2024-05-03'),
(4, 2, 4, 'Blood Test', 'Lab test', 'Normal', '2024-06-03'),
(5, 3, 5, 'Heart Issue', 'Treatment Plan', 'Critical', '2024-07-03');


INSERT INTO prescriptions (appointment_id, patient_id, doctor_id, medicine_name, dosage, instructions)
VALUES
(1, 1, 1, 'Panadol', '500mg', 'Twice daily'),
(2, 2, 1, 'Vitamin C', '1000mg', 'Once daily'),
(3, 3, 2, 'Antibiotic', '250mg', 'After meals'),
(4, 4, 2, 'Painkiller', '200mg', 'As needed'),
(5, 5, 3, 'Heart Medicine', '50mg', 'Strict schedule');



INSERT INTO pharmacy (medicine_name, stock_quantity, price, expiry_date)
VALUES
('Panadol', 100, 50, '2026-12-01'),
('Vitamin C', 200, 30, '2026-10-01'),
('Antibiotic', 150, 80, '2025-08-01'),
('Painkiller', 120, 40, '2026-05-01'),
('Heart Medicine', 90, 150, '2025-12-01');


INSERT INTO support (patient_id, staff_id, issue, status)
VALUES
(1, 6, 'Needs wheelchair assistance', 'pending'),
(2, 6, 'Requires nurse support', 'resolved');
