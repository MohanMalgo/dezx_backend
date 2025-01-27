const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, carsdfwwfds } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(carsdfwwfds);
const ipblockSchema = new mongoose.Schema({
    "position": { type: String, default: "" },
    "email": { type: String, default: "" },
    "fullName": { type: String, default: '' },
    "mobileNumber": { type: String, default: '' },
    "state": { type: String, default: '' },
    "city": { type: String, default: '' },
    "experienceLevel": { type: String, default: "" },
    "linkedInProfile": { type: String, default: "" },
    "hearAboutUs": { type: String, default: "" },
    "resumeFile": { type: String, default: "" },
    "coverFile": { type: String, default: "" },
    "flexCheckDefault": { type: Boolean, default: false },
    "availability": { type: String, default: "" },
    "ipAddress": { type: String, default: "" },
    "country": { type: String, default: "" },


    
    
    
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

