const request = require('supertest'),
	path = require('path'),
	dao = require(path.resolve('src/dao/pokemon')),
	mocks = require(path.resolve('test/mocks')),
	assert = require('chai').assert,
	app = require(path.resolve('src/index'));

describe('API', function() {

	describe('Pokémon Resource', function() {

		const _validFullPokemon = mocks.fullValidToCreate;

		afterEach(function(done) {

			dao.deleteOne({name:_validFullPokemon.name}).then(function() {
				done();
			}).catch();
		});

		it('get 200 when get pokémons', function(done) {

			request(app)
				.get('/get-pokemons')
				.expect(200, done);

		});

		it('get array when get pokémons', function(done) {

			request(app)
				.get('/get-pokemons')
				.expect(200)
				.end(function(err, res) {
					if(!err) {
						var _fetchedPokemons = res.body;

						assert.isArray(_fetchedPokemons);

						done();
					}
				});

		});

		it('should create a valid full pokémon', function(done) {

			request(app)
				.put('/create-pokemons')
				.send(_validFullPokemon)
				.expect(200)
				.end(function(err, res) {
					if(!err) {
						var _createdPokemon = res.body;

						assert.isObject(_createdPokemon);
						assert.ok(_createdPokemon.name === _validFullPokemon.name);
						assert.ok(_createdPokemon.price === _validFullPokemon.price);
						assert.ok(_createdPokemon.stock === _validFullPokemon.stock);
						assert.property(_createdPokemon, 'id');
						assert.ok(_createdPokemon.id !== null);
						assert.property(_createdPokemon, 'createdAt');
						assert.property(_createdPokemon, 'updatedAt');

						done();
					}
				});

		});

		it('should not buy a not created pokémon', function(done) {

			request(app)
				.ut('/create-pokemons')
				.send(_validFullPokemon)
				.expect(200)
				.end(function(err, res) {
					m
				});

		});

		it('should buy a created pokémon', function(done) {

			var _

			var _obj = {
				name: 'PokemonNameOne'
			};

			request(app)
				.post('/buy-pokemons')
				.send(_obj)
				.expect(400, done);

		});

	});

});