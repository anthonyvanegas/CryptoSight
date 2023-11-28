require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getAssetData(symbol) {
    const response = await axios.get(process.env.API_URL, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
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