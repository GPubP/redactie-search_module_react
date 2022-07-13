export interface IndexesTableRow {
	label: string;
	enabled: boolean;
	settingsPath: string;
	contentPath: string;
	reindex?: () => void;
}
