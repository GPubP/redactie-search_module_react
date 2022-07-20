import { BaseMultiEntityFacade, SearchParams } from '@redactie/utils';

import { SearchApiService, searchApiService } from '../../services/search';

import { IndexContentTypesQuery, indexContentTypesQuery } from './index-content-types.query';
import { indexContentTypesStore, IndexContentTypesStore } from './index-content-types.store';

export class IndexContentTypesFacade extends BaseMultiEntityFacade<
	IndexContentTypesStore,
	SearchApiService,
	IndexContentTypesQuery
> {
	public readonly enabledContentTypesMeta$ = this.query.enabledContentTypeMeta$;
	public readonly disabledContentTypesMeta$ = this.query.disabledContentTypesMeta$;

	public getEnabledIndexContentTypes(siteId: string, indexId: string, query: SearchParams): void {
		this.store.setItemIsFetching('enabledContentTypes', true);

		this.service
			.getIndexContentTypes(siteId, indexId, true, query)
			.then(response => {
				if (!response) {
					throw new Error('Getting enabled indexContentTypes failed!');
				}

				this.store.addItem('enabledContentTypes');
				this.store.setItemValue('enabledContentTypes', response._embedded['content-types']);

				this.store.setItemIsFetching('enabledContentTypes', false);
				this.store.update({
					enabledContentTypeMeta: response._page,
				});
			})
			.catch(error => {
				this.store.setItemError('enabledContentTypes', error);
			})
			.finally(() => {
				this.store.setItemIsFetching('enabledContentTypes', false);
			});
	}

	public getDisabledIndexContentTypes(
		siteId: string,
		indexId: string,
		query: SearchParams
	): void {
		this.store.setItemIsFetching('disabledContentTypes', true);

		this.service
			.getIndexContentTypes(siteId, indexId, false, query)
			.then(response => {
				if (!response) {
					throw new Error('Getting disabled indexContentTypes failed!');
				}

				this.store.addItem('disabledContentTypes');
				this.store.setItemValue(
					'disabledContentTypes',
					response._embedded['content-types']
				);

				this.store.setItemIsFetching('disabledContentTypes', false);
				this.store.update({
					disabledContentTypeMeta: response._page,
				});
			})
			.catch(error => {
				this.store.setItemError('disabledContentTypes', error);
			})
			.finally(() => {
				this.store.setItemIsFetching('disabledContentTypes', false);
			});
	}
}

export const indexContentTypesFacade = new IndexContentTypesFacade(
	indexContentTypesStore,
	searchApiService,
	indexContentTypesQuery
);
