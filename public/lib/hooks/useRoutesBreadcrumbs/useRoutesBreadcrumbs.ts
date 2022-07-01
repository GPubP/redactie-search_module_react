import { Breadcrumb, ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { useNavigate, useRoutes, useSiteContext } from '@redactie/utils';
import { ReactNode } from 'react';

import { translationsConnector } from '../../connectors';
import { BREADCRUMB_OPTIONS, SITES_ROOT } from '../../search.const';

const useRoutesBreadcrumbs = (
	extraBreadcrumbs: Breadcrumb[] = [],
	excludePaths: string[] = [],
	isSiteLevel = false
): ReactNode => {
	const { generatePath } = useNavigate(isSiteLevel ? SITES_ROOT : undefined);
	const { siteId } = useSiteContext();
	const [tModule] = translationsConnector.useModuleTranslation();
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], {
		...BREADCRUMB_OPTIONS(generatePath, tModule, siteId),
		extraBreadcrumbs: [
			...(BREADCRUMB_OPTIONS(generatePath, tModule, siteId).extraBreadcrumbs || []),
			...extraBreadcrumbs,
		],
		excludePaths: [
			...(BREADCRUMB_OPTIONS(generatePath, tModule).excludePaths || []),
			...excludePaths,
		],
	});

	return breadcrumbs;
};

export default useRoutesBreadcrumbs;
