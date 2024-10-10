const express = require('express')
const Products = require('../Schemas/productShema');
const router = express.Router()


router.get("/", async (req, res) => {
    console.log("GET request received"); 
    try {
        const allProducts = await Products.find(); 
        
        // Check if products are found
        if (allProducts.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        console.log("Retrieved products:", allProducts); 
        res.status(200).json(allProducts); 
    } catch (err) {
        console.error("Error fetching products:", err); 
        res.status(500).json({ message: "Internal server error" }); 
    }
});



// post a product 

router.post('/', async (req,res)=>{

    const {title, description, price, discount, image, category} = req.body

    const newProduct = new Products({
        title,
        description,
        price,
        discount,
        image,
        category
    })

    try{
        await newProduct.save()
        res.status(200).json({message: "Products add successfully"})

    }catch(err) {
        console.error("Error fetching products:", err); 
        res.status(500).json({Error: "Something happend to create the prodtct"})

    }
})
  module.exports = router