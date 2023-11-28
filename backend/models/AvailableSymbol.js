const mongoose = require('mongoose');

const availableSymbolSchema = mongoose.Schema({
    symbol: { type: String, required: true }
});

module.exports = mongoose.model('AvailableSymbol', availableSymbolSchema);