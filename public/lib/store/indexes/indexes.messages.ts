export const alertMessages = (label: string): Record<string, any> => ({
	create: {
		success: {
			title: 'Aangemaakt',
			message: `De nieuwe index "${label}" is succesvol aangemaakt.`,
		},
		error: {
			title: 'Aanmaken mislukt',
			message: `Het aanmaken van de index "${label}" is mislukt.`,
		},
	},
	update: {
		success: {
			title: 'Bewaard',
			message: `De index "${label}" is bewaard.`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Het bewaren van de index "${label}" is mislukt.`,
		},
	},
});
