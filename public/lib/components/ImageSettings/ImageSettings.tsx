import { TextField } from '@acpaas-ui/react-components';
import { LanguageHeaderContext } from '@acpaas-ui/react-editorial-components';
import { FormikMultilanguageField } from '@redactie/utils';
import { FormikValues, useFormikContext } from 'formik';
import { pathOr } from 'ramda';
import React, { FC, useContext, useEffect } from 'react';

import { translationsConnector } from '../../connectors';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { SearchSettingsCompartments } from '../SettingsTab/SettingsTab.const';
import { SettingsTabProps } from '../SettingsTab/SettingsTab.types';

const ImageSettings: FC<SettingsTabProps> = ({ setActiveCompartment }) => {
	const [tModule] = translationsConnector.useModuleTranslation();
	const { activeLanguage } = useContext(LanguageHeaderContext);
	const { errors } = useFormikContext<FormikValues>();

	useEffect(() => {
		setActiveCompartment(SearchSettingsCompartments.images);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<div className="u-margin-bottom">
				<small className="u-margin-bottom u-block">
					{tModule(MODULE_TRANSLATIONS.IMAGE_SETTINGS_TAB_URL_PATROON_DESCRIPTION)}
				</small>
				<FormikMultilanguageField
					asComponent={TextField}
					id="urlPattern"
					name="urlPattern"
					required
					label={tModule(MODULE_TRANSLATIONS.IMAGE_SETTINGS_TAB_URL_PATROON_LABEL)}
					className="col-xs-12"
					state={
						activeLanguage &&
						pathOr(null, ['urlPattern', activeLanguage.key], errors) &&
						'error'
					}
				/>
			</div>
		</div>
	);
};

export default ImageSettings;
