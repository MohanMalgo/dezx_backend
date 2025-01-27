
const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, tagsdmsdkkdksjk } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(tagsdmsdkkdksjk);

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const metaSchema = new mongoose.Schema({
    // "siteMapStatus": { type: Boolean, default: true },
    "priority": { type: String },
    "changefreq": { type: String },
    "page_url": { type: String, default: "" },
    "page_title": { type: String, default: "" },
    "breadcrumbs_title": { type: String, default: '' },
    "og_image": { type: String, default: '' },
    "meta_title": { type: String, default: '' },
    "meta_description": { type: String, default: '' },
    "siteMapStatus": { type: Boolean, default: true },
    "faqs": [faqSchema],
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, metaSchema, collectionName);