const path = require('path'),
	assert = require('chai').assert,
	R = require('ramda'),
	mocks = require(path.resolve('test/mocks')),
	model = require(path.resolve('src/model/pokemon')),
	dao = require(path.resolve('src/dao/pokemon'));

describe('Pokémon Spec', function() {

	const _fullPokemon = mocks.fullValidToCreate;
	const _simplePokemon = mocks.simpleValidToCreate;

	beforeEach(function(done) {
		model.sync({force: true}).then(function() {
			done();
		});
	});

	it('should create full valid pokémon', function(done) {

		dao.create(_fullPokemon).then(function(created) {
			assert.isObject(created);
			assert.property(created, 'id');
			done();
		});
	});

	it('should create simple valid pokémon', function(done) {
		dao.create(_simplePokemon).then(function(created) {
			assert.isObject(created);
			assert.property(created, 'id');
			done();
		});
	});

	it('should create valid simple pokémon and find then', function(done) {
		dao.create(_simplePokemon).then(function() {

			dao.findOne({name: _simplePokemon.name}).then(function(fetched) {
				assert.ok(fetched.name === _simplePokemon.name);
				assert.ok(fetched.price === _simplePokemon.price);
				assert.property(fetched, 'id');
				assert.ok(fetched.id !== null);
				assert.property(fetched, 'createdAt');
				assert.property(fetched, 'updatedAt');

				done();
			});

		});
	});

	it('should create valid full pokémon and find then', function(done) {
		dao.create(_fullPokemon).then(function() {

			dao.findOne({name: _fullPokemon.name}).then(function(fetched) {
				assert.ok(fetched.name === _fullPokemon.name);
				assert.ok(fetched.price === _fullPokemon.price);
				assert.property(fetched, 'id');
				assert.ok(fetched.id !== null);
				assert.property(fetched, 'createdAt');
				assert.property(fetched, 'updatedAt');

				done();
			});

		});
	});

	it('not should create pokémon passing blank/null name', function(done) {
		const _invalidPokemon = mocks.invalidToCreate;

		dao.create(_invalidPokemon).then(function() {
		}).catch(function() {
			done();
		});
	});

	it('not should create a duplicated pokémon', function(done) {
		dao.create(_fullPokemon).then(function() {
			dao.create(_fullPokemon).then(function() {
			}).catch(function(error) {
				assert.isObject(error);
				assert.ok(R.contains('name', R.pluck('path', error.errors)));
				done();
			});
		});

	});

});