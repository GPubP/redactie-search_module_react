import { RenderChildRoutes, SiteContext, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import { ImageSettings } from './components';
import { rolesRightsConnector, sitesConnector } from './connectors';
import { MODULE_PATHS, SITE_PARAM } from './search.const';
import { SearchModuleRouteProps } from './search.types';
import {
	IndexCreate,
	IndexDetail,
	IndexDetailContent,
	IndexDetailSettings,
	IndexesOverview,
	SearchDetail,
	SearchSettings,
} from './views';

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

export const registerRoutes = (): void => {
	if (!rolesRightsConnector.api) {
		throw new Error(
			`Search Module can't resolve the following dependency: ${rolesRightsConnector.apiName}, please add the module to the dependency list.`
		);
	}

	sitesConnector.registerRoutes({
		path: MODULE_PATHS.site.root,
		breadcrumb: false,
		component: SiteSearchComponent,
		redirect: MODULE_PATHS.site.indexOverview,
		guardOptions: {
			guards: [
				rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
					rolesRightsConnector.securityRights.settingsRead,
				]),
			],
		},
		navigation: {
			renderContext: 'site',
			context: 'site',
			label: 'Elastic App Search',
			order: 1,
			parentPath: MODULE_PATHS.site.settings,
			canShown: [
				rolesRightsConnector.api.canShowns.securityRightsSiteCanShown(SITE_PARAM, [
					rolesRightsConnector.securityRights.settingsRead,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.site.createIndex,
				breadcrumb: false,
				component: IndexCreate,
				redirect: MODULE_PATHS.site.createIndexSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
							rolesRightsConnector.securityRights.indexCreate,
						]),
					],
				},
				routes: [
					{
						path: MODULE_PATHS.site.createIndexSettings,
						breadcrumb: false,
						component: IndexDetailSettings,
					},
				],
			},
			{
				path: MODULE_PATHS.site.indexDetail,
				breadcrumb: false,
				component: IndexDetail,
				redirect: MODULE_PATHS.site.indexSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(SITE_PARAM, [
							rolesRightsConnector.securityRights.indexRead,
						]),
					],
				},
				routes: [
					{
						path: MODULE_PATHS.site.indexSettings,
						breadcrumb: false,
						component: IndexDetailSettings,
					},
					{
						path: MODULE_PATHS.site.indexContent,
						breadcrumb: false,
						component: IndexDetailContent,
					},
				],
			},
			{
				path: MODULE_PATHS.site.root,
				breadcrumb: false,
				component: SearchDetail,
				redirect: MODULE_PATHS.site.indexOverview,
				routes: [
					{
						path: MODULE_PATHS.site.searchSettings,
						breadcrumb: false,
						component: SearchSettings,
						redirect: MODULE_PATHS.site.images,
						routes: [
							{
								path: MODULE_PATHS.site.images,
								breadcrumb: false,
								component: ImageSettings,
							},
						],
					},
					{
						path: MODULE_PATHS.site.indexOverview,
						breadcrumb: false,
						component: IndexesOverview,
						guardOptions: {
							guards: [
								rolesRightsConnector.api.guards.securityRightsSiteGuard(
									SITE_PARAM,
									[rolesRightsConnector.securityRights.indexRead]
								),
							],
						},
					},
				],
			},
		],
	});
};
