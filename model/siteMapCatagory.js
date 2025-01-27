const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, catsitesdfisdhifgh } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(catsitesdfisdhifgh);
const ipblockSchema = new mongoose.Schema({
    "priority": { type: String, default: "" },
    "changefreq": { type: String, default: "" },
    "url": { type: String, default: "" },
    "siteMapStatus":{ type: Boolean, default: true },
   

    
    
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)