const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, gi5GmqxeiLA7rtf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(gi5GmqxeiLA7rtf);

const sitesettingsSchema = new mongoose.Schema({
    facebook: {
        type: String,
        default: ""
    },
    instagram: {
        type: String,
        default: ""
    },
    twitter: {
        type: String,
        default: ""
    },

    telegram: {
        type: String,
        default: ""
    },
    siteLogo: {
        type: String,
        default: ""
    },
    siteName: {
        type: String,
        default: ""
    },
    copyright: {
        type: String,
        default: ""
    },
    siteFavicon: {
        type: String,
        default: ""
    },
    contactMail: {
        type: String,
        default: ""
    },
 
  
   
}, { timestamps: true }, { versionKey: false });

module.exports = mongoose.model(collectionName, sitesettingsSchema, collectionName);