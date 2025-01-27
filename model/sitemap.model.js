const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, sitemsfasfdafd } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(sitemsfasfdafd);
const ipblockSchema = new mongoose.Schema({
    "priority": { type: String, default: "" },
    "changefreq": { type: String, default: "" },
    "url": { type: String, default: "" },
    "siteMapStatus":{ type: Boolean, default: true },
   

    
    
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)