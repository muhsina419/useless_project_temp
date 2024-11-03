// backend/index.js
const express = require('express');
const app = express();
const searchRoutes = require('./routes/search');
const quizRoutes = require('./routes/quiz');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json

// Use routes
app.use('/api/search', searchRoutes);
app.use('/api/quiz', quizRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
