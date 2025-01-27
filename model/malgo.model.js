const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, malgoweraddf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(malgoweraddf);

const adminSchema = new mongoose.Schema({
    "email": { type: String, default: "", useCreateIndex: true },
    "name": { type: String, default: "", useCreateIndex: true },
    "ipAddress": { type: String, default: "" },
   

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, adminSchema, collectionName)
