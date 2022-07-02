import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { IndexesState, IndexModel } from './indexes.model';

@StoreConfig({ name: 'indexes', idKey: 'uuid' })
export class IndexesStore extends BaseEntityStore<IndexesState, IndexModel> {}

export const indexesStore = new IndexesStore();
