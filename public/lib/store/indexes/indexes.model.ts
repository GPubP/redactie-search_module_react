import { BaseEntityState } from '@redactie/utils';

import { IndexSchema } from '../../services/search/search.service.const';

export type IndexModel = IndexSchema;

export type IndexesState = BaseEntityState<IndexModel, string>;
