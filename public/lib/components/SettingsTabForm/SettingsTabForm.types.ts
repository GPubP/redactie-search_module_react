import { LanguageSchema } from '@redactie/language-module';
import { ChildModuleRouteConfig } from '@redactie/redactie-core';
import { Language } from '@redactie/utils';
import { FormikValues } from 'formik';

export interface SettingsTabFormProps {
	initialValues: Record<string, any>;
	formValue: FormikValues;
	isLoading: boolean;
	hasChanges: boolean;
	setFormValue: (values: any) => void;
	onFormSubmit: () => void;
	onCancel: () => void;
	onValidateCompartments: (invalidCompartments: string[]) => void;
	siteId: string;
	activeLanguage: Language;
	routes: ChildModuleRouteConfig[];
	languages: LanguageSchema[];
}
