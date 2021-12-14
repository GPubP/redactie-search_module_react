import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface SearchModuleRouteProps<Params extends { [K in keyof Params]?: string } = {}>
	extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface SearchMatchProps {
	siteId: string;
	workflowUuid?: string;
}
