const path = require('path'),
	assert = require('chai').assert,
	mocks = require(path.resolve('test/mocks')),
	model = require(path.resolve('src/model/pokemon')),
	dao = require(path.resolve('src/dao/pokemon'));

describe('Pokémon Spec', function() {

	const _fullPokemon = mocks.fullValidToCreate;
	const _simplePokemon = mocks.simpleValidToCreate;

	before(function(done) {
		model.sync({force: true}).then(function () {
			dao.deleteOne({name: _fullPokemon.name}).then(function() {
				done();
			}).catch(function(err) {
				console.error(err);
			});
		});

	});

	after(function(done) {
		dao.deleteOne({name: _fullPokemon.name}).then(function() {

			dao.deleteOne({name: _simplePokemon.name}).then(function() {
				done();
			}).catch(function(err) {
				console.error(err);
			});

		}).catch(function(err) {
			console.error(err);
		});
	});

	it('should create full valid pokémon', function(done) {

		dao.create(_fullPokemon).then(function() {
			done();
		});
	});

	it('should create simple valid pokémon', function(done) {
		dao.create(_simplePokemon).then(function() {
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

});