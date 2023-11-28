const express = require('express');
const router = express.Router();
const AvailableSymbol = require('../models/AvailableSymbol');

router.get('', (req, res, next) => {
    AvailableSymbol.find().then(documents => {
      res.status(200).json({
        message: 'Available symbol(s) fetched successfully',
        symbols: documents
      });
    });
});

module.exports = router;