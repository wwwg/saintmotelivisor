const request = require('request'),
	nodemailer = require('nodemailer'),
	EMAIL_ADDR = 'joseph.goolag@gmail.com',
	EMAIL_PASS = 'goolag66',
	CONCERT_QUERY_ENDPOINT = `https://api.songkick.com/api/3.0/artists/609071/calendar/managed_performances.json?apikey=heMLjOnXj1zuWDXP&per_page=all`,
	DEFAULT_QUERY_INTERVAL = 5000, // in ms
	transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: EMAIL_ADDR,
			pass: EMAIL_PASS
		}
	});
let email = (to, subject, body) => {
	let opts = {
		'from': EMAIL_ADDR,
		'to': to,
		'subject': subject,
		'text': body
	}
	transport.sendMail(opts,(err, info) => {
		if (error) {
			console.log('ERROR sending email:');
			console.log(err);
		}
	});
}
let reqInterval = 0,
	isRequestInProgress = false,
	lastBody = null;
if (!process.argv[2]) {
	console.log('missing argument! usage:');
	console.log('node saintmotelivisor.js <recipient email>');
	process.exit(0);
}
if (process.argv[3]) {
	if (!isNaN(parseInt(process.argv[3]))) {
		reqInterval = parseInt(process.argv[3]);
	} else {
		reqInterval = DEFAULT_QUERY_INTERVAL;
	}
} else {
	reqInterval = DEFAULT_QUERY_INTERVAL;
}
const TO = process.argv[2];

setInterval(() => {
	if (isRequestInProgress) {
		console.log('WARN: skipping request cycle because prior request isn\'t complete');
		return;
	}
	isRequestInProgress = true;
	request(CONCERT_QUERY_ENDPOINT, (err, res, body) => {
		if (lastBody === null) {
			console.log('recieved initial body:');
			console.log(body);
			lastBody = body;
		} else if (body == lastBody) {
			console.log('recieved identical body, nothing special has occured.');
		} else if (body != lastBody) {
			console.log('change detected, emailing recipient');
			email(TO, 'Saint Motel Concert Update',
					'Saint Motel concert times have been updated, check their site.');
		}
		isRequestInProgress = false;
	});
}, reqInterval);