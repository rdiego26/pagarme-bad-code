'use strict';

const path = require('path');
const sequelize = require(path.resolve('src/utils/connection'));
const Sequelize = require('sequelize');

const pokemon = sequelize.define('pokemon', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	stock: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 1
	}
});

pokemon.sync({force: true}).then(function () {
	console.log('Model is ready!');
});

module.exports = pokemon;