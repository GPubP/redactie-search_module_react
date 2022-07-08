import { TranslateFunc } from '@redactie/translations-module';
import { object, string } from 'yup';

import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';

export const INDEX_SETTINGS_VALIDATION_SCHEMA = (tModule: TranslateFunc): any =>
	object().shape({
		label: string().required(tModule(MODULE_TRANSLATIONS.LABEL_VALIDATION_MESSAGE)),
		description: string().required(tModule(MODULE_TRANSLATIONS.LABEL_VALIDATION_MESSAGE)),
	});

export const SETTINGS_ALLOWED_LEAVE_PATHS = [];
