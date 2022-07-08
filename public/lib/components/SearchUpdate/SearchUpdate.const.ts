import { ALERT_CONTAINER_IDS } from '../../search.const';
import { Tab } from '../../search.types';

export const SEARCH_UPDATE_TAB_MAP: {
	[key in 'settings' | 'indexes']: Tab;
} = {
	settings: {
		name: 'Instellingen',
		target: 'instellingen',
		active: false,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.update,
	},
	indexes: {
		name: 'Indexes',
		target: 'indexes',
		active: true,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.update,
	},
};

export const SEARCH_UPDATE_TABS: Tab[] = [
	SEARCH_UPDATE_TAB_MAP.settings,
	SEARCH_UPDATE_TAB_MAP.indexes,
];
