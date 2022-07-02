// imports
import { router } from './routes/router';

// Lambda Handler
export const handler = async (event) => {
  // TODO : use router
  await router(event);
};
