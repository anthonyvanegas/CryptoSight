const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

async function getAssetData(symbol) {
    const apiKey = JSON.parse(fs.readFileSync('./config.json')).apiKey;
    const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
      params: {
        'symbol': symbol
      }
    });
    const json = response.data;
    return json;
}

router.get('', async (req, res, next) => {
      const responseData = await getAssetData(req.query.symbolQuery);
      res.status(200).json({
        message: 'Asset(s) fetched successfully',
        response: responseData
      });
});

module.exports = router;