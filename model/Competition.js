const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, compateresdfgssdf } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(compateresdfgssdf);
const ipblockSchema = new mongoose.Schema({

    "title": { type: String, default: "" },
    "type": { type: String, default: "" },
    "Category1": { type: String, default: '' },
    "Category2": { type: String, default: '' },

    "WinningAmount": { type: Number, default: 0 },
    "dpCoin": { type: Number, default: 0 },
    "overview": { type: String, default: '' },

    "details": { type: String, default: "" },
    "rewards": { type: String, default: "" },
    "timeline": { type: String, default: "" },

    "judgingCriteria": { type: String, default: "" },
    "toParticipate": { type: String, default: "" },
    "Deadline": { type: String, default: "" },

    "allowedEntries": {type: Number, default: 0  },
    "totalJoined": { type: String, default: "" },
    "isAgree": { type: String, default: "" },
    "status": { type: String, default: "" },

    "page_from_url":{type: String, default: ""},
    "leadType":{type: String, default: ""},

   "applicants": [
        {

            email: { type: String, required: true },
            date: { type: Date, default: Date.now },
            message: { type: String, default: "" },
            projectURL: { type: String, default: "" },
            isAgree:{type:Boolean,default:false},
            isAccepted: { type: String, default: "Pending" },
        
        },
    ],
    
   

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

