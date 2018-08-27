#!/usr/bin/env node

require('daemon')();
const cluser = require('cluster'),
	config = require('./daemon-config.json'),
	cpus = require('os').cpus().length;

let mkworker = () => {
	if (cluster.isMaster) {
		let child = cluster.fork();
		child.on('exit', (code, signal) => {
			mkworker();
		});
	} else {
		let saintmotelivisor = require('./saintmotelivisor');
	}
}, mkworkers => n => {
	while (--n > 0) mkworker();
}