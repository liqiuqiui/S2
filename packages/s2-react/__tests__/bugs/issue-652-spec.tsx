/**
 * @description spec for issue #652
 * https://github.com/antvis/S2/issues/652
 * Wrong table width and height when enable adaptive
 *
 */
import { SheetComponent } from '@/components/sheets';
import type { SheetComponentProps } from '@/components/sheets/interface';
import type { SheetType } from '@antv/s2';
import { waitFor } from '@testing-library/react';
import React from 'react';
import * as mockDataConfig from 'tests/data/simple-data.json';
import { renderComponent } from '../util/helpers';

const s2Options: SheetComponentProps['options'] = {
  width: 400,
  height: 400,
};

function MainLayout({ sheetType, adaptive }: Partial<SheetComponentProps>) {
  return (
    <SheetComponent
      sheetType={sheetType}
      dataCfg={mockDataConfig}
      options={s2Options}
      themeCfg={{ name: 'default' }}
      adaptive={adaptive}
    />
  );
}

describe('SheetComponent Correct Render Tests', () => {
  const sheets: Array<{ sheetType: SheetType; adaptive: boolean }> = [
    { sheetType: 'pivot', adaptive: false },
    { sheetType: 'table', adaptive: false },
    { sheetType: 'gridAnalysis', adaptive: false },
    { sheetType: 'editable', adaptive: false },
    { sheetType: 'pivot', adaptive: true },
    { sheetType: 'table', adaptive: true },
    { sheetType: 'gridAnalysis', adaptive: true },
    { sheetType: 'editable', adaptive: true },
  ];

  test.each(sheets)(
    'should correct render %o with empty options',
    async ({ sheetType, adaptive }) => {
      function render() {
        renderComponent(
          <MainLayout sheetType={sheetType} adaptive={adaptive} />,
        );
      }

      await waitFor(() => {
        expect(render).not.toThrow();
      });
    },
  );
});
