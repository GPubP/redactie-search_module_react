import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	ContextHeaderTabLinkProps,
	RenderChildRoutes,
	useNavigate,
	useSiteContext,
	useTenantContext,
} from '@redactie/utils';
import React, { FC, ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { translationsConnector } from '../../connectors';
import { useActiveTabs, useRoutesBreadcrumbs } from '../../hooks';
import { ALERT_CONTAINER_IDS, MODULE_PATHS, SITES_ROOT } from '../../search.const';
import { SearchRouteProps } from '../../search.types';

import { SEARCH_UPDATE_TABS } from './SearchUpdate.const';

const SearchUpdate: FC<SearchRouteProps> = ({ location, route }) => {
	/**
	 * Hooks
	 */
	const activeTabs = useActiveTabs(SEARCH_UPDATE_TABS, location.pathname);
	const { tenantId } = useTenantContext();
	const { siteId } = useSiteContext();
	const { generatePath } = useNavigate(SITES_ROOT);
	const [tModule] = translationsConnector.useModuleTranslation();
	const breadcrumbs = useRoutesBreadcrumbs([], [], true);
	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);

	/**
	 * Methods
	 */

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		const extraOptions = {
			siteId,
		};

		return (
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={guardsMeta}
				extraOptions={extraOptions}
			/>
		);
	};

	return (
		<>
			<ContextHeader
				tabs={activeTabs}
				linkProps={(props: ContextHeaderTabLinkProps) => {
					const to = generatePath(`${MODULE_PATHS.site.root}/${props.href}`, {
						siteId,
					});
					return {
						...props,
						to,
						component: Link,
					};
				}}
				title={tModule('SEARCH_TITLE')}
				badges={[]}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderTopSection>{[]}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_CONTAINER_IDS.update}
				/>
				{renderChildRoutes()}
			</Container>
		</>
	);
};

export default SearchUpdate;
