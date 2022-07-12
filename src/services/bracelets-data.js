// load env
import constants from '../config/index.js';

// helpers
import { removeNewLines, parseQueryResult } from '../bin/index.js';

import {
  TimestreamQueryClient,
  QueryCommand,
} from '@aws-sdk/client-timestream-query';

const client = new TimestreamQueryClient({
  region: constants.REGION,
  credentials: {
    accessKeyId: constants.ACCESS_KEY_ID,
    secretAccessKey: constants.SECRET_ACCESS_KEY,
  },
});

const getLastBySerialNumber = async (serialNumber) => {
  let res = null;
  try {
    const input = {
      QueryString: removeNewLines(`
        SELECT * FROM "${constants.DATABASE_NAME}"."${constants.TABLE_NAME}"
        WHERE bracelet_id = '${serialNumber}'
        ORDER BY time DESC
        LIMIT 1`),
    };
    const command = new QueryCommand(input);
    let queryResult = await client.send(command);
    res = parseQueryResult(queryResult);
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
};

const getLastDayData = async () => {
  let res = null;
  try {
    const input = {
      QueryString: removeNewLines(`
        SELECT * FROM "${constants.DATABASE_NAME}"."${constants.TABLE_NAME}"
        WHERE time between ago(1d) and now()`),
    };
    const command = new QueryCommand(input);
    let queryResult = await client.send(command);
    res = parseQueryResult(queryResult);
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
};

const getCurrentWeekData = async (serialNumber) => {
  let res = null;
  try {
    // get current day of week
    const currentDay = new Date().getUTCDay();

    if (currentDay == 1) return await getLastBySerialNumber(serialNumber);

    const input = {
      QueryString: removeNewLines(`
        SELECT * FROM "${constants.DATABASE_NAME}"."${constants.TABLE_NAME}"
        WHERE bracelet_id = '${serialNumber}
        AND time between ago(${currentDay - 1}d) and now()
        ORDER BY time DESC
        `),
    };
    const command = new QueryCommand(input);
    let queryResult = await client.send(command);
    res = parseQueryResult(queryResult);
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
};

const braceletsDataService = {
  getLastBySerialNumber,
  getLastDayData,
  getCurrentWeekData,
};

export default braceletsDataService;
