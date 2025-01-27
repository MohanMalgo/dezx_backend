const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, KWu89dNf8h4Wn33f } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(KWu89dNf8h4Wn33f);
const ipblockSchema = new mongoose.Schema({
    "user_ip": { type: String, default: "" },
    "email": { type: String, default: "" },
    "status": { type: Number, default: 1 }, /* 1-Active 0-deactive */
    "count": { type: Number, default: 1 },
    "request": {
        type: String,
        default: ""
    },

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

