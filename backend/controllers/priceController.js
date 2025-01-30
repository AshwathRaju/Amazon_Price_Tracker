const puppeteer = require('puppeteer');
const Price = require('../models/Price');

exports.trackPrice = async (req, res) => {
    const { productUrl } = req.body;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(productUrl, { waitUntil: 'networkidle2' });

        const price = await page.evaluate(() => {
            const priceElement = document.querySelector('#priceblock_ourprice') || 
                                 document.querySelector('#priceblock_dealprice') ||
                                 document.querySelector('.a-price .a-offscreen');

            return priceElement ? priceElement.innerText : null;
        });

        await browser.close();

        if (price) {
            const priceEntry = new Price({ productUrl, price });
            await priceEntry.save();
            res.json({ price });
        } else {
            res.status(404).json({ error: 'Price not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the price' });
    }
};

exports.getPriceHistory = async (req, res) => {
    const { productUrl } = req.query;
    try {
        const prices = await Price.find({ productUrl }).sort({ date: -1 });
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch price history' });
    }
};
