import { Breadcrumb, BreadcrumbOptions } from '@redactie/redactie-core';
import { TranslateFunc } from '@redactie/translations-module';
import { NavigateGenerateFn } from '@redactie/utils';

export const SITES_ROOT = 'sites';
export const SITE_PARAM = `siteId`;

export const SITE_ROOT = `/:${SITE_PARAM}`;
export const TENANT_ROOT = '/:tenantId';

export const SEARCH_ROOT = '/elastic';

export const MODULE_PATHS = {
	dashboard: '/dashboard',
	// SITE
	site: {
		dashboard: `${SITE_ROOT}/content`,
		settings: `${SITE_ROOT}/configuratie`,
		root: `${SITE_ROOT}/configuratie${SEARCH_ROOT}`,
		indexes: `${SITE_ROOT}/configuratie${SEARCH_ROOT}/indexes`,
		searchSettings: `${SITE_ROOT}/configuratie${SEARCH_ROOT}/instellingen`,
		images: `${SITE_ROOT}/configuratie${SEARCH_ROOT}/instellingen/afbeeldingen`,
	},
};

export const BREADCRUMB_OPTIONS = (
	generatePath: NavigateGenerateFn,
	tModule: TranslateFunc,
	siteId?: string,
	extraBreadcrumbs: Breadcrumb[] = []
): BreadcrumbOptions => ({
	excludePaths: [
		'/',
		`${TENANT_ROOT}`,
		`${TENANT_ROOT}/sites`,
		`${TENANT_ROOT}/sites/${MODULE_PATHS.site.settings}`,
	],
	extraBreadcrumbs: [
		{
			name: 'Home',
			target: generatePath(siteId ? MODULE_PATHS.site.dashboard : MODULE_PATHS.dashboard, {
				siteId,
			}),
		},
		{
			name: tModule('CONFIGURATION_TITLE'),
			target: '',
		},
		...extraBreadcrumbs,
	],
});

export const CONFIG: Readonly<{ name: string; module: string }> = {
	name: 'search',
	module: 'search-module',
};

export enum ALERT_CONTAINER_IDS {
	update = 'update-search',
	searchSettings = 'update-search-settings',
}
