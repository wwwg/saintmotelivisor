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
}, mkworkers = n => {
	while (--n > 0) mkworker();
}, killall = sig => {
	for (const id in cluster.workers) {
		if (cluster.workers.hasOwnProperty(id)) {
			let w = cluster.workers[id];
			w.removeAllListeners();
			worker.process.kill(sig);
		}
	}
}