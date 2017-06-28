'use strict';

const path = require('path');
const sequelize = require(path.resolve('src/utils/connection'));
const Sequelize = require('sequelize');

const pokemon = sequelize.define('pokemon', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
            isAlpha: true
		}
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

module.exports = pokemon;