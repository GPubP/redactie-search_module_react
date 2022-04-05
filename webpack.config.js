const path = require('path');

const { getWorkerConfig, getModuleConfig } = require('@redactie/utils/dist/webpack');

const packageJSON = require('./package.json');

module.exports = env => {
	const defaultConfig = getModuleConfig({
		packageJSON,
		mainEntryPath: path.resolve(__dirname, './public/index.tsx'),
		tsIncludes: [/public/],
		sassIncludes: [/public/, /node_modules\/@a-ui\/core/],
		outputPath: path.resolve(__dirname, 'dist'),
		externals: {
			'@redactie/roles-rights-module': '@redactie/roles-rights-module',
			'@redactie/translations-module': '@redactie/translations-module',
			'@redactie/sites-module': '@redactie/sites-module',
			'@redactie/language-module': '@redactie/language-module',
		},
	})(env);
	// Enable this if you want to use web-workers
	// const workerConfig = getWorkerConfig();

	return [defaultConfig];
};
