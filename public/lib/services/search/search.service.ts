import api from '../api/api.service';

import { SITE_REQUEST_PREFIX_URL } from './search.service.const';

export class SearchApiService {
	public async triggerReindex(siteId: string): Promise<void> {
		await api.post(`${SITE_REQUEST_PREFIX_URL}/${siteId}/content/reindex`);
	}
}

export const searchApiService = new SearchApiService();
