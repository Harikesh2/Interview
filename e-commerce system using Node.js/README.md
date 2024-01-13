
<!-- PROJECT LOGO -->




<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

 a REST API for an e-commerce system using Node.js involves several steps, including setting up a Node.js project, defining routes, handling database operations, and using a framework like Express to simplify the process. 



### Built With


* express: A web framework for Node.js.
* mongoose: An ODM (Object Data Modeling) library for MongoDB.
* body-parser: Middleware to parse request bodies.

### testing
* mocha: Testing framework.
* chai: Assertion library.
* supertest: HTTP assertion library (for testing API endpoints).


<!-- GETTING STARTED -->
## Getting Started


To handle creating, updating, and deleting variants along with the product, you can extend your API by adding additional routes and methods. 


IN models/Product.js to include an array of variants:

const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: String,
  price: Number,
  // Add other variant fields as needed
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  variants: [variantSchema],
  // Add other product fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


In controllers/productController.js to handle variants:

const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.variants.push(req.body);
    await product.save();
    res.status(201).json(product.variants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const variant = product.variants.id(req.params.variantId);
    variant.set(req.body);
    await product.save();
    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.variants.id(req.params.variantId).remove();
    await product.save();
    res.json({ message: 'Variant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


In routes/productRoutes.js to include the new routes:

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

router.post('/products/:productId/variants', productController.addVariant);
router.put('/products/:productId/variants/:variantId', productController.updateVariant);
router.delete('/products/:productId/variants/:variantId', productController.deleteVariant);

router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);

module.exports = router;



# TESTING THE API COMMAND
Now, you can test your API using tools like Postman or curl. Here are some example requests:

Create Product:

POST /api/products with the product details in the request body.
Update Product:

PUT /api/products/{productId} with the updated product details in the request body.
Delete Product:

DELETE /api/products/{productId}
Add Variant:

POST /api/products/{productId}/variants with the variant details in the request body.
Update Variant:

PUT /api/products/{productId}/variants/{variantId} with the updated variant details in the request body.
Delete Variant:

DELETE /api/products/{productId}/variants/{variantId}
These routes should now handle creating, updating, and deleting both products and their variants.



# APP TESTING WITH MOCHA CHAI

To write tests for your model to ensure data is being stored and retrieved correctly, WE can use a testing framework such as Mocha and an assertion library like Chai.

Create a file named productModel.test.js inside the test folder:

testing only few cases:
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server'); // Assuming your server is defined in server.js
const Product = require('../models/Product');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Product Model Tests', () => {
  before(async () => {
    // Connect to a test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/testDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Disconnect from the test database after running the tests
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the Product collection before each test
    await Product.deleteMany({});
  });

  it('should save a new product', async () => {
    const productData = {
      name: 'Test Product',
      price: 50,
      description: 'This is a test product',
    };

    const response = await chai.request(app).post('/api/products').send(productData);

    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('name', 'Test Product');
  });

  it('should retrieve all products', async () => {
    const products = [
      { name: 'Product 1', price: 10, description: 'Description 1' },
      { name: 'Product 2', price: 20, description: 'Description 2' },
    ];

    await Product.create(products);

    const response = await chai.request(app).get('/api/products');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(2);
  });

  it('should retrieve a specific product by ID', async () => {
    const product = await Product.create({ name: 'Test Product', price: 30, description: 'Test Description' });

    const response = await chai.request(app).get(`/api/products/${product._id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('name', 'Test Product');
  });

  // Add more tests as needed for updating, deleting, and searching products
});

