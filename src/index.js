const path = require('path');
const constants = require(path.resolve('src/utils/constants'));
const express = require('express');
const pokemonRoutes = require(path.resolve('src/routes/pokemon'));
const bodyParser = require('body-parser');

/* App Configuration */
const app = express();
app.set('port', constants.server.port);
app.set('title', constants.app.name);
app.use(bodyParser.json());

pokemonRoutes(app);

app.listen(app.get('port'), function () {
	console.log('Listening app ' + app.get('title') + ' on port ' + app.get('port'));
});

module.exports = app;