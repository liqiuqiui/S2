---
title: 交互
order: 5
---

## Interaction

| 参数                   | 说明                                                  | 类型                                                                                     | 默认值  | 必选  |
| :--------------------- | ----------------------------------------------------- | :--------------------------------------------------------------------------------------- | :------ | :---: |
| linkFields             | 标记字段为链接样式，用于外链跳转                      | `string[]`                                                                               |         |       |
| selectedCellsSpotlight | 是否开启选中高亮聚光灯效果                            | `boolean`                                                                                | `false` |       |
| hoverHighlight         | 鼠标悬停时高亮当前单元格，以及所对应的行头，列头      | `boolean`                                                                                | `true`  |       |
| hiddenColumnFields     | 隐藏列 （明细表有效）                                 | `string[]`                                                                               |         |       |
| enableCopy             | 是否允许复制                                          | `boolean`                                                                                | `false` |       |
| copyWithFormat         | 是否使用 field format 格式复制                        | `boolean`                                                                                | `false` |       |
| customInteractions     | 自定义交互 [详情](zh/docs/manual/advanced/interaction/custom)                                          | [CustomInteraction[]](#custominteraction)                                                |         |       |
| scrollSpeedRatio       | 用于控制滚动速率，分水平和垂直两个方向，默认为 1      | [ScrollRatio](/zh/docs/api/general/S2Options#scrollratio)                                |         |       |
| autoResetSheetStyle    | 用于控制点击表格外区域和按下 esc 键时是否重置交互状态 | `boolean`                                                                                | `true`  |       |
| resize                 | 用于控制 resize 热区是否显示                          | `boolean`   \| [ResizeActiveOptions](/zh/docs/api/general/S2Options#resizeactiveoptions) | `true`  |       |
| brushSelection                 | 是否允许刷选                         | `boolean` | `true`  |       |

### CustomInteraction

功能描述：自定义交互，继承 baseEvent:  [具体例子](/zh/docs/manual/advanced/interaction/custom)

| 参数        | 说明           | 类型                                              | 默认值 | 必选  |
| ----------- | -------------- | ------------------------------------------------- | ------ | :---: |
| key         | 交互的唯一标识 | `string`                                          |        |   ✓   |
| interaction |                | [InteractionConstructor](#InteractionConstructor) |        |   ✓   |

### ScrollRatio

```js
interface ScrollRatio {
  horizontal?: number; // 水平滚动速率，默认为 1
  vertical?: number; // 垂直滚动速率，默认为 1
}
```

### ResizeActiveOptions

| 参数                 | 说明                             | 类型      | 默认值 | 必选  |
| -------------------- | -------------------------------- | --------- | ------ | :---: |
| rowCellVertical      | 是否开启行头垂直方向 resize 热区 | `boolean` |        |       |
| cornerCellHorizontal | 是否开启角头水平方向 resize 热区 | `boolean` |        |       |
| colCellHorizontal    | 是否开启列头水平方向 resize 热区 | `boolean` |        |       |
| colCellVertical      | 是否开启列头垂直方向 resize 热区 | `boolean` |        |       |