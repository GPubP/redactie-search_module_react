import { alertService, BaseEntityFacade } from '@redactie/utils';

import { ALERT_CONTAINER_IDS } from '../../search.const';
import { searchApiService, SearchApiService } from '../../services/search';
import { CreateIndexDto } from '../../services/search/search.service.types';

import { alertMessages } from './indexes.messages';
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

				this.store.set(response._embedded.indexes);
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

	public async createIndex(siteId: string, payload: CreateIndexDto): Promise<void> {
		const { isCreating } = this.query.getValue();

		if (isCreating) {
			return;
		}

		this.store.setIsCreating(true);

		return this.service
			.createIndex(siteId, payload)
			.then(response => {
				if (!response) {
					throw new Error(`Creating index failed!`);
				}

				this.store.update({
					index: response,
					isCreating: false,
				});

				alertService.success(alertMessages(payload.label).create.success, {
					containerId: ALERT_CONTAINER_IDS.indexSettings,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isCreating: false,
				});

				alertService.danger(alertMessages(payload.label).create.error, {
					containerId: ALERT_CONTAINER_IDS.indexSettings,
				});

				throw new Error(`Creating index failed!`);
			});
	}
}

export const indexesFacade = new IndexesFacade(indexesStore, searchApiService, indexesQuery);
