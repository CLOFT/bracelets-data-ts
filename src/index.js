// imports
import router from './routes/index.js';

// Lambda Handler
export const handler = async (event) => {
  // TODO : use router
  await router(event);
};
