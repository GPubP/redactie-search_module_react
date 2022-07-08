import { EmbeddedResourceResponse } from '@redactie/utils';

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
	deleted: boolean;
	enabled: boolean;
}
export interface IndexSchema {
	uuid: string;
	data: IndexDataSchema;
	meta: IndexMetaSchema;
}

export type IndexesSchema = EmbeddedResourceResponse<'indexes', IndexSchema>;

export interface CreateIndexDto {
	label: string;
	description: string;
	contentTypes: string[];
}
