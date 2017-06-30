const request = require("supertest"),
	path = require("path"),
	assert = require("chai").assert,
	appData = require(path.resolve("package.json")),
	app = require(path.resolve("src/index"));

describe("API", function() {

	describe("Health Check Resource", function() {

		it("should get app info", function(done) {

			request(app)
				.get("/healthCheck")
				.expect(200)
				.end(function(err, res) {
					if(!err) {
						const _result = res.body;

						assert.isObject(_result);
						assert.ok(_result.name === appData.name);
						assert.ok(_result.version === appData.version);
						assert.ok(_result.description === appData.description);
						assert.property(_result, "uptime");

						done();
					}
				});

		});

	});

});