// db.js
require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool

// const pool = mysql.createPool({
//   host: 'srv1783.hstgr.io',      // MySQL host (localhost if using XAMPP)
//   user: 'u878705125_emanplastic02',           // MySQL user (default XAMPP user is 'root')
//   password: 'Wajeeha@irfan1',           // MySQL password (leave empty for default XAMPP user)
//   database: 'u878705125_scrapweb',   // Your database name
//   // waitForConnections: true,
//   // connectionLimit: 10,    // Adjust the limit as needed
//   // queueLimit: 0
// });

const HOST = process.env.HOST || 'localhost';
const USER  = process.env.DBUSER || 'root';
const PASSWORD = process.env.PASSWORD || '';
const DATABASE = process.env.DATABASE || 'scrapweb';
console.log("HOSTTTTTTTTTTTTTTTTTTTTTTT",HOST,USER,PASSWORD,DATABASE);
const pool = mysql.createPool({
  host: HOST,      // MySQL host (localhost if using XAMPP)
  user: USER,           // MySQL user (default
  password: PASSWORD,           // MySQL password (leave empty for default XAMPP user)
  database: DATABASE,   // Your database name
  
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
