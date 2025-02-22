---
title: 浏览器引入
order: 5
---

查看示例：

[![Edit @antv/s2 import in browser (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/antv-s2-import-in-browser-z6uspx)

我们提供了 `dist` 目录的 `UMD` 编译文件，引入 `dist/s2.min.js` , 可访问全局变量 `window.S2`

```ts
<script src="./dist/s2.min.js"></script>
<script>
   async function bootstrap() {
      const s2 = new S2.PivotSheet(container, s2DataConfig, s2Options);
      await s2.render();
   }

   bootstrap();
</script>
```

所有的导出统一挂载在全局变量 `window.S2` 下

```diff
<script type="module">
-  import { S2Event, PivotSheet, TableSheet } from '@antv/s2'
+  const { S2Event, PivotSheet, TableSheet } = S2
</script>
```

如果使用的是 `React` 版本 `@antv/s2-react` , 或者 `Vue3` 版本 `@antv/s2-vue` 还需额外引入样式文件

```html
<link rel="stylesheet" href="./dist/s2-react.min.css"/>
<link rel="stylesheet" href="./dist/s2-vue.min.css"/>
```

也可以直接使用 `CDN` （推荐）, 比如 [UNPKG](https://unpkg.com/@antv/s2) 或者 [![preview](https://data.jsdelivr.com/v1/package/npm/@antv/s2/badge)](https://www.jsdelivr.com/package/npm/@antv/s2)

```js
<script src="https://unpkg.com/@antv/s2/dist/s2.min.js"></script>

// React 需额外引入样式：
<link rel="stylesheet" href="https://unpkg.com/@antv/s2-react/dist/s2-react.min.css"/>

// Vue3 版本 需额外引入样式：
<link rel="stylesheet" href="https://unpkg.com/@antv/s2-vue/dist/s2-vue.min.css"/>
```
