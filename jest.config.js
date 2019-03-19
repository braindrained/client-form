module.exports = {
  verbose: true,
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	moduleFileExtensions: [
		'js',
		'jsx'
	],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy'
	}
};
