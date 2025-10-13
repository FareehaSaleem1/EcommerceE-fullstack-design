// backend/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/', (req, res) => {
  res.send('BKR Tech E-commerce API is running...');
});

app.use('/api/products', productRoutes);

// Error handling middleware should be last
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});