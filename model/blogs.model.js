const mongoose = require('mongoose');
const { decrypt } = require('../helpers/common');
const { EFxuTOdRyVJO4Urk, bloastgyutasi } = require('../helpers/dptHkiWcxuTRnjx');
const collectionName = decrypt(EFxuTOdRyVJO4Urk) + decrypt(bloastgyutasi);

// const pagetoshow = new mongoose.Schema({
//     pages: { type: String, },
   
// });
const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});
const ipblockSchema = new mongoose.Schema({
    "priority": { type: String },
    "changefreq": { type: String },
 
    "siteMapStatus": { type: Boolean },
    "blog_image_alt_title": { type: String, default: "" },
    "blog_tags": { type: String, default: "" },
    "blog_text": { type: String, default: "" },
    "blog_title": { type: String, default: "" },
    "blog_url": { type: String, default: "" },
    "breadcrumb_title": { type: String, default: "" },
    "blog_shot": { type: String, default: "" },
    "blog_meta_desc": { type: String, default: "" },
    "blog_image": { type: String, default: "" },
    "blog_meta_title": { type: String, default: "" },
    "blog_category": { type: String, default: "" },
    "blog_category_id": { type: String, default: "" },
    "blog_category_url": { type: String, default: "" },
    "page_to_show":{ type: Array, default: "" },
    "faqs": [faqSchema],


}, { timestamps: true, versionKey: false });

module.exports = mongoose.model(collectionName, ipblockSchema, collectionName)

