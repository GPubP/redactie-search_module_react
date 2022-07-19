import { useObservable } from '@mindspace-io/react';
import { LoadingState, Page } from '@redactie/utils';

import { IndexContentTypeModel, indexContentTypesFacade } from '../../store/index-content-types';

const useDisabledIndexContentTypes = (): [
	LoadingState,
	IndexContentTypeModel | null | undefined,
	Page | null | undefined
] => {
	const [loading] = useObservable(
		indexContentTypesFacade.selectItemIsFetching('disabledContentTypes'),
		LoadingState.Loading
	);
	const [contentTypes] = useObservable(
		indexContentTypesFacade.selectItemValue('disabledContentTypes'),
		null
	);
	const [indexesPaging] = useObservable(indexContentTypesFacade.disabledContentTypesMeta$, null);
	const [error] = useObservable(
		indexContentTypesFacade.selectItemError('disabledContentTypes'),
		null
	);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, contentTypes, indexesPaging];
};

export default useDisabledIndexContentTypes;
