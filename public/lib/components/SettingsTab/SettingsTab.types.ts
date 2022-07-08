export interface SettingsTabProps {
	setActiveCompartment: (compartment: string) => void;
	rights: Record<string, boolean>;
}
