"use strict";

const path = require("path");
const dao = require(path.resolve("src/dao/pokemon"));
const pagarMeProvider = require(path.resolve("src/provider/pagarme"));
const request = require("request-promise");

const controller = {

	getAll: function(req, res) {

		dao.findAll().then(function(results) {
			res.status(200).json(results);
		}).catch(function(error) {
			res.status(500).json(error);
		});

	},

	buy: function(req, res) {

		const _filter = {
			name: req.body.pokemon.name
		},
		_pokemon = req.body.pokemon || {},
		_creditCard = req.body.credit_card || {};

		dao.findOne(_filter)
		.then(function(fetchedPokemon) {

			if (!fetchedPokemon) {

				res.status(400).send({
					statusText: "Bad Request",
					validations: [{
						property: "name",
						messages: ["Pokémon not registered!"]
					}]
				});

			} else if (fetchedPokemon.stock < _pokemon.quantity) {

				res.status(400).send({
					statusText: "Bad Request",
					validations: [{
						property: "quantity",
						messages: ["Not enought " + fetchedPokemon.name + " in stock: " + fetchedPokemon.stock]
					}]
				});

			} else {

				var _data = {
					pokemon: fetchedPokemon,
					creditCard: _creditCard
				};

				_data.pokemon.quantity = _pokemon.quantity;

				pagarMeProvider.buyPokemon(_data)
					.then(function (body){
						if (body.status === "paid") {

							fetchedPokemon.stock = fetchedPokemon.stock - _pokemon.quantity;
							fetchedPokemon.save()
								.then(function() {
									res.send(body);
								})
						} else {

							const messages = body.errors || ["Buy operation error"];

							res.status(400).send({
								statusText: "Bad Request",
								validations: [{
									property: "body",
									messages: messages
								}]
							});
						}
					})
					.catch(function (err){
						res.status(err.response.statusCode).send(err.response.body);
					})

			}

		});

	},

	create: function(req, res) {
		const pokemon = req.body;

		dao.create(pokemon).then(function(createdPokemon) {
			res.status(200).json(createdPokemon);
		}).catch(function(error) {
			res.status(500).json(error);
		});
	}

};

module.exports = controller;