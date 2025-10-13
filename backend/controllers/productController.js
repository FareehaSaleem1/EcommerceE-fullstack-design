// backend/controllers/productController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.q
    ? {
        name: {
          $regex: req.query.q,
          $options: 'i', // 'i' for case-insensitive
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const products = await Product.find({ ...keyword, ...category });
  res.json(products);
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin (we will add auth later)
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;

  const product = new Product({
    name,
    price,
    image,
    description,
    category,
    stock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin (we will add auth later)
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.category = category;
    product.stock = stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin (we will add auth later)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
