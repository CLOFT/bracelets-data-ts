// imports
import router from './routes/index.js';

// Lambda Handler
export const handler = async (event) => {
  return await router(event);
};
