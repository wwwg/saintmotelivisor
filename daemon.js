#!/usr/bin/env node

require('daemon')();
const cluser = require('cluster'),
	cpus = require('os').cpus().length;

let mkworker = () {
	if (cluster.isMaster) {
		let child = cluster.fork();
		child.on('exit', (code, signal) => {
			mkworker();
		});
	} else {
		let saintmotelivisor = require('./saintmotelivisor');
	}
}