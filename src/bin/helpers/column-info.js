const columns = [
  'bracelet_id',
  'measure_name',
  'time',
  'measure_value::varchar',
]; // interested columns

export const getColumnsPosition = (columnInfo) => {
  let result = [];
  columns.map((c, cIndex) => {
    columnInfo.forEach((info, index) => {
      if (info.Name === c) result.push(index);
    });
  });
  return result;
};
