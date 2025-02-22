/* eslint-disable import/order */
// eslint-disable-next-line prettier/prettier
import {
  getExistValues,
  transformIndexesData,
} from '@/utils/dataset/pivot-data-set';
import { assembleDataCfg } from '../../util';

/**
 * 获取 Mock 数据
 */
export function getMockPivotMeta() {
  const sortedDimensionValues = {};
  const rawRowPivotMeta = new Map();
  const rawColPivotMeta = new Map();

  const { fields, data } = assembleDataCfg();
  const rawIndexesData = {};

  return transformIndexesData({
    rows: fields.rows as string[],
    columns: fields.columns as string[],
    values: fields.values as string[],
    data,
    indexesData: rawIndexesData,
    sortedDimensionValues,
    rowPivotMeta: rawRowPivotMeta,
    colPivotMeta: rawColPivotMeta,
    valueInCols: true,
    getExistValuesByDataItem: getExistValues,
  });
}
