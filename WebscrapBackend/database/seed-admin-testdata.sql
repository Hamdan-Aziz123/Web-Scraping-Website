-- Idempotent seed data for Orders, OrderItems, Users, and Contact Us messages
-- so every admin page has realistic test data. Safe to re-run.
-- Password for all seeded users below is: Test@1234

-- ---------- USERS ----------
INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'ahmed.khan@example.com' AS Email, 'Ahmed' AS FirstName, 'Khan' AS LastName, '0501234567' AS PhoneNumber, 'user' AS Role, '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42' AS PasswordHash
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'ahmed.khan@example.com');

INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'sara.ibrahim@example.com', 'Sara', 'Ibrahim', '0559876543', 'user', '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42'
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'sara.ibrahim@example.com');

INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'mohammed.rashid@example.com', 'Mohammed', 'Rashid', '0521122334', 'user', '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42'
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'mohammed.rashid@example.com');

INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'fatima.noor@example.com', 'Fatima', 'Noor', '0567788990', 'user', '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42'
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'fatima.noor@example.com');

INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'yousef.ali@example.com', 'Yousef', 'Ali', '0534455667', 'user', '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42'
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'yousef.ali@example.com');

INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'layla.hassan@example.com', 'Layla', 'Hassan', '0545566778', 'user', '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42'
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'layla.hassan@example.com');

INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'omar.saeed@example.com', 'Omar', 'Saeed', '0512233445', 'user', '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42'
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'omar.saeed@example.com');

INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash)
SELECT * FROM (SELECT
  'aisha.malik@example.com', 'Aisha', 'Malik', '0578899001', 'user', '$2a$10$/gGPXBuIk2eh89yxjQ8EG.b/jNncmY0oVkrZJdph0CQnuenUniL42'
) t WHERE NOT EXISTS (SELECT 1 FROM users WHERE Email = 'aisha.malik@example.com');

-- ---------- ORDERS ----------
-- (Uses named users where possible via subselect on Email; falls back to guest info)

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='ahmed.khan@example.com') AS UserId,
  'Ahmed','Khan','Al Quoz Industrial Area 3, Warehouse 12','ahmed.khan@example.com','Dubai','0501234567',
  'Please call before delivery, gate code 4521.','cashOnDelivery', '2026-09-10 09:15:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='ahmed.khan@example.com' AND OrderDate='2026-09-10 09:15:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='sara.ibrahim@example.com'),
  'Sara','Ibrahim','Al Nahda St, Building 7, Flat 302','sara.ibrahim@example.com','Sharjah','0559876543',
  'Weigh scale needed on site.','bankTransfer','2026-09-12 14:20:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='sara.ibrahim@example.com' AND OrderDate='2026-09-12 14:20:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='mohammed.rashid@example.com'),
  'Mohammed','Rashid','Industrial Area 6, Plot 45','mohammed.rashid@example.com','Sharjah','0521122334',
  NULL,'cashOnDelivery','2026-09-14 11:05:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='mohammed.rashid@example.com' AND OrderDate='2026-09-14 11:05:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='fatima.noor@example.com'),
  'Fatima','Noor','Mussafah Industrial, M-32','fatima.noor@example.com','Abu Dhabi','0567788990',
  'Loading dock at rear of building.','bankTransfer','2026-09-15 16:40:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='fatima.noor@example.com' AND OrderDate='2026-09-15 16:40:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='yousef.ali@example.com'),
  'Yousef','Ali','Al Ain Industrial Area, Street 9','yousef.ali@example.com','Al Ain','0534455667',
  NULL,'cashOnDelivery','2026-09-17 10:00:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='yousef.ali@example.com' AND OrderDate='2026-09-17 10:00:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='layla.hassan@example.com'),
  'Layla','Hassan','Ras Al Khor Industrial 2, Shed 18','layla.hassan@example.com','Dubai','0545566778',
  'Prefer morning delivery slot.','bankTransfer','2026-09-18 08:30:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='layla.hassan@example.com' AND OrderDate='2026-09-18 08:30:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='omar.saeed@example.com'),
  'Omar','Saeed','Al Qusais Industrial 4, Warehouse 3','omar.saeed@example.com','Dubai','0512233445',
  NULL,'cashOnDelivery','2026-09-20 13:10:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='omar.saeed@example.com' AND OrderDate='2026-09-20 13:10:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='aisha.malik@example.com'),
  'Aisha','Malik','Sajaa Industrial Area, Plot 21','aisha.malik@example.com','Sharjah','0578899001',
  'Small truck access only, narrow road.','bankTransfer','2026-09-22 15:55:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='aisha.malik@example.com' AND OrderDate='2026-09-22 15:55:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='ahmed.khan@example.com'),
  'Ahmed','Khan','Jebel Ali Free Zone, JAFZA 16','ahmed.khan@example.com','Dubai','0501234567',
  NULL,'cashOnDelivery','2026-09-24 09:45:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='ahmed.khan@example.com' AND OrderDate='2026-09-24 09:45:00');

INSERT INTO orders (UserId, FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod, OrderDate)
SELECT * FROM (
  SELECT (SELECT UserId FROM users WHERE Email='fatima.noor@example.com'),
  'Fatima','Noor','Musaffah Industrial M-11','fatima.noor@example.com','Abu Dhabi','0567788990',
  'Please bring a pallet jack.','bankTransfer','2026-09-25 12:00:00'
) t WHERE NOT EXISTS (SELECT 1 FROM orders WHERE Email='fatima.noor@example.com' AND OrderDate='2026-09-25 12:00:00');

-- ---------- ORDER ITEMS (linked by matching the OrderDate/Email pair above) ----------
INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'ahmed.khan@example.com' AS Email, '2026-09-10 09:15:00' AS OrderDate, 'Copper Scrap' AS ProductName, '150 kg' AS Quantity
  UNION ALL SELECT 'ahmed.khan@example.com','2026-09-10 09:15:00','Aluminium Scrap','80 kg'
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'sara.ibrahim@example.com' AS Email, '2026-09-12 14:20:00' AS OrderDate, 'HDPE Plastic' AS ProductName, '200 kg' AS Quantity
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'mohammed.rashid@example.com' AS Email, '2026-09-14 11:05:00' AS OrderDate, 'Iron Scrap' AS ProductName, '500 kg' AS Quantity
  UNION ALL SELECT 'mohammed.rashid@example.com','2026-09-14 11:05:00','Brass Scrap','60 kg'
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'fatima.noor@example.com' AS Email, '2026-09-15 16:40:00' AS OrderDate, 'PP Regrind (Black)' AS ProductName, '120 kg' AS Quantity
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'yousef.ali@example.com' AS Email, '2026-09-17 10:00:00' AS OrderDate, 'Used Double Door Refrigerator' AS ProductName, '2 pcs' AS Quantity
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'layla.hassan@example.com' AS Email, '2026-09-18 08:30:00' AS OrderDate, 'Zinc Dross' AS ProductName, '90 kg' AS Quantity
  UNION ALL SELECT 'layla.hassan@example.com','2026-09-18 08:30:00','Nickel Alloy Scrap','35 kg'
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'omar.saeed@example.com' AS Email, '2026-09-20 13:10:00' AS OrderDate, 'PET Preforms Scrap' AS ProductName, '75 kg' AS Quantity
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'aisha.malik@example.com' AS Email, '2026-09-22 15:55:00' AS OrderDate, 'Shredded Steel Scrap' AS ProductName, '600 kg' AS Quantity
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'ahmed.khan@example.com' AS Email, '2026-09-24 09:45:00' AS OrderDate, 'Heavy Melting Steel (HMS 2)' AS ProductName, '1000 kg' AS Quantity
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

INSERT INTO orderitems (OrderID, ProductName, Quantity)
SELECT o.OrderID, x.ProductName, x.Quantity FROM orders o
JOIN (
  SELECT 'fatima.noor@example.com' AS Email, '2026-09-25 12:00:00' AS OrderDate, 'Used Single Door Refrigerator' AS ProductName, '1 pc' AS Quantity
  UNION ALL SELECT 'fatima.noor@example.com','2026-09-25 12:00:00','Used Air Cooler','3 pcs'
) x ON o.Email = x.Email AND o.OrderDate = x.OrderDate
WHERE NOT EXISTS (SELECT 1 FROM orderitems oi WHERE oi.OrderID = o.OrderID AND oi.ProductName = x.ProductName);

-- ---------- CONTACT US MESSAGES ----------
INSERT INTO contactus (fullname, email, phone_number, message, submitted_at)
SELECT * FROM (SELECT 'Khalid Farooq','khalid.farooq@example.com','0509988776','Do you buy aluminium foil scrap in bulk quantities? I have around 2 tonnes ready for pickup.','2026-09-11 10:12:00') t
WHERE NOT EXISTS (SELECT 1 FROM contactus WHERE email='khalid.farooq@example.com' AND submitted_at='2026-09-11 10:12:00');

INSERT INTO contactus (fullname, email, phone_number, message, submitted_at)
SELECT * FROM (SELECT 'Noura Al Mansoori','noura.almansoori@example.com','0561234098','What are your current rates for copper scrap? Also do you offer weekly pickup for a workshop?','2026-09-13 09:30:00') t
WHERE NOT EXISTS (SELECT 1 FROM contactus WHERE email='noura.almansoori@example.com' AND submitted_at='2026-09-13 09:30:00');

INSERT INTO contactus (fullname, email, phone_number, message, submitted_at)
SELECT * FROM (SELECT 'Rizwan Sheikh','rizwan.sheikh@example.com','0525566778','I placed an order last week and still havent received a confirmation call, order was for used scrap fridges.','2026-09-16 17:45:00') t
WHERE NOT EXISTS (SELECT 1 FROM contactus WHERE email='rizwan.sheikh@example.com' AND submitted_at='2026-09-16 17:45:00');

INSERT INTO contactus (fullname, email, phone_number, message, submitted_at)
SELECT * FROM (SELECT 'Huda Al Zaabi','huda.alzaabi@example.com','0543322110','Do you accept plastic chair scrap from a school renovation project? Roughly 300kg.','2026-09-19 13:05:00') t
WHERE NOT EXISTS (SELECT 1 FROM contactus WHERE email='huda.alzaabi@example.com' AND submitted_at='2026-09-19 13:05:00');

INSERT INTO contactus (fullname, email, phone_number, message, submitted_at)
SELECT * FROM (SELECT 'Tariq Mehmood','tariq.mehmood@example.com','0567711223','Can someone visit our workshop in Al Quoz to assess a large batch of mixed metal scrap?','2026-09-21 11:20:00') t
WHERE NOT EXISTS (SELECT 1 FROM contactus WHERE email='tariq.mehmood@example.com' AND submitted_at='2026-09-21 11:20:00');

INSERT INTO contactus (fullname, email, phone_number, message, submitted_at)
SELECT * FROM (SELECT 'Meera Suresh','meera.suresh@example.com','0509090909','Very happy with the last pickup, quick and professional. Will you be expanding to Ajman soon?','2026-09-23 08:50:00') t
WHERE NOT EXISTS (SELECT 1 FROM contactus WHERE email='meera.suresh@example.com' AND submitted_at='2026-09-23 08:50:00');
