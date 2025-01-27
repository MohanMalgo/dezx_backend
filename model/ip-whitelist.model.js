const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, RNWUiwTeZ9TD2pDB } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(RNWUiwTeZ9TD2pDB);

let whitelistSchema = new mongoose.Schema({
    "user_ip": { type: String, default: "", useCreateIndex: true },
    "status": { type: Number, default: 1 }, /* 1-Active 0-deactive */
    "count": { type: Number, default: 1 },
    "request": {
        type: String,
        default: ""
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, whitelistSchema, collectionName)
