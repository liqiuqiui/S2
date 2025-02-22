import {
  DataCell,
  FrozenFacet,
  FrozenGroupArea,
  InteractionStateName,
  S2Event,
  S2_PREFIX_CLS,
  type Point,
} from '@antv/s2';
import { get, pick, throttle } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { useSpreadSheetInstance } from '../../../../context/SpreadSheetContext';
import './drag-copy-mask.less';

type DragCopyProps = {
  onCopyFinished?: () => void;
};

export const DragCopyMask = memo(({ onCopyFinished }: DragCopyProps) => {
  const s2 = useSpreadSheetInstance();

  const [startCell, setStartCell] = useState<DataCell>();
  const [maskPosition, setMaskPosition] = useState({ right: 0, bottom: 0 });
  const [dragPoint, setDragPoint] = useState<Point>();

  const isInCell = (point: Point, cell: DataCell) => {
    const cellMeta = pick(cell.getMeta(), [
      'x',
      'y',
      'width',
      'height',
      'fieldValue',
    ]);
    const scrollOffset = s2.facet.getScrollOffset();
    const sampleColNode = s2.facet.getColNodes()[0];
    const sampleColNodeHeight = sampleColNode?.height || 0;
    // 点位偏移
    const pointX = point.x;
    const pointY = point.y;
    const scrollOffsetY = scrollOffset?.scrollY - sampleColNodeHeight;
    const cellMaxX = cellMeta.x - scrollOffset.scrollX + cellMeta.width + 4;
    const cellMinX = cellMeta.x - scrollOffset.scrollX;
    const cellMaxY = cellMeta.y - scrollOffsetY + cellMeta.height + 4;
    const cellMinY = cellMeta.y - scrollOffsetY;

    return (
      cellMaxX >= pointX &&
      cellMinX < pointX &&
      cellMaxY >= pointY &&
      cellMinY < pointY
    );
  };

  /** 判断当前位置是否在表格可视区域内 */
  const judgePointInView = (point: Point) => {
    const rect = s2.getCanvasElement().getBoundingClientRect();
    const frozenGroupAreas = (s2.facet as FrozenFacet).frozenGroupAreas;
    const viewMinX = rect.x;
    const viewMaxX = rect.x + rect.width;
    // 减去列头高度
    const viewMinY = rect.y + frozenGroupAreas[FrozenGroupArea.Row].height;
    const viewMaxY = rect.y + rect.height;

    return (
      point.x <= viewMaxX &&
      point.x >= viewMinX &&
      point.y <= viewMaxY &&
      point.y >= viewMinY
    );
  };

  const getCurrentHoverCell = (event: MouseEvent) => {
    const rect = s2.getCanvasElement().getBoundingClientRect();
    const allCells = s2.facet.getDataCells();

    return allCells.find((dataCell) =>
      isInCell({ y: event.y - rect.y, x: event.x - rect.x }, dataCell),
    );
  };

  const getSelectedCellRange = (startCell: DataCell, endCell: DataCell) => {
    const startCellMeta = startCell.getMeta();
    const endCellMeta = endCell?.getMeta();
    const minX = Math.min(startCellMeta.colIndex, endCellMeta.colIndex);
    const maxX = Math.max(startCellMeta.colIndex, endCellMeta.colIndex);
    const maxY = Math.max(startCellMeta.rowIndex, endCellMeta.rowIndex);
    const minY = Math.min(startCellMeta.rowIndex, endCellMeta.rowIndex);
    const allCells = s2.facet.getDataCells();

    return allCells.filter((item) => {
      const itemMeta = item.getMeta();

      return (
        itemMeta.rowIndex <= maxY &&
        itemMeta.rowIndex >= minY &&
        itemMeta.colIndex <= maxX &&
        itemMeta.colIndex >= minX
      );
    });
  };

  // 利用闭包记录最近一次hover位置,防止鼠标拖拽越界报错
  const lastHoverPoint = { x: 0, y: 0 };

  const dragMove = throttle((event: MouseEvent) => {
    if (!startCell) {
      return;
    }

    let targetCell = getCurrentHoverCell(event);
    let newX = event.x - dragPoint!.x;
    let newY = event.y - dragPoint!.y;

    // 判断鼠标是否在表格可视区域，不在的话使用最近一次hover位置
    if (!judgePointInView(event)) {
      targetCell = getCurrentHoverCell(lastHoverPoint as MouseEvent);
      newX = lastHoverPoint.x - dragPoint!.x;
      newY = lastHoverPoint.y - dragPoint!.y;
    } else {
      lastHoverPoint.x = event.x;
      lastHoverPoint.y = event.y;
    }

    setMaskPosition({ right: newX, bottom: newY });
    const selectedRange = getSelectedCellRange(startCell, targetCell!);

    // 更改选中状态
    s2.interaction.changeState({
      cells: selectedRange.map((v) => v.getMeta() as any),
      stateName: InteractionStateName.PREPARE_SELECT,
      force: true,
    });
  }, 10);

  const dragMouseUp = async (event: MouseEvent) => {
    if (!startCell) {
      return;
    }

    const targetCell =
      getCurrentHoverCell(event) ||
      getCurrentHoverCell(lastHoverPoint as MouseEvent);

    const displayData = s2.dataSet.getDisplayDataSet();

    const selectedRange = getSelectedCellRange(startCell, targetCell!);
    const { fieldValue } = startCell.getMeta();
    const changedCells = selectedRange.map((item) => {
      const { rowIndex, valueField } = item.getMeta();

      if (
        displayData[rowIndex] &&
        typeof displayData[rowIndex][valueField] !== 'undefined'
      ) {
        displayData[rowIndex][valueField] = fieldValue;
      }

      return item;
    });

    // 更改选中状态
    s2.interaction.changeState({
      cells: changedCells.map((v) => v.getMeta() as any),
      stateName: InteractionStateName.PREPARE_SELECT,
      force: true,
    });
    await s2.render(true);

    setMaskPosition({ right: 0, bottom: 0 });
    s2.off(S2Event.GLOBAL_MOUSE_MOVE, dragMove);
    s2.off(S2Event.GLOBAL_MOUSE_UP, dragMouseUp);
    setStartCell(undefined);
    onCopyFinished?.();
  };

  useEffect(() => {
    if (startCell) {
      s2.on(S2Event.GLOBAL_MOUSE_MOVE, dragMove);
      s2.on(S2Event.GLOBAL_MOUSE_UP, dragMouseUp);
    }
  }, [startCell]);

  const dragMouseDown = (event: MouseEvent) => {
    if (get(event, 'target.id') !== 'spreadsheet-drag-copy-point') {
      return;
    }

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const { top, left } = get(event, 'target.style', {}) as {
      top: string;
      left: string;
    };
    const allCells = s2.facet.getDataCells();
    const targetCell = allCells.find((v) =>
      isInCell({ y: parseFloat(top), x: parseFloat(left) }, v),
    );

    setDragPoint({ x: rect.x, y: rect.y });
    setStartCell(targetCell as DataCell);
  };

  useEffect(() => {
    const pointElement = document.getElementById('spreadsheet-drag-copy-point');

    if (pointElement && s2) {
      pointElement.addEventListener('mousedown', dragMouseDown);
    }

    return () => {
      pointElement?.removeEventListener('mousedown', dragMouseDown);
    };
  }, [s2]);

  return (
    <div
      className={`${S2_PREFIX_CLS}-drag-copy-mask`}
      style={{
        right: maskPosition.right > 0 ? maskPosition.right : 0,
        bottom: maskPosition.bottom > 0 ? maskPosition.bottom : 0,
        left: maskPosition.right <= 0 ? maskPosition.right : 0,
        top: maskPosition.bottom <= 0 ? maskPosition.bottom : 0,
        width: Math.abs(maskPosition.right),
        height: Math.abs(maskPosition.bottom),
      }}
    ></div>
  );
});
