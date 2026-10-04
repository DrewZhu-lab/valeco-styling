# Gallery 素材去重

素材包共 79 张照片，其中 5 张完全重复、6 张构图高度相似，去重后展示 68 张。此前的 18 对 AI 图片及生成的 Before 图已移除；同一空间中视角明显不同的素材照片继续展示。

去重在 `src/galleryItems.ts` 的 `galleryPhotoDuplicates` 中记录。源素材和优化照片保留，方便追溯。

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
| `dining-05.webp` | `dining-06.webp` | 同一餐桌及相近角度，保留选定的原始实拍版本 |
| `bedroom-02.webp` | `bedroom-07.webp` | 同一床位及近乎相同角度，保留选定的原始实拍版本 |
| `bedroom-10.webp` | `bedroom-08.webp` | 同一床位及相近角度，保留视野更完整的版本 |

去重后的区域数量：客厅 18、餐厅 14、厨房 6、卧室 15、玄关 6、浴室 5、户外 4。区域导航、卡片序号和放大查看均从同一份过滤后的数据读取。
