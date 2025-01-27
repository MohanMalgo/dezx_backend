const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, teshhguhkjv } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(teshhguhkjv);
const ipblockSchema = new mongoose.Schema({

    
    "type": { type: String, default: "" },
    "ipAddress": { type: String, default: "" },
   


}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

