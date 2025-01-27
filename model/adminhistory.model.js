const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, QypnOSFBlr8a2DHk } = require('../helpers/dptHkiWcxuTRnjx');

const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(QypnOSFBlr8a2DHk);

let adminHistorySchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    email: {
        type: String,
        default: ""
    },
    ip_address: {
        type: String,
        default: ""
    },
    browser_name: {
        type: String,
        default: ""
    },
    os: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    login_status: {
        type: Boolean,

    },
 
    loginName: {
        type: String,
        default: ""
    },
    department: {
        type: String,
        default: ""
    },

}, { timestamps: true }, { versionKey: false });

module.exports = mongoose.model(collectionName, adminHistorySchema, collectionName)
