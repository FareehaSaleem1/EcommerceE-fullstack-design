// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();

// We will create these controller functions in the next step
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController'); // This file doesn't exist yet

// Route for getting all products and creating a new product
router.route('/').get(getProducts).post(createProduct);

// Route for getting, updating, and deleting a single product by its ID
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;