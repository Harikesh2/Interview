process.env.NODE_ENV = 'test';
require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Product Model Tests', () => {
    before(async () => {
      // Connect to a test database before running the tests
      await mongoose.connect(process.env.Mongoose_URl, {
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