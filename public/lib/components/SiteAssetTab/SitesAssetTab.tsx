import { Button, TextField } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import { ExternalTabProps } from '@redactie/sites-module';
import { ErrorMessage, LeavePrompt, useDetectValueChanges } from '@redactie/utils';
import { Field, Formik } from 'formik';
import React, { ChangeEvent, FC, useState } from 'react';

import { translationsConnector } from '../../connectors';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';

import { SITES_ASSET_TAB_VALIDATION_SCHEMA } from './SiteAssetTab.const';
import { SiteAssetTabFormState } from './SitesAssetTab.types';

const SiteAssetsTab: FC<ExternalTabProps> = ({
	value = {} as Record<string, any>,
	isLoading,
	onSubmit,
	onCancel,
}) => {
	const initialValues: SiteAssetTabFormState = {
		urlPattern: value?.config?.urlPattern || '',
	};
	const CORE_TRANSLATIONS = translationsConnector.CORE_TRANSLATIONS;
	const [t] = translationsConnector.useCoreTranslation();
	const [tModule] = translationsConnector.useModuleTranslation();
	const [formValue, setFormValue] = useState<any | null>(initialValues);
	const [hasChanges, resetChangeDetection] = useDetectValueChanges(!isLoading, formValue);

	const onFormSubmit = (): void => {
		onSubmit({
			config: {
				...formValue,
			},
			validationSchema: {},
		});
		resetChangeDetection();
	};

	return (
		<Formik
			onSubmit={onFormSubmit}
			initialValues={initialValues}
			validationSchema={SITES_ASSET_TAB_VALIDATION_SCHEMA}
		>
			{({ submitForm, setFieldValue }) => {
				return (
					<>
						<p>{tModule(MODULE_TRANSLATIONS.SITES_TAB_DESCRIPTION)}</p>
						<div className="row u-margin-top">
							<div className="col-xs-12 col-sm-6">
								<Field
									as={TextField}
									id="urlPattern"
									name="urlPattern"
									label={tModule(MODULE_TRANSLATIONS.SITES_TAB_URLPATROON_LABEL)}
									onChange={(event: ChangeEvent<any>) => {
										setFieldValue('urlPattern', event.target.value);
										setFormValue({
											...formValue,
											urlPattern: event.target.value,
										});
									}}
								/>
								<ErrorMessage
									className="u-text-danger u-margin-top-xs"
									component="p"
									name="urlPattern"
								/>
							</div>
						</div>
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
										onClick={submitForm}
										type="success"
										htmlType="submit"
									>
										{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
									</Button>
								</div>
							</ActionBarContentSection>
						</ActionBar>
						<LeavePrompt
							shouldBlockNavigationOnConfirm
							when={hasChanges}
							onConfirm={submitForm}
						/>
					</>
				);
			}}
		</Formik>
	);
};

export default SiteAssetsTab;
