import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import {
	LoadingState,
	RenderChildRoutes,
	useNavigate,
	useOnNextRender,
	useRoutes,
} from '@redactie/utils';
import React, { FC, ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { translationsConnector } from '../../connectors';
import { useActiveTabs, useIndex } from '../../hooks';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import {
	BREADCRUMB_OPTIONS,
	INDEX_DETAIL_TABS,
	MODULE_PATHS,
	SITES_ROOT,
} from '../../search.const';
import { SearchMatchProps, SearchModuleRouteProps } from '../../search.types';
import { indexesFacade } from '../../store/indexes';
import { IndexDetailFormValues } from '../IndexDetailSettings/IndexDetailSettings.types';

const IndexCreate: FC<SearchModuleRouteProps<SearchMatchProps>> = ({ tenantId, route, match }) => {
	const { siteId } = match.params;

	/**
	 * Hooks
	 */
	const [tModule] = translationsConnector.useModuleTranslation();
	const { navigate, generatePath } = useNavigate(SITES_ROOT);
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		BREADCRUMB_OPTIONS(generatePath, tModule, siteId, [
			{
				name: tModule(MODULE_TRANSLATIONS.SEARCH_TITLE),
				target: generatePath(MODULE_PATHS.site.searchSettings, { siteId }),
			},
			{
				name: tModule(MODULE_TRANSLATIONS.INDEXES_TITLE),
				target: generatePath(MODULE_PATHS.site.indexOverview, { siteId }),
			},
		])
	);
	const activeTabs = useActiveTabs(INDEX_DETAIL_TABS, location.pathname);
	const { fetchingState, upsertingState } = useIndex();

	const isLoading = useMemo(() => {
		return fetchingState === LoadingState.Loading || upsertingState === LoadingState.Loading;
	}, [fetchingState, upsertingState]);

	const [forceNavigateToOverview] = useOnNextRender(() => navigateToOverview());

	/**
	 * Methods
	 */
	const navigateToOverview = (): void => {
		navigate(`${MODULE_PATHS.site.indexOverview}`, { siteId });
	};

	const createIndex = (values: IndexDetailFormValues): Promise<void> => {
		return (
			indexesFacade
				.createIndex(siteId, {
					...values,
					contentTypes: [],
				})
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				.catch(() => {})
		);
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement => (
		<RenderChildRoutes
			routes={route.routes}
			extraOptions={{
				tenantId,
				routes: route.routes,
				loading: isLoading,
				isCreating: true,
				onCancel: navigateToOverview,
				onSubmit: createIndex,
				// TODO: Navigate to detail
				onSuccess: forceNavigateToOverview,
			}}
		/>
	);

	return (
		<>
			<ContextHeader
				tabs={activeTabs.slice(0, 1)}
				linkProps={(props: any) => ({
					...props,
					to: generatePath(`${route.path}/${props.href}`, { siteId }),
					component: Link,
				})}
				title={tModule(MODULE_TRANSLATIONS.CREATE_INDEX_TITLE)}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container className="u-margin-top">{renderChildRoutes()}</Container>
		</>
	);
};

export default IndexCreate;
