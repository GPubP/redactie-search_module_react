import { Table } from '@acpaas-ui/react-editorial-components';
import { LoadingState, useSiteContext } from '@redactie/utils';
import React, { FC, useEffect, useMemo } from 'react';

import translationsConnector, {
	CORE_TRANSLATIONS,
} from '../../connectors/translations/translations';
import { useIndexes } from '../../hooks';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { SearchConfigurationRouteProps } from '../../search.types';
import { indexesFacade } from '../../store/indexes';

import { INDEXES_COLUMNS } from './IndexesTab.const';
import { IndexesTableRow } from './IndexesTab.types';

const IndexesTab: FC<SearchConfigurationRouteProps> = () => {
	const [t] = translationsConnector.useCoreTranslation();
	const [tModule] = translationsConnector.useModuleTranslation();
	const [indexesLoading, indexes] = useIndexes();
	const { siteId } = useSiteContext();

	const rows = useMemo(() => {
		return (indexes?.map(index => ({
			label: index?.data.label,
			enabled: index?.meta.enabled,
			reindex: () => {
				console.log('reindex');
			},
			editPath: '',
		})) || []) as IndexesTableRow[];
	}, [indexes]);

	useEffect(() => {
		indexesFacade.getIndexes(siteId);
	}, [siteId]);

	return (
		<div className="row top-xs u-margin-bottom-lg">
			<Table
				fixed
				className="u-margin-top"
				tableClassName="a-table--fixed--xs"
				columns={INDEXES_COLUMNS(t, tModule)}
				rows={rows}
				loading={indexesLoading === LoadingState.Loading}
				noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				loadDataMessage={tModule(MODULE_TRANSLATIONS.INDEXES_TABLE_LOADING)}
			/>
		</div>
	);
};

export default IndexesTab;
