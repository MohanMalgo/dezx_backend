const Competition = require('../model/Competition');

module.exports = {
    admin: require('../model/admin.model'),
    ipBlock: require('../model/ip-block.model'),
    whitelist: require('../model/ip-whitelist.model'),
    adminHistory: require('../model/adminhistory.model'),
    siteSetting:require('../model/sitesettings.model'),
    adduser:require("../model/userlistModel"),
    contactUs:require('../model/contactus'),
    SubscribeUs:require('../model/subscribeus.model'),
    cerateTags:require("../model/createTags"),
    carear:require('../model/carear'),
    category:require("../model/category.model"),
    blogs:require("../model/blogs.model"),
    job:require('../model/job.model'),
    sitemap:require('../model/sitemap.model'),
    sitemapcategory:require('../model/siteMapCatagory'),
    malgo:require('../model/malgo.model'),
    testleads:require('../model/testLeads'),
    user:require('../model/user.model'),
    projects:require('../model/projects.model'),
    freelanceProject: require('../model/freelanceProject'),
    userProject: require('../model/userProject'),
    Competition:require('../model/Competition'),
    depositWithdraw:require('../model/depositWithdraw'),
    feemanagement:require('../model/feeManagement'),
    usercompetion:require('../model/userCompetions'),
    emailtemp:require('../model/emailTemp'),


}