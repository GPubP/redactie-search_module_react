import { akitaDevtools } from '@datorama/akita';

import { registerTranslations } from './lib/i18next';
import { registerRoutes } from './lib/search.routes';

akitaDevtools();
registerTranslations();
registerRoutes();
