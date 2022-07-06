import api from '../api/api.service';

import { IndexesSchema, SEARCH_REQUEST_PREFIX_URL } from './search.service.const';

export class SearchApiService {
	public getIndexes(siteId: string): Promise<IndexesSchema> {
		return api.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes`).json<any>();
	}

	public getIndex(siteId: string, indexId: string): Promise<IndexesSchema> {
		return api.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}`).json<any>();
	}
}

export const searchApiService = new SearchApiService();
