import { LoadingState } from '@redactie/utils';

import { IndexModel } from '../../store/indexes';

export type UseIndex = {
	fetchingState: LoadingState;
	upsertingState: LoadingState;
	removingState: LoadingState;
	index: IndexModel | undefined;
};
