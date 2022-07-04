// load env
import constants from '../config/index.js';

// helpers
import { removeNewLines, parseRow } from '../bin/index.js';

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
    res = parseRow(queryResult.ColumnInfo, queryResult.Rows[0].Data);
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
  // TODO : LIMIT 1 result for given serial number
};

const braceletsDataService = {
  getLastBySerialNumber,
};

export default braceletsDataService;
