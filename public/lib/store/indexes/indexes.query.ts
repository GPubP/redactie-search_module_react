import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { IndexesState } from './indexes.model';
import { indexesStore } from './indexes.store';

export class IndexesQuery extends BaseEntityQuery<IndexesState> {
	public indexes$ = this.selectAll();
	public index$ = this.select(state => state.index).pipe(
		filter(index => !isNil(index), distinctUntilChanged())
	);
}

export const indexesQuery = new IndexesQuery(indexesStore);
