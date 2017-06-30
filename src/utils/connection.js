const path = require("path");
const Sequelize = require("sequelize");
const constants = require(path.resolve("src/utils/constants"));
const sequelize = new Sequelize(constants.db.name, null, null, {
	dialect: "sqlite",
	logging: false
});

module.exports = sequelize;