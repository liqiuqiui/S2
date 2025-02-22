/**
 * @description spec for issue #860
 * https://github.com/antvis/S2/issues/860
 * Column should not be formatted
 *
 */
import type { S2Options } from '@/common/interface';
import { PivotSheet, SpreadSheet } from '@/sheet-type';
import { getContainer } from 'tests/util/helpers';
import dataCfg from '../data/data-issue-860.json';

const s2Options: S2Options = {
  width: 600,
  height: 400,
  frozen: {
    rowHeader: false,
  },
};

describe('Empty String Row Value Tests', () => {
  let s2: SpreadSheet;

  beforeEach(async () => {
    s2 = new PivotSheet(getContainer(), dataCfg, s2Options);
    await s2.render();
  });

  test('should get correct row hierarchy with empty row node', () => {
    const layoutResult = s2.facet.getLayoutResult();

    expect(layoutResult.rowNodes).toHaveLength(7);
    expect(layoutResult.rowLeafNodes).toHaveLength(4);
  });
});
