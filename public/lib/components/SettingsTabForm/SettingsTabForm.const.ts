import { LanguageSchema } from '@redactie/language-module';
import { MultilanguageYup } from '@redactie/utils';

import { MODULE_PATHS, SITES_ROOT, TENANT_ROOT } from '../../search.const';

export const SEARCH_TAB_ALLOWED_PATHS = [`${TENANT_ROOT}/${SITES_ROOT}${MODULE_PATHS.site.images}`];

export const FORM_VALIDATION_SCHEMA = (languages: LanguageSchema[]): typeof MultilanguageYup =>
	MultilanguageYup.object().shape({
		urlPattern: MultilanguageYup.object().validateMultiLanguage(
			languages,
			MultilanguageYup.string()
				.matches(
					/^(http(s)?:\/\/([a-zA-Z0-9-.]+)|((\/)?\[([a-zA-Z0-9])+:([a-zA-Z0-9])+\]))((\[([a-zA-Z0-9])+:([a-zA-Z0-9])+\])|([a-zA-Z0-9-/])+)+$/,
					'Het URL patroon is niet correct. Dit moet een geldig URL zijn dat begint met een http(s) en mag verder enkel pad segmenten en placeholders bevatten'
				)
				.required('URL patroon is een verplicht veld')
		),
	});
