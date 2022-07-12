// load config
import constants from '../config/index.js';

// load service
import braceletsDataService from '../services/bracelets-data.js';

// Route HTTP requests
const router = async (event, services) => {
  const path = event.routeKey; // path
  let result = null; // return result

  // Switch by path
  switch (path) {
    case `GET ${constants.ROUTE_KEY_BASE}/{serialNumber}`:
      result = await braceletsDataService.getLastBySerialNumber(
        event.pathParameters.serialNumber
      );
      break;
    case `GET ${constants.ROUTE_KEY_BASE}`:
      if (event.queryStringParameters != undefined) {
        if (event.queryStringParameters.method != undefined) {
          const method = event.queryStringParameters.method;
          if (method == 'lastDay') {
            console.log('Info: Retrieving last day data ...');
            result = await braceletsDataService.getLastDayData();
          }
        }
      }
      break;
    case `GET ${constants.ROUTE_KEY_BASE}/CurrentWeek/{serialNumber}`:
      // TODO : implement method to get current week data
      result = await braceletsDataService.getCurrentWeekData(
        event.pathParameters.serialNumber
      );
        break;
    default:
      return {
        statusCode: 404,
        message: 'Not found',
      };
  }
  return result;
};

export default router;
