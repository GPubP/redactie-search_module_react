export interface IndexesTableRow {
	label: string;
	enabled: boolean;
	editPath: string;
	reindex?: () => void;
}
