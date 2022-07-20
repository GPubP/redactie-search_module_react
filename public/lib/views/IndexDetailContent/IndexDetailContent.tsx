import { Table } from '@acpaas-ui/react-editorial-components';
import { ContentTypeResponse } from '@redactie/content-types-module/dist/lib/services/contentTypes';
import { AlertContainer, LoadingState } from '@redactie/utils';
import React, { FC, useEffect } from 'react';

import { translationsConnector } from '../../connectors';
import useDisabledIndexContentTypes from '../../hooks/useDisabledIndexContentTypes/useDisabledIndexContentTypes';
import useEnabledIndexContentTypes from '../../hooks/useEnabledIndexContentTypes/useEnabledIndexContentTypes';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { ALERT_CONTAINER_IDS } from '../../search.const';
import { IndexDetailRouteProps, SearchMatchProps } from '../../search.types';
import { indexContentTypesFacade } from '../../store/index-content-types';

import {
	DISABLED_INDEX_CONTENT_COLUMNS,
	ENABLED_INDEX_CONTENT_COLUMNS,
} from './IndexDetailContent.const';
import { IndexContentRowData } from './IndexDetailContent.types';

const IndexDetailSettings: FC<IndexDetailRouteProps<SearchMatchProps>> = ({
	onSubmit,
	index,
	match,
}) => {
	const { siteId, indexUuid } = match.params;

	const [disabledContentTypesLoading, disabledContentTypes] = useDisabledIndexContentTypes();
	const [enabledContentTypesLoading, enabledContentTypes] = useEnabledIndexContentTypes();
	const [t] = translationsConnector.useCoreTranslation();
	const [tModule] = translationsConnector.useModuleTranslation();

	/**
	 * Hooks
	 */
	useEffect(() => {
		indexContentTypesFacade.getDisabledIndexContentTypes(siteId, indexUuid, {});
		indexContentTypesFacade.getEnabledIndexContentTypes(siteId, indexUuid, {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * Methods
	 */
	const onEnableIndex = async (ctId: string): Promise<void> => {
		await onSubmit({
			...index.data,
			contentTypes: [
				...index.data.contentTypes,
				{
					contentTypeId: ctId,
					fields: [],
				},
			],
		});

		indexContentTypesFacade.getDisabledIndexContentTypes(siteId, indexUuid, {});
		indexContentTypesFacade.getEnabledIndexContentTypes(siteId, indexUuid, {});
	};

	const onDisableIndex = async (ctId: string): Promise<void> => {
		await onSubmit({
			...index.data,
			contentTypes: index.data.contentTypes.filter(
				({ contentTypeId }) => contentTypeId !== ctId
			),
		});

		indexContentTypesFacade.getDisabledIndexContentTypes(siteId, indexUuid, {});
		indexContentTypesFacade.getEnabledIndexContentTypes(siteId, indexUuid, {});
	};

	const mapContentType = (ct: ContentTypeResponse): IndexContentRowData => ({
		label: ct?.meta?.label,
		description: ct?.meta?.description,
		canBeFiltered: ct?.meta?.canBeFiltered,
		contentTypeId: ct?.uuid,
		contentItemCount: ct?.meta?.contentItemCount,
	});

	const enabledRows: IndexContentRowData[] = (enabledContentTypes || []).map(mapContentType);
	const disabledRows: IndexContentRowData[] = (disabledContentTypes || []).map(mapContentType);

	return (
		<>
			<AlertContainer
				toastClassName="u-margin-bottom"
				containerId={ALERT_CONTAINER_IDS.indexContent}
			/>

			<h4>{tModule(MODULE_TRANSLATIONS.INDEX)}</h4>
			<Table
				fixed
				dataKey="id"
				className="u-margin-top"
				tableClassName="a-table--fixed--lg"
				columns={ENABLED_INDEX_CONTENT_COLUMNS(t, tModule, onDisableIndex)}
				loading={enabledContentTypesLoading === LoadingState.Loading}
				rows={enabledRows}
			/>

			<h4 className="u-margin-top-lg">{tModule(MODULE_TRANSLATIONS.NO_INDEX)}</h4>
			<Table
				fixed
				dataKey="id"
				className="u-margin-top"
				tableClassName="a-table--fixed--lg"
				columns={DISABLED_INDEX_CONTENT_COLUMNS(t, tModule, onEnableIndex)}
				loading={disabledContentTypesLoading === LoadingState.Loading}
				rows={disabledRows}
			/>
		</>
	);
};

export default IndexDetailSettings;
