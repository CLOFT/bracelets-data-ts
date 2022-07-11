import { getColumnsPosition } from './column-info.js';
import { columns } from '../../domain/columns.js'; // row columns to be sent

export const parseRow = (columnInfo, row) => {
  const columnsIndexes = getColumnsPosition(columnInfo);
  const data = row.Data;

  const rowData = columnsIndexes.map((i) => data[i]);

  let result = JSON.parse(rowData[columns.indexOf('measureValue')].ScalarValue);
  result.time = rowData[columns.indexOf('time')].ScalarValue;

  return result;
};
