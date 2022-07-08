import { handleMultilanguageFormErrors, LanguageErrors } from '@redactie/utils';
import { FormikErrors, FormikValues } from 'formik';

export const getCompartmentErrors = (
	currentFormErrors: FormikErrors<FormikValues>,
	formValue: FormikValues
	// TODO: Filter errors by compartment
): LanguageErrors => handleMultilanguageFormErrors(currentFormErrors, formValue);
