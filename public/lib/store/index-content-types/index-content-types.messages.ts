import { ContentTypeModel } from '@redactie/content-types-module/dist/lib/store/contentTypes';

export const getAlertMessages = (data: ContentTypeModel): Record<string, any> => ({
	enabled: {
		success: {
			title: 'Bewaard',
			message: `Het content type "${data.meta.label}" is bewaard`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Het bewaren van de index "${data.meta.label}" is mislukt`,
		},
	},
	disabled: {
		success: {
			title: 'Bewaard',
			message: `Het content type "${data.meta.label}" is bewaard`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Het bewaren van de index "${data.meta.label}" is mislukt`,
		},
	},
});
