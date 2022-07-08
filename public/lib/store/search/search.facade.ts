import { searchApiService, SearchApiService } from '../../services/search';

export class SearchFacade {
	constructor(protected service: SearchApiService) {}
}

export const searchFacade = new SearchFacade(searchApiService);
