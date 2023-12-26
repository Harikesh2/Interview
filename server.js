const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (update the connection string)
mongoose.connect('mongodb+srv://mths83478:CESzpVH8dZhY3rJN@cluster0.nw5hq6q.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a simple survey schema
const surveySchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Survey = mongoose.model('Survey', surveySchema);

// API endpoint to submit survey responses
app.post('/api/submit', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newSurvey = new Survey({ question, answer });
    await newSurvey.save();
    res.json({ success: true, message: 'Survey response submitted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
