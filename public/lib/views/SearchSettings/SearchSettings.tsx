import { LanguageHeader, NavList } from '@acpaas-ui/react-editorial-components';
import { UpdateSitePayload } from '@redactie/sites-module';
import {
	AlertContainer,
	alertService,
	DataLoader,
	Language,
	LoadingState,
	NavListItem,
	useDetectValueChanges,
	useNavigate,
} from '@redactie/utils';
import { isEmpty } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SearchSettingsForm } from '../../components/SearchSettingsForm';
import { languagesConnector, rolesRightsConnector, sitesConnector } from '../../connectors';
import { ALERT_CONTAINER_IDS, CONFIG, SITES_ROOT } from '../../search.const';
import { SearchDetailRouteProps } from '../../search.types';
import { alertMessages } from '../../store/settings/settings.messages';

import { SEARCH_SETTINGS_COMPARTMENTS } from './SearchSettings.const';

const SearchSettings: FC<SearchDetailRouteProps> = ({ siteId, route }) => {
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const { generatePath } = useNavigate(SITES_ROOT);
	const [navList, setNavlist] = useState<(NavListItem & { key: string; slug: string })[]>([]);
	const [activeLanguage, setActiveLanguage] = useState<Language>();
	const [languagesLoading, languages] = languagesConnector.hooks.useActiveLanguagesForSite(
		siteId
	);
	const [site, siteUI] = sitesConnector.hooks.useSite(siteId);
	const config = useMemo(() => {
		return site?.data.modulesConfig.find(moduleConfig => moduleConfig.name === CONFIG.name)
			?.config;
	}, [site]);
	const [formValue, setFormValue] = useState<any | null>(config || {});
	const [hasChanges, resetChangeDetection] = useDetectValueChanges(
		!!site && !isEmpty(formValue),
		formValue
	);

	const activeCompartment = useMemo(() => {
		const splitted = location.pathname.split('/');

		return SEARCH_SETTINGS_COMPARTMENTS.find(
			compartment => compartment.slug === splitted[splitted.length - 1]
		)?.label;
	}, []);

	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});

	const rights = useMemo(
		() => ({
			canUpdate: rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityrights, [
				rolesRightsConnector.securityRights.settingsUpdate,
			]),
		}),
		[mySecurityrights]
	);

	useEffect(() => {
		if (
			languagesLoading !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [mySecurityRightsLoadingState, languagesLoading]);

	useEffect(() => {
		setNavlist(
			SEARCH_SETTINGS_COMPARTMENTS.map(compartment => ({
				...compartment,
				activeClassName: 'is-active',
				to: generatePath(compartment.to, {
					siteId,
				}),
				key: compartment.to,
			}))
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [siteId]);

	// setup preselected language
	useEffect(() => {
		if (!(Array.isArray(languages) && !activeLanguage)) {
			return;
		}

		setActiveLanguage(languages.find(l => l.primary) || languages[0]);
	}, [activeLanguage, languages]);

	useEffect(() => {
		setFormValue(config);
	}, [config]);

	useEffect(() => {
		if (isEmpty(formValue) && site && config) {
			setFormValue({
				urlPattern: {
					multiLanguage: true,
				},
			});
		}
	}, [config, formValue, site]);

	const onConfirm = (): void => {
		sitesConnector.facade
			.updateSite({
				id: siteId,
				body: {
					...site?.data,
					modulesConfig: site?.data.modulesConfig.map(moduleConfig => {
						if (moduleConfig.name !== CONFIG.name) {
							return moduleConfig;
						}

						return {
							...moduleConfig,
							config: formValue,
						};
					}),
				},
			} as UpdateSitePayload)
			.then(() => {
				resetChangeDetection();
				alertService.success(alertMessages.update.success, {
					containerId: ALERT_CONTAINER_IDS.updateSearchDetail,
				});
			})
			.catch(() => {
				alertService.danger(alertMessages.update.error, {
					containerId: ALERT_CONTAINER_IDS.updateSearchDetail,
				});
			});
	};

	const onCancel = (): void => {
		setFormValue(config);
	};

	const onValidateCompartments = (invalidCompartments: string[]): void => {
		setNavlist(
			navList.map(compartment => ({
				...compartment,
				hasError: invalidCompartments.includes(compartment.slug),
			}))
		);
	};

	const renderForm = (): ReactElement | null => {
		if (!activeLanguage) {
			return null;
		}

		return (
			<LanguageHeader
				languages={languages}
				activeLanguage={activeLanguage}
				onChangeLanguage={(language: string) => setActiveLanguage({ key: language })}
			>
				<SearchSettingsForm
					initialValues={config || {}}
					formValue={formValue}
					isLoading={!!siteUI?.isFetching || !!siteUI?.isUpdating}
					hasChanges={hasChanges}
					setFormValue={setFormValue}
					onFormSubmit={onConfirm}
					onCancel={onCancel}
					siteId={siteId}
					activeLanguage={activeLanguage}
					onValidateCompartments={onValidateCompartments}
					routes={route.routes || []}
					languages={languages || []}
					rights={rights}
				/>
			</LanguageHeader>
		);
	};

	return (
		<>
			<AlertContainer
				toastClassName="u-margin-bottom"
				containerId={ALERT_CONTAINER_IDS.updateSearchDetail}
			/>
			<div className="row top-xs u-margin-bottom-lg">
				<div className="col-xs-12 col-md-3 u-margin-bottom">
					<NavList items={navList} linkComponent={NavLink} />
				</div>
				<div className="col-xs-12 col-md-9">
					<div className="m-card u-padding">
						<h3 className="u-margin-bottom">{activeCompartment}</h3>
						<DataLoader loadingState={initialLoading} render={renderForm} />
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchSettings;
