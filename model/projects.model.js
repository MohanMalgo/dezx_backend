const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, projectsnfjkdf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(projectsnfjkdf);
const adminSchema = new mongoose.Schema({

    "title": { type: String, default: "", useCreateIndex: true },
    "category1": { type: String, default: "", useCreateIndex: true },
    "category2": { type: String, default: "", useCreateIndex: true },
    "name": { type: String, default: "", useCreateIndex: true },
    "skillLevel": { type: String, default: "", useCreateIndex: true },
    "location": { type: String, default: "" },
    "budget": { type: Number, default: "", useCreateIndex: true },
    "coins": { type: String, default: "", useCreateIndex: true },
    "deliveryTime": { type: String, default: "" },
    "timeAgo": { type: String, default: "", useCreateIndex: true },
    "status": { type: String, default: "new" },
    "currency": { type: String, default: "" },
    "description": { type: String, default: "" },
    "isProjectStatus": { type: String, default: "" },
    "applicants": [
        {
            email: { type: String, required: true },
            proposalCost: { type: Number, default: 0 },
            revisionsTake: { type: Number, required: true },
            isAccepted: { type: String, default: "Pending" },
            pendingRevisions: { type: Number, required: true },
            date: { type: Date, default: Date.now },
            message: { type: String, default: "" },
            reason: { type: String, default: "" },
            projectURL: { type: String, default: "" },
            withdrawMessage: { type: String, default: "" },
            withdrawStatus: { type: Boolean, default: false },
        },
    ],
    

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, adminSchema, collectionName)
