import { Link as AUILink, Button, Icon } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip, Status } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';

import { IndexesTableRow } from './IndexesTab.types';

export const INDEXES_COLUMNS = (
	t: TranslateFunc,
	tModule: TranslateFunc
): TableColumn<IndexesTableRow>[] => {
	return [
		{
			label: tModule(MODULE_TRANSLATIONS.INDEXES_TABLE_TABLE_INDEX),
			value: 'label',
			disableSorting: true,
			component(label: string, { editPath }) {
				return (
					<AUILink to={editPath} component={Link}>
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
			component(_, { editPath }) {
				return (
					<AUILink
						ariaLabel="Bewerken"
						to={editPath}
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
