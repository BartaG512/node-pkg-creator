const config = require('./jest.config');

module.exports = {
	...config,
	...{
		testRegex: "./integration/.*\\.test\\.js$",
	},
};
