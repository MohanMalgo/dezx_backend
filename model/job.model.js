const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, joadfafasdfsd } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(joadfafasdfsd);
const metaSchema = new mongoose.Schema({
    "Job_Title": { type: String, default: "" },
    "Job_Description": { type: String, default: "" },
    "Roles_Responsibilities": { type: String, default: '' },
    "RequiredSkills": { type: String, default: '' },
    "SalaryRange": { type: String, default: '' },
    "ApplicationDeadline": { type: String, default: '' },
    "status": { type: Boolean,  default: false},
    
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, metaSchema, collectionName)

