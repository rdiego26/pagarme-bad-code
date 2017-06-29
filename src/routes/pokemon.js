'use strict';

const path = require('path');
const constants = require(path.resolve('src/utils/constants'));
const pokemonController = require(path.resolve('src/controller/pokemon'));
const router = require('express').Router();
const validate = require('express-jsonschema').validate;
const createSchema = require(path.resolve('src/schemas/createPokemon.json'));
const buySchema = require(path.resolve('src/schemas/buyPokemon.json'));

module.exports = function(app) {

	router.get('/pokemons', pokemonController.getAll);
	router.put('/pokemons', validate({body: createSchema}), pokemonController.create);
	router.post('/pokemons', validate({body: buySchema}), pokemonController.buy);

	app.use(router);
};