import { useObservable } from '@mindspace-io/react';
import { LoadingState, Page } from '@redactie/utils';

import { IndexContentTypeModel, indexContentTypesFacade } from '../../store/index-content-types';

const useEnabledIndexContentTypes = (): [
	LoadingState,
	IndexContentTypeModel | null | undefined,
	Page | null | undefined
] => {
	const [loading] = useObservable(
		indexContentTypesFacade.selectItemIsFetching('enabledContentTypes'),
		LoadingState.Loading
	);
	const [contentTypes] = useObservable(
		indexContentTypesFacade.selectItemValue('enabledContentTypes'),
		null
	);
	const [indexesPaging] = useObservable(indexContentTypesFacade.enabledContentTypesMeta$, null);
	const [error] = useObservable(
		indexContentTypesFacade.selectItemError('enabledContentTypes'),
		null
	);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, contentTypes, indexesPaging];
};

export default useEnabledIndexContentTypes;
