/**
 * @description spec for issue #565
 * https://github.com/antvis/S2/issues/565
 * #asyncGetAllPlainData error in tree mode
 *
 */
import { PivotSheet } from '@/sheet-type';
import { asyncGetAllPlainData } from '@/utils';
import * as mockDataConfig from 'tests/data/data-issue-565.json';
import { getContainer } from 'tests/util/helpers';
import { TAB_SEPARATOR, type S2Options } from '../../src';

const s2Options: S2Options = {
  width: 800,
  height: 600,
  hierarchyType: 'tree',
};

describe('Export data in pivot tree mode', () => {
  test('should export correct col header in pivot tree mode', async () => {
    const s2 = new PivotSheet(getContainer(), mockDataConfig, s2Options);

    await s2.render();

    const data = await asyncGetAllPlainData({
      sheetInstance: s2,
      split: TAB_SEPARATOR,
    });
    const rows = data.split('\n');

    expect(rows.length).toEqual(9);
    expect(rows[0].split('\t').length).toEqual(5);
    expect(rows[0].split('\t')[0]).toEqual('');
    expect(rows[1].split('\t')[0]).toEqual('');
    expect(rows[7].split('\t')[0]).toEqual('row0');
    expect(rows[8].split('\t')[0]).toEqual('row0');
    expect(data).toMatchSnapshot();
  });
});
