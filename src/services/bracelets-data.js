// load env
import constants from '../config/index.js';

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

const getAllData = async () => {
  let res = null;
  try {
    const input = {
      QueryString: `SELECT * FROM "${constants.DATABASE_NAME}"."${constants.TABLE_NAME}" ORDER BY time DESC`,
    };
    const command = new QueryCommand(input);
    res = await client.send(command);
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
};

const getLastBySerialNumber = async (serialNumber) => {
  const data = await getAllData();
  console.log(data.Rows[0].Data);
  // TODO : LIMIT 1 result for given serial number
};

const braceletsDataService = {
  getLastBySerialNumber,
};

export default braceletsDataService;
