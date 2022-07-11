import { useObservable } from '@mindspace-io/react';
import { LoadingState, Page } from '@redactie/utils';

import { indexesFacade, IndexModel } from '../../store/indexes';

const useIndexes = (): [LoadingState, IndexModel[] | null | undefined, Page | null | undefined] => {
	const [loading] = useObservable(indexesFacade.isFetching$, LoadingState.Loading);
	const [indexes] = useObservable(indexesFacade.indexes$, null);
	const [indexesPaging] = useObservable(indexesFacade.meta$, null);
	const [error] = useObservable(indexesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, indexes, indexesPaging];
};

export default useIndexes;
