import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { ContextHeaderTab } from '@redactie/utils';

import { ALERT_CONTAINER_IDS } from './search.const';

export interface SearchModuleRouteProps<Params extends { [K in keyof Params]?: string } = {}>
	extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface SearchMatchProps {
	siteId: string;
	workflowUuid?: string;
}

export interface Tab extends ContextHeaderTab {
	id?: string;
	containerId: ALERT_CONTAINER_IDS;
}

export interface SearchRouteParams {
	siteId: string;
}

export interface SearchRouteProps<Params = SearchRouteParams>
	extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
}

export interface SearchConfigurationRouteProps<Params = SearchRouteParams>
	extends RouteConfigComponentProps<Params> {
	siteId: string;
}
