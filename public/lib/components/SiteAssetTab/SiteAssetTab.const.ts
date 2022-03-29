import { object, string } from 'yup';

export const SITES_ASSET_TAB_VALIDATION_SCHEMA = object().shape({
	urlPattern: string()
		.matches(
			/^(http(s)?:\/\/([a-zA-Z0-9-.]+)|((\/)?\[([a-zA-Z0-9])+:([a-zA-Z0-9])+\]))((\[([a-zA-Z0-9])+:([a-zA-Z0-9])+\])|([a-zA-Z0-9-/])+)+$/,
			'Het URL patroon is niet correct. Dit moet een geldig URL zijn dat begint met een http(s) en mag verder enkel pad segmenten en placeholders bevatten'
		)
		.required('URL patroon is een verplicht veld'),
});
