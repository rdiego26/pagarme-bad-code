'use strict';

module.exports = function(app) {
	const path = require('path');
	const constants = require(path.resolve('src/utils/constants'));
	const pokemonController = require(path.resolve('src/controller/pokemon'));
	const router = require('express').Router();

	router.get('/get-pokemons', pokemonController.getAll);
	router.put('/create-pokemons', pokemonController.create);
	router.post('/buy-pokemons', pokemonController.buy);

	app.use(router);
};