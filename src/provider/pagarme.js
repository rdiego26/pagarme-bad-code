const path = require('path');
const constants = require(path.resolve('src/utils/constants'));
const request = require('request-promise');

const pagarme = {
	
	buyPokemon: function (data) {

		return request({
			uri: constants.pagarme.uri,
			method: 'POST',
			json: {
				api_key: constants.pagarme.apiKey,
				amount: data.pokemon.price * data.pokemon.quantity * 100,
				card_number: "4024007138010896",
				card_expiration_date: "1050",
				card_holder_name: "Ash Ketchum",
				card_cvv: "123",
				metadata: {
					product: 'pokemon',
					name: data.pokemon.name,
					quantity: data.pokemon.quantity
				}
			}
		});

	}
	
};

module.exports = pagarme;
