
const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, feemanaggfcuydgfh } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(feemanaggfcuydgfh);



const metaSchema = new mongoose.Schema({
    // "siteMapStatus": { type: Boolean, default: true },
    "fee": { type: Number },
    "type": { type: String },
    "status": { type: Boolean, default: true },

   
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, metaSchema, collectionName);
