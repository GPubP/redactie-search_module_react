import { parseSearchParams, SearchParams } from '@redactie/utils';

import api from '../api/api.service';

import { SEARCH_REQUEST_PREFIX_URL } from './search.service.const';
import {
	CreateIndexDto,
	IndexContentTypesSchema,
	IndexesSchema,
	IndexSchema,
	UpdateIndexActivationDto,
	UpdateIndexDto,
} from './search.service.types';

export class SearchApiService {
	public getIndexes(siteId: string, searchParams: SearchParams): Promise<IndexesSchema> {
		return api
			.get(
				`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes?${parseSearchParams(
					searchParams as SearchParams
				)}`
			)
			.json<IndexesSchema>();
	}

	public getIndex(siteId: string, indexId: string): Promise<IndexSchema> {
		return api
			.get(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}`)
			.json<IndexSchema>();
	}

	public removeIndex(siteId: string, indexId: string): Promise<void> {
		return api.delete(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}`).json<void>();
	}

	public createIndex(siteId: string, payload: CreateIndexDto): Promise<IndexSchema> {
		return api
			.post(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes`, {
				json: payload,
			})
			.json<IndexSchema>();
	}

	public updateIndex(
		siteId: string,
		indexId: string,
		payload: UpdateIndexDto
	): Promise<IndexSchema> {
		return api
			.put(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}`, {
				json: payload,
			})
			.json<IndexSchema>();
	}

	public getIndexContentTypes(
		siteId: string,
		indexId: string,
		enabled: boolean,
		searchParams: SearchParams
	): Promise<IndexContentTypesSchema> {
		return api
			.get(
				`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${indexId}/${
					enabled ? 'enabled' : 'disabled'
				}-content-types`,
				{
					searchParams,
				}
			)
			.json<IndexContentTypesSchema>();
	}

	public async updateIndexActivation(
		siteId: string,
		{ id, activate }: UpdateIndexActivationDto
	): Promise<IndexSchema> {
		const updateType = activate ? 'activate' : 'deactivate';
		return await api
			.put(`${SEARCH_REQUEST_PREFIX_URL}/${siteId}/indexes/${id}/${updateType}`)
			.json();
	}
}

export const searchApiService = new SearchApiService();
