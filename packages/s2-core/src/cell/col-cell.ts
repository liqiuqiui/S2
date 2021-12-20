import { Point, SimpleBBox } from '@antv/g-canvas';
import { isEmpty } from 'lodash';
import { isEqualDisplaySiblingNodeId } from './../utils/hide-columns';
import { HeaderCell } from './header-cell';
import { shouldAddResizeArea } from '@/utils/interaction/resize';
import {
  CellTypes,
  HORIZONTAL_RESIZE_AREA_KEY_PRE,
  KEY_GROUP_COL_RESIZE_AREA,
  ResizeAreaEffect,
  ResizeDirectionType,
  S2Event,
} from '@/common/constant';
import {
  CellBorderPosition,
  DefaultCellTheme,
  FormatResult,
  IconTheme,
  TextAlign,
  TextBaseline,
  TextTheme,
} from '@/common/interface';
import { AreaRange } from '@/common/interface/scroll';
import { ColHeaderConfig } from '@/facet/header/col';
import {
  getBorderPositionAndStyle,
  getTextAndFollowingIconPosition,
  getTextAndIconPositionWhenHorizontalScrolling,
} from '@/utils/cell/cell';
import { renderIcon, renderLine, renderRect } from '@/utils/g-renders';
import { isLastColumnAfterHidden } from '@/utils/hide-columns';
import {
  getOrCreateResizeAreaGroupById,
  getResizeAreaAttrs,
} from '@/utils/interaction/resize';

export class ColCell extends HeaderCell {
  protected headerConfig: ColHeaderConfig;

  protected textAndIconPositionWhenHorizontalScrolling: Point;

  public get cellType() {
    return CellTypes.COL_CELL;
  }

  protected initCell() {
    super.initCell();
    // 1、draw rect background
    this.drawBackgroundShape();
    // interactive background shape
    this.drawInteractiveBgShape();
    // draw text
    this.drawTextShape();
    // draw action icons
    this.drawActionIcons();
    // draw borders
    this.drawBorders();
    // draw resize ares
    this.drawResizeArea();
    this.addExpandColumnIconShapes();
    this.update();
  }

  protected drawBackgroundShape() {
    const { backgroundColor } = this.getStyle().cell;
    this.backgroundShape = renderRect(this, {
      ...this.getCellArea(),
      fill: backgroundColor,
    });
  }

  // 交互使用的背景色
  protected drawInteractiveBgShape() {
    this.stateShapes.set(
      'interactiveBgShape',
      renderRect(this, {
        ...this.getCellArea(),
        fill: 'transparent',
        stroke: 'transparent',
      }),
    );
  }

  protected getTextStyle(): TextTheme {
    const { isLeaf, isTotals } = this.meta;
    const { text, bolderText } = this.getStyle();
    const textStyle = isLeaf && !isTotals ? text : bolderText;
    const hideMeasureColumn =
      this.spreadsheet.options.style.colCfg.hideMeasureColumn;
    let textAlign: TextAlign;
    let textBaseline: TextBaseline;

    if (isLeaf && !hideMeasureColumn) {
      // 最后一个层级的非维值指标单元格，与 dataCell 对齐方式保持一致
      textAlign = this.theme.dataCell.text.textAlign;
      textBaseline = this.theme.dataCell.text.textBaseline;
    } else {
      textAlign = 'center';
      textBaseline = 'middle';
    }
    return { ...textStyle, textAlign, textBaseline };
  }

  protected getFormattedFieldValue(): FormatResult {
    const { label, key } = this.meta;
    const formatter = this.headerConfig.formatter(key);
    const content = formatter(label);
    return {
      formattedValue: content,
      value: label,
    };
  }

  protected getMaxTextWidth(): number {
    const { width } = this.getContentArea();
    return width - this.getActionIconsWidth();
  }

  protected getIconPosition(): Point {
    const { isLeaf } = this.meta;
    const iconStyle = this.getIconStyle();
    if (isLeaf) {
      return super.getIconPosition(this.getActionIconsCount());
    }
    const position = this.textAndIconPositionWhenHorizontalScrolling;

    const totalSpace =
      this.actualTextWidth +
      this.getActionIconsWidth() -
      iconStyle.margin.right;
    const startX = position.x - totalSpace / 2;
    return {
      x: startX + this.actualTextWidth + iconStyle.margin.left,
      y: position.y - iconStyle.size / 2,
    };
  }

  protected getTextPosition(): Point {
    const { isLeaf } = this.meta;
    const { width, scrollContainsRowHeader, cornerWidth, scrollX } =
      this.headerConfig;

    const textStyle = this.getTextStyle();
    const contentBox = this.getContentArea();
    const iconStyle = this.getIconStyle();

    if (isLeaf) {
      return getTextAndFollowingIconPosition(
        contentBox,
        textStyle,
        this.actualTextWidth,
        iconStyle,
        this.getActionIconsCount(),
      ).text;
    }

    // 将viewport坐标映射到 col header的坐标体系中，简化计算逻辑
    const viewport: AreaRange = {
      start: scrollX - (scrollContainsRowHeader ? cornerWidth : 0),
      width: width + (scrollContainsRowHeader ? cornerWidth : 0),
    };

    const textAndIconSpace =
      this.actualTextWidth +
      this.getActionIconsWidth() -
      iconStyle.margin.right;

    const startX = getTextAndIconPositionWhenHorizontalScrolling(
      viewport,
      { start: contentBox.x, width: contentBox.width },
      textAndIconSpace, // icon position 默认为 right
    );

    const textY = contentBox.y + contentBox.height / 2;
    this.textAndIconPositionWhenHorizontalScrolling = { x: startX, y: textY };
    return {
      x: startX - textAndIconSpace / 2 + this.actualTextWidth / 2,
      y: textY,
    };
  }

  protected getActionIconsWidth() {
    const { size, margin } = this.getStyle().icon;
    const iconCount = this.getActionIconsCount();
    return (size + margin.left) * iconCount + iconCount > 0 ? margin.right : 0;
  }

  protected getColResizeAreaKey() {
    return this.meta.key;
  }

  protected getColResizeArea() {
    return getOrCreateResizeAreaGroupById(
      this.spreadsheet,
      KEY_GROUP_COL_RESIZE_AREA,
    );
  }

  protected getHorizontalResizeAreaName() {
    return `${HORIZONTAL_RESIZE_AREA_KEY_PRE}${this.meta.key}`;
  }

  protected drawHorizontalResizeArea() {
    if (!this.shouldDrawResizeAreaByType('colCellVertical')) {
      return;
    }

    const { cornerWidth, width: headerWidth } = this.headerConfig;
    const { y, height } = this.meta;
    const resizeStyle = this.getResizeAreaStyle();
    const resizeArea = this.getColResizeArea();

    const resizeAreaName = this.getHorizontalResizeAreaName();

    const existedHorizontalResizeArea = resizeArea.find(
      (element) => element.attrs.name === resizeAreaName,
    );

    // 如果已经绘制当前列高调整热区热区，则不再绘制
    if (existedHorizontalResizeArea) {
      return;
    }

    const resizeAreaWidth = cornerWidth + headerWidth;
    // 列高调整热区
    resizeArea.addShape('rect', {
      attrs: {
        ...getResizeAreaAttrs({
          theme: resizeStyle,
          type: ResizeDirectionType.Vertical,
          id: this.getColResizeAreaKey(),
          effect: ResizeAreaEffect.Field,
          offsetX: 0,
          offsetY: y,
          width: resizeAreaWidth,
          height: height,
        }),
        name: resizeAreaName,
        x: 0,
        y: y + height - resizeStyle.size / 2,
        width: resizeAreaWidth,
      },
    });
  }

  protected drawVerticalResizeArea() {
    if (
      !this.meta.isLeaf ||
      !this.shouldDrawResizeAreaByType('colCellHorizontal')
    ) {
      return;
    }

    const { x, y, label, width, height, parent } = this.meta;
    const {
      scrollX,
      scrollY,
      position,
      scrollContainsRowHeader,
      cornerWidth,
      height: headerHeight,
      width: headerWidth,
    } = this.headerConfig;

    const resizeStyle = this.getResizeAreaStyle();
    const resizeArea = this.getColResizeArea();

    const resizeAreaBBox = {
      x: x + width - resizeStyle.size / 2,
      y,
      width: resizeStyle.size,
      height,
    };

    const resizeClipAreaBBox = {
      x: scrollContainsRowHeader ? -cornerWidth : 0,
      y: 0,
      width: scrollContainsRowHeader ? cornerWidth + headerWidth : headerWidth,
      height: headerHeight,
    };

    if (
      !shouldAddResizeArea(resizeAreaBBox, resizeClipAreaBBox, {
        scrollX,
        scrollY,
      })
    ) {
      return;
    }

    const offsetX = position.x + x - scrollX;
    const offsetY = position.y + y;

    // 列宽调整热区
    // 基准线是根据container坐标来的，因此把热区画在container
    resizeArea.addShape('rect', {
      attrs: {
        ...getResizeAreaAttrs({
          theme: resizeStyle,
          type: ResizeDirectionType.Horizontal,
          effect: ResizeAreaEffect.Cell,
          id: parent.isTotals ? '' : label,
          offsetX,
          offsetY,
          width,
          height,
        }),
        x: offsetX + width - resizeStyle.size / 2,
        y: offsetY,
        height,
      },
    });
  }

  // 绘制热区
  private drawResizeArea() {
    this.drawHorizontalResizeArea();
    this.drawVerticalResizeArea();
  }

  protected drawHorizontalBorder() {
    const { position, style } = getBorderPositionAndStyle(
      CellBorderPosition.TOP,
      this.meta as SimpleBBox,
      this.theme.colCell.cell,
    );

    renderLine(this, position, style);
  }

  protected drawVerticalBorder() {
    const { position, style } = getBorderPositionAndStyle(
      CellBorderPosition.RIGHT,
      this.meta as SimpleBBox,
      this.theme.colCell.cell,
    );
    renderLine(this, position, style);
  }

  protected drawBorders() {
    this.drawHorizontalBorder();
    this.drawVerticalBorder();
  }

  protected hasHiddenColumnCell() {
    const {
      interaction: { hiddenColumnFields = [] },
      tooltip: { operation },
    } = this.spreadsheet.options;

    const hiddenColumnsDetail = this.spreadsheet.store.get(
      'hiddenColumnsDetail',
      [],
    );

    if (
      isEmpty(hiddenColumnsDetail) ||
      isEmpty(hiddenColumnFields) ||
      !operation.hiddenColumns
    ) {
      return false;
    }
    return !!hiddenColumnsDetail.find((column) =>
      isEqualDisplaySiblingNodeId(column?.displaySiblingNode, this.meta.id),
    );
  }

  private getExpandIconTheme(): IconTheme {
    const themeCfg = this.getStyle() as DefaultCellTheme;
    return themeCfg.icon;
  }

  private addExpandColumnSplitLine() {
    const { x, y, width, height } = this.meta;
    const {
      horizontalBorderColor,
      horizontalBorderWidth,
      horizontalBorderColorOpacity,
    } = this.theme.splitLine;
    const lineX = this.isLastColumn() ? x + width - horizontalBorderWidth : x;

    renderLine(
      this,
      {
        x1: lineX,
        y1: y,
        x2: lineX,
        y2: y + height,
      },
      {
        stroke: horizontalBorderColor,
        lineWidth: horizontalBorderWidth,
        strokeOpacity: horizontalBorderColorOpacity,
      },
    );
  }

  private addExpandColumnIconShapes() {
    if (!this.hasHiddenColumnCell()) {
      return;
    }
    this.addExpandColumnSplitLine();
    this.addExpandColumnIcon();
  }

  private addExpandColumnIcon() {
    const iconConfig = this.getExpandColumnIconConfig();
    const icon = renderIcon(this, {
      ...iconConfig,
      name: 'ExpandColIcon',
      cursor: 'pointer',
    });
    icon.on('click', () => {
      this.spreadsheet.emit(S2Event.LAYOUT_TABLE_COL_EXPANDED, this.meta);
    });
  }

  // 在隐藏的下一个兄弟节点的起始坐标显示隐藏提示线和展开按钮, 如果是尾元素, 则显示在前一个兄弟节点的结束坐标
  private getExpandColumnIconConfig() {
    const { size } = this.getExpandIconTheme();
    const { x, y, width, height } = this.getCellArea();

    const baseIconX = x - size;
    const iconX = this.isLastColumn() ? baseIconX + width : baseIconX;
    const iconY = y + height / 2 - size / 2;

    return {
      x: iconX,
      y: iconY,
      width: size * 2,
      height: size,
    };
  }

  private isLastColumn() {
    return isLastColumnAfterHidden(this.spreadsheet, this.meta.id);
  }
}