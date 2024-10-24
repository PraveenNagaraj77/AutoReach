// routes/aiRoutes.js
const express = require('express');
const { generateContent } = require('../controllers/contentController');

const router = express.Router();

router.post('/generate', generateContent);

module.exports = router;
