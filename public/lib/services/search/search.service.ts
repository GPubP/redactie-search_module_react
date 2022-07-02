import api from '../api/api.service';

import { SEARCH_REQUEST_PREFIX_URL } from './search.service.const';

export class SearchApiService {
	// TODO: Implement BE
	public getIndexes(siteId: string): Promise<any> {
		return Promise.resolve({
			_embedded: [
				{
					uuid: 'test',
					name: 'test',
					active: false,
				},
				{
					uuid: 'test2',
					name: 'test2',
					active: true,
				},
			],
		});
		// return api.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes`).json<any>();
	}

	// TODO: Implement BE
	public getIndex(siteId: string, indexId: string): Promise<any> {
		return api.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}`).json<any>();
	}
}

export const searchApiService = new SearchApiService();
