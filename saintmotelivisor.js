const request = require('request'),
	nodemailer = require('nodemailer'),
	EMAIL_ADDR = 'joseph.goolag@gmail.com',
	EMAIL_PASS = 'goolag66',
	CONCERT_QUERY_ENDPOINT = `https://api.songkick.com/api/3.0/artists/609071/calendar/managed_performances.json?apikey=heMLjOnXj1zuWDXP&per_page=all`,
	DEFAULT_QUERY_INTERVAL = 1000, // in ms
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
let reqInterval = 0;
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
let lastBody = null;
setInterval(() => {
	// todo
}, reqInterval);