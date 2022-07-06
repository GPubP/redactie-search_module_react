import api from '../api/api.service';

import { SEARCH_REQUEST_PREFIX_URL } from './search.service.const';
import { IndexesSchema, IndexSchema } from './search.service.types';

export class SearchApiService {
	public getIndexes(siteId: string): Promise<IndexesSchema> {
		return api.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes`).json<any>();
	}

	public getIndex(siteId: string, indexId: string): Promise<IndexSchema> {
		return api.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}`).json<any>();
	}
}

export const searchApiService = new SearchApiService();
