-- Local database setup for the Eman Plastics scrap website.
-- Run from the WebscrapBackend folder:   mysql -u root < database/setup.sql
-- WARNING: this RESETS the "scrapweb" database. Running it again deletes all local data.

DROP DATABASE IF EXISTS scrapweb;
CREATE DATABASE scrapweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE scrapweb;

CREATE TABLE users (
  UserId       INT AUTO_INCREMENT PRIMARY KEY,
  Email        VARCHAR(255) NOT NULL UNIQUE,
  FirstName    VARCHAR(100),
  LastName     VARCHAR(100),
  PhoneNumber  VARCHAR(30),
  Role         VARCHAR(20) NOT NULL DEFAULT 'user',
  PasswordHash VARCHAR(255),
  GoogleId     VARCHAR(255)
);

CREATE TABLE products (
  ProductId       INT AUTO_INCREMENT PRIMARY KEY,
  Name            VARCHAR(255) NOT NULL,
  Description     TEXT,
  PricePerKg      DECIMAL(10,2),
  QuantityInStock INT,
  Category        VARCHAR(50),   -- must be 'Metals', 'Plastics' or 'Used Scrap'
  ImageUrl        VARCHAR(500)
);

CREATE TABLE orders (
  OrderID       INT AUTO_INCREMENT PRIMARY KEY,
  UserId        INT,
  FirstName     VARCHAR(100),
  LastName      VARCHAR(100),
  Address       VARCHAR(255),
  Email         VARCHAR(255),
  City          VARCHAR(100),
  PhoneNumber   VARCHAR(30),
  instruction   TEXT,
  paymentMethod VARCHAR(50),
  OrderDate     DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orderitems (
  ItemID      INT AUTO_INCREMENT PRIMARY KEY,
  OrderID     INT,
  ProductName VARCHAR(255),
  Quantity    VARCHAR(50)
);

CREATE TABLE contactus (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  fullname     VARCHAR(255),
  email        VARCHAR(255),
  phone_number VARCHAR(30),
  message      TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Local admin account  ->  email: admin@scrapweb.local   password: Admin@123
INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash) VALUES
('admin@scrapweb.local', 'Site', 'Admin', '0000000000', 'admin',
 '$2a$10$XvGY2bwb1CaQyrhBz.KzWO75J.Cr.5nhsFB2YdzoG/DNb/tYw1rym');

-- Sample products (replace with real ones from the admin panel later)
INSERT INTO products (Name, Description, PricePerKg, QuantityInStock, Category, ImageUrl) VALUES
('Copper Scrap',      'Clean copper wire and pipe scrap.',          28.00, 500,  'Metals',     'https://placehold.co/600x400?text=Copper'),
('Aluminium Scrap',   'Mixed aluminium sheets and profiles.',        6.00, 800,  'Metals',     'https://placehold.co/600x400?text=Aluminium'),
('Brass Scrap',       'Brass fittings, valves and turnings.',       18.00, 300,  'Metals',     'https://placehold.co/600x400?text=Brass'),
('Iron Scrap',        'Heavy melting iron scrap.',                   1.20, 2000, 'Metals',     'https://placehold.co/600x400?text=Iron'),
('HDPE Plastic',      'Baled HDPE containers and drums.',            2.00, 1000, 'Plastics',   'https://placehold.co/600x400?text=HDPE'),
('PP Plastic',        'Polypropylene regrind and crates.',           2.50, 900,  'Plastics',   'https://placehold.co/600x400?text=PP'),
('ABS Plastic',       'ABS from electronics housings.',              3.00, 400,  'Plastics',   'https://placehold.co/600x400?text=ABS'),
('Used Refrigerator', 'Working used double-door fridge.',          350.00, 5,    'Used Scrap', 'https://placehold.co/600x400?text=Fridge'),
('Used Split AC',     '1.5 ton split AC, tested and working.',     600.00, 3,    'Used Scrap', 'https://placehold.co/600x400?text=Split+AC'),
('Used Washing Machine','Front-load washing machine, 7 kg.',       250.00, 4,    'Used Scrap', 'https://placehold.co/600x400?text=Washer');
