
const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, emailszdgsdgvf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(emailszdgsdgvf);



const metaSchema = new mongoose.Schema({
    // "siteMapStatus": { type: Boolean, default: true },
    "type": { type: String,default:"" },
    "temp": { type: String,default:"" },
   

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, metaSchema, collectionName);
