-- Production (Render) database setup for the Eman Plastics scrap website.
--
-- Creates the empty table structure only — NO test admin account and NO
-- sample/fake product data. Use this for a fresh, live database.
--
-- How to run this (one time, right after creating the Render MySQL database):
--   mysql -h <render-host> -P <render-port> -u <render-user> -p <render-database> < database/setup-production.sql
-- (Render's database page gives you the host/port/user/database name — use the
-- "External Connection" details since you're running this from your own Mac.)
--
-- This does NOT drop or recreate a database, and does NOT insert any rows —
-- it only builds the empty tables inside whichever database Render already
-- created for you. Safe to run once against a brand-new, empty database.

CREATE TABLE IF NOT EXISTS users (
  UserId       INT AUTO_INCREMENT PRIMARY KEY,
  Email        VARCHAR(255) NOT NULL UNIQUE,
  FirstName    VARCHAR(100),
  LastName     VARCHAR(100),
  PhoneNumber  VARCHAR(30),
  Role         VARCHAR(20) NOT NULL DEFAULT 'user',
  PasswordHash VARCHAR(255),
  GoogleId     VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS products (
  ProductId       INT AUTO_INCREMENT PRIMARY KEY,
  Name            VARCHAR(255) NOT NULL,
  Description     TEXT,
  PricePerKg      DECIMAL(10,2),
  QuantityInStock INT,
  Category        VARCHAR(50),   -- must be 'Metals', 'Plastics' or 'Used Scrap'
  ImageUrl        VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS orders (
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

CREATE TABLE IF NOT EXISTS orderitems (
  ItemID      INT AUTO_INCREMENT PRIMARY KEY,
  OrderID     INT,
  ProductName VARCHAR(255),
  Quantity    VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS contactus (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  fullname     VARCHAR(255),
  email        VARCHAR(255),
  phone_number VARCHAR(30),
  message      TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Done. All 5 tables now exist and are empty.
--
-- No admin account exists yet. When you're ready to log in as admin on the
-- live site for the first time, come back and we'll create one real admin
-- account with a password you choose (never the test "Admin@123" one from
-- local development).
