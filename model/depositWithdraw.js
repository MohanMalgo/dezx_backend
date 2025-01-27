
const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, depowithzsdgfsdfs } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(depowithzsdgfsdfs);



const metaSchema = new mongoose.Schema({
    // "siteMapStatus": { type: Boolean, default: true },
    "amount": { type: Number },
    "accountNumber": { type: String },
    "confirmAccountNumber": { type: String, default: "" },
    "ifsc": { type: String, default: "" },
    "paypalId": { type: String, default: '' },
    "status": { type: Boolean, default: false },
    "type": { type: String, default: '' },
    "email": { type: String, default: '' },
    "memberID": { type: String, default: "" },
    "orderId": { type: String, default: "" },
    "currency": { type: String, default: "" },
    "signature": { type: String, default: "" },
    "paymentId": { type: String, default: "" },
    "name": { type: String, default: "" },







}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, metaSchema, collectionName);
