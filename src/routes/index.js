// load config
import constants from '../config/index.js';


// Route HTTP requests
export default router = async (event) => {
  const path = event.routeKey; // path

  switch (path) {
    case `GET ${constants.ROUTE_KEY_BASE}/{serialNumber}`:
      // TODO : implement handler
      break;
    default:
      return {
        statusCode: 404,
        message: 'Not found',
      };
  }
};
