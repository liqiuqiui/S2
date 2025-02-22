---
title: 表组件
order: 0
tag: Updated
---

## React 表组件 <Badge>@antv/s2-react</Badge>

基于 `@antv/s2` 封装的 `React` 版开箱即用的组件 `<SheetComponent />`

```tsx | pure
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';

<SheetComponent sheetType="pivot" />
```

### SpreadsheetProps

功能描述： React SheetComponent 组件的 props 参数

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| sheetType | 表格类型：<br/> 1. `pivot`: 透视表 <br/> 2. `table`: 明细表 <br> 3. `gridAnalysis`: 网格分析表 <br/> 4. `strategy`: 趋势分析表 <br/> 5. `editable`: 编辑表 | `pivot \| table \| gridAnalysis \| strategy \| editable` | `pivot` |  |
| spreadsheet | 自定义表 | (container: `HTMLElement \| string`, dataCfg: [S2DataConfig](/api/general/s2-data-config), options: [SheetComponentOptions](#sheetcomponentoptions)) => [SpreadSheet](/api/basic-class/spreadsheet) |  |  |
| dataCfg | 透视表数据映射相关配置项 | [S2DataConfig](/api/general/s2-data-config) |  | ✓ |
| options | 透视表属性配置项 | [SheetComponentOptions](#sheetcomponentoptions) |  | ✓ |
| partDrillDown | 维度下钻相关属性 | [PartDrillDown](/api/components/drill-down) |  |  |
| adaptive | 是否根据窗口大小自适应 | `boolean \| { width?: boolean, height?: boolean, getContainer: () => HTMLElement }` | `false` |  |
| themeCfg | 自定义透视表主题样式 | [ThemeCfg](/api/general/s2-theme) |  |  |
| loading | 控制表格的加载状态 | `boolean` |  |  |
| header | 表头配置项 | [HeaderCfgProps](/api/components/header) |  |  |
| onRangeSort | 组内排序时触发回调事件 | (params: [SortParam[]](#sortparam) ) => void; |  |  |
| onRowCellHover | 行头鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onRowCellClick | 行头鼠标单击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onRowCellDoubleClick | 行头鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onRowCellContextMenu | 行头右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onRowCellMouseDown | 行头鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onRowCellMouseUp | 行头鼠标放开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onRowCellMouseMove | 行头鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onRowCellCollapsed | 节点展开/收起事件回调 | ({ isCollapsed: `boolean`, collapseFields: `Record<string, boolean>`, node: [Node](/api/basic-class/node) }) => void; |  |  |
| onRowCellAllCollapsed | 节点全部展开/收起的事件回调 | (isCollapsed: boolean ) => void; |  |  |
| onRowCellScroll | 行头单元格滚动事件 | ({position: [CellScrollPosition](#cellscrollposition)} ) => void; |  |  |
| onRowCellRender | 行头单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| onRowCellSelected | 行头单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| onColCellHover | 列头鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onColCellClick | 列头鼠标单击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onColCellDoubleClick | 列头鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onColCellContextMenu | 列头右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onColCellMouseDown | 列头鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onColCellMouseUp | 列头鼠标松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onColCellMouseMove | 列头鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onColCellExpanded | 开启隐藏列头（tooltip.operation.hiddenColumns = true）后，列头展开的事件回调 | (expandedNode: [Node](/api/basic-class/node)) => void; |  |  |
| onColCellHidden | 开启隐藏列头（tooltip.operation.hiddenColumns = true）后，列头隐藏的事件回调 | ( data: { currentHiddenColumnsInfo:[HiddenColumnsInfo](#hiddencolumnsinfo); hiddenColumnsDetail:[HiddenColumnsInfo](#hiddencolumnsinfo)[]} ) => void; |  |  |
| onColCellRender | 列头单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| onColCellSelected | 列头单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| onDataCellHover | 数值单元格鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onDataCellClick | 数值单元格鼠标点击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onDataCellDoubleClick | 数值单元格双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onDataCellContextMenu | 数值单元格右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onDataCellMouseDown | 数值单元格鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onDataCellMouseUp | 数值单元格鼠标松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onDataCellMouseMove | 数值单元格鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onDataCellBrushSelection | 数值单元格刷选事件 | ( dataCells: [DataCell](/api/basic-class/base-cell)[] ) => void |  |  |
| onDataCellSelectMove | 数值单元格键盘方向键移动事件 | (metas: CellMeta[]) => void |  |  |
| onDataCellEditStart | 数值单元格编辑开始（暂只支持编辑表） | (meta: [ViewMeta](/api/basic-class/node), cell: [S2CellType](/api/basic-class/base-cell)) => void |  |  |
| onDataCellEditEnd | 数值单元格编辑完成（暂只支持编辑表） | (meta: [ViewMeta](/api/basic-class/node), cell: [S2CellType](/api/basic-class/base-cell)) => void |  |  |
| onDataCellRender | 数值单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| onDataCellSelected | 数值单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| onCornerCellHover | 角头鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onCornerCellClick | 角头鼠标单击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onCornerCellDoubleClick | 角头鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onCornerCellContextMenu | 角头右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onCornerCellMouseUp | 角头鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onCornerCellMouseUp | 角头鼠标松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onCornerCellMouseMove | 角头鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onCornerCellRender | 角头单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| onCornerCellSelected | 角头单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| onMergedCellsHover | 合并单元格鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onMergedCellsClick | 合并单元格鼠标点击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onMergedCellsDoubleClick | 合并单元格鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onMergedCellsContextMenu | 合并单元格右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onMergedCellsMouseDown | 合并单元格按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onMergedCellsMouseUp | 合并单元格松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onMergedCellsMouseMove | 合并单元格移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| onMergedCellsRender | 合并单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| onSeriesNumberCellRender | 序号单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| onRangeSort | 组内排序时触发回调事件（暂只支持透视表） | (params: [SortParam[]](#sortparam) ) => void; |  |  |
| onRangeSorted | 组内排序结束触发回调事件（暂只支持透视表） | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object) ) => void; |  |  |
| onRangeFilter | 筛选时触发回调事件 | (data: { filterKey: string; filteredValues: string[] } ) => void; |  |  |
| onRangeFiltered | 筛选结束触发回调事件 | (data: DataType[] ) => void; |  |  |
| onLayoutCellRender | 单个单元格布局渲染完成事件 | cell: [S2CellType](/api/basic-class/base-cell) |  |  |
| onLayoutAfterHeaderLayout | 表头布局结构准备完成事件 | (layoutResult: [LayoutResult](/zh/docs/api/general/s2-options/#layoutresult) ) => void; |  |  |
| onLayoutPagination | 分页事件 | ({ pageSize: number; pageCount: number; total: number; current: number;} ) => void; |  |  |
| onLayoutCellScroll | 单元格滚动事件 (**已废弃，请使用 `onScroll` 代替**) | ({position: [CellScrollPosition](#cellscrollposition)} ) => void; |  |  |
| onLayoutAfterCollapseRows | 树状模式下收起行头后的事件回调 | ({ collapseFields: `Record<string, boolean>`, meta: [Node](/api/basic-class/node) }) => void; |  |  |
| onBeforeRender | 开始 render 前的事件 | () => void; |  |  |
| onAfterRender | render 完成的事件 | () => void; |  |  |
| onMounted | 组件层表格挂载完成事件，可拿到表实例 [详情](/manual/advanced/get-instance) | (spreadsheet: [SpreadSheet](/api/basic-class/spreadsheet)) => void; |  |  |
| onUpdate | 组件层表格更新事件，当 `数据 (S2DataConfig)` 或 `配置 (S2Options)` 更新时触发，可手动控制更新时的 [渲染模式](#s2renderoptions) | (renderOptions: [S2RenderOptions](#s2renderoptions)) => [S2RenderOptions](#s2renderoptions) \| void |  |  |
| onUpdateAfterRender | 组件层表格更新事件，当 `数据 (S2DataConfig)` 或 `配置 (S2Options)` 更新时，并且在重渲染 `s2.render()` 完成后触发 | (renderOptions: [S2RenderOptions](#s2renderoptions)) => void |  |  |
| onLoading | 组件层加载状态变更事件 | (loading: boolean) => void |  |  |
| onDestroy | 表格销毁事件 | () => void; |  |  |
| onLayoutResize | 表格整体 changeSize 事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| onLayoutResizeSeriesWidth | 表格序号行宽事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| onLayoutResizeRowWidth | 行头单元格宽度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| onLayoutResizeRowHeight | 行头单元格高度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| onLayoutResizeColWidth | 列头单元格宽度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| onLayoutResizeColHeight | 列头单元格高度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| onLayoutResizeTreeWidth | 树状行头整体宽度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| onLayoutResizeMouseDown | resize 热区鼠标按下事件 | ( event: `MouseEvent`, resizeInfo?: [ResizeInfo](#resizeinfo)) => void; |  |  |
| onLayoutResizeMouseUp | resize 热区鼠标松开事件 | ( event: `MouseEvent`,  resizeInfo?: [ResizeInfo](#resizeinfo)) => void; |  |  |
| onLayoutResizeMouseMove | resize 热区鼠标移动事件 | ( event: `MouseEvent`, resizeInfo?: [ResizeInfo](#resizeinfo)) => void; |  |  |
| onKeyBoardDown | 键盘按下事件 | (event: KeyboardEvent) => void |  |  |
| onKeyBoardUp | 键盘松开事件 | (event: KeyboardEvent) => void |  |  |
| onCopied | 复制事件 | (data: CopyableList) => void |  |  |
| onActionIconHover | 行头操作 icon 悬停事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| onActionIconClick | 行头操作 icon 点击事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| onContextMenu | 右键单元格单击事件 ([禁用右键菜单不生效？](/manual/faq#%E7%A6%81%E7%94%A8%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E4%B8%8D%E7%94%9F%E6%95%88)) | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| onMouseHover | 表格鼠标悬停事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| onMouseUp | 表格鼠标松开事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| onSelected | 单元格选中事件 | (cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| onReset | 交互状态重置事件 | (event: KeyboardEvent) => void |  |  |
| onLinkFieldJump | 链接字段跳转事件 | (data: { field: string; meta: [Node](/api/basic-class/node) \| [ViewMeta](#viewmeta); record: [Data](/api/general/s2-data-config#data) }) => void |  |  |
| onScroll | 单元格滚动事件 （含行头和数值单元格） | ({position: [CellScrollPosition](#cellscrollposition)} ) => void |  |  |
| onColCellBrushSelection | 批量选中刷选范围内的列头单元格，刷选过程中，显示刷选范围提示蒙层，刷选完成后，弹出 tooltip, 展示被刷选单元格信息 | (cells: [ColCell](/api/basic-class/base-cell)[]) => void; |  |  |
| onRowCellBrushSelection | 批量选中刷选范围内的行头单元格，刷选过程中，显示刷选范围提示蒙层，刷选完成后，弹出 tooltip, 展示被刷选单元格信息（仅支持透视表） | (cells: [RowCell](/api/basic-class/base-cell)[]) => void; |  |  |

### SheetComponentOptions

:::warning{title="注意"}

`@antv/s2-react` 组件的 `options` 继承于 [S2Options](/api/general/s2-options) , 有两点不同：

- 类型由 `S2Options` 变更为 `SheetComponentOptions`.
- tooltip 的 content 从 `Element | string` 变为了 `ReactNode`, 即可以是任意的 `jsx` 元素。

:::

```ts
import type { S2Options } from '@antv/s2';

type SheetComponentOptions = S2Options<React.ReactNode>
```

<br/>

## Vue 表组件 <Badge type="success">@antv/s2-vue</Badge>

:::warning{title="注意"}
`@antv/s2-vue` 现已停止维护，由于精力投入有限，出于维护成本，包下载量等因素综合考虑，从 `2.0.0` 正式版后不再继续更新，请基于 `@antv/s2` 自行封装，或 fork 仓库进行二次开发社区版本。
:::

基于 `@antv/s2` 层封装的 `Vue 3.0` 版开箱即用的组件 `<SheetComponent />`

### props

功能描述： Vue SheetComponent 组件的 props，如 `<SheetComponent :sheetType="pivot" />`

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| sheetType | 表格类型：<br/> 1. `pivot`: 透视表 <br/> 2. `table`: 明细表 <br/> 3. `editable`: 编辑表 | `pivot \| table \| editable` | `pivot` |  |
| dataCfg | 透视表数据映射配置项 | [S2DataConfig](/api/general/s2-data-config) |  | ✓ |
| options | 透视表属性配置项 | [SheetComponentOptions](#sheetcomponentoptions-1) |  | ✓ |
| adaptive | 是否根据窗口大小自适应 | `boolean \| { width?: boolean, height?: boolean, getContainer: () => HTMLElement }` | `false` |  |
| showPagination | 是否显示默认分页<br>（只有在 `options` 配置过 `pagination` 属性才会生效） | `boolean` \| \{ <br>onShowSizeChange?: (pageSize: number) => void,<br>onChange?: (current: number) => void <br>} | `false` |  |
| themeCfg | 自定义表格主题样式 | [ThemeCfg](/api/general/s2-theme) |  |  |
| loading | 控制表格的加载状态 | `boolean` |  |  |

### events

功能描述： Vue SheetComponent 组件的 events，`<SheetComponent @rowCellClick="handleRowCellClick" />`

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| spreadsheet | 自定义表 | (container: `HTMLElement \| string`, dataCfg:  [S2DataConfig](/api/general/s2-data-config), options: [SheetComponentOptions](#sheetcomponentoptions-1)) => [SpreadSheet](/api/basic-class/spreadsheet) |  |  |
| rangeSort | 组内排序时触发回调事件 | (params: [SortParam[]](#sortparam) ) => void; |  |  |
| rowCellClick | 行头鼠标单击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellHover | 行头鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellClick | 行头鼠标单击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellDoubleClick | 行头鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellContextMenu | 行头右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellMouseDown | 行头鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellMouseUp | 行头鼠标放开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellMouseMove | 行头鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| rowCellCollapseTreeRows | 树状结构下点击行头收起展开按钮 | (params: { id: `number`; isCollapsed: `boolean`; node: [Node](/api/basic-class/node) }) => void |  |  |
| rowCellScroll | 行头单元格滚动事件 | ({position: [CellScrollPosition](#cellscrollposition)} ) => void; |  |  |
| rowCellCollapsed | 节点展开/收起事件回调 | ({ isCollapsed: `boolean`, collapseFields: `Record<string, boolean>`, node: [Node](/api/basic-class/node) }) => void; |  |  |
| rowCellAllCollapsed | 节点全部展开/收起的事件回调 | (isCollapsed: boolean ) => void; |  |  |
| rowCellRender | 行头单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| rowCellSelected | 行头单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| colCellHover | 列头鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| colCellClick | 列头鼠标单击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| colCellDoubleClick | 列头鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| colCellContextMenu | 列头右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| colCellMouseDown | 列头鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| colCellMouseUp | 列头鼠标松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| colCellMouseMove | 列头鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| colCellExpanded | 开启隐藏列头（tooltip.operation.hiddenColumns = true）后，列头展开的事件回调 | (expandedNode: [Node](/api/basic-class/node)) => void |  |  |
| colCellHidden | 开启隐藏列头（tooltip.operation.hiddenColumns = true）后，列头隐藏的事件回调 | (data: { currentHiddenColumnsInfo:[HiddenColumnsInfo](#hiddencolumnsinfo); hiddenColumnsDetail:[HiddenColumnsInfo](#hiddencolumnsinfo)[] } ) => void; |  |  |
| colCellRender | 列头单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| colCellSelected | 列头单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| dataCellHover | 数值单元格鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| dataCellClick | 数值单元格鼠标点击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| dataCellDoubleClick | 数值单元格双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| dataCellContextMenu | 数值单元格右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| dataCellMouseDown | 数值单元格鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| dataCellMouseUp | 数值单元格鼠标松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| dataCellMouseMove | 数值单元格鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| dataCellBrushSelection | 数值单元格刷选事件 | (brushRangeDataCells: [DataCell](/api/basic-class/base-cell)[] ) => void |  |  |
| dataCellScroll | 数值单元格滚动事件 | ({position: [CellScrollPosition](#cellscrollposition)} ) => void; |  |  |
| dataCellSelected | 数值单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| cornerCellHover | 角头鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| cornerCellClick | 角头鼠标单击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| cornerCellDoubleClick | 角头鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| cornerCellContextMenu | 角头右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| cornerCellMouseUp | 角头鼠标按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| cornerCellMouseUp | 角头鼠标松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| cornerCellMouseMove | 角头鼠标移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| cornerCellRender | 角头单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| cornerCellSelected | 角头单元格选中事件 | ( cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| mergedCellsHover | 合并单元格鼠标悬停事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| mergedCellsClick | 合并单元格鼠标点击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| mergedCellsDoubleClick | 合并单元格鼠标双击事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| mergedCellsContextMenu | 合并单元格右键菜单事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| mergedCellsMouseDown | 合并单元格按下事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| mergedCellsMouseUp | 合并单元格松开事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| mergedCellsMouseMove | 合并单元格移动事件 | (data: [TargetCellInfo](#targetcellinfo)) => void |  |  |
| mergedCellsRender | 合并单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| seriesNumberCellRender | 序号单元格渲染事件 | ( cell: [Cell](/api/basic-class/base-cell) ) => void |  |  |
| rangeSort | 组内排序时触发回调事件（暂只支持透视表） | (params: [SortParam[]](#sortparam) ) => void; |  |  |
| rangeSorted | 组内排序结束触发回调事件（暂只支持透视表） | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object) ) => void; |  |  |
| rangeFilter | 筛选时触发回调事件 | (data: { filterKey: string; filteredValues: string[] } ) => void; |  |  |
| rangeFiltered | 筛选结束触发回调事件 | (data: DataType[] ) => void; |  |  |
| layoutAfterHeaderLayout | 表头布局结构准备完成事件 | (layoutResult: [LayoutResult](/api/general/s2-options/#layoutresult) ) => void; |  |  |
| layoutPagination | 分页事件 | ({ pageSize: number; pageCount: number; total: number; current: number;} ) => void; |  |  |
| layoutCellScroll | 单元格滚动事件 (**已废弃，请使用 `onScroll` 代替**) | ({position: [CellScrollPosition](#cellscrollposition)} ) => void; |  |  |
| beforeRender | 开始 render 前的事件 | () => void; |  |  |
| afterRender | render 完成的事件 | () => void; |  |  |
| mounted | 表格加载完成事件，可拿到表实例 [详情](/manual/advanced/get-instance) | (spreadsheet: [SpreadSheet](/api/basic-class/spreadsheet)) => void; |  |  |
| update | 组件层表格更新事件，当 `数据 (S2DataConfig)` 或 `配置 (S2Options)` 更新时触发，可手动控制更新时的 [渲染模式](#s2renderoptions) | (renderOptions: [S2RenderOptions](#s2renderoptions)) => [S2RenderOptions](#s2renderoptions) \| void |  |  |
| updateAfterRender | 组件层表格更新事件，当 `数据 (S2DataConfig)` 或 `配置 (S2Options)` 更新时，并且在重渲染 `s2.render()` 完成后触发 | (renderOptions: [S2RenderOptions](#s2renderoptions)) => void |  |  |
| destroy | 表格销毁事件 | () => void; |  |  |
| layoutResize | 表格整体 changeSize 事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| layoutResizeSeriesWidth | 表格序号行宽事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| layoutResizeRowWidth | 行头单元格宽度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| layoutResizeRowHeight | 行头单元格高度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| layoutResizeColWidth | 列头单元格宽度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| layoutResizeColHeight | 列头单元格高度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| layoutResizeTreeWidth | 树状行头整体宽度更改事件 | (params: [ResizeParams](#resizeparams)) => void; |  |  |
| layoutResizeMouseDown | resize 热区鼠标按下事件 | ( event: `MouseEvent`, resizeInfo?: [ResizeInfo](#resizeinfo)) => void; |  |  |
| layoutResizeMouseUp | resize 热区鼠标松开事件 | ( event: `MouseEvent`, resizeInfo?: [ResizeInfo](#resizeinfo)) => void; |  |  |
| layoutResizeMouseMove | resize 热区鼠标移动事件 | ( event: `MouseEvent`, resizeInfo?: [ResizeInfo](#resizeinfo)) => void; |  |  |
| keyBoardDown | 键盘按下事件 | (event: KeyboardEvent) => void |  |  |
| keyBoardUp | 键盘松开事件 | (event: KeyboardEvent) => void |  |  |
| copied | 复制事件 | (data: CopyableList) => void |  |  |
| actionIconHover | 行头操作 icon 悬停事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| actionIconClick | 行头操作 icon 点击事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| contextMenu | 右键单元格单击事件 ([禁用右键菜单不生效？](/manual/faq#%E7%A6%81%E7%94%A8%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E4%B8%8D%E7%94%9F%E6%95%88)) | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| mouseHover | 表格鼠标悬停事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| mouseUp | 表格鼠标松开事件 | (event: [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object)) => void |  |  |
| selected | 单元格选中事件 | (cells: [Cell](/api/basic-class/base-cell)[], detail: [CellSelectedDetail](#cellselecteddetail) ) => void |  |  |
| reset | 交互状态重置事件 | (event: KeyboardEvent) => void |  |  |
| linkFieldJump | 链接字段跳转事件 | (data: { field: string; meta: [Node](/api/basic-class/node) \| [ViewMeta](#viewmeta); record: [Data](/api/general/s2-data-config#data) }) => void |  |  |
| scroll | 单元格滚动事件 （含行头和数值单元格） | ({position: [CellScrollPosition](#cellscrollposition)} ) => void; |  |  |
| colCellBrushSelection | 批量选中刷选范围内的列头单元格，刷选过程中，显示刷选范围提示蒙层，刷选完成后，弹出 tooltip, 展示被刷选单元格信息 | (cells: ColCell[]) => void; |  |  |
| rowCellBrushSelection | 批量选中刷选范围内的行头单元格，刷选过程中，显示刷选范围提示蒙层，刷选完成后，弹出 tooltip, 展示被刷选单元格信息（仅支持透视表） | (cells: RowCell[]) => void; |  |  |

### SheetComponentOptions

:::warning{title="注意"}

`@antv/s2-vue` 组件 的 `options` 继承于 [S2Options](/api/general/s2-options) , 有两点不同：

- 类型由 `S2Options` 变更为 `SheetComponentOptions`.
- 分页配置从 S2 的分页配置 **变为了 `antd-design-vue` 的分页配置**，即支持对 `antd-vue` 分页组件 的 api 透传。

:::

```ts
import type { Pagination, S2Options } from '@antv/s2';
import type { PaginationProps } from 'ant-design-vue';

type SheetComponentOptions = S2Options<
  Element | string,
  Pagination & PaginationProps
>;
```

## 公共对象

### FederatedPointerEvent

> 别名：GEvent

[https://g.antv.antgroup.com/api/event/event-object](事件对象)

### TargetCellInfo

功能描述：交互回调函数的返回信息。

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| target | 交互作用对象 | [S2CellType](/api/basic-class/base-cell) |  |  |
| event | AntV/G Event 事件 | [FederatedPointerEvent](https://g.antv.antgroup.com/api/event/event-object) |  |  |
| viewMeta | 当前节点信息 | [Node](/api/basic-class/node) |  |  |

<embed src="@/docs/common/sort-param.zh.md"></embed>

### CellScrollPosition

功能描述：单元格滚动的位置信息。

| 参数        | 说明         | 类型   | 默认值 | 必选 |
| ---------- | ----------- | ----- | ----- | ---- |
| scrollX     | 水平方向滚动偏移量（相对滚动条轨道长度）  | `number` |        |      |
| scrollY     | 垂直方向滚动偏移量（相对滚动条轨道长度）  | `number` |        |      |

### HiddenColumnsInfo

功能描述：开启 [隐藏列头](/manual/advanced/interaction/hide-columns) 后，隐藏列头的节点信息

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| hideColumnNodes | 当前隐藏的节点信息 | [Node](/api/basic-class/node)[] |  |  |
| displaySiblingNode | 展示的相邻节点信息 | { prev:[Node](/api/basic-class/node);next: [Node](/api/basic-class/node) } |  |  |

### ResizeParams

功能描述：表格 resize（单元格行高列宽拖动变化）和单元格样式信息

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| info | resize 配置信息 | [ResizeInfo](#resizeinfo) |  |  |
| style | options 中样式相关配置 | [style](/api/general/s2-options#style) |  |  |

### ResizeInfo

功能描述：表格 resize（ 单元格行高列宽拖动变化）配置信息

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| theme | resize 热区配置 | [ResizeArea](/api/general/s2-theme#resizearea) |  |  |
| type | resize 方向 | `Horizontal` \| `Vertical` |  |  |
| offsetX | 横向偏移量 | `number` |  |  |
| offsetY | 纵向偏移量 | `number` |  |  |
| width | 拖拽的宽度 | `number` |  |  |
| height | 拖拽 | `number` |  |  |
| size | 热区尺寸 | `number` |  |  |
| effect | 拖拽更改影响的区域 | `Field` \| `Cell` \| `Tree` \| `Series` |  |  |
| isResizeArea | 是否属于 resize 热区 | `boolean` |  |  |
| id | 字段 id | `string` |  |  |
| cell | resize 热区对应单元格信息 | [Node](/api/basic-class/base-cell) |  |  |
| meta | resize 热区对应单元格元数据 | [Node](/api/basic-class/node) |  |  |
| resizedWidth | 拖拽后的宽度 | `number` |  |  |
| resizedHeight | 拖拽后的高度 | `number` |  |  |

### S2RenderOptions

功能描述：自定义渲染模式

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | --- |
| reloadData | 是否重新加载数据 | `boolean` |  |  |
| rebuildDataSet | 是否重新生成数据集 | `boolean` |  |  |
| rebuildHiddenColumnsDetail | 是否重新生成列头隐藏信息 | `boolean` |  |  |

<embed src="@/docs/common/view-meta.zh.md"></embed>
<embed src="@/docs/common/interaction.zh.md"></embed>
