import { BaseEntityFacade } from '@redactie/utils';

import { searchApiService, SearchApiService } from '../../services/search';

import { indexesQuery, IndexesQuery } from './indexes.query';
import { indexesStore, IndexesStore } from './indexes.store';

export class IndexesFacade extends BaseEntityFacade<IndexesStore, SearchApiService, IndexesQuery> {
	public readonly indexes$ = this.query.indexes$;
	public readonly index$ = this.query.index$;

	public getIndexes(siteId: string): void {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		this.service
			.getIndexes(siteId)
			.then(response => {
				if (!response) {
					throw new Error('Getting indexes failed!');
				}

				this.store.set(response._embedded);
				this.store.update({
					isFetching: false,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isFetching: false,
				});
			});
	}

	public getIndex(siteId: string, indexId: string): void {
		const { isFetchingOne } = this.query.getValue();
		if (isFetchingOne) {
			return;
		}

		this.store.setIsFetchingOne(true);
		this.service
			.getIndex(siteId, indexId)
			.then(response => {
				if (!response) {
					throw new Error(`Getting index '${indexId}' failed!`);
				}

				this.store.update({
					index: response,
					isFetchingOne: false,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isFetchingOne: false,
				});
			});
	}
}

export const indexesFacade = new IndexesFacade(indexesStore, searchApiService, indexesQuery);
