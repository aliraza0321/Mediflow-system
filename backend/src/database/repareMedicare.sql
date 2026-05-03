USE Medicare;

INSERT INTO doctors (user_id, specialization, license_number, rating, availability_notes)
SELECT u.id, 'General Medicine', CONCAT('DOC', LPAD(u.id, 4, '0')), NULL, '09:00 AM - 05:00 PM'
FROM users u
WHERE u.role = 'doctor'
  AND NOT EXISTS (SELECT 1 FROM doctors d WHERE d.user_id = u.id);

INSERT INTO patients (user_id, gender, date_of_birth, blood_group, address)
SELECT u.id, NULL, NULL, NULL, NULL
FROM users u
WHERE u.role = 'patient'
  AND NOT EXISTS (SELECT 1 FROM patients p WHERE p.user_id = u.id);

INSERT INTO users (full_name, email, password, role, phone_number)
SELECT 'Fatima Noor', 'staff@mediflow.com', '$2b$10$LGOgZ34We459OavYaxXtfe/ZfkngPuX4puiKUqE5P9jIegP.t5v9.', 'staff', '03211234567'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'staff@mediflow.com');

INSERT INTO pharmacy (medicine_name, stock_quantity, price, expiry_date)
SELECT 'Aspirin', 120, 8.50, '2027-12-31'
WHERE NOT EXISTS (SELECT 1 FROM pharmacy WHERE medicine_name = 'Aspirin');

INSERT INTO pharmacy (medicine_name, stock_quantity, price, expiry_date)
SELECT 'Paracetamol', 200, 5.00, '2027-09-30'
WHERE NOT EXISTS (SELECT 1 FROM pharmacy WHERE medicine_name = 'Paracetamol');

INSERT INTO pharmacy (medicine_name, stock_quantity, price, expiry_date)
SELECT 'Insulin', 40, 65.00, '2026-11-30'
WHERE NOT EXISTS (SELECT 1 FROM pharmacy WHERE medicine_name = 'Insulin');

INSERT INTO pharmacy (medicine_name, stock_quantity, price, expiry_date)
SELECT 'Amoxicillin', 75, 18.00, '2027-03-31'
WHERE NOT EXISTS (SELECT 1 FROM pharmacy WHERE medicine_name = 'Amoxicillin');

INSERT INTO support (patient_id, staff_id, issue, status)
SELECT p.id, s.id, 'Need help downloading my report.', 'Pending'
FROM patients p
JOIN users s ON s.email = 'staff@mediflow.com'
WHERE NOT EXISTS (SELECT 1 FROM support)
LIMIT 1;