import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	LanguageHeaderContext,
} from '@acpaas-ui/react-editorial-components';
import {
	alertService,
	FormikOnChangeHandler,
	LeavePrompt,
	RenderChildRoutes,
} from '@redactie/utils';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { isEmpty } from 'ramda';
import React, { FC, useContext, useEffect, useState } from 'react';

import { translationsConnector } from '../../connectors';
import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import { getCompartmentErrors } from '../../helpers/getCompartmentErrors';
import { ALERT_CONTAINER_IDS } from '../../search.const';
import { SearchSettingsCompartments } from '../SettingsTab/SettingsTab.const';

import { FORM_VALIDATION_SCHEMA, SEARCH_TAB_ALLOWED_PATHS } from './SettingsTabForm.const';
import { SettingsTabFormProps } from './SettingsTabForm.types';

const SettingsTabForm: FC<SettingsTabFormProps> = ({
	initialValues,
	formValue,
	isLoading,
	hasChanges,
	onFormSubmit,
	onCancel,
	setFormValue,
	onValidateCompartments,
	siteId,
	activeLanguage,
	routes,
	languages,
}) => {
	const [t] = translationsConnector.useCoreTranslation();
	const { setErrors } = useContext(LanguageHeaderContext);
	const [activeCompartment, setActiveCompartment] = useState('');
	const [invalidCompartment, setInvalidCompartment] = useState<string[]>();
	const [currentFormErrors, setCurrentFormErrors] = useState<FormikErrors<FormikValues>>({});

	useEffect(() => {
		setErrors(getCompartmentErrors(currentFormErrors, formValue));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeCompartment]);

	const validateCompartments = (errors: FormikErrors<FormikValues>): void => {
		const invalidCompartments = Object.values(SearchSettingsCompartments).filter(() => {
			const compartmentErrors = getCompartmentErrors(errors, formValue);
			return !!Object.values(compartmentErrors).find(langErrors => !isEmpty(langErrors));
		});
		onValidateCompartments(invalidCompartments);
		setInvalidCompartment(invalidCompartments);
	};

	const handleOnError = (values: FormikValues, formErrors: FormikErrors<FormikValues>): void => {
		setCurrentFormErrors(formErrors);
		validateCompartments(formErrors);
		setFormValue(values);
		setErrors(getCompartmentErrors(formErrors, formValue));
	};

	const alert = (): void => {
		alertService.invalidForm({
			containerId: ALERT_CONTAINER_IDS.searchSettings,
		});
	};

	const onChange = (values: FormikValues): void => {
		setFormValue(values);
		alertService.dismiss();
	};

	return (
		<Formik
			onSubmit={onFormSubmit}
			initialValues={initialValues}
			enableReinitialize={true}
			validationSchema={() => FORM_VALIDATION_SCHEMA(languages)}
		>
			{({ submitForm, errors }) => {
				return (
					<div className="u-margin-top">
						<FormikOnChangeHandler onChange={onChange} onError={handleOnError} />
						<RenderChildRoutes
							routes={routes}
							extraOptions={{
								siteId,
								activeLanguage,
								setActiveCompartment,
							}}
						/>
						<ActionBar className="o-action-bar--fixed" isOpen>
							<ActionBarContentSection>
								<div className="u-wrapper row end-xs">
									<Button
										className="u-margin-right-xs"
										onClick={onCancel}
										negative
									>
										{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
									</Button>
									<Button
										iconLeft={isLoading ? 'circle-o-notch fa-spin' : null}
										disabled={isLoading || !hasChanges}
										onClick={
											(invalidCompartment && invalidCompartment.length > 0) ||
											Object.entries(errors).length !== 0
												? alert
												: submitForm
										}
										type="success"
										htmlType="submit"
									>
										{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
									</Button>
								</div>
							</ActionBarContentSection>
						</ActionBar>
						<LeavePrompt
							allowedPaths={SEARCH_TAB_ALLOWED_PATHS}
							shouldBlockNavigationOnConfirm
							when={hasChanges}
							onConfirm={submitForm}
						/>
					</div>
				);
			}}
		</Formik>
	);
};

export default SettingsTabForm;
