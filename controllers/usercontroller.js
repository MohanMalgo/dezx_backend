
const { encrypt, getIPAddress, decrypt, bcrypt, bcryptCompare, getImageDimensions, uploadAssetInS3, uploadAssetInCloudinary, generateReferralCode, compareCredentials } = require('../helpers/common');
const { adduser, contactUs, cerateTags, blogs, category, job, SubscribeUs, sitemap, sitemapcategory, testleads, projects, userProject, Competition, user, depositWithdraw, feemanagement, usercompetion } = require("../helpers/collections");
const { findOne, deleteOne, findWithCount, findOneAndUpdate, find, create, updateMany, updateOne } = require('../helpers/query-helper');
const sendResponse = require('../helpers/response');

const async = require('async');
const UAParser = require('ua-parser-js');
const categoryModel = require('../model/category.model');
const Stripe = require('stripe');
const { create_JWT, verifyTFA, generateTFA, reset_URL, reset_verify } = require('../helpers/auth');
const projectsModel = require('../model/projects.model');
const freelanceProject = require('../model/freelanceProject');
const { createRazorpayOrder, verifyRazorpaySignature } = require('../config/payments');
// import { verifyRazorpaySignature } from '../config/payments';
const nodemailer = require('nodemailer');
const { sendEmail } = require('../helpers/smtp');
const emailTemp = require('../model/emailTemp');

//-----------.razorpay--------------

//  Key Id - rzp_test_xo2JGVEilKGkxQ
//  Key Secret- O0biBhaxEcf3lD0akSPmV01S
//  Merchant ID - PkURR53Iv60oDv


// service: 'Zoho',  // Zoho supports Nodemailer directly
// host: 'smtp.zoho.com',
// port: 587,  // Use 465 for SSL or 587 for TLS
// secure: false,  // Set to true if using SSL (port 465)
// auth: {
//   user: 'mohan@malgotechnologies.com',  // Your Zoho email
//   pass: 'yourpassword'  // Your Zoho email password or app-specific password
// }


exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await user.findOne({ email });
        if (!users) {
            return res.json({ status: false, message: "Invalid email or password" });
        }
        if (users.isVerified === false) {
            return res.json({ status: false, message: "Verify your email" });
        }
        const isPasswordValid = (password == users.password)
        if (!isPasswordValid) {
            return res.json({ status: false, message: "Invalid email or password" });
        }
        const token = create_JWT({ id: users._id, email: users.email });
        if (token) {
            const userUpdate = await user.updateOne({ email: email }, { isLogin: true })
        }
        return res.json({
            status: true, message: "Sign-in successful",
            data: {
                token, email
            }
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.signUp = async (req, res) => {
    const { email, password, name, not_A_US, notifications, referral, referralCode } = req.body;
    try {
        const userExists = await user.countDocuments({ email });
        if (userExists > 0) {
            return res.json({ status: false, message: "Email is already registered" });
        }
        let referrer;
        if (referralCode) {
            let referrerId = await user.findOne({ referralCode }, { _id: 1 });
            referrer = referrerId?._id;
        }
        const otp = generateReferralCode();
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 2);
        const newUser = new user({
            email,
            name,
            otp,
            not_A_US,
            password,
            otpExpiration,
            referral,
            notifications,
            referralCode: generateReferralCode(),
            memberID: "DEZX" + generateReferralCode(),
        });
        await sendEmail(email, "Welcome to Dezx Community", "Your registration is successful.", null, name, otp);
        await newUser.save();
        return res.json({ status: true, message: "Registered successfully" });
    } catch (error) {
        res.json({ status: false, message: "Internal server error", error: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const userz = await user.findOne({ email });
        if (!userz) {
            return res.json({ status: false, message: "User not found" });
        }
        if (userz.otp !== otp) {
            return res.json({ status: false, message: "Invalid OTP" });
        }
        const currentTime = new Date();
        if (currentTime > new Date(userz.otpExpiration)) {
            return res.json({ status: false, message: "OTP has expired" });
        }
        await user.updateOne({ email: email }, { $set: { isVerified: true } });
        return res.json({ status: true, message: "OTP verified successfully" });
    } catch (error) {
        return res.json({ status: false, message: "Internal server error", error: error.message });
    }
};

exports.regenerateOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const userz = await user.findOne({ email });
        if (!userz) {
            return res.json({ status: false, message: "User not found" });
        }
        const currentTime = new Date();
        if (currentTime > new Date(userz.otpExpiration)) {
            const newOtp = generateReferralCode();
            const newOtpExpiration = new Date();
            newOtpExpiration.setMinutes(newOtpExpiration.getMinutes() + 2);
            await user.updateOne(
                { email: email },
                {
                    $set: {
                        otp: newOtp,
                        otpExpiration: newOtpExpiration,
                    }
                }
            );
            const mailRes = await sendEmail(email, "Your OTP has been regenerated", "Here is your new OTP: ", null, "", newOtp);
            console.log("mailResdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", mailRes);
            return res.json({ status: true, message: "OTP has expired. A new OTP has been sent to your email." });
        } else {
            return res.json({ status: false, message: "Your OTP is still valid. Please use the existing OTP." });
        }

    } catch (error) {
        return res.json({ status: false, message: "Internal server error", error: error.message });
    }
};

exports.oAuth = async (req, res) => {
    try {
        const { email, name, referralCode } = req.body;
        let userId;
        try {
            const userExists = await user.findOne({ email });
            if (!userExists) {
                let referrer;
                if (referralCode) {
                    let referrerId = await user.findOne(
                        { referralCode },
                        { _id: 1 }
                    );
                    referrer = referrerId?._id
                }
                const newUser = new user({
                    name,
                    email,
                    referrer,
                    isOAuth: true,
                    referralCode: generateReferralCode(),
                    memberID: "DEZX" + generateReferralCode(),
                });
                await newUser.save();
                userId = newUser._id;
            } else {
                userId = userExists._id;
            }
            const token = create_JWT({ id: userId, email });
            const userUpdate = await user.updateOne({ email: email }, { isLogin: true })
            res.json({
                status: true,
                message: "Loggedin successfully",
                data: {
                    token, email
                }
            });
        } catch (error) {
            res.json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    } catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
};

exports.logout = async (req, res) => {
    try {
        const email = req.userAddress;
        const userUpdate = await user.updateOne({ email: email }, { isLogin: false })
        if (userUpdate) {
            return res.json({ status: true, message: "Logged out successfully" });
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
}

exports.getUserOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const isUser = await user.findOne(
            { email: email },
            { password: 0, __v: 0, _id: 0 }
        ).sort({ _id: -1 });
        if (isUser) {
            return res.json({ status: true, data: isUser });
        }
    } catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
};

exports.getUser = async (req, res) => {
    try {
        const email = req.userAddress;
        const isUser = await user.findOne(
            { email: email },
            { password: 0, __v: 0, _id: 0 }
        ).sort({ _id: -1 });
        if (!isUser) {
            return res.json({ status: false, message: "No user data found" });
        }
        const projects = await projectsModel.find({
            "applicants.email": email
        });
        const a = projects?.filter(o => o.applicants)
        const userApplications = projects.map(project => {
            const applicant = project.applicants.find(applicant => applicant.email === email);
            return {
                projectId: project._id,
                projectName: "",
                applicant
            };
        });
        const userData = {
            userInfo: isUser,
            applications: userApplications
        };
        return res.json({ status: true, data: userData });
    } catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
};

exports.productsFormUpdate = async (req, res) => {
    try {
        const { id, proposalcost, revisionsTake, type, message, projectURL } = req.body;
        const email = req.userAddress;
        const project = await projectsModel.findOne({ _id: id });
        if (type === "latest") {
            if (project) {
                const alreadyApplied = project.applicants.some(applicant => applicant.email === email);
                if (alreadyApplied) {
                    return res.json({ status: false, message: "User has already applied for this proposal" });
                }
                const newApplicant = { email, proposalCost: proposalcost, pendingRevisions: revisionsTake, revisionsTake: revisionsTake };
                const updateData = await projectsModel.updateOne(
                    { _id: id },
                    { $push: { applicants: newApplicant }, $set: { isProjectStatus: "proposed" } }
                );
                if (updateData) {
                    await freelanceProject.create({ email: email, proposalCost: proposalcost, revisionsTake: revisionsTake, pendingRevisions: revisionsTake, isAccepted: "0", type: "freelance" })
                    return res.json({ status: true, message: "proposal Submited Successfully" });
                }
                else {
                    return res.json({ status: false, message: "Data Not Updated" });
                }
            } else {
                return res.json({ status: false, message: "Project Not Found" });
            }
        }
        else if (type === "Approved" || type === "Revision") {
            try {
                const project = await projectsModel.findOne({ _id: id, "applicants.email": email }, { "applicants.$": 1 });
                if (!project || project.applicants.length === 0) {
                    return res.json({ status: false, message: "No matching applicant found." });
                }
                const applicant = project.applicants[0];
                const { pendingRevisions, revisionsTake } = applicant;
                if (pendingRevisions - 1 < 0) {
                    return res.json({ status: false, message: "Cannot have negative revisions." });
                }
                const updateData = await projectsModel.updateOne(
                    {
                        _id: id,
                        "applicants.email": email
                    },
                    {
                        $inc: { "applicants.$.pendingRevisions": -1 },
                        $set: {
                            "applicants.$.isAccepted": "FileReview",
                            isProjectStatus: "Revision",
                            "applicants.$.message": message,
                            "applicants.$.projectURL": projectURL
                        }
                    }
                );
                if (updateData.modifiedCount > 0) {
                    return res.json({ status: true, message: "Project status updated successfully" });
                } else {
                    return res.json({ status: false, message: "No document found with the specified ID or no change needed." });
                }
            } catch (error) {
                return res.json({ status: false, message: "An error occurred while updating the document." });
            }
        }
    } catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
};

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

exports.getProjectsByEmail = async (req, res) => {
    try {
        const email = req.userAddress;
        const projects = await projectsModel.find({
            "applicants.email": email
        });
        if (projects) {
            return res.json({ status: true, data: projects });
        } else {
            return res.json({ status: false, message: "No data found" });
        }
    } catch (error) {
        return res.json({ status: false, message: "Something went wrong" });
    }
}

exports.getSingleProject = async (req, res) => {
    try {
        const { id } = req.body
        const getProjects = await projects.findOne({ _id: id })
        if (getProjects) {
            return res.json({ status: true, data: getProjects });
        } else {
            return res.json({ status: false, message: "No data found" });
        }
    } catch (error) {
        return res.json({ status: false, message: "Something went wrong" });
    }
}

exports.createProjectByUser = async (req, res) => {
    try {
        const { companyOrganization, companyWebsite, jobtitle, employementType, jobDescription, budget, applyvia } = req.body;
        const email = req.userAddress;
        if (email) {
            const newProject = {
                companyOrganization,
                companyWebsite,
                jobtitle,
                employementType,
                jobDescription,
                budget,
                applyvia,
                email,
            };
            await userProject.create(newProject);
            return res.json({ status: true, message: "Project created successfully" });
        }
    }
    catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
}

//deposit withdraw

exports.withdrawDPcoin = async (req, res) => {
    try {
        const { withdrawMessage, coin, id } = req.body;
        const email = req.userAddress;
        const usera = await user.findOne({ email: email })
        if (!usera) {
            return res.json({ status: false, message: "No user data found" });
        }
        await projects.updateOne(
            { _id: id, "applicants.email": email },
            {
                $set: {
                    "applicants.$.withdrawMessage": withdrawMessage,
                    "applicants.$.withdrawStatus": true,
                },
            }
        );
        await user.updateOne(
            { email: email },
            {
                $inc: {
                    dpCoin: coin,
                    withdrableDPcoin: coin,
                },
            }

        );
        return res.json({ status: true, message: "Coins successfully updated" });
    } catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
};

exports.withdraw = async (req, res) => {
    try {
        const {
            amount,
            accountNumber,
            confirmAccountNumber,
            ifsc,
            types,
            paypalId,
        } = req.body;
        const email = req.userAddress;
        if (!amount || amount <= 0) {
            return res.json({ status: false, message: "Invalid withdrawal amount!" });
        }
        if (accountNumber !== confirmAccountNumber) {
            return res.json({ status: false, message: "Account numbers do not match!" });
        }
        const userData = await user.findOne(
            { email: email },
            { dpCoin: 1, withdrableDPcoin: 1, withdrawStatus: 1, email: 1, memberID: 1 }
        );
        if (!userData) {
            return res.json({ status: false, message: "User not found!" });
        }
        if (userData.withdrableDPcoin <= 0) {
            return res.json({ status: false, message: "Insufficient balance!" });
        }
        if (amount > userData.withdrableDPcoin) {
            return res.json({ status: false, message: "Withdrawal amount exceeds available balance!" });
        }
        else {
            const feemanagementz = await feemanagement.findOne({ type: "withdraw" })
            const apiFEE = Number(feemanagementz?.fee) || 0
            const fee = Number(amount) / 100 * apiFEE
            const updateAmount = amount - fee
            if (types === "toAccount") {
                await user.updateOne(
                    { email: email },
                    {
                        $inc: {
                            dpCoin: -updateAmount,
                            withdrableDPcoin: -updateAmount,
                        },
                    }
                );
                const obj = {
                    email: email,
                    accountNumber: accountNumber,
                    ifsc: ifsc,
                    amount: updateAmount,
                    type: "withdraw",
                    memberID: userData?.memberID,

                }
                await depositWithdraw.create(obj)
                return res.json({ status: true, message: "Withdrawal successful!" });
            }
            else {
                await user.updateOne(
                    { email: email },
                    {
                        $inc: {
                            dpCoin: -updateAmount,
                            withdrableDPcoin: -updateAmount,
                        },
                    }
                );
                const obj = {
                    email: email,
                    amount: updateAmount,
                    type: "withdraw",
                    memberID: userData?.memberID,
                    paypalId: paypalId
                }
                await depositWithdraw.create(obj)
                return res.json({ status: true, message: "Withdrawal successful!" });
            }
        }
    } catch (error) {
        return res.json({ status: false, message: "Internal Server Error" });
    }
};


//depositWithdraw
//Competitions


exports.getCompetitions = async (req, res) => {
    try {
        const val = req.body;
        console.log("val", val)
        const details = await Competition.find({ type: val.type }).sort({ _id: -1 })
        console.log("details", details)

        if (details) {
            return res.json({ status: true, data: details })
        } else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}

exports.getCompetitionsByEmail = async (req, res) => {
    try {
        const { id } = req.body;
        const email = req.userAddress;
        const competitions = await Competition.find().sort({ _id: -1 });
        console.log("competitions", competitions)
        if (competitions.length > 0) {
            // Filter competitions where applicants' email is "mohan@gmail.com"
            const filteredCompetitions = competitions.filter(comp =>
                comp.applicants.some(applicant => applicant.email === email)
            );

            if (filteredCompetitions.length > 0) {
                return res.json({ status: true, data: filteredCompetitions });
            } else {
                return res.json({ status: false, message: "No competitions found for the provided email" });
            }
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
        let getprojects = await Competition.findOne({ _id: id }).sort({ _id: -1 })
        if (getprojects) {
            return res.json({ status: true, message: "projects information successfully", data: getprojects })
        } else {
            return res.json({ status: false, message: "Cannot get projects information" })
        }
    } catch (error) {
        return res.json({ status: true, message: err.message })
    }
}

exports.addApplicantToCompetition = async (req, res) => {
    try {
        const { id, message, projectURL, isAgree } = req.body;
        const email = req.userAddress;
        const Competitions = await Competition.findOne({ _id: id });
        const alreadyApplied = Competitions.applicants.some(applicant => applicant.email === email);
        if (alreadyApplied) {
            return res.json({ status: false, message: "User has already applied for this proposal" });
        }
        const newApplicant = { email: email, message: message, projectURL: projectURL, isAgree: isAgree };
        const updateData = await Competition.updateOne(
            { _id: id },
            { $push: { applicants: newApplicant } }
        );
        if (updateData) {
            await freelanceProject.create({ email: email, message: message, projectURL: projectURL, isAgree: isAgree, type: "Competition" })
            return res.json({ status: true, message: "proposal Submited Successfully" });
        }
        else {
            return res.json({ status: false, message: "Data Not Updated" });
        }
    } catch (err) {
        return res.json({ status: true, message: err.message })
    }
};

exports.userCompetitions = async (req, res) => {
    try {
        const val = req.body;

        if (!val.categories || !val.companyname || !val.contestName || !val.deadline || !val.email || !val.fees || !val.phoneNumber || !val.taskDescription || !val.totalPrice) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(val.email)) {
            return res.json({ status: false, message: "Invalid email format." });
        }

        const a = await usercompetion.create(val);
        return res.json({ status: true, message: "Competition created successfully!", data: a, });

    } catch (error) {
        console.error(error);
        return res.json({ status: true, message: err.message })
    }
};

exports.purchaseCourseuser = async (req, res) => {
    try {
        const { amount, currency } = req.body
        const email = req.userAddress;
        const userz = await user.findOne({ email: email });
        if (!userz) {
            return res.status(400).json({
                status: false,
                message: "Course not found",
            })
        }
        const order = await createRazorpayOrder({ amount, currency })
        if (!order) {
            return res.status(400).json({
                status: false,
                message: "Payment failed",
            })
        }
        await depositWithdraw.create({
            amount,
            currency,
            email: email,
            type: "Deposit",
            orderId: order.id,
        })
        res.status(200).json({
            status: true,
            message: "Payment initiated successfully",
            data: {
                orderId: order.id,
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Payment failed",
            error: error.message,
        });
    }
};

exports.confirmPurchase = async (req, res) => {
    try {
        const { name, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body
        const email = req.userAddress;
        const order = await depositWithdraw.findOne({ orderId: razorpayOrderId });
        if (!order) {
            return res.status(400).json({
                status: false,
                message: "Order not found",
            })
        }
        const verifySig = await verifyRazorpaySignature(req.body);
        if (!verifySig) {
            return res.status(400).json({
                status: false,
                message: "Payment veification failed",
            })
        }
        await depositWithdraw.updateOne(
            { orderId: razorpayOrderId },
            {
                name,
                status: true,
                paymentId: razorpayPaymentId,
                signature: razorpaySignature,
                type: "Deposit"
            }
        );
        await user.updateOne({ email: email }, { $inc: { dpCoin: order.amount, withdrableDPcoin: order.amount } })
        res.status(200).json({
            status: true,
            message: "Payment verified successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Payment verification failed",
            error: error.message,
        });
    }
};

exports.abcd = async (req, res) => {
    try {
        const value = req.body;
        await user.create(value)
        return res.json({ status: true, message: "proposal Submited Successfully" });
    } catch (error) {
        return res.json({ status: false, message: "Something went wrong" });

    }
}


















exports.malgopreDATA = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email && !name) {
            return res.json({ status: false, message: "Fill All Fields" });
        } else {
            const ipAddress = await getIPAddress(req)
            return sendResponse(res, await create('malgo', { name: name, email: email, ipAddress: ipAddress }))
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
};

exports.siteMap = async (req, res) => {
    try {
        const siteMapblogs = await sitemap.find({ siteMapStatus: true }, { siteMapStatus: 1, changefreq: 1, priority: 1, url: 1 });
        if (siteMapblogs) {
            return res.json({ status: true, data: siteMapblogs });
        }
    } catch (error) {
        return res.json({ status: false, message: "Something went wrong" });
    }
}

exports.sitemapcategory = async (req, res) => {
    try {
        const siteMapblogs = await sitemapcategory.find({ siteMapStatus: true }, { siteMapStatus: 1, changefreq: 1, priority: 1, url: 1 });
        if (siteMapblogs) {
            return res.json({ status: true, data: siteMapblogs });
        }
    } catch (error) {
        return res.json({ status: false, message: "Something went wrong" });
    }
}

exports.carear = async (req, res) => {
    try {
        const { country, position, email, fullName, mobileNumber, state, city, experienceLevel, linkedInProfile, hearAboutUs, resumeFile, coverFile, flexCheckDefault, availability } = req.body;
        if (!position || !email || !fullName || !mobileNumber || !state || !city || !experienceLevel || !linkedInProfile || !hearAboutUs || !resumeFile || !flexCheckDefault || !availability || !country) {
            return res.json({ status: false, message: "Fill All Fields" });
        } else {
            const ipAddress = await getIPAddress(req)
            return sendResponse(res, await create('carear', { position: position, email: email, fullName: fullName, mobileNumber: mobileNumber, state: state, city: city, experienceLevel: experienceLevel, linkedInProfile: linkedInProfile, hearAboutUs: hearAboutUs, resumeFile: resumeFile, coverFile: coverFile, flexCheckDefault: flexCheckDefault, availability: availability, ipAddress: ipAddress, country: country }))
        }
    } catch (error) {
        res.status(500).json({ message: 'Upload failed.', error: error.message });
    }
};

exports.getJob = async (req, res) => {
    try {
        let getSiteInfo = await job.find({})
        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: true, message: err.message })
    }
}
//subadmin
exports.create_user = async (req, res) => {
    let { department, loginName, email, password, status } = req.body
    try {
        let isExists = await adduser.findOne({ "email": encrypt(email) })
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
            return sendResponse(res, await create('adduser', datas))
        } else {
            res.json({ status: false, message: "Something went wrong" })
        }
    }
    catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.contactUs = async (req, res) => {
    try {
        const { name, email, country, number, social_media, page_from, service, sub_service, budget, message, social_media_number, device, page_from_url } = req.body
        if (req.body) {
            const ipAddress = await getIPAddress(req)
            const localIP = await findWithCount("testleads", { "ipAddress": ipAddress }, {})


            if (localIP.status) {
                let agent = req.headers['user-agent'];
                const parser = new UAParser(agent);
                const browser = parser.getBrowser();
                const os = parser.getOS();

                return sendResponse(res, await create('contactUs', { social_media_number: social_media_number, ipAddress: ipAddress, name: name, email: email, country: country, number: number, social_media: social_media, page_from: page_from, service: service, sub_service: sub_service, budget: budget, message: message, os: os.name, browserName: browser.name, device: device, page_from_url: page_from_url, leadType: "inValid" }))
            } else {
                let agent = req.headers['user-agent'];
                const parser = new UAParser(agent);
                const browser = parser.getBrowser();
                const os = parser.getOS();

                return sendResponse(res, await create('contactUs', { social_media_number: social_media_number, ipAddress: ipAddress, name: name, email: email, country: country, number: number, social_media: social_media, page_from: page_from, service: service, sub_service: sub_service, budget: budget, message: message, os: os.name, browserName: browser.name, device: device, page_from_url: page_from_url, leadType: "valid" }))
            }
        }
    } catch (error) {

        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.SubscribeUs = async (req, res) => {
    try {
        const { email, pageFrom } = req.body;
        let isUser = await SubscribeUs.findOne({ email: email })
        if (isUser) {
            return sendResponse(res, { status: false, message: "The email address already exists!" });
        }
        if (!email) {
            return sendResponse(res, { status: false, message: "Give All Details" });
        } else {
            let ipAddress = await getIPAddress(req)
            return sendResponse(res, await create('SubscribeUs', { pageFrom: pageFrom, email: email, ipAddress: ipAddress }))
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getUserMeta = async (req, res) => {
    try {
        let getSiteInfo = await cerateTags.find({})

        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const { blog_url } = req.body;
        let getblog = await blogs.findOne({ blog_url: blog_url })
        if (getblog) {
            return sendResponse(res, { status: true, data: getblog });
        } else {
            return sendResponse(res, { status: false, message: "no data found" });
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getBlogsCategory = async (req, res) => {
    try {
        const { blog_category_url } = req.body;
        let getblog = await blogs.find({ blog_category_url: blog_category_url })
        let getCat = await categoryModel.find({ categoryURL: blog_category_url })
        if (getblog) {
            return res.json({ status: true, data: getblog, cat: getCat });

            // return sendResponse(res, { status: true, data: getblog,cat: getCat });
        } else {
            return sendResponse(res, { status: false, message: "no data found" });
        }

    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getCategoryDetails = async (req, res) => {
    try {
        const { categoryURL } = req.body;
        let getblog = await categoryModel.findOne({ categoryURL: categoryURL })
        if (getblog) {
            return sendResponse(res, { status: true, data: getblog });
        } else {
            return sendResponse(res, { status: false, message: "no data found" });
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        let getSiteInfo = await blogs.find({}).sort({ _id: -1 })
        let categorys = await category.find({}).sort({ _id: -1 })
        if (getSiteInfo) {
            res.json({ status: true, message: "meta information successfully", data: getSiteInfo, category: categorys })
        } else {
            res.json({ status: false, message: "Cannot get site information" })
        }
    } catch (error) {
        res.json({ status: false, message: err.message })
    }
}

exports.getPage = async (req, res) => {
    try {
        const { page_url } = req.body;
        let getblog = await cerateTags.findOne({ page_url: page_url })

        if (getblog) {
            return sendResponse(res, { status: true, data: getblog });
        } else {
            return sendResponse(res, { status: false, message: "no data found" });
        }
    } catch (error) {
        return sendResponse(res, { status: false, data: error, message: error.message });
    }
}





