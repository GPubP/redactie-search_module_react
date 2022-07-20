import { ContentTypeModel } from '@redactie/content-types-module/dist/lib/store/contentTypes';
import { EmbeddedResourceResponse } from '@redactie/utils';

export interface IndexDataContentTypeFieldSchema {
	fieldName: string;
	searchMapper: string;
	targetField: string;
}

export interface IndexDataContentTypeSchema {
	contentTypeId: string;
	fields: IndexDataContentTypeFieldSchema[];
}

export interface IndexDataSchema {
	label: string;
	safeLabel: string;
	indexName: string;
	description: string;
	contentTypes: IndexDataContentTypeSchema[];
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

export interface IndexDetailResponse {
	uuid: string;
	meta: IndexMetaSchema;
}

export type IndexesSchema = EmbeddedResourceResponse<'indexes', IndexSchema>;

export type IndexContentTypesSchema = EmbeddedResourceResponse<'content-types', ContentTypeModel>;

export interface CreateIndexDto {
	label: string;
	description: string;
	contentTypes?: {
		contentTypeId: string;
	}[];
}

export type UpdateIndexDto = CreateIndexDto;

export interface UpdateIndexActivationDto {
	id: string;
	activate: boolean;
	label?: string;
}
