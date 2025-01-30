const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    productUrl: { type: String, required: true },
    price: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Price', PriceSchema);
