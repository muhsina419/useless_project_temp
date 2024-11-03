const mongoose = require('mongoose');

const phraseSchema = new mongoose.Schema({
  dialect: String,
  translation: String,
  district: String
});

module.exports = mongoose.model('Phrase', phraseSchema);

