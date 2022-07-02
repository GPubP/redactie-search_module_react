import { LoadingState, useObservable } from '@redactie/utils';

import { indexesFacade } from '../../store/indexes';

import { UseIndex } from './useIndex.types';

const useIndex = (): UseIndex => {
	const isFetching = useObservable(indexesFacade.isFetchingOne$, LoadingState.Loading);
	const isUpdating = useObservable(indexesFacade.isUpdating$, LoadingState.Loaded);
	const isCreating = useObservable(indexesFacade.isCreating$, LoadingState.Loaded);
	const isRemoving = useObservable(indexesFacade.isRemoving$, LoadingState.Loaded);
	const index = useObservable(indexesFacade.index$);
	const error = useObservable(indexesFacade.error$);

	const upsertingState = [isUpdating, isCreating].includes(LoadingState.Loading)
		? LoadingState.Loading
		: LoadingState.Loaded;

	const fetchingState = error ? LoadingState.Error : isFetching;
	const removingState = error ? LoadingState.Error : isRemoving;

	return {
		fetchingState,
		upsertingState,
		removingState,
		index,
	};
};

export default useIndex;
