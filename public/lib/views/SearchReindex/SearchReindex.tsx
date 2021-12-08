import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { AlertContainer, alertService } from '@redactie/utils';
import React, { FC, useState } from 'react';

import { useRoutesBreadcrumbs } from '../../hooks/useRoutesBreadcrumbs';
import { SEARCH_ALERT_CONTAINER_IDS } from '../../search.const';
import { SearchMatchProps, SearchModuleRouteProps } from '../../search.types';
import { searchFacade } from '../../store/search/search.facade';

const SearchReindex: FC<SearchModuleRouteProps<SearchMatchProps>> = ({ match }) => {
	const breadcrumbs = useRoutesBreadcrumbs();
	const [disabled, setDisabled] = useState<boolean>(false);
	const { siteId } = match.params;

	/**
	 * Functions
	 */

	const triggerReindex = async (): Promise<void> => {
		alertService.dismiss();

		setDisabled(true);
		await searchFacade.triggerReindex(siteId);
		setDisabled(false);
	};

	/**
	 * Render
	 */
	return (
		<>
			<ContextHeader title="Elastic Search Herindexering">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={SEARCH_ALERT_CONTAINER_IDS.reindex}
				/>
				<Button
					onClick={() => {
						triggerReindex();
					}}
					disabled={disabled}
					ariaLabel="Trigger reindex in Elastic"
					type="primary"
					htmlType="button"
				>
					Herindexeer
				</Button>
			</Container>
		</>
	);
};

export default SearchReindex;
