const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const trimRequest = require('trim-request');
const fs = require('fs');
const helmet = require("helmet");
const path = require("path");
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const { ValidationError } = require('express-validation');
const config = require('./config/config');
const port = config.port || 8000;

require('./config/db');

app.use(helmet());

let server;
// if (process.env.NODE_ENV === 'local' || typeof process.env.NODE_ENV === 'undefined') {
	const http = require('http');
	server = http.createServer(app);
// } else {
	// const options = {
	// 	key: fs.readFileSync("/path/to/your/ssl/key"),
	// 	cert: fs.readFileSync("/path/to/your/ssl/cert")
	// };
	// server = require('https').Server(
		// options,
		// app);
// }

app.use(cookieParser());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trimRequest.all);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Feature-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()');
	res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()');
	res.clearCookie('__cfduid');
	next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trimRequest.all);







app.get('/', (_req, res) => {
	res.status(200).json({
		status: true,
		message: 'Backend is Running..'
	});
});

app.use('/v1', require('./routes'));

app.use(express.static('./public'));

app.use((err, _req, res, _next) => {
	if (err instanceof ValidationError) {
		return res.status(200).json({
			status: false,
			statusCode: err.statusCode,
			message: err.details.body ? err.details.body[0].message.replace(/"/g, '') : err.details.query[0].message.replace(/"/g, ''),
			error: err.message
		});
	}
	return res.status(500).json(err);
});

app.get('/v1/logsPm2', (req, res) => {
	const file = path.join(__dirname, './logs/combined.outerr.log');
	res.download(file);
});

app.get('/v1/logsclear', (req, res) => {
	const file = path.join(__dirname, './logs/combined.outerr.log');
	fs.writeFile(file, '', err => {
		if (err) return res.status(500).json({ status: false, message: "Error clearing logs" });
		res.json({ status: true, message: "Logs cleared successfully" });
	});
});

server.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
