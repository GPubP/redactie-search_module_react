import { LanguageSchema } from '@redactie/language-module';
import { MultilanguageYup } from '@redactie/utils';

import { MODULE_PATHS, SITES_ROOT, TENANT_ROOT } from '../../search.const';

export const SEARCH_TAB_ALLOWED_PATHS = [`${TENANT_ROOT}/${SITES_ROOT}${MODULE_PATHS.site.images}`];

export const FORM_VALIDATION_SCHEMA = (languages: LanguageSchema[]): typeof MultilanguageYup =>
	MultilanguageYup.object().shape({
		urlPattern: MultilanguageYup.object().validateMultiLanguage(
			languages,
			MultilanguageYup.string()
				.required('Geef een URL patroon op')
				.url('URL moet geldig zijn')
		),
	});
