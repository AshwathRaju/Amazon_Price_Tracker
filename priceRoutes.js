const express = require('express');
const priceController = require('Amazon-Price-Tracker/controllers/priceController');
const authController = require('Amazon-Price-Tracker/controllers/authController');

const router = express.Router();

router.post('/track-price', authController.verifyToken, priceController.trackPrice);
router.get('/price-history', authController.verifyToken, priceController.getPriceHistory);

module.exports = router;
