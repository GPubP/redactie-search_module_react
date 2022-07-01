import { rolesRightsConnector } from '../../connectors';
import { MODULE_PATHS } from '../../search.const';

export enum SearchSettingsCompartments {
	images = 'afbeeldingen',
}

export const SEARCH_SETTINGS_COMPARTMENTS = [
	{
		label: 'Afbeeldingen',
		to: MODULE_PATHS.site.images,
		slug: SearchSettingsCompartments.images,
		requiredSecurityRight: rolesRightsConnector.securityRights.settingsRead,
	},
];
