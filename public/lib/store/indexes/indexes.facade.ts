import { alertService, BaseEntityFacade, SearchParams } from '@redactie/utils';

import { ALERT_CONTAINER_IDS } from '../../search.const';
import { searchApiService, SearchApiService } from '../../services/search';
import {
	CreateIndexDto,
	IndexSchema,
	UpdateIndexDto,
} from '../../services/search/search.service.types';

import { alertMessages } from './indexes.messages';
import { indexesQuery, IndexesQuery } from './indexes.query';
import { indexesStore, IndexesStore } from './indexes.store';

export class IndexesFacade extends BaseEntityFacade<IndexesStore, SearchApiService, IndexesQuery> {
	public readonly indexes$ = this.query.indexes$;
	public readonly index$ = this.query.index$;
	public readonly meta$ = this.query.meta$;

	public getIndexes(siteId: string, query: SearchParams): void {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		this.service
			.getIndexes(siteId, query)
			.then(response => {
				if (!response) {
					throw new Error('Getting indexes failed!');
				}

				this.store.set(response._embedded.indexes);
				this.store.update({
					meta: response._page,
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

	public removeIndex(siteId: string, indexId: string, payload: IndexSchema): Promise<void> {
		const { isRemoving } = this.query.getValue();

		if (isRemoving) {
			return Promise.resolve();
		}

		this.store.setIsRemoving(true);

		return this.service
			.removeIndex(siteId, indexId)
			.then(() => {
				this.store.update({
					index: null,
					isRemoving: false,
				});

				alertService.success(alertMessages(payload.data.label).delete.success, {
					containerId: ALERT_CONTAINER_IDS.indexOverview,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isRemoving: false,
				});

				alertService.danger(alertMessages(payload.data.label).delete.error, {
					containerId: ALERT_CONTAINER_IDS.indexSettings,
				});

				throw new Error(`Deleting index failed!`);
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

	public async updateIndex(
		siteId: string,
		indexId: string,
		payload: UpdateIndexDto
	): Promise<void> {
		const { isUpdating } = this.query.getValue();

		if (isUpdating) {
			return;
		}

		this.store.setIsUpdating(true);

		return this.service
			.updateIndex(siteId, indexId, payload)
			.then(response => {
				if (!response) {
					throw new Error(`Updating index failed!`);
				}

				this.store.update({
					index: response,
					isCreating: false,
				});

				alertService.success(alertMessages(payload.label).update.success, {
					containerId: ALERT_CONTAINER_IDS.indexSettings,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isCreating: false,
				});

				alertService.danger(alertMessages(payload.label).update.error, {
					containerId: ALERT_CONTAINER_IDS.indexSettings,
				});
			});
	}
}

export const indexesFacade = new IndexesFacade(indexesStore, searchApiService, indexesQuery);
