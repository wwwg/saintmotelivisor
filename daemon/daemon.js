const config = require("./config.json"),
	saintmotelivisor = require("../saintmotelivisor.js");
console.log("starting saintmotelivisord..");
saintmotelivisor(config.emails);