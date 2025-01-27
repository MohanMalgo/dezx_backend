const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, catejsfjkdjfk } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(catejsfjkdjfk);
const ipblockSchema = new mongoose.Schema({
    "categoryURL": { type: String, default: "" },
    "categoryTitle": { type: String, default: "" },
    "status": { type: String, default: "" },
    "category_imgalt_title": { type: String, default: "" },
    "category_ogimage": { type: String, default: "" },
    "category_metatitle": { type: String, default: "" },
    "category_metadescription": { type: String, default: "" },
    "category_desc": { type: String, default: "" },
    "breadcrumb_title": { type: String, default: "" },
    "priority": { type: String },
    "changefreq": { type: String },
    "categoryBannerTitle": { type: String, default: "" },




}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

