import {
	Button,
	Card,
	CardBody,
	CardDescription,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DeletePrompt,
	ErrorMessage,
	FormikOnChangeHandler,
	LeavePrompt,
	useDetectValueChanges,
} from '@redactie/utils';
import { Field, Formik, FormikValues } from 'formik';
import React, { FC, ReactElement, useState } from 'react';

import { translationsConnector } from '../../connectors';
import { CORE_TRANSLATIONS } from '../../connectors/translations/translations';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';
import { ALERT_CONTAINER_IDS } from '../../search.const';
import { IndexDetailRouteProps, SearchMatchProps } from '../../search.types';

import {
	INDEX_SETTINGS_VALIDATION_SCHEMA,
	SETTINGS_ALLOWED_LEAVE_PATHS,
} from './IndexDetailSettings.const';
import { IndexDetailFormValues } from './IndexDetailSettings.types';

const IndexDetailSettings: FC<IndexDetailRouteProps<SearchMatchProps>> = ({
	index,
	loading,
	isCreating,
	rights,
	onSubmit,
	onCancel,
	onSuccess,
	onDelete,
	isRemoving,
}) => {
	const [t] = translationsConnector.useCoreTranslation();
	const [tModule] = translationsConnector.useModuleTranslation();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [formValue, setFormValue] = useState<IndexDetailFormValues>({
		label: index?.data.label || '',
		description: index?.data.description || '',
	});
	const [isChanged, resetIsChanged] = useDetectValueChanges(!loading, formValue);

	const canEdit = isCreating ? true : rights?.canUpdate;

	/**
	 * Methods
	 */
	const onSave = async (): Promise<void> => {
		await onSubmit(formValue);
		resetIsChanged();
		if (onSuccess && typeof onSuccess === 'function') {
			onSuccess();
		}
	};

	const onChangeValues = (values: FormikValues): void => {
		setFormValue(values as IndexDetailFormValues);
	};

	const onDeletePromptConfirm = async (): Promise<void> => {
		await onDelete();
		setShowDeleteModal(false);
	};

	const onDeletePromptCancel = (): void => {
		setShowDeleteModal(false);
	};

	/**
	 * Render
	 */

	const renderDelete = (): ReactElement => {
		return (
			<>
				<Card className="u-margin-top">
					<CardBody>
						<CardTitle>{tModule(MODULE_TRANSLATIONS.INDEX_DELETE)}</CardTitle>
						<CardDescription>
							{tModule(MODULE_TRANSLATIONS.INDEX_DELETE_DESCRIPTION)}
						</CardDescription>
						<Button
							onClick={() => setShowDeleteModal(true)}
							className="u-margin-top"
							type="danger"
							iconLeft="trash-o"
						>
							{t(CORE_TRANSLATIONS['BUTTON_REMOVE'])}
						</Button>
					</CardBody>
				</Card>
				<DeletePrompt
					body={tModule(MODULE_TRANSLATIONS.INDEX_DELETE_PROMPT_BODY)}
					isDeleting={isRemoving}
					show={showDeleteModal}
					onCancel={onDeletePromptCancel}
					onConfirm={onDeletePromptConfirm}
				/>
			</>
		);
	};

	return (
		<>
			<AlertContainer
				toastClassName="u-margin-bottom"
				containerId={ALERT_CONTAINER_IDS.indexSettings}
			/>
			<Formik
				initialValues={formValue}
				onSubmit={onSave}
				validationSchema={INDEX_SETTINGS_VALIDATION_SCHEMA(tModule)}
			>
				{({ errors, submitForm }) => {
					return (
						<>
							<FormikOnChangeHandler onChange={onChangeValues} />
							<div className="row top-xs u-margin-bottom">
								<div className="col-xs-12">
									<Field
										as={TextField}
										disabled={!canEdit}
										label="Naam"
										name="label"
										required
										state={errors?.label && 'error'}
									/>
									<ErrorMessage name="label" />
									<div className="u-text-light u-margin-top-xs">
										{tModule(
											MODULE_TRANSLATIONS.INDEX_SETTINGS_LABEL_DESCRIPTION
										)}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12">
									<Field
										as={Textarea}
										disabled={!canEdit}
										label="Beschrijving"
										name="description"
										required
										state={errors?.description && 'error'}
									/>
									<ErrorMessage name="description" />
									<div className="u-text-light u-margin-top-xs">
										{tModule(
											MODULE_TRANSLATIONS.INDEX_SETTINGS_DESCRIPTION_DESCRIPTION
										)}
									</div>
								</div>
							</div>
							{!isCreating && renderDelete()}
							<ActionBar className="o-action-bar--fixed" isOpen={canEdit}>
								<ActionBarContentSection>
									<div className="u-wrapper row end-xs">
										<Button
											className="u-margin-right-xs"
											onClick={onCancel}
											negative
										>
											{index?.uuid
												? t(CORE_TRANSLATIONS.BUTTON_CANCEL)
												: t(CORE_TRANSLATIONS.BUTTON_BACK)}
										</Button>
										<Button
											iconLeft={loading ? 'circle-o-notch fa-spin' : null}
											disabled={loading || !isChanged}
											onClick={submitForm}
											type="success"
										>
											{index?.uuid
												? t(CORE_TRANSLATIONS['BUTTON_SAVE'])
												: t(CORE_TRANSLATIONS['BUTTON_SAVE-NEXT'])}
										</Button>
									</div>
								</ActionBarContentSection>
							</ActionBar>
							<LeavePrompt
								allowedPaths={SETTINGS_ALLOWED_LEAVE_PATHS}
								when={isChanged}
								shouldBlockNavigationOnConfirm
								onConfirm={submitForm}
							/>
						</>
					);
				}}
			</Formik>
		</>
	);
};

export default IndexDetailSettings;
