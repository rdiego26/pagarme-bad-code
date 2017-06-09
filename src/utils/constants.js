const constants = {

	db: {
		name: process.env.POKEMON_DB || 'pokemons'
	},

	app: {
		name: 'Pokémon seller',
		limitPerRequest: 5
	},

	server: {
		port: 3000
	},

	pagarme: {
		uri: 'https://api.pagar.me/1/transactions',
		apiKey: 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg'
	}

};
module.exports = constants;