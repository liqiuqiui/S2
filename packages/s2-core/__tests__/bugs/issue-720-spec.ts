/**
 * @description spec for issue #720
 * https://github.com/antvis/S2/issues/720
 * Sync row scroll offset when corner cell resized
 *
 */
import { S2Event } from '@/common/constant';
import type { S2Options } from '@/common/interface';
import { PivotSheet, SpreadSheet } from '@/sheet-type';
import * as mockDataConfig from 'tests/data/simple-data.json';
import { getContainer } from 'tests/util/helpers';

const s2Options: S2Options = {
  width: 200,
  height: 200,
  style: {
    colCell: {
      height: 60,
    },
    dataCell: {
      width: 100,
      height: 50,
    },
  },
};

describe('Sync Row Scroll Offset Tests', () => {
  let s2: SpreadSheet;

  beforeEach(async () => {
    s2 = new PivotSheet(getContainer(), mockDataConfig, s2Options);
    await s2.render();
  });

  test('should not reset row scroll bar offset when resize end', async () => {
    s2.store.set('rowHeaderScrollX', 20);
    await s2.render(false);

    s2.emit(S2Event.LAYOUT_RESIZE_MOUSE_DOWN, {
      originalEvent: {},
      preventDefault() {},
      target: {
        attr: () => {
          return {
            isResizeArea: true,
          };
        },
      },
    } as any);

    s2.emit(S2Event.GLOBAL_MOUSE_UP, {
      preventDefault() {},
      target: {
        attr: () => {
          return {
            isResizeArea: true,
          };
        },
      },
    } as any);

    expect(s2.store.get('rowHeaderScrollX')).not.toEqual(0);
  });
});
