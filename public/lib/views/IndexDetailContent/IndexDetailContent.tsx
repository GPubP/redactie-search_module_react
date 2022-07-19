import {
	Button,
	Card,
	CardBody,
	CardDescription,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import { ContentTypeResponse } from '@redactie/content-types-module/dist/lib/services/contentTypes';
import { ContentTypeModel } from '@redactie/content-types-module/dist/lib/store/contentTypes';
import {
	AlertContainer,
	DeletePrompt,
	ErrorMessage,
	FormikOnChangeHandler,
	LeavePrompt,
	LoadingState,
	useDetectValueChanges,
} from '@redactie/utils';
import { Field, Formik, FormikValues } from 'formik';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { translationsConnector } from '../../connectors';
import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import useDisabledIndexContentTypes from '../../hooks/useDisabledIndexContentTypes/useDisabledIndexContentTypes';
import useEnabledIndexContentTypes from '../../hooks/useEnabledIndexContentTypes/useEnabledIndexContentTypes';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { ALERT_CONTAINER_IDS } from '../../search.const';
import { IndexDetailRouteProps, SearchMatchProps } from '../../search.types';
import { IndexContentTypeModel, indexContentTypesFacade } from '../../store/index-content-types';

import { INDEX_CONTENT_COLUMNS } from './IndexDetailContent.const';
import { IndexContentRowData } from './IndexDetailContent.types';

const IndexDetailSettings: FC<IndexDetailRouteProps<SearchMatchProps>> = ({
	loading,
	isCreating,
	rights,
	onSubmit,
	onSuccess,
	isRemoving,
	match,
}) => {
	const { siteId, indexUuid } = match.params;

	const [disabledContentTypesLoading, disabledContentTypes] = useDisabledIndexContentTypes();
	const [enabledContentTypesLoading, enabledContentTypes] = useEnabledIndexContentTypes();
	const [t] = translationsConnector.useCoreTranslation();
	const [tModule] = translationsConnector.useModuleTranslation();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [formValue, setFormValue] = useState<any>({});
	const [isChanged, resetIsChanged] = useDetectValueChanges(!loading, formValue);

	const canEdit = isCreating ? true : rights?.canUpdate;

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
	const onSave = async (): Promise<void> => {
		await onSubmit(formValue);
		resetIsChanged();
		if (onSuccess && typeof onSuccess === 'function') {
			onSuccess();
		}
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
				columns={INDEX_CONTENT_COLUMNS(t, tModule, false)}
				loading={enabledContentTypesLoading === LoadingState.Loading}
				rows={enabledRows}
			/>

			<h4 className="u-margin-top-lg">{tModule(MODULE_TRANSLATIONS.NO_INDEX)}</h4>
			<Table
				fixed
				dataKey="id"
				className="u-margin-top"
				tableClassName="a-table--fixed--lg"
				columns={INDEX_CONTENT_COLUMNS(t, tModule, true)}
				loading={disabledContentTypesLoading === LoadingState.Loading}
				rows={disabledRows}
			/>
		</>
	);
};

export default IndexDetailSettings;
