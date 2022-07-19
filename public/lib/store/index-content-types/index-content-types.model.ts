import { ContentTypeModel } from '@redactie/content-types-module/dist/lib/store/contentTypes';
import { BaseMultiEntityState, Page } from '@redactie/utils';

export interface InternalState {
	readonly menu: ContentTypeModel | null;
}

export type IndexContentTypeModel = ContentTypeModel[];

export interface IndexContentTypesState
	extends BaseMultiEntityState<IndexContentTypeModel, string> {
	enabledContentTypeMeta?: Page;
	disabledContentTypeMeta?: Page;
}
