import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	LanguageHeader,
} from '@acpaas-ui/react-editorial-components';
import { LanguagesSchema } from '@redactie/language-module';
import { ExternalTabProps } from '@redactie/sites-module';
import { DataLoader, Language, LeavePrompt, useDetectValueChanges } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { languagesConnector, translationsConnector } from '../../connectors';
import { SiteAssetTabForm } from '../SiteAssetTabForm';

import { SiteAssetTabFormState } from './SitesAssetTab.types';

const SiteAssetsTab: FC<ExternalTabProps> = ({ value, isLoading, onSubmit, onCancel, site }) => {
	const initialValues: SiteAssetTabFormState = {
		urlPattern: value?.config?.urlPattern || { multilanguage: true },
	};
	const CORE_TRANSLATIONS = translationsConnector.CORE_TRANSLATIONS;
	const [loadingState, languages] = languagesConnector.hooks.useActiveLanguagesForSite(
		site?.uuid
	);
	const [activeLanguage, setActiveLanguage] = useState<Language | LanguagesSchema>();
	const [formValue, setFormValue] = useState<SiteAssetTabFormState>(initialValues);
	const [hasChanges, resetChangeDetection] = useDetectValueChanges(!isLoading, formValue);
	const [t] = translationsConnector.useCoreTranslation();

	useEffect(() => {
		if (Array.isArray(languages) && !activeLanguage) {
			setActiveLanguage(languages.find(l => l.primary) || languages[0]);
		}
	}, [activeLanguage, languages]);

	const onFormSubmit = (values: SiteAssetTabFormState): void => {
		onSubmit({
			config: {
				...values,
			},
			validationSchema: {},
		});
		resetChangeDetection();
	};

	const renderForm = (): ReactElement | null => {
		if (!languages) {
			return null;
		}

		return (
			<LanguageHeader
				languages={languages}
				activeLanguage={activeLanguage}
				onChangeLanguage={(language: string) => setActiveLanguage({ key: language })}
			>
				<SiteAssetTabForm
					languages={languages}
					values={initialValues}
					onFormSubmit={onFormSubmit}
					onChange={setFormValue}
				>
					{({ submitForm }) => (
						<>
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
					)}
				</SiteAssetTabForm>
			</LanguageHeader>
		);
	};

	return <DataLoader loadingState={loadingState} render={renderForm} />;
};

export default SiteAssetsTab;
