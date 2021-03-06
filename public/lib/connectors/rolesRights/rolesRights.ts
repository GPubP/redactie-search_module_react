import Core from '@redactie/redactie-core';
import { RolesRightsModuleAPI } from '@redactie/roles-rights-module';

class RolesRightsConnector {
	public apiName = 'roles-rights-module';
	public securityRights = {
		contentReindex: 'content_reindex',
	};
	public api: RolesRightsModuleAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<RolesRightsModuleAPI>(this.apiName);
	}

	public get hooks(): RolesRightsModuleAPI['hooks'] {
		return this.api.hooks;
	}

	public get facade(): RolesRightsModuleAPI['store']['roles']['service'] {
		return this.api.store.roles.service;
	}
}

const rolesRightsConnector = new RolesRightsConnector();

export default rolesRightsConnector;
