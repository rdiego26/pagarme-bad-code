const path = require('path'),
	assert = require('chai').assert,
	mocks = require(path.resolve('test/mocks')),
	model = require(path.resolve('src/model/pokemon')),
	dao = require(path.resolve('src/dao/pokemon'));

describe('Pokémon Spec', function() {

	const _fullPokemon = mocks.fullValidToCreate;
	const _simplePokemon = mocks.simpleValidToCreate;

	before(function() {
		model.sync({force: true}).then(function () {
			dao.deleteOne({name: _fullPokemon.name}).then(function() {
				return;
			}).catch(function(err) {
				console.error(err);
			});
		});

	});

	after(function() {
		dao.deleteOne({name: _fullPokemon.name}).then(function() {
			return;
		}).catch(function(err) {
			console.error(err);
		});
	});

	it('should create valid pokémon', function(done) {
		const _pokemom = _fullPokemon;

		dao.create(_pokemom).then(function() {
			done();
		});
	});

	// it('not should create pokémon passing blank/null name', function(done) {
	// 	const _invalidPokemon = mocks.invalidToCreate;
	//
	// 	dao.create(_invalidPokemon).then(function() {
	// 	}).catch(function() {
	// 		done();
	// 	});
	// });

});