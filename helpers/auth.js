
const { jwtSecretKey } = require('../config/config');
const jwt = require('jsonwebtoken')
const secretKey = jwtSecretKey;
const speakeasy = require("speakeasy")
const qrcode = require('qrcode')
const { encrypt, decrypt } = require('./common')

const site_data = {
	sitename: "ZacroTribe"
}

exports.checkAuthToken = (req, res, next) => {
	try {
		let userToken = req.headers['x-access-token'] || req.headers['authorization'];
		if (typeof userToken != 'undefined' && userToken != null && userToken != '') {
			return this.verifyUserAuthToken(req, res, next)
		} else {
			res.json({ status: false, statusCode: 440, message: "Unauthorized request" });
			res.end();
		}
	} catch (err) {
		console.error(err)
	}
}

exports.verifyUserAuthToken = async (req, res, next) => {
	try {
		let userToken = req.headers['x-access-token'] || req.headers['authorization'];
		if (typeof userToken != 'undefined' && userToken != null && userToken != '') {
			let splitToken = userToken.split(' ')[0];
			let tokenRes = jwt.verify(splitToken, secretKey)
			if (tokenRes) {
				// req.userAddress = tokenRes.email ? decrypt(tokenRes.email) : tokenRes.userID ? encrypt(tokenRes.userID) : ""
				req.userAddress = tokenRes.email||""
				next();
			} else {
				res.json({ status: false, statusCode: 440, message: "Session expired" });
				res.end();
			}
		}
		else {
			res.json({ status: false, statusCode: 401, message: "Unauthorized request!" });
			res.end();
		}
	} catch (err) {
		res.json({ status: false, statusCode: 440, message: "Unauthorized request" });
		res.end();
	}
}

module.exports.create_JWT = (data) => {
	return jwt.sign(data, secretKey, { expiresIn: '1d' });
}

module.exports.reset_URL = (data) => {
	return jwt.sign(data, secretKey, { expiresIn: '5m' });
}

module.exports.reset_verify = (resetToken) => {
	return jwt.verify(resetToken, secretKey)
}

module.exports.generateTFA = async (email) => {
	let data = { issuer: site_data.sitename, name: `${site_data.sitename} (${email})`, length: 10 };
	let secret = await speakeasy.generateSecret(data);
	let url = await speakeasy.otpauthURL({ secret: secret.base32, label: email, issuer: site_data.sitename, encoding: 'base32' })
	let createdQR = await qrcode.toDataURL(url)
	if (createdQR) {
		return { tempSecret: secret.base32, dataURL: createdQR, otpURL: secret.otpauth_url }
	} else {
		return null
	}
}

module.exports.verifyTFA = async (code, secret) => {
	return speakeasy.totp.verify({ secret: secret, encoding: 'base32', token: code, window: 6 });
}

module.exports.getIPAddress = async (request) => {
	let ip = request.headers['x-forwarded-for'] ||
		request.connection.remoteAddress ||
		request.socket.remoteAddress ||
		request.connection.socket.remoteAddress;
	ip = ip.split(',')[0];
	ip = ip.split(':').slice(-1); 
	return ip[0];
}

module.exports.checkdisposable = (req, res, next) => {
	let values = req.body
	if (values.type == 'Email') {
		let checkfordisposable = String(values.email).split(
			"@"
		)[1];
		if (disposableMails.includes(checkfordisposable)) {
			return res.json({
				status: 432,
				message: "Register user mail not allowed!!!",
			});
		} else {
			next()
		}
	} else {
		next()
	}
}



