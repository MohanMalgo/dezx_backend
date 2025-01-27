const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, freelasceprojecdfdas } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(freelasceprojecdfdas);

const adminSchema = new mongoose.Schema({

    "revisionsTake": { type: String, default: "", useCreateIndex: true },
    "email": { type: String, default: "", useCreateIndex: true },
    "proposalCost": { type: String, default: "", useCreateIndex: true },
    "isAccepted": { type: String, default: "" },
    "type":{ type: String, default: "" }


    // "budget": { type: Number, default: "", useCreateIndex: true },
    // "coins": { type: String, default: "", useCreateIndex: true },
    // "deliveryTime": { type: String, default: "" },
    // "timeAgo": { type: String, default: "", useCreateIndex: true },
    // "status": { type: String, default: "0" },
    // "applicants": [
    //     {
    //         email: { type: String, required: true },
    //         proposalCost: { type: Number, required: true },
    //         revisionsTake: { type: Number, required: true },
    //         isAccepted: { type: String, default: "" },
    //     },
    // ],
    // "proposalCost": { type: String, default: "0" },
    // "revisionsTake": { type: String, default: "0" },
    // "email": { type: String, default: "" },

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, adminSchema, collectionName)
