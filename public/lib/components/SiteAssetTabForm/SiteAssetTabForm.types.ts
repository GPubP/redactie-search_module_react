import { LanguageSchema } from '@redactie/language-module';
import { Language } from '@redactie/utils';
import { FormikProps } from 'formik';
import { ReactNode } from 'react';

import { SiteAssetTabFormState } from '../SiteAssetTab/SitesAssetTab.types';

export type SiteAssetTabChildrenFn = (formikProps: FormikProps<SiteAssetTabFormState>) => ReactNode;

export interface SiteAssetTabFormProps {
	languages: LanguageSchema[];
	activeLanguage: Language | LanguageSchema | undefined;
	values: SiteAssetTabFormState;
	onFormSubmit: (values: SiteAssetTabFormState) => void;
	onChange: (values: SiteAssetTabFormState) => void;
	children?: SiteAssetTabChildrenFn | ReactNode;
}
