export interface SearchSettingsProps {
	setActiveCompartment: (compartment: string) => void;
	rights: Record<string, boolean>;
}
