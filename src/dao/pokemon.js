'use strict';

const path = require('path');
const model = require(path.resolve('src/model/pokemon'));

const dao = {

	create: function(pokemon) {
		return model.create(pokemon);
	},

	findOne: function(query) {
		query = query || {};
		return model.find({
			where: query
		});
	},

	findAll: function () {
		return model.findAll();
	},

	deleteOne: function(query) {
		return model.destroy({where: query});
	}

};

module.exports = dao;