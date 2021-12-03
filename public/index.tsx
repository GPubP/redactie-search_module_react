import { RenderChildRoutes, SiteContext, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import { rolesRightsConnector, sitesConnector } from './lib/connectors';
import { SearchModuleRouteProps } from './lib/search.types';

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
		path: '',
		breadcrumb: false,
		component: SiteSearchComponent,
		redirect: '',
		guards: [
			// rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
			// 	rolesRightsConnector.securityRights.readWorkflow,
			// ]),
		],
		navigation: {
			renderContext: 'site',
			context: 'site',
			label: 'Instellingen',
			order: 1,
			canShown: [
				// rolesRightsConnector.api.canShowns.securityRightsSiteCanShown(SITE_PARAM, [
				// 	rolesRightsConnector.securityRights.readWorkflow,
				// ]),
			],
		},
		routes: [],
	});
} else {
	throw new Error(
		`Search Module can't resolve the following dependency: ${rolesRightsConnector.apiName}, please add the module to the dependency list.`
	);
}
