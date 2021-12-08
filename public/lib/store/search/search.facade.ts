import { alertService } from '@redactie/utils';

import { SEARCH_ALERT_CONTAINER_IDS } from '../../search.const';
import { searchApiService, SearchApiService } from '../../services/search';

export class SearchFacade {
	constructor(protected service: SearchApiService) {}

	public async triggerReindex(siteId: string): Promise<void> {
		alertService.warning(
			{
				title: 'Herindexatie gestart',
				message: `Je hebt de herindexatie succesvol gestart. Deze wordt op de achtergrond afgehandeld.`,
			},
			{
				containerId: SEARCH_ALERT_CONTAINER_IDS.reindex,
			}
		);

		return this.service
			.triggerReindex(siteId)
			.then(() => {
				alertService.success(
					{
						title: 'Herindexatie geslaagd',
						message: `De herindexatie is succesvol afgelopen.`,
					},
					{
						containerId: SEARCH_ALERT_CONTAINER_IDS.reindex,
					}
				);
			})
			.catch(() => {
				alertService.danger(
					{
						title: 'Er ging iets mis',
						message: `Er ging iets mis tijdens het herindexeren.`,
					},
					{
						containerId: SEARCH_ALERT_CONTAINER_IDS.reindex,
					}
				);
			});
	}
}

export const searchFacade = new SearchFacade(searchApiService);
