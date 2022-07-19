import { Button, ButtonGroup } from '@acpaas-ui/react-components';
import { HoverTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { InfoTooltip, TableColumn } from '@redactie/utils';
import { isNil } from 'ramda';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ContentTypeInfoTooltip } from '../../components';
import { translationsConnector } from '../../connectors';
import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';

import { IndexContentRowData } from './IndexDetailContent.types';

export const INDEX_CONTENT_COLUMNS = (
	t: TranslateFunc,
	tModule: TranslateFunc,
	disabled: boolean
): TableColumn<IndexContentRowData>[] => [
	{
		label: t(translationsConnector.CORE_TRANSLATIONS.TABLE_NAME),
		value: 'label',
		disableSorting: true,
		ellipsis: true,
		width: '35%',
		component(value: string, { description }) {
			return (
				<div>
					<h6>{value}</h6>
					<small>{description}</small>
				</div>
			);
		},
	},
	{
		label: '',
		value: 'contentTypeId',
		disableSorting: true,
		classList: ['u-text-center'],
		width: '4%',
		component(contentTypeId: string) {
			return <ContentTypeInfoTooltip contentTypeId={contentTypeId} />;
		},
	},
	{
		label: t(translationsConnector.CORE_TRANSLATIONS.TABLE_TYPE),
		value: 'canBeFiltered',
		width: '8%',
		component(canBeFiltered: boolean) {
			if (canBeFiltered) {
				return <>{tModule(MODULE_TRANSLATIONS.PAGE)}</>;
			}

			return <>{tModule(MODULE_TRANSLATIONS.BLOCK)}</>;
		},
		disableSorting: true,
	},
	{
		label: 'Aantal items',
		value: 'contentItemCount',
		disableSorting: true,
		component(contentItemCount: number) {
			return <>{contentItemCount}</>;
		},
		width: '8%',
	},
	{
		label: 'Aantal geïndexeerd',
		value: 'hidden',
		disableSorting: true,
		component(multiple: boolean) {
			return <>TODO</>;
		},
		width: '12%',
	},
	...(disabled
		? [
				{
					label: '',
					disableSorting: true,
					classList: ['u-text-center'],
					width: '5%',
					component() {
						return (
							<HoverTooltip
								value={tModule(MODULE_TRANSLATIONS.EDIT)}
								placement="bottom"
								size="small"
								type="dark"
							>
								<Button icon="edit" onClick={() => null} transparent />
							</HoverTooltip>
						);
					},
				},
				{
					label: '',
					disableSorting: true,
					classList: ['u-text-center'],
					width: '5%',
					component() {
						return (
							<HoverTooltip
								value={tModule(MODULE_TRANSLATIONS.INDEX)}
								placement="bottom"
								size="small"
								type="dark"
							>
								<Button
									icon="plus"
									onClick={() => null}
									transparent
									type="success"
								/>
							</HoverTooltip>
						);
					},
				},
		  ]
		: []),
	...(!disabled
		? [
				{
					label: '',
					disableSorting: true,
					classList: ['u-text-center'],
					width: '5%',
					component() {
						return (
							<HoverTooltip
								value={tModule(MODULE_TRANSLATIONS.REINDEX)}
								placement="bottom"
								size="small"
								type="dark"
							>
								<Button icon="refresh" onClick={() => null} transparent />
							</HoverTooltip>
						);
					},
				},
				{
					label: '',
					disableSorting: true,
					classList: ['u-text-center'],
					width: '5%',
					component() {
						return (
							<HoverTooltip
								value={tModule(MODULE_TRANSLATIONS.EDIT)}
								placement="bottom"
								size="small"
								type="dark"
							>
								<Button icon="edit" onClick={() => null} transparent />
							</HoverTooltip>
						);
					},
				},
				{
					label: '',
					disableSorting: true,
					classList: ['u-text-center'],
					width: '5%',
					component() {
						return (
							<HoverTooltip
								value={tModule(MODULE_TRANSLATIONS.NO_INDEX)}
								placement="bottom"
								size="small"
								type="dark"
							>
								<Button
									icon="trash-o"
									onClick={() => null}
									transparent
									type="danger"
								/>
							</HoverTooltip>
						);
					},
				},
		  ]
		: []),
];
