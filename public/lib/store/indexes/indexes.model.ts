import { BaseEntityState, Page } from '@redactie/utils';

import { IndexSchema } from '../../services/search/search.service.types';

export type IndexModel = IndexSchema;

export interface IndexesState extends BaseEntityState<IndexModel, string> {
	meta?: Page;
}
