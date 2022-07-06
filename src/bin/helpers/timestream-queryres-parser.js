// Imports
import { parseRow } from './timestream-row-parser.js';

// Parse Timestream query result
export const parseQueryResult = (queryResult) => {
  const columnInfo = queryResult.ColumnInfo;
  const rows = queryResult.Rows;

  let data = [];
  rows.forEach((row) => {
    let parsedRow = parseRow(columnInfo, row);
    data.push(parsedRow);
  });

  return data;
};
