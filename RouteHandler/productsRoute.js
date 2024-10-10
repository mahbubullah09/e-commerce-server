const express = require('express')
const Products = require('../Schemas/productShema')
const router = express.Router()


// Get all products
router.get("/", async (req, res) => {
    try {
      const products = await Products.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = router