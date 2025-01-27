
const { encrypt, getIPAddress, decrypt, bcrypt, bcryptCompare, getImageDimensions, uploadAssetInS3, uploadAssetInCloudinary, getLocation } = require('../helpers/common');
const sendResponse = require('../helpers/response');
const { adminHistory, whitelist, admin, ipBlock, siteSetting, adduser, emailTemplate, cms, faq, latestnewscms, userKyc, currency, adminbusvault, user, depositManagementAdmin, ANABuyHistory, participateAnaHistory, cerateTags, adminhistoryModel, category, blogs, contactUs, job, sitemap, sitemapcategory, caraer, malgo, SubscribeUs, projects, Competition, feemanagement } = require("../helpers/collections");
const send_mail = require("../helpers/smtp")
const mongoose = require('mongoose');
const { findOne, deleteOne, findWithCount, findOneAndUpdate, create, updateOne } = require('../helpers/query-helper');
const { create_JWT, verifyTFA, generateTFA, reset_URL, reset_verify } = require('../helpers/auth');
const carear = require('../model/carear');
const categoryModel = require('../model/category.model');
const freelanceProject = require('../model/freelanceProject');


exports.createCategory = async (req, res) => {
    try {
        const values = req.body;
        const url = req.body.categoryURL;
        const priority = req.body.priority;
        const changefreq = req.body.changefreq;
        let getSiteInfo = await categoryModel.findOne({ categoryURL: values.categoryURL })
        if (getSiteInfo) {
            return res.json({ status: false, message: "category already uploaded" })
        } else {
            if (req.file.location) {
                values.category_ogimage = req.file.location
            }
            const status = await categoryModel.create(values);
            await sitemapcategory.create({ priority: priority, changefreq: changefreq, url: url })
            if (status) {
                return res.json({ status: true, message: 'uploaded successfully.' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
}

exports.getSingleCategory = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await categoryModel.findOne({ _id: id })
        if (getSiteInfo) {
            res.json({ status: true, message: "Category information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get Category information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const values = req.body;
        const url = req.body.categoryURL;
        const priority = req.body.priority;
        const changefreq = req.body.changefreq;
        if (req.file) {
            if (req.file.location) {
                values.category_ogimage = req.file.location
            }
            const status = await categoryModel.updateOne({ _id: values.id }, values);
            await sitemapcategory.updateOne({ url: url }, { priority: priority, changefreq: changefreq, url: url })

            if (status) {
                return res.json({ status: true, message: 'uploaded successfully.' });
            }
        } else {
            const statuss = await categoryModel.updateOne({ _id: values.id }, values);
            await sitemapcategory.updateOne({ url: url }, { priority: priority, changefreq: changefreq, url: url })

            if (statuss) {
                return res.json({ status: true, message: 'uploaded successfully.' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
}

exports.dashCount = async (req, res) => {
    try {
        const carear = await findWithCount('carear', {}, {})
        const blogss = await findWithCount('blogs', {}, {})
        const contactUss = await findWithCount('contactUs', {}, {})
        const cerateTags = await findWithCount('cerateTags', {}, {})
        const SubscribeUs = await findWithCount('SubscribeUs', {}, {})
        const obj = {
            carear: carear.count ? carear.count : 0,
            blogss: blogss.count ? blogss.count : 0,
            leads: contactUss.count ? contactUss.count : 0,
            pages: cerateTags.count ? cerateTags.count : 0,
            SubscribeUs: SubscribeUs.count ? SubscribeUs.count : 0,
        }
        res.json({ status: true, message: "blogs information successfully", data: obj })
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
}

exports.createJob = async (req, res) => {
    try {
        const { Job_Title, Job_Description, Roles_Responsibilities, RequiredSkills, SalaryRange, ApplicationDeadline } = req.body
        if (!Job_Title || !Job_Description || !Roles_Responsibilities || !RequiredSkills || !SalaryRange || !ApplicationDeadline) {
            return res.json({ status: false, message: "Update all fields" })
        } else {
            const status = await job.create({ Job_Title: Job_Title, Job_Description: Job_Description, Roles_Responsibilities: Roles_Responsibilities, RequiredSkills: RequiredSkills, SalaryRange: SalaryRange, ApplicationDeadline: ApplicationDeadline });
            if (status) {
                res.json({ status: true, message: "Job created successfully" })
            } else {
                res.json({ status: false, message: "Something went wrong" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
}

exports.getSingleJob = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await job.findOne({ _id: id })
        if (getSiteInfo) {
            res.json({ status: true, message: "Category information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get Category information" })
        }
    } catch (error) {
        res.json({ status: false, message: err.message })
    }
}

exports.updateJob = async (req, res) => {
    try {
        let values = req.body
        return sendResponse(res, await updateOne('job', { _id: values.id }, values))
    }
    catch (err) {
        return sendResponse(res, { status: false, data: err, message: err.message });
    }
}

exports.getJob = async (req, res) => {
    try {
        let getSiteInfo = await job.find({}).sort({ _id: -1 })
        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
}

exports.createTags = async (req, res) => {
    try {
        let values = req.body;
        const url = req.body.page_url;
        const priority = req.body.priority;
        const changefreq = req.body.changefreq;
        if (values.faqs) {
            values.faqs = JSON.parse(values?.faqs)
        }
        let getSiteInfo = await cerateTags.findOne({ page_url: values.page_url });
        if (getSiteInfo) {
            return res.json({ status: false, message: "Meta already uploaded" });
        } else {
            if (req.file.location) {
                values.og_image = req.file.location
            }
            const status = await cerateTags.create(values);
            await sitemap.create({ priority: priority, changefreq: changefreq, url: url })
            if (status) {
                return res.json({ status: true, message: 'Uploaded successfully.' });
            }
        }

    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
};

exports.updateMeta = async (req, res) => {
    try {
        const values = req.body;
        const siteMapStatus = req.body.siteMapStatus
        const url = req.body.page_url
        const priority = req.body.priority;
        const changefreq = req.body.changefreq;
        if (values.faqs) {
            values.faqs = JSON.parse(values?.faqs)
        }
        if (req.file) {
            const image = req.file != undefined ? req.file.path : false;

            if (req.file.location) {
                values.og_image = req.file.location
            }
            const status = await cerateTags.updateOne({ _id: values.id }, values);
            await sitemap.updateOne({ url: url }, { priority: priority, changefreq: changefreq, siteMapStatus: siteMapStatus });
            if (status) {
                return res.json({ status: true, message: 'uploaded successfully.' });
            }
        } else {
            await sitemap.updateOne({ url: url }, { priority: priority, changefreq: changefreq, siteMapStatus: siteMapStatus });
            const statuss = await cerateTags.updateOne({ _id: values.id }, values);
            if (statuss) {
                return res.json({ status: true, message: 'uploaded successfully.' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
}

exports.createBlogs = async (req, res) => {
    try {
        const values = req.body;
        const image = req.file != undefined ? req.file.path : false;
        const url = req.body.blog_url
        const priority = req.body.priority;
        const changefreq = req.body.changefreq;
        if (values.faqs) {
            values.faqs = JSON.parse(values?.faqs)
        }
        if (req.file.location) {
            values.blog_image = req.file.location
        }
        const status = await blogs.create(values);
        const sitemaps = await sitemap.create({ priority: priority, changefreq: changefreq, url: url })
        if (status) {
            return res.json({ status: true, message: 'uploaded successfully.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
}

exports.updateBlogs = async (req, res) => {
    try {
        const values = req.body;
        const url = req.body.blog_url
        const siteMapStatus = req.body.siteMapStatus
        const priority = req.body.priority;
        const changefreq = req.body.changefreq;
        if (values.faqs) {
            values.faqs = JSON.parse(values?.faqs)
        }
        if (req.file) {
            if (req.file.location) {
                values.blog_image = req.file.location
            }
            const status = await blogs.updateOne({ _id: values.id }, values);
            await sitemap.updateOne({ url: url }, { priority: priority, changefreq: changefreq, siteMapStatus: siteMapStatus });
            if (status) {
                return res.json({ status: true, message: 'uploaded successfully.' });
            }
        } else {
            const statuss = await blogs.updateOne({ _id: values.id }, values);
            await sitemap.updateOne({ url: url }, { priority: priority, changefreq: changefreq, siteMapStatus: siteMapStatus });
            if (statuss) {
                return res.json({ status: true, message: 'uploaded successfully.' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
}

exports.getBlogs = async (req, res) => {
    try {
        let getSiteInfo = await blogs.find({}).sort({ _id: -1 })
        if (getSiteInfo) {
            res.json({ status: true, message: "blogs information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get blogs information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
}

exports.getSingleBlogs = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await blogs.findOne({ _id: id })
        if (getSiteInfo) {
            res.json({ status: true, message: "blogs information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get blogs information" })
        }
    } catch (error) {
        res.json({ status: true, message: error.message })
    }
}

exports.getMeta = async (req, res) => {
    try {
        let getSiteInfo = await cerateTags.find({}).sort({ _id: -1 })
        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: true, message: error.message })
    }
}

exports.getSingleMeta = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await cerateTags.findOne({ _id: id })
        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: true, message: error.message })
    }
}

exports.deleteSingleMeta = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await cerateTags.findOne({ _id: id })
        if (getSiteInfo) {
            const deletedata = await cerateTags.deleteOne({ _id: id });
            if (deletedata) {
                res.json({ status: true, message: "data deleted successfully" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteSingleBlog = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await blogs.findOne({ _id: id })
        if (getSiteInfo) {
            const deletedata = await blogs.deleteOne({ _id: id });
            if (deletedata) {
                res.json({ status: true, message: "data deleted successfully" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteSingleCarear = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await carear.findOne({ _id: id })
        if (getSiteInfo) {
            const deletedata = await carear.deleteOne({ _id: id });
            if (deletedata) {
                res.json({ status: true, message: "data deleted successfully" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteSingleJob = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await job.findOne({ _id: id })
        if (getSiteInfo) {
            const deletedata = await job.deleteOne({ _id: id });
            if (deletedata) {
                res.json({ status: true, message: "data deleted successfully" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getCarear = async (req, res) => {
    try {
        let getSiteInfo = await carear.find({}).sort({ _id: -1 })
        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getSingleCarear = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await carear.findOne({ _id: id })
        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: true, message: error.message })
    }
}

exports.update_site_settings = async (req, res) => {
    try {
        let values = req.body
        let updateSiteInfo = await siteSetting.updateOne({ _id: mongoose.Types.ObjectId(values._id) }, values)
        if (updateSiteInfo) {
            res.json({ status: true, message: "Site information updated successfully" })
        }
    }
    catch (error) {
        res.json({ status: true, message: error.message })
    }
}

exports.get_site_settings = async (_req, res) => {
    try {
        let getSiteInfo = await siteSetting.find({})
        if (getSiteInfo) {
            res.json({ status: true, message: "Site information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: true, message: error.message })
    }
}

exports.DdApIdDa = async (req, res) => {
    let ipData = await getIPAddress(req);
    const blockedip = await ipBlock.findOne({ user_ip: ipData })
    if ((ipData == null) || (ipData == "")) {
        res.json({ status: false, message: 'Invalid Ip Address' });
    } else if (blockedip) {
        res.json({ status: false, message: 'Your IP is Blocked' });
    }
    else if ((ipData != null) || (ipData != "")) {
        let finddata = await whitelist.findOne({ "user_ip": ipData })
        if ((finddata == null) || (finddata == "")) {
            let createddate = new Date();
            let addIp = await whitelist.create({ "user_ip": ipData, "createddate": createddate })
            await ipBlock.deleteOne({ user_ip: ipData })
            if (!addIp) {
                res.json({ status: false, message: 'Cannot add your IP address' });
            }
            else {
                res.json({ status: true, message: 'IP address added successfully' });
            }
        }
        else if ((finddata != null) || (finddata != "")) {
            res.json({ status: false, message: "This Ip addres Already exists" });
        }
    }
}

exports.check_ip = async (req, res) => {
    try {
        let ipData = await getIPAddress(req);
        if ((ipData == null) || (ipData == "")) {
            res.json({ status: false, message: 'Invalid Ip Address' });
        } else if ((ipData != null) || (ipData != "")) {
            let finddata = await whitelist.findOne({ "user_ip": ipData })
            let findBlock = await ipBlock.findOne({ "user_ip": ipData })
            if (finddata && finddata.user_ip) {
                res.json({ status: true, message: 'You can proceed' });
            }
            else if (findBlock) {
                res.json({ status: false, data: findBlock.blockedTime, message: 'Your IP is Blocked' });
            }
            else if (!finddata || finddata == null) {
                res.json({ status: false, message: 'Your are not whitelisted' });
            } else {
                res.json({ status: false, message: 'Cannot find your Ip' });
            }
        }
    }
    catch (error) {
        res.json({ status: false, message: error });
    }
}

exports.admin_login = async (req, res) => {
    try {
        const { email, password, pattern } = req.body;
        const isAdmin = await admin.findOne({ email });
        if (!isAdmin) {

            return res.json({ status: false, message: "Invalid login credential" })
        }
        const isPasswordValid = await bcryptCompare(password, isAdmin.password);
        if (!isPasswordValid) {
            return res.json({ status: false, message: "Invalid login password" });
        }

        if (pattern && pattern !== isAdmin.pattern) {
            return res.json({ status: false, message: "Invalid login Pattern" });
        }
        const authToken = await create_JWT({ userID: isAdmin._id });
        res.json({ status: true, message: "Admin login successfully!", token: authToken, email: isAdmin.email, })
    } catch (error) {
        console.error("Login Error:", error);
        return res.json({ status: false, message: error });
    }
};

exports.admin_login_history = async (req, res) => {
    try {
        let { page, limit, sort } = req.body
        let skip = Number(page) * Number(limit);
        limit = Number(limit)
        let dir = sort == 'desc' ? -1 : 1;
        let options = { sort: { createdAt: dir }, skip, limit }
        return sendResponse(res,
            await findWithCount('adminHistory', {
            }, {}, options
            )
        )
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

exports.tfa_login = async (req, res) => {
    try {
        let authToken = create_JWT({ userID: req.body.admin_email });
        let findTFA = await admin.findOne({ "admin_email": encrypt(req.body.admin_email) })
        if (findTFA) {
            let checkTFA = await verifyTFA(req.body.code, decrypt(findTFA.tfa_secret))
            if (checkTFA) {
                res.status(200).send({ status: true, message: "TFA verified successfully", isUserLogin: true, token: authToken, tfaStatus: findTFA.tfastatus, role: findTFA.role, permissions: findTFA.permissions })
            } else {
                res.status(200).send({ status: false, message: "Invalid tfacode" })
            }
        } else {
            res.json({ status: false, message: "Invalid authorization" })
        }
    }
    catch (error) {
        res.json({ status: false, message: error })
    }
}

exports.get_TFA = async (req, res) => {
    try {
        let getTFA = await admin.findOne({ "admin_email": req.userAddress })
        if (getTFA) {
            let result = {
                tfa_secret: decrypt(getTFA.tfa_secret),
                tfa_url: getTFA.tfa_url,
                tfastatus: getTFA.tfastatus
            }
            res.json({ status: true, message: "TFA details generated successfully", data: result })
        } else {
            res.json({ status: false, message: "Invalid authorization" })
        }
    }
    catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.enable_disable_tfa = async (req, res) => {
    try {
        const { code } = req.body
        let findSecret = await admin.findOne({ "admin_email": req.userAddress })
        if (findSecret) {
            if (!findSecret.tfastatus) {
                let checkTFA = await verifyTFA(code, decrypt(findSecret.tfa_secret))
                if (checkTFA) {
                    await admin.updateOne({ "admin_email": req.userAddress }, { "tfastatus": true })
                    res.status(200).send({ status: true, message: "TFA enabled successfully" })
                } else {
                    res.status(200).send({ status: false, message: "OTP expired or invalid OTP" })
                }
            } else {
                let checkTFA = await verifyTFA(code, decrypt(findSecret.tfa_secret))
                if (checkTFA) {
                    let userTFA = await generateTFA(decrypt(findSecret.admin_email))
                    await admin.updateOne({ "admin_email": req.userAddress }, { "tfastatus": false, "tfa_secret": encrypt(userTFA.tempSecret), "tfa_url": userTFA.dataURL })
                    res.status(200).send({ status: true, message: "TFA disabled successfully" })
                } else {
                    res.status(200).send({ status: false, message: "OTP expired or invalid OTP" })
                }
            }
        } else {
            res.json({ status: false, message: "Invalid authorization" })
        }
    }
    catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.change_password = async (req, res) => {
    try {
        const { newPassword, confirmNewPassword, currentPassword } = req.body
        let isPasswordExist = await admin.findOne({ "admin_email": req.userAddress })
        let checkPassword = await bcryptCompare(currentPassword, isPasswordExist.admin_password)
        let enNewPassword = await bcrypt(newPassword)
        let checkOld = await bcryptCompare(newPassword, isPasswordExist.admin_password)
        if (isPasswordExist) {
            if (checkPassword) {
                if (checkOld) {
                    res.json({ status: false, message: "It seems you have entered same password as old password!!!" })
                } else if (newPassword == confirmNewPassword) {
                    let updatepassword = await admin.updateOne({ "admin_email": req.userAddress }, { "admin_password": enNewPassword })
                    if (updatepassword?.modifiedCount == 1) {
                        res.json({ status: true, message: "Admin password is updated successfully" })

                    } else {
                        res.json({ status: false, message: "Cannot update admin password" })
                    }
                }
                else {
                    res.json({ status: false, message: "New password and confirm password must be same" })
                }
            } else {
                res.json({ status: false, message: "Invalid admin current password" })
            }
        } else {
            res.json({ status: false, message: "Invalid authorization token" })
        }
    } catch (err) {
        res.json({ status: false, err: err.message })
    }
}

exports.change_pattern = async (req, res) => {
    try {
        const { newPattern, confirmNewPattern, currentPattern } = req.body
        let isPatternExist = await admin.findOne({ "admin_email": req.userAddress })
        if (isPatternExist) {
            if (decrypt(isPatternExist.admin_pattern) == currentPattern) {
                if (decrypt(isPatternExist.admin_pattern) == newPattern) {
                    res.json({ status: false, message: "Current pattern and new pattern should not be same" })
                } else if (newPattern == confirmNewPattern) {
                    let updatePattern = await admin.updateOne({ "admin_email": req.userAddress }, { "admin_pattern": encrypt(newPattern) })
                    if (updatePattern?.modifiedCount == 1) {
                        res.json({ status: true, message: "Admin pattern is updated successfully" })
                    } else {
                        res.json({ status: false, message: "Cannot update admin pattern" })
                    }
                }
                else {
                    res.json({ status: false, message: "New password and confirm password must be same" })
                }
            } else if (decrypt(isPatternExist.admin_pattern) != currentPattern) {
                res.json({ status: false, message: "Invalid admin current pattern" })
            }
        } else {
            res.json({ status: false, message: "Invalid Authorization" })
        }
    } catch (err) {
        res.json({ status: false, err: err.message })
    }
}

exports.change_email = async (req, res) => {
    try {
        let findEmail = await admin.findOne({ "admin_email": req.userAddress })
        if (findEmail) {
            if (findEmail.admin_email == encrypt(req.body.currentEmail)) {
                if (req.body.currentEmail != req.body.newEmail) {
                    let updateEmail = await admin.updateOne({ "admin_email": req.userAddress, "request": adminpage }, { "admin_email": encrypt(req.body.newEmail) })
                    if (updateEmail) {
                        res.json({ status: true, message: "Admin email updated successfully" })
                    } else {
                        res.json({ status: false, message: "Cannot update admin email" })
                    }
                } else {
                    res.json({ status: false, message: "Current email and new email should not be same" })
                }
            } else {
                res.json({ status: false, message: "Invalid current admin email" })
            }
        } else {
            res.json({ status: false, message: "Invalid authorization token" })
        }
    } catch (err) {
        res.json({ status: false, err: err.message })
    }
}

exports.ipBlock = async (req, res) => {
    try {
        const adminpage = req.body.request
        let { user_ip, type } = req.body
        let checkIp = await ipBlock.findOne({ "user_ip": user_ip, "request": adminpage })
        let isValidIp = await whitelist.findOne({ "user_ip": user_ip, "request": adminpage }, { user_ip: 1 })
        if (isValidIp) {
            res.json({ status: false, message: "This IP is whitelisted. To block IP delete from whitelist" })
        }
        else if (checkIp && type != "remove") {
            res.json({ status: false, message: "This IP is already Added" })
        }
        else if (type == "add") {
            let addIp = ipBlock()
            addIp.user_ip = req.body.user_ip
            addIp.request = adminpage
            addIp.save()
            if (addIp) {
                res.json({ status: true, data: addIp, message: "New Ip details added successfully!!" })
            }
        }
        else if (type == "remove" && checkIp) {
            let deleteData = await ipBlock.deleteOne({ "user_ip": user_ip, "request": adminpage })
            if (deleteData) {
                return res.json({ status: true, message: "Ip deleted successfully" })
            } else {
                return res.json({ status: false, message: "Cannot delete this IP" })
            }
        }
    }
    catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.get_ipBlocklist = async (req, res) => {
    try {
        let skip = Number(req.body.page) * Number(req.body.size);
        let limit = Number(req.body.size)
        let dir = req.body.sortActive == 'desc' ? -1 : 1;
        let options = { sort: { createdAt: dir }, skip, limit }
        if (req.body.request == "adminwallet") {
            return sendResponse(res,
                await findWithCount('ipBlock', {
                    request: { $eq: "adminwallet" }
                }, { user_ip: 1, status: 1, count: 1, _id: 1 }, options))
        } else {
            return sendResponse(res,
                await findWithCount('ipBlock', {
                    request: { $eq: "adminpanel" }
                }, { user_ip: 1, status: 1, count: 1, _id: 1 }, options
                )
            )
        }
    }
    catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.ipWhitelist = async (req, res) => {
    try {
        let { user_ip, type } = req.body
        const adminpage = req.body.request
        let isValidIp = await ipBlock.findOne({ "user_ip": user_ip, "request": adminpage }, { user_ip: 1 })
        let checkIp = await whitelist.findOne({ "user_ip": user_ip, "request": adminpage })
        if (isValidIp) {
            res.json({ status: false, message: "This IP is blocked. To whitelist IP delete same IP from blocklist" })
        }
        else if (checkIp && type != "remove") {
            res.json({ status: false, message: "This IP is already Added" })
        }
        else if (type == "add") {
            let addIp = whitelist()
            addIp.user_ip = user_ip
            addIp.request = adminpage
            addIp.save()
            if (addIp) {
                res.json({ status: true, data: addIp, message: "Whitelist Ip details added successfully!!" })
            }
        }
        else if (type == "remove") {
            let deleteData = await whitelist.deleteOne({ "user_ip": user_ip, "request": adminpage })
            if (deleteData) {
                res.json({ status: true, message: "Whitelist Ip deleted successfully" })
            } else {
                res.json({ status: false, message: "Cannot delete this Whitelist IP" })
            }
        }
    }
    catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.get_whitelist = async (req, res) => {
    try {
        let skip = Number(req.body.page) * Number(req.body.size);
        let limit = Number(req.body.size)
        let dir = req.body.sortActive == 'desc' ? -1 : 1;
        let options = { sort: { createdAt: dir }, skip, limit }
        if (req.body.request == "adminwallet") {
            return sendResponse(res,
                await findWithCount('whitelist', {

                    request: { $eq: "adminwallet" }
                }, { user_ip: 1, status: 1, count: 1, _id: 1 }, options))
        } else {
            return sendResponse(res,
                await findWithCount('whitelist', {
                    request: { $eq: "adminpanel" }
                }, { user_ip: 1, status: 1, count: 1, _id: 1 }, options
                )
            )
        }
    }
    catch (error) {
        res.json({ status: false, message: error })
    }
}

exports.forgot_password = async (req, res) => {
    try {
        const adminpage = req.body.request
        let adminData = await admin.findOne({ "admin_email": encrypt(req.body.admin_email), "request": adminpage })
        if (adminData) {
            let resetToken = await reset_URL({ userID: req.body.admin_email });
            const Url = adminpage == "adminpanel" ? adminUrl : adminwalleturl
            let password_link = Url + 'auth/reset-password/' + resetToken;
            const resultUsername = req.body.admin_email.split('@')[0];
            let replacable = {
                '###LINK###': password_link,
                '###USERNAME###': resultUsername,
            };
            await send_mail.sendMail(req.body.admin_email, 'Forgot-Password', replacable, function (mailRes) {
                res.status(200).send({ status: true, URL: password_link, mail_status: mailRes, message: "Reset password link send to your mail" });
            });
        } else {
            res.json({ status: false, message: "Invalid admin email" })
        }
    } catch (err) {
        res.json({ status: false, err: err.message })
    }
}

exports.reset_password = async (req, res) => {
    try {
        const adminpage = req.body.request
        let { link, password, passwordConfirm } = req.body
        let verify = reset_verify(link)
        if (!verify.status) {
            let adminData = await admin.findOne({ "admin_email": encrypt(verify.userID), "request": adminpage })
            let checkPassword = await bcryptCompare(password, adminData.admin_password)
            if (checkPassword) {
                return res.json({ status: false, message: "It Seems You Have Entered Same Password As Old Password!!!" })
            }
            else if (password == passwordConfirm) {
                let updatePassword = await admin.updateOne({ "admin_email": encrypt(verify.userID) }, { "admin_password": await bcrypt(passwordConfirm) })
                if (updatePassword) {
                    return res.json({ status: true, message: "Admin password updated successfully" })
                } else {
                    return res.json({ status: false, message: "Cannot update admin password, Authorization is invalid" })
                }
            } else {
                return res.json({ status: false, message: "Password and confirm password must be same" })
            }
        } else if (!verify) {
            return res.json({ status: false, message: "Invalid reset password link" })
        }
    } catch (err) {
        return res.json({ status: false, message: err.message })
    }
}

exports.forgot_pattern = async (req, res) => {
    try {
        const adminpage = req.body.request
        let adminData = await admin.findOne({ "admin_email": encrypt(req.body.admin_email), "request": adminpage })
        if (adminData) {
            let resetToken = await reset_URL({ userID: req.body.admin_email })
            const Url = adminpage == "adminpanel" ? adminUrl : adminwalleturl
            let pattern_link = Url + 'auth/reset-pattern/' + resetToken;
            const resultUsername = req.body.admin_email.split('@')[0];
            let replacable = {
                '###LINK###': pattern_link,
                '###USERNAME###': resultUsername
            };
            send_mail.sendMail(req.body.admin_email, 'Forgot-Pattern', replacable, function (mailRes) {
                res.status(200).send({ status: true, URL: pattern_link, mail_status: mailRes, message: "Reset pattern link send to your mail" });
            });
        } else {
            return res.json({ status: false, message: "Invalid admin email" })
        }
    } catch (err) {
        return res.json({ status: false, message: err.message })
    }
}

exports.reset_pattern = async (req, res) => {
    try {
        const adminpage = req.body.request
        let verify = reset_verify(req.body.link)
        if (!verify.status) {
            let adminData = await admin.findOne({ "admin_email": encrypt(verify.userID), "request": adminpage })
            if (req.body.pattern == decrypt(adminData.admin_pattern)) {
                return res.json({ status: false, message: "Old pattern and new pattern not be same" })
            }
            else if (req.body.pattern == req.body.confirmPattern) {
                let updatePattern = await admin.updateOne({ "admin_email": encrypt(verify.userID) }, { "admin_pattern": encrypt(req.body.pattern) })
                if (updatePattern) {
                    return res.json({ status: true, message: "Admin pattern updated successfully" })
                } else {
                    return res.json({ status: false, message: "Cannot update admin pattern, Authorization is invalid" })
                }
            } else {
                return res.json({ status: false, message: "Pattern and confirm pattern must be same" })
            }
        } else {
            return res.json({ status: false, message: "Invalid reset pattern link" })
        }
    } catch (err) {
        return res.json({ status: false, message: err.message })
    }
}

exports.verify_link = async (req, res) => {
    try {
        let { token } = req.body
        let verify = reset_verify(token)
        if (!verify) {
            return res.json({ status: false, message: "Invalid reset password link" })
        } else {
            return res.json({ status: true, message: "You can proceed" })
        }
    } catch (err) {
        return res.json({ status: false, message: err.message })
    }
}

exports.faq = async (req, res) => {
    try {
        let values = req.body
        if (values.id == 'new') {
            let addNewCms = await faq.create(values)
            if (addNewCms) {
                res.json({ status: true, message: "CMS added succesfully" })
            } else {
                res.json({ status: false, message: "CMS cannot be added" })
            }
        } else {
            let updateCms = await faq.updateOne({ "_id": mongoose.Types.ObjectId(values.id) }, values)
            if (updateCms) {
                res.json({ status: true, message: "CMS updated succesfully" })
            } else {
                res.json({ status: false, message: "CMS cannot be updated. Invalid Id" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.faq_list = async (req, res) => {
    try {
        let { filter, title, page, limit } = req.query
        let skip = Number(page) * Number(limit)
        limit = Number(limit)
        let options = { sort: { _id: -1 }, skip, limit }
        let findQuery = {}
        filter = new RegExp(filter, 'i')
        if (filter) findQuery = { "pageTitle": title, $or: [{ question: filter }] }
        sendResponse(res, await findWithCount('faq', findQuery, {}, options))
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.cms = async (req, res) => {
    try {
        if (req.body.type == "phaseupdate") {
            let { _id, currentphase, locker1allocation, locker1end, locker1start, locker2allocation, locker2end, locker2start, totalallocation } = req.body
            if (req.body._id) {
                let updateCms = await cms.updateOne({ "_id": mongoose.Types.ObjectId(_id) }, { currentphase, locker1allocation, locker1end, locker1start, locker2allocation, locker2end, locker2start, totalallocation, "status": 1 })
                if (updateCms) {
                    res.json({ status: true, message: "CMS updated succesfully" })
                } else {
                    res.json({ status: false, message: "CMS cannot be updated. Invalid Id" })
                }
            } else {
                res.json({ status: false, message: "CMS cannot be updated. Invalid Id" })
            }
        } else {
            let { id, pagecontent, title, title1 } = req.body
            if (req.body.id) {
                let updateCms = await cms.updateOne({ "_id": mongoose.Types.ObjectId(id) }, { "title": title, "pagecontent": pagecontent, title1, "status": 1 })
                if (updateCms) {
                    res.json({ status: true, message: "CMS updated succesfully" })
                } else {
                    res.json({ status: false, message: "CMS cannot be updated. Invalid Id" })
                }
            } else {
                res.json({ status: false, message: "CMS cannot be updated. Invalid Id" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.getCMS = async (req, res) => {
    let skip = Number(req.body.page) * Number(req.body.size);
    let limit = Number(req.body.size)
    let options = { sort: { _id: 1 }, skip, limit }
    if (req.body.type == "home") {
        return sendResponse(res,
            await findWithCount('cms', {
                status: 1,
                type: { $eq: "home" }
            }, { page_title: 1, _id: 1, title: 1 }, options))
    } else if (req.body.type == "staking") {
        return sendResponse(res,
            await findWithCount('cms', {
                status: 1,
                type: { $eq: "staking" }
            }, { page_title: 1, _id: 1, title: 1 }, options
            )
        )
    } else if (req.body.type == "phaseupdate") {
        return sendResponse(res,
            await findWithCount('cms', {
                status: 1,
                type: { $eq: "phaseupdate" }
            }, { page_title: 0, pagecontent: 0, title: 0, createdAt: 0, updatedAt: 0 }, options
            )
        )
    }
    else {
        res.json({ status: false, message: "No data found" })
    }
}

exports.getSingleCMS = async (req, res) => {
    sendResponse(res, await findOne('cms', { "_id": mongoose.Types.ObjectId(req.body.id) }))
}

exports.getsingle_faq_list = async (req, res) => {
    try {
        let value = req.body
        sendResponse(res, await findOne('faq', { "_id": mongoose.Types.ObjectId(value.id) }))
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.delete_singledata = async (req, res) => {
    try {
        let value = req.body
        sendResponse(res, await deleteOne('faq', { "_id": mongoose.Types.ObjectId(value.id) }))
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.emailTemplate = async (req, res) => {
    try {
        let values = req.body
        if (req.body.id == 'new') {
            let isExists = await emailTemplate.findOne({ "title": req.body.title })
            if (isExists) {
                res.json({ status: false, message: "This title already exists" })
            } else {
                let addNewEmailTemplate = await emailTemplate.create(values)
                if (addNewEmailTemplate) {
                    res.json({ status: true, message: "Email template added successfully" })
                } else {
                    res.json({ status: false, message: "Email template cannot be added" })
                }
            }
        } else {
            let updateEmailTemplate = await emailTemplate.updateOne({ "_id": mongoose.Types.ObjectId(req.body.id) }, { "title": req.body.title, "template": req.body.template })
            if (updateEmailTemplate) {
                res.json({ status: true, message: "Email template updated successfully" })
            } else {
                res.json({ status: false, message: "Email template cannot be updated. Invalid Id" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}

exports.getEmailTemplate = async (req, res) => {
    try {
        let skip = req.body.page * req.body.size;
        let limit = req.body.size;
        let dir = req.body.sortActive;
        sendResponse(res, await findWithCount('emailTemplate', {}, {}, { skip, limit, dir }))
    }
    catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getSingleEmailTemplate = async (req, res) => {
    sendResponse(res, await findOne('emailTemplate', { "_id": mongoose.Types.ObjectId(req.body.id) }))
}

exports.getCurrentTime = async (req, res) => {
    const currentDate = new Date();
    const timestampDate = currentDate.getTime();
    res.json({ status: true, data: timestampDate })
}

exports.getAdminDetails = async (req, res) => {
    try {
        let { data } = await findOne('admin', { "admin_email": req.userAddress }, { admin_address: 1 })
        if (data) {
            const obj = {
                address: decrypt(data.admin_address),
                _id: data._id
            }
            res.json({ status: true, data: obj })
        }
        else {
            res.json({ status: false, message: "Not found" })
        }
    }
    catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.updateAdminDetails = async (req, res) => {
    let { address } = req.body
    sendResponse(res, await findOneAndUpdate('admin', { "admin_email": req.userAddress }, { admin_address: encrypt(address) }, { admin_address: 1 }))
}

exports.add_subadmin = async (req, res) => {

    let { admin_email, admin_pattern, admin_username, access } = req.body
    try {
        let isExists = await admin.findOne({ "admin_email": encrypt(req.body.admin_email) })
        if (isExists) {
            res.json({ status: false, message: "Email already exists" })
        } else if (admin_email && admin_pattern && admin_username && access) {

            let userTFA = await generateTFA(admin_email)
            let newpassword = await adminpswd()
            let newmpin = await adminmpin()

            if (userTFA && newmpin && newpassword) {
                let datas = {
                    admin_username,
                    admin_email: encrypt(admin_email),
                    admin_password: await bcrypt(newpassword),
                    admin_pattern: encrypt(admin_pattern),
                    admin_MPIN: await bcrypt(newmpin),
                    permissions: access,
                    request: "adminpanel",
                    role: "subadmin",
                    tfa_secret: encrypt(userTFA.tempSecret),
                    tfa_url: userTFA.dataURL
                }
                const created = await create('admin', datas)
            } else {
                res.json({ status: false, message: "Something went wrong" })
            }
        } else {
            res.json({ status: false, message: "Something went wrong" })
        }
    }
    catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.sub_admin_list = async (req, res) => {
    try {
        let skip = req.body.page * req.body.size;
        let limit = req.body.size;
        let dir = req.body.sortActive == 'desc' ? -1 : 1;
        let adminlist = await admin.find({ role: "subadmin" },
            { updatedAt: 0, request: 0, admin_password: 0, admin_pattern: 0, admin_MPIN: 0 }).sort({ createdAt: dir }).skip(skip).limit(limit)
        let adminData = await Promise.all(adminlist.map(async (response) => {
            if (response) {
                let newsList = {
                    admin_email: decrypt(response.admin_email),
                    role: response.role,
                    admin_status: response.admin_status,
                    permissions: response.permissions,
                    _id: response._id,
                    admin_username: response.admin_username,
                    createdAt: response.createdAt
                }
                return newsList
            }
            else {
                res.json({ status: false, message: "No sub-admin found" })
            }
        }))
        let newsCount = await admin.find({ role: "subadmin" }).countDocuments()
        if (adminData) {
            res.json({ status: true, data: adminData, count: newsCount })
        } else {
            res.json({ status: false, message: "No sub-admin found" })
        }
    } catch (error) {
        return sendResponse(res, { status: false, message: error.message });
    }
}

exports.single_admin_info = async (req, res) => {
    try {
        let { id } = req.query
        let singleadmin = await findOne('admin', { "_id": mongoose.Types.ObjectId(id) }, { updatedAt: 0, createdAt: 0 })
        if (singleadmin.status) {
            const data = {
                admin_email: decrypt(singleadmin.data.admin_email),
                role: singleadmin.data.role,
                admin_status: singleadmin.data.admin_status,
                permissions: singleadmin.data.permissions,
                _id: singleadmin.data._id,
                admin_username: singleadmin.data.admin_username,
            }
            res.json({ status: true, data: data })
        } else {
            return sendResponse(res, { status: false, message: "No data found" });
        }
    } catch (error) {
        return sendResponse(res, { status: false, message: error.message });
    }
}

exports.update_sub_admin = async (req, res) => {
    try {
        let values = req.body
        const data = {
            admin_status: values.admin_status,
            permissions: values.permissions,
        }
        if (data) {
            let update = await updateOne('admin', { "_id": mongoose.Types.ObjectId(values._id) }, data)
            if (update) {
                return sendResponse(res, { status: true, message: "Updated Successfully" })
            }
            else {
                return sendResponse(res, { status: false, message: "Updatation Failed" })
            }
        } else {
            return sendResponse(res, { status: false, message: "Updatation Failed" });
        }
    } catch (error) {
        return sendResponse(res, { status: false, message: error.message });
    }
}

exports.delete_sub_admin = async (req, res) => {
    try {
        let { id } = req.query
        let deleteData = await admin.deleteOne({ "_id": mongoose.Types.ObjectId(id) })
        if (deleteData) {
            return res.json({ status: true, message: "Sub-admin deleted successfully" })
        } else {
            return res.json({ status: false, message: "Cannot delete this Sub-admin" })
        }
    } catch (error) {
        return sendResponse(res, { status: false, message: error.message });
    }
}

exports.admin_access = async (req, res) => {
    try {
        let adminRes = await findOne('admin', { "admin_email": req.userAddress }, { permissions: 1, role: 1 })
        return sendResponse(res, { status: true, data: adminRes, message: "Successfull" });
    }
    catch (err) {
        return sendResponse(res, { status: false, message: err.message });
    }
}

exports.admin_access_status = async (req, res) => {
    try {
        let { data } = await findOne('admin', { "admin_email": req.userAddress }, { permissions: 1, role: 1, admin_email: 1, admin_status: 1 })
        if (!data.admin_status) {
            return res.status(201).send({ status: 201, message: 'Account is Disabled' })
        } else if (data.role !== "all" && data.role !== "owner") {
            let dataFound = data.permissions.includes(req.body.page)
            if (!dataFound) {
                return res.status(200).send({ status: true, otherData: false, message: 'permission denied' })
            } else {
                return res.status(200).send({ status: true, role: data.role, otherData: true, message: 'Sub-Admin' })
            }
        } else {
            return res.status(200).send({ status: true, role: data.role, message: 'Admin' })
        }
    }
    catch (err) {
        return sendResponse(res, { status: false, message: err.message });
    }
}

exports.create_user = async (req, res) => {
    let { department, loginName, email, password, status } = req.body
    try {
        let isExists = await admin.findOne({ "email": encrypt(email) })
        if (isExists) {
            res.json({ status: false, message: "Email already exists" })
        } else if (department, loginName, email, password) {
            let datas = {
                department,
                email: encrypt(email),
                password: await bcrypt(password),
                loginName,
                status
            }
            return sendResponse(res, await create('admin', datas))
        } else {
            res.json({ status: false, message: "Something went wrong" })
        }
    }
    catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getUser_details = async (req, res) => {
    try {
        let { page, size } = req.query
        let skip = Number(page) * Number(size);
        let limit = Number(size)
        let options = { skip, limit }
        let userDetails = await findWithCount('admin', {}, {}, options)
        if (!userDetails) {
            return sendResponse(res, { status: false, data: [], message: 'UserDetails not exist', count: 0 })
        } else {
            const data = await userDetails?.data?.map((value) => {
                return {
                    name: value?.loginName ? value?.loginName : '',
                    email: value?.email ? decrypt(value?.email) : '',
                    department: value?.department ? value?.department : '',
                    status: value?.status ? value?.status : "",
                    createdAt: value?.createdAt ? value.createdAt : "",
                    tfastatus: value?.tfastatus ? value.tfastatus : false
                }
            })
            return sendResponse(res, { status: true, data, count: userDetails?.count })
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        let values = req.body
        return sendResponse(res, await updateOne('admin', { _id: values._id }, values))
    }
    catch (err) {
        return sendResponse(res, { status: false, data: err, message: err.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        return sendResponse(res, await findWithCount('admin', {}, { loginName: 1, department: 1, status: 1 }))
    }
    catch (err) {
        res.json({ status: true, message: err.message })
    }
}

exports.getContactUs = async (req, res) => {
    try {
        const leads = await contactUs.find({}).sort({ _id: -1 })
        if (leads) {
            res.json({ status: true, data: leads })
        } else {
            res.json({ status: false, message: "No data found" })
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.deleteLeads = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await contactUs.findOne({ _id: id })
        if (getSiteInfo) {
            const deletedata = await contactUs.deleteOne({ _id: id });
            if (deletedata) {
                res.json({ status: true, message: "data deleted successfully" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getSingleContactUs = async (req, res) => {
    try {
        let { id } = req.body
        const singledata = await findOne('contactUs', { _id: id })
        return sendResponse(res, { status: true, data: singledata });
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getSubscribeUs = async (req, res) => {
    try {
        const leads = await SubscribeUs.find({}).sort({ _id: -1 })
        if (leads) {
            res.json({ status: true, data: leads })
        } else {
            res.json({ status: false, message: "No data found" })
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getCategory = async (req, res) => {
    try {
        const leads = await category.find({}).sort({ _id: -1 })
        if (leads) {
            res.json({ status: true, data: leads })
        } else {
            res.json({ status: false, message: "No data found" })
        }
    }
    catch (err) {
        res.json({ status: true, message: err.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await category.findOne({ _id: id })
        if (getSiteInfo) {
            const deletedata = await category.deleteOne({ _id: id });
            if (deletedata) {
                res.json({ status: true, message: "data deleted successfully" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getMalgo = async (req, res) => {
    try {
        let getSiteInfo = await malgo.find({}).sort({ _id: -1 })
        if (getSiteInfo) {
            res.json({ status: true, message: " Get data successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
}

exports.deleteLead = async (req, res) => {
    try {
        const { id } = req.body
        let getSiteInfo = await contactUs.findOne({ _id: id })
        if (getSiteInfo) {
            const deletedata = await contactUs.updateOne({ _id: id }, { leadType: "deletedLeads" });
            if (deletedata) {
                res.json({ status: true, message: "data deleted successfully" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }

}



//-------------------------------


exports.createProjects = async (req, res) => {
    try {
        const { title, skillLevel, location, budget, coins, deliveryTime, timeAgo, description, category1, category2 } = req.body;
        if (title && skillLevel && location && budget && coins && deliveryTime && description && category1 && category2) {
            const isData = await projects.create(req.body)
            if (isData) {
                return res.json({ status: true, data: "Project Created Successfully" });
            }
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.updateProjects = async (req, res) => {
    try {

        const { title, skillLevel, location, budget, coins, deliveryTime, timeAgo, id, category1, category2, description } = req.body;
        const isData = await projects.findOne({ _id: id })
        if (isData) {
            await projects.updateOne({ _id: id }, { title: title, description: description, skillLevel: skillLevel, location: location, budget: budget, coins: coins, deliveryTime: deliveryTime, timeAgo: timeAgo, category1: category1, category2: category2 })
            return res.json({ status: true, data: "Project Updated Successfully" });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteProjects = async (req, res) => {
    try {
        const { id } = req.body;
        const isData = await projects.findOne({ _id: id })
        if (isData) {
            await projects.deleteOne({ _id: id })
            return res.json({ status: true, data: "Project deleted Successfully" });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getProjects = async (req, res) => {
    try {
        const getProjects = await projects.find({}).sort({ _id: -1 })
        if (getProjects) {
            return res.json({ status: true, data: getProjects });
        } else {
            return res.json({ status: false, message: "No data found" });
        }
    } catch (error) {
        return res.json({ status: false, message: "Something went wrong" });
    }
}

exports.getSingleProjects = async (req, res) => {
    try {
        const { id } = req.body
        let getprojects = await projects.findOne({ _id: id }).sort({ _id: -1 })
        if (getprojects) {
            res.json({ status: true, message: "projects information successfully", data: getprojects })
        } else {
            res.json({ status: false, message: "Cannot get projects information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
}

exports.getSingleProjectsOverview = async (req, res) => {
    try {
        const { id } = req.body
        let getprojects = await projects.findOne({ _id: id })
        const applicantEmails = getprojects.applicants.map(applicant => applicant.email);
        const userDetails = await user.find({ email: { $in: applicantEmails } });
        if (getprojects) {
            res.json({ status: true, message: "projects information successfully", data: getprojects, userDetails: userDetails })
        } else {
            res.json({ status: false, message: "Cannot get projects information" })
        }
    } catch (error) {
        res.json({ status: true, message: error.message })
    }
}

exports.projectsHistory = async (req, res) => {
    try {
        const getfreelanceProject = await freelanceProject.find({}).sort({ _id: -1 })
        if (getfreelanceProject) {
            return res.json({ status: true, data: getfreelanceProject });
        } else {
            return res.json({ status: false, message: "No data found" });
        }
    } catch (error) {
        return res.json({ status: false, message: "Something went wrong" });
    }
}

exports.updateRev = async (req, res) => {
    try {
        const { id, email } = req.body;
        const getprojects = await projects.findOne({ _id: id });
        if (!getprojects) {
            return res.json({ status: false, message: "Project not found" });
        }
        const applicantDetails = getprojects.applicants.find(
            (applicant) => applicant.email === email
        );
        if (!applicantDetails) {
            return res.json({
                status: false,
                message: "Applicant not found for the given email",
            });
        }
        return res.json({
            status: true,
            message: "Applicant details fetched successfully",
            data: applicantDetails,
        });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};

exports.updateRevisionsTakeOrReject = async (req, res) => {
    try {
        const { id, email, type, pendingRevisions, reason } = req.body;
        const getprojects = await projects.findOne({ _id: id });
        if (!getprojects) {
            return res.json({ status: false, message: "Project not found" });
        }
        const applicantIndex = getprojects.applicants.findIndex(
            (applicant) => applicant.email === email
        );
        if (applicantIndex === -1) {
            return res.json({
                status: false,
                message: "Applicant not found for the given email",
            });
        }
        if (type === "Reject") {
            await projects.updateOne(
                { _id: id, "applicants.email": email },
                {
                    $set: {
                        "status": "New",
                        "applicants.$.isAccepted": "Reject",
                        "applicants.$.reason": reason,
                    },
                }
            );
            return res.json({
                status: true,
                message: "Project status updated to 'New' and applicant's isAccepted set to 'Reject'",
            });
        }
        if (type === "Revise" && pendingRevisions) {
            await projects.updateOne(
                { _id: id, "applicants.email": email },
                {
                    $set: {
                        "applicants.$.reason": reason,
                        "applicants.$.pendingRevisions": pendingRevisions,
                    },
                }
            );
            return res.json({
                status: true,
                message: `Revisions take updated to ${revisionsTake} for applicant ${email}`,
            });
        }
        return res.json({
            status: false,
            message: "Invalid type or no changes required",
        });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};

exports.projectApprovers = async (req, res) => {
    try {
        const { id, type, applicantId, reason } = req.body;
        const project = await projects.findOne({ _id: id });
        if (!project) {
            return res.json({ status: false, message: "Project not found" });
        }

        if (type === "Approved") {
            await projects.updateOne(
                { _id: id, "applicants._id": applicantId },
                { $set: { "applicants.$.isAccepted": type } }
            );
            await projects.updateOne({ _id: id }, { status: type, isProjectStatus: type });
            return res.json({ status: true, message: `Applicant's status ${type} successfully` });
        }

        else if (type === "Reject") {
            await projects.updateOne(
                { _id: id, "applicants._id": applicantId },
                { $set: { "applicants.$.isAccepted": type } }
            );
            await projects.updateOne({ _id: id }, { isProjectStatus: type });
            return res.json({ status: true, message: `Applicant's status ${type} successfully` });
        }

        else if (type === "Completed") {
            await projects.updateOne(
                { _id: id, "applicants._id": applicantId },
                { $set: { "applicants.$.isAccepted": type } }
            );
            await projects.updateOne({ _id: id }, { status: type, isProjectStatus: type });
            return res.json({ status: true, message: `Applicant's status ${type} successfully` });
        }

        else if (type === "Revision") {
            await projects.updateOne(
                { _id: id, "applicants._id": applicantId },
                { $set: { "applicants.$.isAccepted": type, "applicants.$.reason": reason } }
            );
            await projects.updateOne({ _id: id }, { isProjectStatus: type });
            return res.json({ status: true, message: `Applicant's status ${type} successfully` });
        }

        else if (type === "RejectReason") {
            await projects.updateOne(
                { _id: id, "applicants._id": applicantId },
                { $set: { "applicants.$.reason": reason } }
            );
            await projects.updateOne({ _id: id }, { isProjectStatus: type });
            return res.json({ status: true, message: `Applicant's status ${type} successfully` });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }

    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};

exports.history = async (req, res) => {
    try {
        const { type } = req.body;
        const details = await freelanceProject.find({ type: type })
        if (details) {
            return res.json({ status: true, data: details })
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}

//------------------------Competitions

exports.getCompetitions = async (req, res) => {
    try {
        const details = await Competition.find().sort({ _id: -1 })
        if (details) {
            return res.json({ status: true, data: details })
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};

exports.createCompetitions = async (req, res) => {
    try {

        const value = req.body;
        const details = await Competition.create(value)
        if (details) {
            return res.json({ status: true, message: "Created successfully" });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};

exports.getSingleCompetitions = async (req, res) => {
    try {
        const { id } = req.body
        let getprojects = await Competition.findOne({ _id: id })
        if (getprojects) {
            res.json({ status: true, message: "projects information successfully", data: getprojects })
        } else {
            res.json({ status: false, message: "Cannot get projects information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
};

exports.deleteCompetitions = async (req, res) => {
    try {
        const { id } = req.body;
        const isData = await Competition.findOne({ _id: id })
        if (isData) {
            await Competition.deleteOne({ _id: id })
            return res.json({ status: true, data: "Project deleted Successfully" });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
};

exports.updateCompetitions = async (req, res) => {
    try {

        const { dpCoin, id, title, type, Category1, Category2, WinningAmount, overview, details, rewards, timeline, judgingCriteria, toParticipate, Deadline, allowedEntries, totalJoined, isAgree, status, page_from_url, leadType } = req.body;
        const isData = await Competition.findOne({ _id: id })
        if (isData) {
            const isData = await Competition.updateOne({ _id: id }, { title: title, type: type, Category1: Category1, Category2: Category2, WinningAmount: WinningAmount, dpCoin: dpCoin, overview: overview, details: details, rewards: rewards, timeline: timeline, judgingCriteria: judgingCriteria, toParticipate: toParticipate, Deadline: Deadline, allowedEntries: allowedEntries, totalJoined: totalJoined, isAgree: isAgree, status: status, page_from_url: page_from_url, leadType: leadType })
            return res.json({ status: true, data: "Project Updated Successfully" });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
};

exports.competitionsApprove = async (req, res) => {
    try {
        const { id, approvedApplicantEmail } = req.body;
        const isData = await Competition.findOne({ _id: id });
        if (!isData) {
            return res.json({ status: false, message: "Competition not found" });
        }
        const applicants = isData.applicants;
        let updatedApplicants = applicants.map(applicant => {
            if (applicant.email === approvedApplicantEmail) {
                applicant.isAccepted = "Accepted";
            } else {
                applicant.isAccepted = "Rejected";
            }
            return applicant;
        });
        await Competition.updateOne({ _id: id }, { applicants: updatedApplicants });
        return res.json({ status: true, data: "Competition updated successfully, and applicants have been updated." });
    }
    catch (error) {
        return res.json({ status: false, message: error.message });
    }

};

exports.getfeeManagement = async (req, res) => {
    try {
        const details = await feemanagement.find().sort({ _id: -1 })
        if (details) {
            return res.json({ status: true, data: details })
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}

exports.getSinglefeeManagement = async (req, res) => {
    try {
        const { id } = req.body
        let getprojects = await feemanagement.findOne({ _id: id })
        if (getprojects) {
            res.json({ status: true, message: "projects information successfully", data: getprojects })
        } else {
            res.json({ status: false, message: "Cannot get projects information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
}

exports.updatefeeManagement = async (req, res) => {
    try {
        const { type, status, id, fee } = req.body;
        const isData = await feemanagement.findOne({ _id: id })
        if (isData) {
            await feemanagement.updateOne({ _id: id }, { status: status, type: type, fee: fee })
            return res.json({ status: true, data: "Project Updated Successfully" });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}