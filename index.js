const path = require('path');
const constants = require(path.resolve('src/utils/constants'));
const express = require('express');


var Sequelize = require('sequelize');

var sequelize = new Sequelize(constants.db.name, null, null, {
	dialect: 'sqlite'
});

const bodyParser = require('body-parser');
const request = require('request-promise');

/* App Configuration */
const app = express();
app.set('port', constants.server.port);
app.set('title', constants.app.name);
app.use(bodyParser.json());

app.listen(app.get('port'), function () {
	console.log('Listening app ' + app.get('title') + ' on port ' + app.get('port'));
});

var Pokemon = sequelize.define('pokemon', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	stock: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 1
	}
});

Pokemon.sync({force: true}).then(function () {
	console.log('Model is ready!');
});

app.get('/get-pokemons', function (req, res) {
	Pokemon.findAll()
		.then(function listOfPokemons(pokemons){
			res.send(pokemons);
		})
});

app.put('/create-pokemons', function (req, res) {
	Pokemon.create(req.body)
		.then(function sendPokemon(pokemon){
			res.send(pokemon)
		})
});

app.post('/buy-pokemons', function (req, res) {
	Pokemon.findOne({
		where: {
			name: req.body.name
		}
	})
	.then(function(pokemon) {
		if (pokemon.stock < req.body.quantity) {
			return res.status(400).send({
				error: 'Not enought ' + pokemon.name + ' in stock: ' + pokemon.stock
			})
		}

		request({
			uri: 'https://api.pagar.me/1/transactions',
			method: 'POST',
			json: {
				api_key: "ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg",
				amount: pokemon.price * req.body.quantity * 100,
				card_number: "4024007138010896",
				card_expiration_date: "1050",
				card_holder_name: "Ash Ketchum",
				card_cvv: "123",
				metadata: {
					product: 'pokemon',
					name: pokemon.name,
					quantity: req.body.quantity
				}
			}
		})
		.then(function (body){
			if (body.status == 'paid') {

				pokemon.stock = pokemon.stock - req.body.quantity;
				pokemon.save()
					.then(function(pokemon) {
						res.send(body);
					})
			}
		})
		.catch(function (err){
			console.log(JSON.stringify(err, null, 4));
			return res.status(err.response.statusCode).send(err.response.body);
		})

	})

});


