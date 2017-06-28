'use strict';

module.exports = function(app) {
	const path = require('path');
	const constants = require(path.resolve('src/utils/constants'));
	const pokemonController = require(path.resolve('src/controller/pokemon'));
	const router = require('express').Router();
    const validate = require('express-jsonschema').validate;
    const createSchema = require(path.resolve('src/schema/createPokemon.json'));


	router.get('/pokemons', pokemonController.getAll);
	router.put('/pokemons', validate({body: createSchema}), pokemonController.create);
	router.post('/pokemons', pokemonController.buy);

	app.use(router);
};