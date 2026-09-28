// db.js
require('dotenv').config();
const mysql = require('mysql2');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.DBPORT || 3306; // hosted providers (Aiven, PlanetScale, etc.) use a custom port, not the default 3306
const USER  = process.env.DBUSER || 'root';
const PASSWORD = process.env.PASSWORD || '';
const DATABASE = process.env.DATABASE || 'scrapweb';

// Hosted MySQL providers (Aiven, etc.) require an encrypted (SSL) connection.
// Local MySQL (XAMPP/localhost) does not need this, so it only turns on when
// a CA certificate is actually provided via the DB_SSL_CA environment variable.
// DB_SSL_CA should be the full contents of the CA certificate (the text you get
// from your provider's "CA certificate" / "Show" button), pasted as-is.
const ssl = process.env.DB_SSL_CA
  ? { ca: process.env.DB_SSL_CA }
  : undefined;

console.log(`Connecting to MySQL database "${DATABASE}" on ${HOST}:${PORT}${ssl ? ' (SSL enabled)' : ''}`);
const pool = mysql.createPool({
  host: HOST,      // MySQL host (localhost if using XAMPP)
  port: PORT,
  user: USER,           // MySQL user (default
  password: PASSWORD,           // MySQL password (leave empty for default XAMPP user)
  database: DATABASE,   // Your database name
  ssl,
  waitForConnections: true, // queue requests briefly when all connections are busy
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,    // avoid stale connections after long idle periods
});

module.exports = pool;



// const { Sequelize } = require('sequelize');

// // Create a Sequelize instance using your database configuration
// const sequelize = new Sequelize('scrapweb', 'root', '', {
//   host: 'localhost',      // MySQL host (localhost for XAMPP)
//   dialect: 'mysql',       // Specifying MySQL dialect
//   pool: {
//     max: 10,              // Maximum number of connections in the pool
//     min: 0,               // Minimum number of connections in the pool
//     acquire: 30000,       // The maximum time (in ms) that pool will try to get connection before throwing error
//     idle: 10000           // The maximum time (in ms) that a connection can be idle before being released
//   },
//   logging: false          // Disables logging for a cleaner console output
// });

// // Test the database connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = sequelize;
