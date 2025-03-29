require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const cors = require('cors');
// const port = 3000;
//app.use(cors());

const ORIGIN_LINKS = process.env.ORIGIN_LINKS ? process.env.ORIGIN_LINKS.split(',') : ['http://localhost:5173'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (ORIGIN_LINKS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const sequelize = require('./config/db');
// const { User, Product, Order, OrderDetail, Category} = require('./models/associations');

// sequelize.sync({ force: false }) // Set force: true to drop and recreate tables (use cautiously)
//   .then(() => {
//     console.log('All models were synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Error syncing models:', err);
//   });



const authRoutes = require('./src/Routes/AuthRoute');
const productRoutes = require('./src/Routes/ProductsRoute');
const checkoutRoutes = require('./src/Routes/CheckoutRoute');
const adminRoutes = require('./src/Routes/adminRoute');
const contactusRoutes = require('./src/Routes/ContactusRoute');


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contactus', contactusRoutes);



app.listen(4000, () => {
    console.log(`Server is listening on port 4000`);
});
