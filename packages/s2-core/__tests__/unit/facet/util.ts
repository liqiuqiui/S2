import { assembleDataCfg } from 'tests/util';
import { transformIndexesData } from '@/utils/dataset/pivot-data-set';

/**
 * 获取 Mock 数据
 */
export function getMockPivotMeta() {
  const sortedDimensionValues = {};
  const rawRowPivotMeta = new Map();
  const rawColPivotMeta = new Map();
  const rawIndexesData = [];
  const { fields, data } = assembleDataCfg();
  return transformIndexesData({
    rows: fields.rows,
    columns: fields.columns,
    values: fields.values,
    originData: data,
    indexesData: rawIndexesData,
    sortedDimensionValues,
    rowPivotMeta: rawRowPivotMeta,
    colPivotMeta: rawColPivotMeta,
  });
}
