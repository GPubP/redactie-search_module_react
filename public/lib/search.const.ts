export const SITES_ROOT = 'sites';
export const SITE_PARAM = `siteId`;

export const SITE_ROOT = `/:${SITE_PARAM}`;
export const TENANT_ROOT = '/:tenantId';

const SETTINGS_BASE_PATH = '/instellingen';

export const MODULE_PATHS = {
	dashboard: '/dashboard',
	// SITE
	site: {
		dashboard: `${SITE_ROOT}/content`,
		settingsRoot: `${SITE_ROOT}${SETTINGS_BASE_PATH}`,
		searchReindex: `${SITE_ROOT}${SETTINGS_BASE_PATH}/herindexering`,
	},
};

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', `${TENANT_ROOT}`, `${TENANT_ROOT}/sites`],
};

export const SEARCH_ALERT_CONTAINER_IDS = {
	reindex: 'search-reindex',
};

export const CONFIG: Readonly<{ name: string; module: string }> = {
	name: 'search',
	module: 'search-module',
};
