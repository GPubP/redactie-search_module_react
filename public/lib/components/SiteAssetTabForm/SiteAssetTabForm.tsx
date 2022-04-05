import { TextField } from '@acpaas-ui/react-components';
import { LanguageHeaderContext } from '@acpaas-ui/react-editorial-components';
import {
	FormikMultilanguageField,
	FormikOnChangeHandler,
	handleMultilanguageFormErrors,
} from '@redactie/utils';
import { Formik, FormikErrors, FormikValues } from 'formik';
import React, { FC, useContext } from 'react';

import { translationsConnector } from '../../connectors';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { SiteAssetTabFormState } from '../SiteAssetTab/SitesAssetTab.types';

import { SITES_ASSET_TAB_VALIDATION_SCHEMA } from './SiteAssetTabForm.const';
import { SiteAssetTabChildrenFn, SiteAssetTabFormProps } from './SiteAssetTabForm.types';

const SiteAssetsTabForm: FC<SiteAssetTabFormProps> = ({
	languages,
	onFormSubmit,
	values,
	onChange,
	children,
}) => {
	const { setErrors } = useContext(LanguageHeaderContext);
	const [tModule] = translationsConnector.useModuleTranslation();

	const handleOnError = (values: any, formErrors: FormikErrors<FormikValues>): void => {
		onChange(values);

		const newErrors = handleMultilanguageFormErrors(formErrors, values);
		setErrors(newErrors);
	};

	return (
		<Formik
			onSubmit={onFormSubmit}
			initialValues={values}
			validationSchema={SITES_ASSET_TAB_VALIDATION_SCHEMA(languages)}
		>
			{formikProps => {
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => onChange(values as SiteAssetTabFormState)}
							onError={handleOnError}
						/>
						<p className="u-margin-top">
							{tModule(MODULE_TRANSLATIONS.SITES_TAB_DESCRIPTION)}
						</p>
						<div className="u-margin-top">
							<FormikMultilanguageField
								asComponent={TextField}
								id="urlPattern"
								name="urlPattern"
								label={tModule(MODULE_TRANSLATIONS.SITES_TAB_URLPATROON_LABEL)}
								className="col-xs-12 col-sm-6"
							/>
						</div>
						{typeof children === 'function'
							? (children as SiteAssetTabChildrenFn)(formikProps)
							: children}
					</>
				);
			}}
		</Formik>
	);
};

export default SiteAssetsTabForm;
