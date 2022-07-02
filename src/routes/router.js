// load config
import { constants } from '../config';

// Route HTTP requests
export const router = async (event) => {
  const routeKey = event.routeKey; // request routeKey

  switch (routeKey) {
    case `GET ${constants.ROUTE_KEY_BASE}/{serialNumber}`:
      // TODO : implement endpoint handler
      break;

    default:
      return {
        statusCode: 404,
        message: 'Not found',
      };
  }
};
