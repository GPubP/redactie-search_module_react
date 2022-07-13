import { PaginatedTable } from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	LoadingState,
	SearchParams,
	useAPIQueryParams,
	useNavigate,
	useSiteContext,
} from '@redactie/utils';
import React, { FC, useEffect, useMemo } from 'react';

import translationsConnector, {
	CORE_TRANSLATIONS,
} from '../../connectors/translations/translations';
import { useIndexes } from '../../hooks';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { ALERT_CONTAINER_IDS, MODULE_PATHS, SITES_ROOT } from '../../search.const';
import { SearchDetailRouteProps } from '../../search.types';
import { indexesFacade } from '../../store/indexes';

import {
	INDEXES_COLUMNS,
	INDEXES_DEFAULT_SEARCH_PARAMS,
	INDEXES_QUERY_PARAMS_CONFIG,
} from './IndexesOverview.const';
import { IndexesTableRow } from './IndexesOverview.types';

const IndexesTab: FC<SearchDetailRouteProps> = () => {
	const [t] = translationsConnector.useCoreTranslation();
	const [tModule] = translationsConnector.useModuleTranslation();
	const [indexesLoading, indexes, indexesPaging] = useIndexes();
	const { siteId } = useSiteContext();
	const [query, setQuery] = useAPIQueryParams(INDEXES_QUERY_PARAMS_CONFIG, false);
	const { generatePath } = useNavigate(SITES_ROOT);

	const rows = useMemo(() => {
		return (indexes?.map(index => ({
			label: index?.data.label,
			enabled: index?.meta.enabled,
			reindex: () => {
				console.log('reindex');
			},
			settingsPath: generatePath(MODULE_PATHS.site.indexDetail, {
				indexUuid: index.uuid,
				siteId,
			}),
			contentPath: generatePath(MODULE_PATHS.site.indexDetail, {
				indexUuid: index.uuid,
				siteId,
			}),
		})) || []) as IndexesTableRow[];
	}, [generatePath, indexes, siteId]);

	useEffect(() => {
		indexesFacade.getIndexes(siteId, query as SearchParams);
	}, [query, siteId]);

	const handlePageChange = (pageNumber: number): void => {
		setQuery({
			...query,
			page: pageNumber,
		});
	};

	return (
		<>
			<AlertContainer
				toastClassName="u-margin-bottom"
				containerId={ALERT_CONTAINER_IDS.indexOverview}
			/>
			<div className="top-xs u-margin-bottom-lg">
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--xs"
					columns={INDEXES_COLUMNS(t, tModule)}
					rows={rows}
					currentPage={query.page}
					itemsPerPage={INDEXES_DEFAULT_SEARCH_PARAMS.pagesize}
					onPageChange={handlePageChange}
					totalValues={indexesPaging?.totalElements || 0}
					loading={indexesLoading === LoadingState.Loading}
					loadDataMessage={tModule(MODULE_TRANSLATIONS.INDEXES_TABLE_LOADING)}
					noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				/>
			</div>
		</>
	);
};

export default IndexesTab;
