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
	SEARCH_REINDEX_CONFIRM_TITLE: tKey('SEARCH_REINDEX_CONFIRM_TITLE', 'Ben je zeker?'),
	SEARCH_REINDEX_CONFIRM_BODY: tKey(
		'SEARCH_REINDEX_CONFIRM_BODY',
		`Opgelet!
		Het reindexeren gaat de reeds bestaande index verwijderen en een nieuwe index aanmaken op basis van de huidige Redactie data.
		Indien er data in de huidige index aanwezig is dat niet door de Redactie is toegevoegd, ben je deze kwijt!`
	),
	SEARCH_REINDEX_CONFIRM_BUTTON: tKey('SEARCH_REINDEX_CONFIRM_BUTTON', 'Bevestigen'),
});

export { MODULE_TRANSLATIONS };
