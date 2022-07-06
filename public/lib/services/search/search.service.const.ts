import { EmbeddedResourceResponse } from '@redactie/utils';

export const SEARCH_REQUEST_PREFIX_URL = 'search/v1/sites';

export interface IndexDataContentTypeFieldSchema {
	fieldName: string;
	searchMapper: string;
	targetField: string;
}

export interface IndexDataContentTypeSchema {
	contentTypeId: string;
	field: IndexDataContentTypeFieldSchema[];
}

export interface IndexDataSchema {
	label: string;
	safeLabel: string;
	indexName: string;
	description: string;
	contentTypes: IndexDataContentTypeSchema;
}

export interface IndexMetaSchema {
	site: string;
	tenant: string;
	lastEditor: string;
	created: string;
	lastModified: string;
	deleted: string;
	enabled: string;
}
export interface IndexSchema {
	uuid: string;
	data: IndexDataSchema;
	meta: IndexMetaSchema;
}

export type IndexesSchema = EmbeddedResourceResponse<'indexes', IndexSchema>;
