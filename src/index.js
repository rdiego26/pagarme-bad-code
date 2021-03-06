"use strict";

const path = require("path");
const constants = require(path.resolve("src/utils/constants"));
const express = require("express");
const pokemonRoutes = require(path.resolve("src/routes/pokemon"));
const healthCheckRoutes = require(path.resolve("src/routes/healthCheck"));
const pokemonModel = require(path.resolve("src/model/pokemon"));
const jsonSchemaValidation = require(path.resolve("src/middleware/jsonSchemaValidation"));
const bodyParser = require("body-parser");
const helmet = require("helmet");

/* App Configuration */
const app = express();
app.set("port", constants.server.port);
app.set("title", constants.app.name);
app.use(bodyParser.json());
app.use(helmet());

pokemonRoutes(app);
healthCheckRoutes(app);

app.use(jsonSchemaValidation);

app.listen(app.get("port"), function () {

	pokemonModel.sync({force: true}).then(function () {
        console.log("Listening app " + app.get("title") + " on port " + app.get("port"));
    }).error(function(error) {
        console.error("Error while starting app/sync database " + error);
	});

});

module.exports = app;