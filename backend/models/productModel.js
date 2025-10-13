// backend/models/productModel.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;