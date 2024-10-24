const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contentRoutes = require('./routes/contentRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  methods: 'GET,POST,PUT,DELETE', // Include PUT and DELETE methods
}));
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use('/api/ai', contentRoutes);
app.use('/api/campaigns', campaignRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack
  res.status(500).json({ error: 'Something went wrong!' }); // Send error response
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
