const mongoose = require('mongoose');

const availableAssetSchema = mongoose.Schema({
    assetname: { type: String, required: true }
});

module.exports = mongoose.model('AvailableAsset', availableAssetSchema);