const Product = require('../models/Product');

exports.createProduct = async (req,res) =>{
    try {
        const product = new Product(req.body)
        
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
};








exports.getAllProduct = async (req,res) =>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message});  
    }
};

exports.getProductById = async (req,res) =>{
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);    
    } catch (error) {
        res.status(500).json({error: error.message});  
    }

};

