import { I18NextTranslations } from '@redactie/translations-module';

import { translationsConnector } from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

const MODULE_TRANSLATIONS = Object.freeze<I18NextTranslations>({
	SITES_TAB_TITLE: tKey('SITES_TAB_TITLE', 'Zoeken'),
	SITES_TAB_DESCRIPTION: tKey(
		'SITES_TAB_DESCRIPTION',
		'Voorzie een url patroon voor de geïndexeerde bestanden in de zoekindex'
	),
	SITES_TAB_URLPATROON_LABEL: tKey('SITES_TAB_URLPATROON_LABEL', 'URL patroon'),
	SEARCH_SETTINGS_TITLE: tKey('SEARCH_SETTINGS_TITLE', 'Elastic Search Herindexering'),
	SEARCH_SETTINGS_REINDEX_BUTTON_LABEL: tKey(
		'SEARCH_SETTINGS_REINDEX_BUTTON_LABEL',
		'Herindexeer'
	),
	SEARCH_SETTINGS_REINDEX_BUTTON_AREA: tKey(
		'SEARCH_SETTINGS_REINDEX_BUTTON_AREA',
		'Herindexeer alle inhoud van deze site in de zoekengine'
	),
});

export { MODULE_TRANSLATIONS };
