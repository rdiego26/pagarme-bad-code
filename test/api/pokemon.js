const request = require('supertest'),
	path = require('path'),
	R = require('ramda'),
	model = require(path.resolve('src/model/pokemon')),
	mocks = require(path.resolve('test/mocks')),
	assert = require('chai').assert,
	app = require(path.resolve('src/index'));

describe('API', function() {

	describe('Pokémon Resource', function() {

		const _validFullPokemon = mocks.fullValidToCreate;

		beforeEach(function(done) {
			model.sync({force: true}).then(function() {
				done();
			});
		});

		it('get 200 when get pokémons', function(done) {

			request(app)
				.get('/pokemons')
				.expect(200, done);

		});

		it('get array when get pokémons', function(done) {

			request(app)
				.get('/pokemons')
				.expect(200)
				.end(function(err, res) {
					if(!err) {
						const _fetchedPokemons = res.body;

						assert.isArray(_fetchedPokemons);

						done();
					}
				});

		});

		it('should not buy a not created pokémon', function(done) {

			request(app)
				.post('/pokemons')
				.send(_validFullPokemon)
				.expect(400, done);

		});

		it('should not create pokémon with invalid price', function(done) {

			const _pokemon = R.clone(_validFullPokemon);
			_pokemon.price = 0;

			request(app)
				.put('/pokemons')
				.send(_pokemon)
				.expect(400)
				.end(function(err, res) {
					if(!err) {
						const _result = res.body;
						const _validationMessages = R.pluck('messages', R.prop('validations', _result));
						const _validationProperties = R.pluck('property', R.prop('validations', _result));

						assert.ok(R.contains('minimum value', R.head(R.flatten(_validationMessages))));
						assert.ok(R.contains('price', R.head(R.flatten(_validationProperties))));

						done();
					}
				});

		});

		it('should not create pokémon with invalid stock', function(done) {

			const _pokemon = R.clone(_validFullPokemon);
			_pokemon.stock = "A";

			request(app)
				.put('/pokemons')
				.send(_pokemon)
				.expect(400)
				.end(function(err, res) {
					if(!err) {
						const _result = res.body;
						const _validationMessages = R.pluck('messages', R.prop('validations', _result));
						const _validationProperties = R.pluck('property', R.prop('validations', _result));

						assert.ok(R.contains('type', R.head(R.flatten(_validationMessages))));
						assert.ok(R.contains('stock', R.head(R.flatten(_validationProperties))));

						done();
					}
				});

		});

		it('should not buy pokémon with quantity is greater on stock', function(done) {

			const _pokemon = R.clone(_validFullPokemon);

			request(app)
				.put('/pokemons')
				.send(_pokemon)
				.expect(200)
				.end(function(err, res) {
					if(!err) {

						const _order = {
							name: _pokemon.name,
							quantity: 10
						};

						request(app)
							.post('/pokemons')
							.send(_order)
							.expect(400, done);

					}
				});

		});

		it('should create a valid full pokémon', function(done) {

			request(app)
				.put('/pokemons')
				.send(_validFullPokemon)
				.expect(200)
				.end(function(err, res) {
					if(!err) {
						const _createdPokemon = res.body;

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

	});

});