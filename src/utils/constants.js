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
	}

};
module.exports = constants;