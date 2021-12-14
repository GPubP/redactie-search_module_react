import api from '../api/api.service';

import { SITE_REQUEST_PREFIX_URL } from './search.service.const';

export class SearchApiService {
	public triggerReindex(siteId: string): Promise<void> {
		return api.post(`${SITE_REQUEST_PREFIX_URL}/${siteId}/content/reindex`).json();
	}
}

export const searchApiService = new SearchApiService();
