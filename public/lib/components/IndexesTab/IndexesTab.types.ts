export interface IndexesTableRow {
	name: string;
	status: string;
	editPath: string;
	active: boolean;
	reindex?: () => void;
}
