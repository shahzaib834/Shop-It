const express = require('express');
const dotenv = require('dotenv');
const products = require('./routes/product');
const connectDB = require('./config/db');

const app = express();

//Setting up environment variables with dotenv
dotenv.config();

// Connecting Database
connectDB();

// Middlewares.
app.use(express.json());
app.use('/api/products', products);

PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `Server started on Port: ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
