import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { indexesFacade, IndexModel } from '../../store/indexes';

const useIndexes = (): [LoadingState, IndexModel[] | null | undefined] => {
	const [loading] = useObservable(indexesFacade.isFetching$, LoadingState.Loading);
	const [indexes] = useObservable(indexesFacade.indexes$, null);
	const [error] = useObservable(indexesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, indexes];
};

export default useIndexes;
