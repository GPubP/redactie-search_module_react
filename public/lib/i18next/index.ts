import translations from '../../assets/i18n/locales/template.json';
import { translationsConnector } from '../connectors';
import { CONFIG } from '../search.const';

export const registerTranslations = (): void => {
	translationsConnector.modules.addTranslation(CONFIG.name, 'nl_BE', translations);
};
