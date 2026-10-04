# Gallery 素材去重

2026-10-04 对全部 97 对展示素材进行像素比对及人工查看。新增素材中有 5 对完全重复、6 对仅轻微改变角度或裁切，展示数量由 97 对减少至 86 对。原有 18 对全部保留；同一空间中视角明显不同的照片继续展示。

去重在 `src/galleryItems.ts` 的 `galleryPhotoDuplicates` 中记录，整组 Before / After 卡片一起排除。源素材、优化图片和 AI Before 生成记录保留，方便恢复及追溯。

下表路径均相对于 `public/gallery/`。

| 不再展示 | 保留版本 | 原因 |
| --- | --- | --- |
| `living-07.webp` | `living-02.webp` | 原始及展示图片像素完全一致 |
| `dining-10.webp` | `dining-04.webp` | 原始及展示图片像素完全一致 |
| `kitchen-06.webp` | `kitchen-02.webp` | 原始及展示图片像素完全一致 |
| `bedroom-11.webp` | `bedroom-05.webp` | 原始及展示图片像素完全一致 |
| `bedroom-15.webp` | `bedroom-14.webp` | 原始及展示图片像素完全一致 |
| `living-12.webp` | `living-13.webp` | 同一沙发及茶几近景，保留构图更完整的版本 |
| `living-16.webp` | `living-21.webp` | 同一客厅及相近角度，保留更明亮清晰的版本 |
| `living-20.webp` | `living-21.webp` | 同一客厅及相近角度，保留更明亮清晰的版本 |
| `dining-05.webp` | `dining-06.webp` | 同一餐桌及相近角度，保留经过亮度调整的版本 |
| `bedroom-02.webp` | `bedroom-07.webp` | 同一床位及近乎相同角度，保留经过亮度调整的版本 |
| `bedroom-10.webp` | `bedroom-08.webp` | 同一床位及相近角度，保留视野更完整的版本 |

去重后的区域数量：客厅 24、餐厅 17、厨房 9、卧室 18、玄关 9、浴室 5、户外 4。区域导航、卡片序号和放大查看均从同一份过滤后的数据读取。
