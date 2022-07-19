import { I18NextTranslations } from '@redactie/translations-module';

import { translationsConnector } from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

const MODULE_TRANSLATIONS = Object.freeze<I18NextTranslations>({
	SEARCH_TITLE: tKey('SEARCH_TITLE', 'Elastic App Search'),
	CREATE_INDEX_TITLE: tKey('CREATE_INDEX_TITLE', 'Index aanmaken'),
	CONFIGURATION_TITLE: tKey('CONFIGURATION_TITLE', 'Configuratie'),
	INDEXES_TITLE: tKey('INDEXES_TITLE', 'Indexes'),
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
	INDEX_TITLE: tKey('INDEX_TITLE', 'Index'),
	INDEX_SETTINGS_LABEL_DESCRIPTION: tKey(
		'INDEX_SETTINGS_LABEL_DESCRIPTION',
		'Geef de index een korte en duidelijke naam.'
	),
	INDEX_SETTINGS_DESCRIPTION_DESCRIPTION: tKey(
		'INDEX_SETTINGS_DESCRIPTION_DESCRIPTION',
		'Geef de index een duidelijke beschrijving voor in het overzicht.'
	),
	INDEX_DELETE: tKey('INDEX_DELETE', 'Verwijder.'),
	INDEX_DELETE_DESCRIPTION: tKey('INDEX_DELETE_DESCRIPTION', 'Verwijder deze index.'),
	LABEL_VALIDATION_MESSAGE: tKey('LABEL_VALIDATION_MESSAGE', 'Een index moet een naam hebben'),
	DESCRIPTION_VALIDATION_MESSAGE: tKey(
		'DESCRIPTION_VALIDATION_MESSAGE',
		'Beschrijving is een verplicht veld'
	),
	INDEX_DELETE_PROMPT_BODY: tKey(
		'INDEX_DELETE_PROMPT_BODY',
		'Wanneer je deze index verwijderd wordt ook de de desbetreffende index in Elastic App Search mee verwijderd. Deze actie kan niet ongedaan gemaakt worden.'
	),
	PAGE: tKey('PAGE', 'Pagina'),
	BLOCK: tKey('BLOCK', 'Blok'),
	INDEX: tKey('INDEX', 'Indexeren'),
	NO_INDEX: tKey('NO_INDEX', 'Niet indexeren'),
	REINDEX: tKey('REINDEX', 'Herindexeren'),
	EDIT: tKey('EDIT', 'Bewerken'),
});

export { MODULE_TRANSLATIONS };
