const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  images: {
    type: Array, 
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Products", productSchema);
