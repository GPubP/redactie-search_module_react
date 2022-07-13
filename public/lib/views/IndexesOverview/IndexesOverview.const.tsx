import { Link as AUILink, Button, Icon } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip, Status } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';

import { IndexesTableRow } from './IndexesOverview.types';

export const INDEXES_DEFAULT_SEARCH_PARAMS = {
	page: 1,
	pagesize: 20,
};

export const INDEXES_QUERY_PARAMS_CONFIG = {
	page: { defaultValue: INDEXES_DEFAULT_SEARCH_PARAMS.page, type: 'number' },
	pagesize: { defaultValue: INDEXES_DEFAULT_SEARCH_PARAMS.pagesize, type: 'number' },
} as const;

export const INDEXES_COLUMNS = (
	t: TranslateFunc,
	tModule: TranslateFunc
): TableColumn<IndexesTableRow>[] => {
	return [
		{
			label: tModule(MODULE_TRANSLATIONS.INDEXES_TABLE_TABLE_INDEX),
			value: 'label',
			disableSorting: true,
			component(label: string, { settingsPath }) {
				return (
					<AUILink to={settingsPath} component={Link}>
						<EllipsisWithTooltip>{label}</EllipsisWithTooltip>
					</AUILink>
				);
			},
		},
		{
			label: t(CORE_TRANSLATIONS.TABLE_STATUS),
			value: 'enabled',
			disableSorting: true,
			width: '20%',
			component(_, { enabled }) {
				return enabled ? (
					<Status label={t(CORE_TRANSLATIONS.STATUS_ACTIVE)} type="ACTIVE" />
				) : (
					<Status label={t(CORE_TRANSLATIONS['STATUS_NON-ACTIVE'])} type="INACTIVE" />
				);
			},
		},
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(_, { enabled, reindex }) {
				return enabled ? (
					<Button
						ariaLabel="Herindexeren"
						onClick={reindex}
						className="a-button a-button--transparent has-icon"
					>
						<Icon name="refresh" />
					</Button>
				) : (
					<></>
				);
			},
		},
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(_, { contentPath }) {
				return (
					<AUILink
						ariaLabel="Bewerken"
						to={contentPath}
						className="a-button a-button--transparent has-icon"
						component={Link}
					>
						<Icon name="edit" />
					</AUILink>
				);
			},
		},
	];
};
