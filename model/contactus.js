const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, conffssasdffddd } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(conffssasdffddd);
const ipblockSchema = new mongoose.Schema({
    "name": { type: String, default: "" },
    "email": { type: String, default: "" },
    "country": { type: String, default: '' },
    "number": { type: String, default: '' },
    "social_media": { type: String, default: '' },
    "page_from": { type: String, default: '' },
    "service": { type: String, default: "" },
    "sub_service": { type: String, default: "" },
    "budget": { type: String, default: "" },
    "message": { type: String, default: "" },
    "ipAddress": { type: String, default: "" },
    "status": { type: String, default: "" },
    "social_media_number": { type: String, default: "" },
    "os": { type: String, default: "" },
    "browserName": { type: String, default: "" },
    "device": { type: String, default: "" },
    "page_from_url":{type: String, default: ""},
    "leadType":{type: String, default: ""}


   

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

