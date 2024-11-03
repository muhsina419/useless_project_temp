// backend/routes/search.js
const express = require('express');
const Phrase = require('../models/Phrase');
const router = express.Router();

// GET /api/search?query=district_name
router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    const phrases = await Phrase.find({ district: query });
    res.json(phrases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
