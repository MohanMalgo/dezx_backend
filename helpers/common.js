
const qrCode = require('qrcode');
const speakeasy = require("speakeasy");
const CryptoJS = require('crypto-js');
const { CRYPTOJS, bcryptSaltRounds, } = require('../config/config');
const key = CryptoJS.enc.Base64.parse(CRYPTOJS.Key);
const iv = CryptoJS.enc.Base64.parse(CRYPTOJS.Iv);
const aws = require('aws-sdk');
const fs = require("fs");
const bcrypt = require("bcryptjs")
const rateLimit = require('express-rate-limit');
const cloudinary = require('cloudinary');
const { default: axios } = require('axios');
const S3 = require('../config/config')

cloudinary.v2.config({
    cloud_name: 'dt5f0zsze',
    api_key: '362682186162327',
    api_secret: '_wRxH0j0SiTSgmIEurh-UdzuUAs'
});

exports.contactUsLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 3, 
    message: { 
        status: false, 
        message: 'Too many requests from this IP, please try again later.' 
    }
});

exports.uploadAssetInCloudinary = async (path, file, allowedFormats, _folder, _transformation, _oldfile = "") => {
    try {
        
        if (path && file && !allowedFormats.includes(file.mimetype.split('/')[1])) {
            return ({ status: false, message: 'image must be correct format' });
        }
        const result = await cloudinary?.uploader?.upload (path)
         if (result) {
            return result

        }

    } catch (error) {
        return error.message
    }

};

exports.compareCredentials = async (data, encryptedData) => {
    try {
        return bcrypt.compare(data, encryptedData);
    } catch (error) {
        throw error;
    }
};

exports.encrypt = (value) => {
    return CryptoJS.AES.encrypt(value, key, { iv }).toString();
}

console.log(this.encrypt("emailtemp"))


exports.decrypt = (value) => {
    let decipher = CryptoJS.AES.decrypt(value, key, { iv })
    return decipher.toString(CryptoJS.enc.Utf8);
}

exports.pkEncrypt = (value) => {
    return CryptoJS.AES.encrypt(value, { key: pkKey }, { iv: pkIv }).toString();
}

exports.pkDecrypt = (value) => {
    let decipher = CryptoJS.AES.decrypt(value, { key: pkKey }, { iv: pkIv })
    return decipher.toString(CryptoJS.enc.Utf8);
}

exports.bcrypt = async (value) => {
    return bcrypt.hash(value, bcryptSaltRounds)
}

exports.bcryptCompare = async (value, hash) => {
    return bcrypt.compare(value, hash)
}

exports.generateSecret = async () => {
    let secret = speakeasy.generateSecret({
        name: 'Unique One',
        length: 16
    });

    let tfaQr = await qrCode.toDataURL(secret.otpauth_url)

    return { tfaSecret: secret.base32, tfaQrCode: tfaQr }
}

exports.verifyTfaCode = (secret, tfaCode) => {
    return speakeasy.totp.verify({
        secret: secret, //secret of the logged in user
        encoding: 'base32',
        token: tfaCode
    });
}

exports.getIPAddress = (request) => {
    let ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;

    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip[0];
}

exports.uploadAssetInS3 = (path, file, allowedFormats, _folder, _transformation, _oldfile = "") => {

    try {
        return new Promise((resolve, reject) => {
            if (path) {
                if (file && !allowedFormats.includes(file.mimetype.split('/')[1])) {
                    resolve({ status: false, message: 'image must be correct format' });
                }

                let params = {
                    Bucket: this.decrypt(S3.bucket),
                    Body: path,
                    Key: file.name,
                    ContentType: file.mimetype.split('/')[1] == 'pdf' ? 'application/pdf' : 'contentType',
                    ContentDisposition: file.mimetype.split('/')[1] == 'pdf' ? 'attachment' : '',
                    ACL: 'public-read'
                };

                const s3 = new aws.S3({
                    accessKeyId: this.decrypt(S3.apiKey),
                    secretAccessKey: this.decrypt(S3.apiSecret)
                });

                s3.upload(params, (err, data) => {
                    if (err) {
                        console.error(err);
                        reject({ message: err.message });
                    } else {

                        resolve(data);
                    }
                });
            } else {
                reject({ message: 'Path is required' });
            }
        });
    } catch (error) {
    }

};

exports.covertEPowerToValueAndToFixed = (value, precision = 8) => {
    if ((0.9).toFixed() !== '1') {
        return value.toFixed(precision);
    }
    let pow = Math.pow(10, precision);
    return parseFloat((Math.round(value * pow) / pow).toFixed(precision));
}

exports.getLocation = async (ip) => {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        const locationData = response.data;
        return locationData;
    } catch (error) {
        console.error("Error fetching location data:", error.message);
        throw error;
    }
};

exports.generateReferralCode = function (length = 6) {
    const digits = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += digits[Math.floor(Math.random() * digits.length)];
    }
    return code;
};

