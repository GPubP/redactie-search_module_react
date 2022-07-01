import { Button } from '@acpaas-ui/react-components';
import {
	ControlledModal,
	ControlledModalBody,
	ControlledModalFooter,
	ControlledModalHeader,
	LanguageHeader,
	NavList,
} from '@acpaas-ui/react-editorial-components';
import {
	DataLoader,
	Language,
	NavListItem,
	useDetectValueChanges,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import { languagesConnector, translationsConnector } from '../../connectors';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { SearchConfigurationRouteProps } from '../../search.types';

const IndexesTab: FC<SearchConfigurationRouteProps> = () => {
	console.log('indexes');

	// const { contentTypeUuid, child } = useParams<{
	// 	contentTypeUuid: string;
	// 	child: string;
	// }>();
	// const [t] = translationsConnector.useCoreTranslation();
	// const [tModule] = translationsConnector.useModuleTranslation();
	// const [activeLanguage, setActiveLanguage] = useState<Language>();
	// const [languagesLoading, languages] = languagesConnector.hooks.useActiveLanguages();
	// const [formValue, setFormValue] = useState<any | null>(initialValues);
	// const [hasChanges, resetChangeDetection] = useDetectValueChanges(!isLoading, formValue);
	// const { generatePath } = useNavigate();
	// const [showConfirmModal, setShowConfirmModal] = useState(false);
	// const [navList, setNavlist] = useState<(NavListItem & { key: string })[]>([]);

	// const history = useHistory();

	// useEffect(() => {
	// 	setNavlist(
	// 		NAV_TENANT_COMPARTMENTS.map(compartment => ({
	// 			...compartment,
	// 			activeClassName: 'is-active',
	// 			to: generatePath(`${MODULE_PATHS.tenantContentTypeDetailExternalChild}`, {
	// 				contentTypeUuid,
	// 				tab: CONFIG.name,
	// 				child: compartment.to,
	// 			}),
	// 			key: compartment.to,
	// 		}))
	// 	);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [contentTypeUuid]);

	// setup preselected language
	// useEffect(() => {
	// 	if (Array.isArray(languages) && !activeLanguage) {
	// 		setActiveLanguage(languages.find(l => l.primary) || languages[0]);
	// 	}
	// }, [activeLanguage, languages]);

	return (
		<div className="row top-xs u-margin-bottom-lg">
			{/* <div className="col-xs-12 col-md-3 u-margin-bottom">
				<NavList items={navList} linkComponent={NavLink} />
			</div>
			<div className="col-xs-12 col-md-9">
				<div className="m-card u-padding">
					<DataLoader loadingState={languagesLoading} render={renderForm} />
					<ControlledModal
						show={showConfirmModal}
						onClose={onSavePromptCancel}
						size="large"
					>
						<ControlledModalHeader>
							<h4>{t(CORE_TRANSLATIONS.CONFIRM)}</h4>
						</ControlledModalHeader>
						<ControlledModalBody>
							{tModule(MODULE_TRANSLATIONS.TENANT_NAVIGATION_CONFIRM_DESCRIPTION)}
						</ControlledModalBody>
						<ControlledModalFooter>
							<div className="u-flex u-flex-item u-flex-justify-end">
								<Button onClick={onSavePromptCancel} negative>
									{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
								</Button>
								<Button
									iconLeft={isLoading ? 'circle-o-notch fa-spin' : null}
									disabled={isLoading}
									onClick={onConfirm}
									type="success"
								>
									{t(CORE_TRANSLATIONS.MODAL_CONFIRM)}
								</Button>
							</div>
						</ControlledModalFooter>
					</ControlledModal>
				</div>
			</div> */}
		</div>
	);
};

export default IndexesTab;
