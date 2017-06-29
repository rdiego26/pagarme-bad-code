"use strict";

const path = require('path');
const appData = require(path.resolve('package.json'));
const timeUtil = require(path.resolve('src/utils/time'));

const controller = {

	checkApp: function(req, res) {
		res.status(200).send({
			name: appData.name,
			version: appData.version,
			description: appData.description,
			uptime: timeUtil.formatSeconds(process.uptime())
		});
	}

};

module.exports = controller;