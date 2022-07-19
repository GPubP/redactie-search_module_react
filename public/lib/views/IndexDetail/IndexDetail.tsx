import {
	Container,
	ContextHeader,
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
import { Link } from 'react-router-dom';

import { rolesRightsConnector, translationsConnector } from '../../connectors';
import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import { useActiveTabs, useIndex, useRoutesBreadcrumbs } from '../../hooks';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { ALERT_CONTAINER_IDS, MODULE_PATHS, SITES_ROOT } from '../../search.const';
import { SearchRouteProps } from '../../search.types';
import { indexesFacade } from '../../store/indexes';
import { IndexDetailFormValues } from '../IndexDetailSettings/IndexDetailSettings.types';

import { INDEX_DETAIL_TABS } from './IndexDetail.const';

const IndexDetail: FC<SearchRouteProps> = ({ location, route, match }) => {
	const { indexUuid } = match.params;

	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const activeTabs = useActiveTabs(INDEX_DETAIL_TABS, location.pathname);
	const { tenantId } = useTenantContext();
	const { siteId } = useSiteContext();
	const { generatePath, navigate } = useNavigate(SITES_ROOT);
	const [t] = translationsConnector.useCoreTranslation();
	const [tModule] = translationsConnector.useModuleTranslation();
	const breadcrumbs = useRoutesBreadcrumbs([], [], true);
	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);
	const { fetchingState, upsertingState, index, removingState } = useIndex();

	const pageTitle = useMemo(
		() =>
			`${
				index?.data.label
					? `'${index?.data.label}'`
					: tModule(MODULE_TRANSLATIONS.INDEX_TITLE)
			} ${t(CORE_TRANSLATIONS.ROUTING_UPDATE)}`,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[index]
	);

	const pageBadges = useMemo(
		() => [
			{
				name: tModule(MODULE_TRANSLATIONS.INDEX_TITLE),
				type: 'primary',
			},
			...(index
				? [
						{
							name: index.meta.enabled
								? t(CORE_TRANSLATIONS.STATUS_ACTIVE)
								: t(CORE_TRANSLATIONS['STATUS_NON-ACTIVE']),
							type: index.meta.enabled ? 'success' : 'danger',
						},
				  ]
				: []),
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[index]
	);

	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});

	const rights = useMemo(
		() => ({
			canUpdate: rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityrights, [
				rolesRightsConnector.securityRights.indexUpdate,
			]),
		}),
		[mySecurityrights]
	);

	useEffect(() => {
		indexesFacade.getIndex(siteId, indexUuid);
	}, [indexUuid, siteId]);

	useEffect(() => {
		if (
			mySecurityRightsLoadingState !== LoadingState.Loading &&
			fetchingState === LoadingState.Loaded
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [fetchingState, mySecurityRightsLoadingState]);

	/**
	 * Methods
	 */
	const navigateToOverview = (): void => {
		navigate(`${MODULE_PATHS.site.indexOverview}`, { siteId });
	};

	const onSubmit = (values: IndexDetailFormValues): Promise<void> => {
		if (!index) {
			return Promise.resolve();
		}

		return indexesFacade.updateIndex(siteId, indexUuid, {
			...values,
			contentTypes: index.data.contentTypes.map(ct => ct.contentTypeId) || [],
		});
	};

	const onDelete = async (): Promise<void> => {
		if (!index) {
			return Promise.resolve();
		}

		await indexesFacade
			.removeIndex(siteId, indexUuid, index)
			.then(() => navigateToOverview())
			.catch(() => null);

		return;
	};

	const onCancel = (): void => {
		navigate(MODULE_PATHS.site.indexOverview, {
			siteId,
		});
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		const extraOptions = {
			index,
			siteId,
			rights,
			onSubmit,
			onCancel,
			onDelete,
			isRemoving: removingState === LoadingState.Loading,
			loading:
				fetchingState === LoadingState.Loading || upsertingState === LoadingState.Loading,
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
					const to = generatePath(`${MODULE_PATHS.site.indexDetail}/${props.href}`, {
						siteId,
						indexUuid,
					});
					return {
						...props,
						to,
						component: Link,
					};
				}}
				title={pageTitle}
				badges={pageBadges}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_CONTAINER_IDS.indexSettings}
				/>
				<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
			</Container>
		</>
	);
};

export default IndexDetail;
