const mocks = {

	fullValidToCreate: {
		name: 'PokemonName',
		price: 10,
		stock: 5
	},

	simpleValidToCreate: {
		name: 'PokemonName',
		price: 9
	},

	invalidToCreate: {
		name: null,
		price: 5,
		stock: '827ccb0eea8a706c4c34a16891f84e7b'
	}

};

module.exports = mocks;