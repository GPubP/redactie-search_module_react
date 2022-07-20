import { IndexDataContentTypeSchema } from '../../services/search/search.service.types';

export interface IndexDetailFormValues {
	label: string;
	description: string;
	contentTypes?: IndexDataContentTypeSchema[];
}
