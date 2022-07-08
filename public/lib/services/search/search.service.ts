import api from '../api/api.service';

import { SEARCH_REQUEST_PREFIX_URL } from './search.service.const';
import { CreateIndexDto, IndexesSchema, IndexSchema } from './search.service.types';

export class SearchApiService {
	public getIndexes(siteId: string): Promise<IndexesSchema> {
		return api.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes`).json<IndexesSchema>();
	}

	public getIndex(siteId: string, indexId: string): Promise<IndexSchema> {
		return api
			.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}`)
			.json<IndexSchema>();
	}

	public createIndex(siteId: string, payload: CreateIndexDto): Promise<IndexSchema> {
		return api
			.post(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes`, {
				json: payload,
			})
			.json<IndexSchema>();
	}
}

export const searchApiService = new SearchApiService();
