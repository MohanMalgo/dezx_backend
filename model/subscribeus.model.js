const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, subdasdsddsf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(subdasdsddsf);
const ipblockSchema = new mongoose.Schema({

    "email": { type: String, default: "" },
    "type": { type: String, default: "" },
    "ipAddress": { type: String, default: "" },
    "pageFrom": { type: String, default: "" },


}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

