const express = require('express');
const Phrase = require('../models/Phrase');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const phrase = await Phrase.aggregate([{ $sample: { size: 1 } }]);
    res.json(phrase[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
