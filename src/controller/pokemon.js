const path = require('path');
const dao = require(path.resolve('src/dao/pokemon'));
const pagarMeProvider = require(path.resolve('src/provider/pagarme'));
const request = require('request-promise');

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
			name: req.body.name
		};

		dao.findOne(_filter)
		.then(function(pokemon) {

			if (!pokemon) {

				res.status(400).send({
					error: 'Pokémon not registered!'
				});

			} else if (!pokemon ||  pokemon.stock < req.body.quantity) {

				res.status(400).send({
					error: 'Not enought ' + pokemon.name + ' in stock: ' + pokemon.stock
				});

			} else {

				var _data = {
					pokemon: pokemon
				};

				_data.pokemon.quantity = req.body.quantity;

				pagarMeProvider.buyPokemon(_data)
					.then(function (body){
						if (body.status == 'paid') {

							pokemon.stock = pokemon.stock - req.body.quantity;
							pokemon.save()
								.then(function(pokemon) {
									res.send(body);
								})
						} else {
							res.status(400).end();
						}
					})
					.catch(function (err){
						console.log(JSON.stringify(err, null, 4));
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