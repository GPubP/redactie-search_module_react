import { I18NextTranslations } from '@redactie/translations-module';

import { translationsConnector } from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

const MODULE_TRANSLATIONS = Object.freeze<I18NextTranslations>({
	SEARCH_TITLE: tKey('SEARCH_TITLE', 'Elastic App Search'),
	CONFIGURATION_TITLE: tKey('CONFIGURATION_TITLE', 'Configuratie'),
	IMAGES_TITLE: tKey('IMAGES_TITLE', 'Afbeeldingen'),
	IMAGE_SETTINGS_TAB_URL_PATROON_LABEL: tKey(
		'IMAGE_SETTINGS_TAB_URL_PATROON_LABEL',
		'Url Patroon'
	),
	IMAGE_SETTINGS_TAB_URL_PATROON_DESCRIPTION: tKey(
		'IMAGE_SETTINGS_TAB_URL_PATROON_DESCRIPTION',
		"Alle geïndexeerde afbeeldingen in Elastic App Search worden voorzien van een publieke URL, op basis van onderstaand URL patroon. \n Deze URL's moeten bijgevolg ondersteund worden door de BFF van deze sitesApiService."
	),
	INDEXES_TABLE_LOADING: tKey('INDEXES_TABLE_LOADING', 'Indexes ophalen'),
	INDEXES_TABLE_TABLE_INDEX: tKey('INDEXES_TABLE_TABLE_INDEX', 'Index'),
});

export { MODULE_TRANSLATIONS };
