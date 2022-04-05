import { LanguageSchema } from '@redactie/language-module';
import { FormikProps } from 'formik';
import { ReactNode } from 'react';

import { SiteAssetTabFormState } from '../SiteAssetTab/SitesAssetTab.types';

export type SiteAssetTabChildrenFn = (formikProps: FormikProps<SiteAssetTabFormState>) => ReactNode;

export interface SiteAssetTabFormProps {
	children?: SiteAssetTabChildrenFn | ReactNode;
	languages: LanguageSchema[];
	values: SiteAssetTabFormState;
	onFormSubmit: (values: SiteAssetTabFormState) => void;
	onChange: (values: SiteAssetTabFormState) => void;
}
