import { isNil } from '@datorama/akita';
import { BaseMultiEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { IndexContentTypesState } from './index-content-types.model';
import { indexContentTypesStore } from './index-content-types.store';

export class IndexContentTypesQuery extends BaseMultiEntityQuery<IndexContentTypesState> {
	public enabledContentTypeMeta$ = this.select(state => state.enabledContentTypeMeta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);

	public disabledContentTypesMeta$ = this.select(state => state.disabledContentTypeMeta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);
}

export const indexContentTypesQuery = new IndexContentTypesQuery(indexContentTypesStore);
