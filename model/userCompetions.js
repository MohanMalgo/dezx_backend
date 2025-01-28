




const mongoose = require('mongoose');
// import { Schema, model } from "mongoose";
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, userCompeagfjhgaf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(userCompeagfjhgaf);
const adminSchema = new mongoose.Schema({
    "email": { type: String, default: "", useCreateIndex: true },
    "companyname": { type: String, default: "", useCreateIndex: true },
    "contestName": { type: String, default: "", useCreateIndex: true },
    "phoneNumber": { type: String, default: "", useCreateIndex: true },

    "fees": { type: Number, default: 0 },

    "status": { type: Boolean, default: false },

    "categories":  { type: [String], default: [] },

    "deadline": { type: String, default: "" },
    "taskDescription": { type: String, default: "" },
    'totalPrice': { type: Number, default: 0 },
    "checked1": { type: Boolean, default: false },


    "memberID": { type: String, default: "" }

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, adminSchema, collectionName)
















