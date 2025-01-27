const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, userprosgfgdfgdf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(userprosgfgdfgdf);
const metaSchema = new mongoose.Schema({
    "companyOrganization": { type: String, default: "" },
    "companyWebsite": { type: String, default: "" },
    "jobtitle": { type: String, default: '' },
    "email": { type: String, default: '' },
    "employementType": { type: String, default: '' },
    "jobDescription": { type: String, default: '' },
    "budget": { type: String, default: '' },
    "applyvia": { type: String,  default: ""},
    "status": { type: String, default: '' },
    "checked1": { type: Boolean, default: false },
    
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, metaSchema, collectionName)







