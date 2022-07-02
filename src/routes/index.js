// load config
import constants from '../config/index.js';

// load service
import braceletsDataService from '../services/bracelets-data.js';

// Route HTTP requests
const router = async (event) => {
  const path = event.routeKey; // path
  let result;
  switch (path) {
    case `GET ${constants.ROUTE_KEY_BASE}/{serialNumber}`:
      result = await braceletsDataService.getLastBySerialNumber(
        event.pathParameters.serialNumber
      );
      break;
    default:
      return {
        statusCode: 404,
        message: 'Not found',
      };
  }
};

export default router;
