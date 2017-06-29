"use strict";

const path = require("path");
const constants = require(path.resolve("src/utils/constants"));
const request = require("request-promise");

const pagarme = {
	
	buyPokemon: function (data) {

		return request({
			uri: constants.pagarme.uri,
			method: "POST",
			json: {
				api_key: constants.pagarme.apiKey,
				amount: data.pokemon.price * data.pokemon.quantity * 100,
				card_number: data.creditCard.card_number,
				card_expiration_date: data.creditCard.card_expiration_date,
				card_holder_name: data.creditCard.card_holder_name,
				card_cvv: data.creditCard.card_cvv,
				metadata: {
					product: "pokemon",
					name: data.pokemon.name,
					quantity: data.pokemon.quantity
				}
			}
		});

	}
	
};

module.exports = pagarme;
