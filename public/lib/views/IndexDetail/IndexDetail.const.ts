import { ALERT_CONTAINER_IDS } from '../../search.const';
import { Tab } from '../../search.types';

export const INDEX_DETAIL_TAB_MAP: {
	[key in 'settings' | 'indexes']: Tab;
} = {
	settings: {
		name: 'Instellingen',
		target: 'instellingen',
		active: false,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.updateIndex,
	},
	indexes: {
		name: 'Content',
		target: 'content',
		active: true,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.updateIndex,
	},
};

export const INDEX_DETAIL_TABS: Tab[] = [
	INDEX_DETAIL_TAB_MAP.settings,
	INDEX_DETAIL_TAB_MAP.indexes,
];
