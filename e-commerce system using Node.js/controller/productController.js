const Product = require('../models/Product');

exports.createProduct = async (req,res) =>{
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
        
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
};

exports.updateProduct = async (req,res) =>{
    try {
        const product = await product.findByIdAndUpdate(req.params.productId, req.body,{new:true});
        res.json(product);
        
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
};

exports.deleteProduct = async (req,res) =>{
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.json({message: 'Product Successfully Deleted'});

        
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }

};

exports.addvariant = async (req,res) =>{
    try {
        const product = await Product.findById(req.params.productId);
        product.variants.push(req.body);
        await product.save();
        res.status(201).json(product.variants);
        
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
}

exports.deletevariant = async (req,res) =>{
    try {
        const product = await Product.findById(req.params.productId);
        product.variants.id(req.params.variantId).remove();
        await product.save();
        res.json({message: 'Variant delete Successfully'});
        
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
};

exports.updatevariant = async (req,res) =>{
    try {
        const product = await Product.findById(req.params.productId);
        const variant = product.variants.id(req.params.variantId);
        variant.set(req.body);
        await product.save();
        res.json(variant);
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
}

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

exports.searchProducts = async (req,res) =>{
    try {
        const searchQuery = req.query.q;
        const product = await Product.find({
            $or:[
                { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for product name
                { description: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for product description
                { 'variants.name': { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for variant name
            ],
        })
        res.json(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};