export const alertMessages = (label?: string): Record<string, any> => ({
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
	delete: {
		success: {
			title: 'Verwijderd',
			message: `De index "${label}" is verwijderd`,
		},
		error: {
			title: 'Verwijderen mislukt',
			message: `Het verwijderen van de index "${label}" is mislukt`,
		},
	},
	activate: {
		success: {
			title: 'Geactiveerd',
			message: `Je hebt de index ${label} succesvol geactiveerd.`,
		},
		error: {
			title: 'Activeren mislukt',
			message: `Activeren van de index ${label} is mislukt.`,
		},
	},
	deactivate: {
		success: {
			title: 'Gedeactiveerd',
			message: `Je hebt de index ${label} succesvol gedeactiveerd.`,
		},
		error: {
			title: 'Deactiveren mislukt',
			message: `Deactiveren van de index ${label} is mislukt.`,
		},
	},
});
