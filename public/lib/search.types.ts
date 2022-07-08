import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { ContextHeaderTab } from '@redactie/utils';

import { ALERT_CONTAINER_IDS } from './search.const';
import { IndexModel } from './store/indexes';
import { IndexDetailFormValues } from './views/IndexDetailSettings/IndexDetailSettings.types';

export interface SearchModuleRouteProps<
	Params extends { [K in keyof Params]?: string } = Record<string, string | undefined>
> extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface SearchMatchProps {
	siteId: string;
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

export interface NavRights {
	canRead: boolean;
	canUpdate: boolean;
}

export interface IndexDetailRouteProps<Params = Record<string, unknown>>
	extends RouteConfigComponentProps<Params> {
	isCreating?: boolean;
	loading: boolean;
	rights: NavRights;
	onSubmit: (values: IndexDetailFormValues) => Promise<void>;
	onCancel: () => void;
	onSuccess?: () => void;
	index: IndexModel;
}
