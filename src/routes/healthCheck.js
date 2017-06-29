"use strict";

module.exports = function(app) {
	const path = require("path");
	const healthCheckController = require(path.resolve("src/controller/healthCheck"));
	const router = require("express").Router();

	router.get("/healthCheck", healthCheckController.checkApp);

	app.use(router);
};