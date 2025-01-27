const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, NmjdukGWC7Cgc1YZ } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(NmjdukGWC7Cgc1YZ);
const adminSchema = new mongoose.Schema({
    "email": { type: String, default: "", useCreateIndex: true },
    "password": { type: String, default: "", useCreateIndex: true },
    "department": { type: String, default: "" },
    "pattern":{ type: String, default: "" },

    "loginName": { type: String, default: "" },
    "rold": { type: String, default: "admin" },
    "status": { type: Boolean, default: true },
    "tfa_url": { type: String, default: "inactive" },
    "permissions": { type: Array, default: [] },
    "tfastatus": { type: Boolean, default: false },
    "tfa_secret": { type: String, default: "" },

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, adminSchema, collectionName)
