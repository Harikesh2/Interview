const mongoose = require('mongoose');


const variantSchema = new mongoose.Schema({
    size: String,
    color: String,
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    variants: [variantSchema],

});

const Product  = mongoose.model('Product',productSchema );
module.exports = Product;
