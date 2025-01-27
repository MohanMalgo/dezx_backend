const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, ledoMtsilresu } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(ledoMtsilresu);

const userSchema = new mongoose.Schema({
    "email": { type: String, default: "", useCreateIndex: true },
    "password": { type: String, default: "", useCreateIndex: true },
    "department": { type: String, default: "" },
    "loginName": { type: String, default: "" },
    "status": { type: String, default: "" },


}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, userSchema, collectionName)
