import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	ContextHeaderTabLinkProps,
	DataLoader,
	LoadingState,
	RenderChildRoutes,
	useNavigate,
	useSiteContext,
	useTenantContext,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link, matchPath } from 'react-router-dom';

import { rolesRightsConnector, translationsConnector } from '../../connectors';
import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import { useActiveTabs, useRoutesBreadcrumbs } from '../../hooks';
import { ALERT_CONTAINER_IDS, MODULE_PATHS, SITES_ROOT, TENANT_ROOT } from '../../search.const';
import { SearchRouteProps } from '../../search.types';

import { SEARCH_UPDATE_TABS } from './SearchUpdate.const';

const SearchUpdate: FC<SearchRouteProps> = ({ location, route }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [t] = translationsConnector.useCoreTranslation();
	const activeTabs = useActiveTabs(SEARCH_UPDATE_TABS, location.pathname);
	const { tenantId } = useTenantContext();
	const { siteId } = useSiteContext();
	const { generatePath, navigate } = useNavigate(SITES_ROOT);
	const [tModule] = translationsConnector.useModuleTranslation();
	const breadcrumbs = useRoutesBreadcrumbs([], [], true);
	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);
	const isIndexOverview = useMemo(
		() =>
			!!matchPath(location.pathname, {
				path: `${TENANT_ROOT}/${SITES_ROOT}${MODULE_PATHS.site.indexOverview}`,
				exact: true,
			}),
		[location.pathname]
	);
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});

	useEffect(() => {
		if (mySecurityRightsLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [mySecurityRightsLoadingState]);

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
				{isIndexOverview && (
					<ContextHeaderActionsSection>
						<rolesRightsConnector.api.components.SecurableRender
							userSecurityRights={mySecurityrights}
							requiredSecurityRights={
								// TODO: ENABLE RIGHTS
								[
									// rolesRightsConnector.securityRights.indexCreate,
								]
							}
						>
							<Button
								iconLeft="plus"
								onClick={() => navigate(MODULE_PATHS.site.createIndex, { siteId })}
							>
								{t(CORE_TRANSLATIONS['BUTTON_CREATE-NEW'])}
							</Button>
						</rolesRightsConnector.api.components.SecurableRender>
					</ContextHeaderActionsSection>
				)}
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_CONTAINER_IDS.update}
				/>
				<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
			</Container>
		</>
	);
};

export default SearchUpdate;
