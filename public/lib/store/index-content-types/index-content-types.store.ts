import { StoreConfig } from '@datorama/akita';
import { BaseMultiEntityStore } from '@redactie/utils';

import { IndexContentTypesState } from './index-content-types.model';

@StoreConfig({ name: 'indexContentTypes', idKey: 'id' })
export class IndexContentTypesStore extends BaseMultiEntityStore<IndexContentTypesState> {
	constructor(initialState: Partial<IndexContentTypesState>) {
		super(initialState);
	}
}

export const indexContentTypesStore = new IndexContentTypesStore({});
