import { RenderChildRoutes, SiteContext, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import { rolesRightsConnector, sitesConnector } from './lib/connectors';
import { MODULE_PATHS, SITE_PARAM } from './lib/search.const';
import { SearchModuleRouteProps } from './lib/search.types';
import { SearchReindex } from './lib/views';

const SiteSearchComponent: FC<SearchModuleRouteProps<{ siteId: string }>> = ({
	match,
	route,
	tenantId,
}) => {
	const { siteId } = match.params;
	const guardsMeta = useMemo(() => ({ tenantId, siteId }), [siteId, tenantId]);

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<SiteContext.Provider value={{ siteId }}>
				<RenderChildRoutes routes={route.routes} guardsMeta={guardsMeta} />
			</SiteContext.Provider>
		</TenantContext.Provider>
	);
};

if (rolesRightsConnector.api) {
	sitesConnector.registerRoutes({
		path: MODULE_PATHS.site.settingsRoot,
		breadcrumb: false,
		component: SiteSearchComponent,
		redirect: MODULE_PATHS.site.searchReindex,
		guards: [
			rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
				// rolesRightsConnector.securityRights.contentReindex,
			]),
		],
		navigation: {
			renderContext: 'site',
			context: 'site',
			label: 'Instellingen',
			order: 10,
			canShown: [
				rolesRightsConnector.api.canShowns.securityRightsSiteCanShown(SITE_PARAM, [
					// rolesRightsConnector.securityRights.contentReindex,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.site.searchReindex,
				breadcrumb: false,
				component: SearchReindex,
				navigation: {
					context: 'site',
					label: 'Herindexering',
					order: 0,
					parentPath: MODULE_PATHS.site.settingsRoot,
				},
				canShown: [
					rolesRightsConnector.api.canShowns.securityRightsSiteCanShown(SITE_PARAM, [
						// rolesRightsConnector.securityRights.contentReindex,
					]),
				],
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
							// rolesRightsConnector.securityRights.contentReindex,
						]),
					],
				},
			},
		],
	});
} else {
	throw new Error(
		`Search Module can't resolve the following dependency: ${rolesRightsConnector.apiName}, please add the module to the dependency list.`
	);
}
