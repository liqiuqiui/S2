---
title: 高级排序
order: 4
tag: Updated
---

## React 高级排序组件 <Badge>@antv/s2-react-components</Badge>

```tsx | pure
import { AdvancedSort } from '@antv/s2-react-components';
import '@antv/s2-react-components/dist/s2-react-components.min.css'

<AdvancedSort sheetInstance={s2} />
```

### AdvancedSortProps

`AdvancedSort` 组件的 `props`

| 参数 | 说明 | 类型 | 必选 | 默认值 |
| -- | -- | -- | -- | -- |
| sheetInstance | 表格实例 | [SpreadSheet](/api/basic-class/spreadsheet) | ✓ |  |
| className | class 类名称 | `string` |  |  |
| icon | 排序按钮图标 | `React.ReactNode` |  |  |
| text | 排序按钮名称 | `string` |  |  |
| ruleText | 规则描述 | `string` |  |  |
| dimensions | 可选字段列表 | [Dimension](#dimension)[] |  |  |
| ruleOptions | 规则配置列表 | [RuleOption](#ruleoption)[] |  |  |
| sortParams | 默认已有 sort 规则 | [SortParams](/api/general/s2-data-config#sortparams) |  |  |
| onSortOpen | 打开排序弹窗的回调 | `() => void` |  |  |
| onSortConfirm | 关闭弹窗后处理排序结果的回调 | `(ruleValues:`[RuleValue](#rulevalue)[]`, sortParams:`[SortParams](/api/general/s2-data-config#sortparams)`) => void` |  |  |

### AdvancedSortCfgProps

在 `header` 中配置 `advancedSort` 的 `props`

| 参数 | 说明 | 类型 | 必选 | 默认值 |
| -- | -- | -- | -- | -- |
| className | class 类名称 | `string` |  |  |
| icon | 排序按钮图标 | `React.ReactNode` |  |  |
| text | 排序按钮名称 | `ReactNode` |  |  |
| ruleText | 规则描述 | `string` |  |  |
| dimensions | 可选字段列表 | [Dimension](#dimension)[] |  |  |
| ruleOptions | 规则配置列表 | [RuleOption](#ruleoption)[] |  |  |
| sortParams | 默认已有 sort 规则 | [SortParams](/api/general/s2-data-config#sortparams) |  |  |
| onSortOpen | 打开排序弹窗的回调 | `() => void` |  |  |
| onSortConfirm | 关闭弹窗后处理排序结果的回调 | `(ruleValues:`[RuleValue](#rulevalue)[]`, sortParams:`[SortParams](/api/general/s2-data-config#sortparams)`) => void` |  |  |

### Dimension

可选字段列表，不配置默认为：`行头+列头+数值`

| 参数  | 说明     | 类型       | 默认值 | 必选 |
| ---- | ------- | --------- | ----- | --- |
| field | 维度 id  | `string`   | ✓      |      |
| name  | 维度名称 | `string`   | ✓      |      |
| list  | 维度列表 | `string[]` | ✓      |      |

### RuleOption

规则配置列表，不配置默认为：`首字母、手动排序、其他字段`

| 参数     | 说明       | 类型           | 默认值   | 必选             |
| ------- | --------- | ------------- | ------- | --------------- |
| label    | 规则名称   | `string`       | ✓        |                  |
| value    | 规则值     | `'sortMethod'  | 'sortBy' | 'sortByMeasure'` |     | ✓   |
| children | 规则子列表 | `RuleOption[]` | ✓        |                  |

### RuleValue

关闭弹窗后处理排序结果的回调函数的第一个参数：获取到的排序信息

| 参数 | 说明 | 类型 | 默认值 | 必选 |
| -- | -- | -- | -- | -- |
| field | 维度 id | `string` | ✓ |  |
| name | 维度名称 | `string` | ✓ |  |
| sortMethod | 排序方式（升/降序） | `ASC` \| `DESC` \| `asc` \| `desc` |  |  |
| sortBy | 自定义排序列表 | `string[]` |  |  |
| sortByMeasure | 类 | `string` |  |  |
