
const nodemailer = require('nodemailer');
const { emailtemp } = require('./collections');
const SMTP_HOST="smtp-relay.brevo.com"
const SMTP_PORT=587
const SMTP_USER="8436f7002@smtp-brevo.com"
const SMTP_PASS="CGKn8ySd4vgkQWj3"
const SMTP_FROM="developers.malgotech@gmail.com"

exports.sendEmail = async (to, subject, text, html = null, name, otp) => {
    console.log('sendEmail---------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX----------', to, subject, text, html, name, otp);
    try {
        const emailTemp = await emailtemp.findOne({ type: "signup" });
        if (!emailTemp) {
            throw new Error('Email template not found');
        }
        let emailHtml = emailTemp.temp;
        emailHtml = emailHtml.replace(/{{name}}/g, name  || 'Designer');  
        emailHtml = emailHtml.replace(/{{otp}}/g, otp);   
        const finalHtml =  emailHtml;
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });
        const mailOptions = {
            from: SMTP_FROM,
            to,
            subject,
            text,
            html: finalHtml,
        };
        const mailRes = await transporter.sendMail(mailOptions);
        return mailRes;
    } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
        throw error;  
    }
};




// const nodemailer = require('nodemailer');
// const common = require("../helpers/common")
// const { SMTP } = require('../config/config')

// const { emailTemplate, siteSetting } = require("../helpers/collections");


// exports.sendMail = async (to, tempName, specialVar, callback) => {
//     let tempContent = await emailTemplate.find({ "title": tempName })
//     let siteContent = await siteSetting.findOne({})

//     if (tempContent) {
//         if (siteContent != undefined) {
//             let siteInfo = {
//                 '###facebook###': siteContent.facebook,
//                 '###instagram###': siteContent.instagram,
//                 // '###youtube###': siteContent.youtube,
//                 '###twitter###': siteContent.twitter,
//                 '###linkedin###': siteContent.linkedin,
//                 '###telegram###': siteContent.telegram,
//                 '###discord###': siteContent.discord,
//             };


//             let specialVars = Object.assign(specialVar, siteInfo);
//             let subject = tempContent[0].subject;
//             let html = tempContent[0].template;


//             for (let key in specialVars) {
//                 if (specialVars.hasOwnProperty(key)) {
//                     subject = subject.replace(key, specialVars[key]);
//                     html = html.replace(key, specialVars[key])
//                 }
//             }
//             let mailOptions = {
//                 from: common.decrypt(SMTP.email),
//                 to: to,
//                 subject: subject,
//                 html: html
//             };

//             let transporter = nodemailer.createTransport({
//                 host: common.decrypt(SMTP.host),
//                 port: common.decrypt(SMTP.port),
//                 auth: {
//                     user: common.decrypt(SMTP.user),
//                     pass: common.decrypt(SMTP.password)
//                 }
//             });

//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     callback(false)
//                 } else {
//                     callback(true);
//                 }
//             });

//         }
//     }

// }







