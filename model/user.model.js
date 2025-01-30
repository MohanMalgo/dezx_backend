const mongoose = require('mongoose');
// import { Schema, model } from "mongoose";
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, usersfsdafsd } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(usersfsdafsd);
const adminSchema = new mongoose.Schema({
    "email": { type: String, default: "", useCreateIndex: true },
    "name": { type: String, default: "", useCreateIndex: true },
    "password": { type: String, default: "", useCreateIndex: true },
    "dob": { type: String, default: "", useCreateIndex: true },

    "isLogin": { type: Boolean, default: false },
    "isVerified": { type: Boolean, default: false },
    "otpExpiration": { type: Date },
    
    "status": { type: Boolean, default: true },
    "tfa_url": { type: String, default: "inactive" },
    "otp": { type: String, default: "" },
    "dpCoin": { type: Number, default: 100 },
    "tfastatus": { type: Boolean, default: false },
    "tfa_secret": { type: String, default: "" },
    "referralCode": { type: String, default: "" },
    "referredBy": { type: String, default: "" },
    "not_A_US": { type: Boolean, default: true },
    "notifications": { type: Boolean, default: true },
    'withdrableDPcoin': { type: Number, default: 0 },
    "withdrawStatus": { type: Boolean, default: false },
    "refbonus": { type: Number, default: 0 },
    // "referrer": {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user"
    // },
    "memberID": { type: String, default: "" }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, adminSchema, collectionName)
