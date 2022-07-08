import { object, string } from 'yup';

export const INDEX_SETTINGS_VALIDATION_SCHEMA = object().shape({
	label: string().required('Een index moet een naam hebben'),
	description: string().required('Beschrijving is een verplicht veld'),
});

export const SETTINGS_ALLOWED_LEAVE_PATHS = [];
