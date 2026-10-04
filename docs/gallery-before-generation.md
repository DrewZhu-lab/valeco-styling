# Gallery Before / After 素材说明

新增素材包包含 79 张布置后的实景照片。对应的 79 张 Before 图片由 AI 基于每张 After 照片生成，去除可移动家具与装饰，保留房间结构、固定设施和拍摄视角。这些 Before 是未布置状态的重建效果图，并非现场拍摄的历史照片。

生成原图保存在 `assets/before-generation/`，网页使用的优化 WebP 保存在 `public/gallery-before/`。`assets/before-generation/manifest.json` 记录逐张素材来源与生成文件，`src/listingBeforePhotos.ts` 提供网页对应关系。原始 After 照片继续保留在 `public/listing-photos/`，网页优化版本位于 `public/gallery/`。

新增 79 对与原来的 18 对合并后，经去重保留 86 对展示（68 对新增素材、18 对原有素材）。移除 5 对完全重复照片及 6 对构图高度相似的照片，完整对应表见 `gallery-deduplication.md`。按客厅、餐厅、厨房、卧室、玄关、浴室、户外七个完整区域展示。每次只展示一个区域，顶部区域导航切换对应页面（例如 `#/gallery?room=dining`），支持直接链接与浏览器前进、后退。每个区域采用多排网格：手机一列、中等屏幕两列、大屏三列。每张图片支持 Before / After 拖动比较和放大查看。

After 照片的亮度与清晰度调整见 `gallery-photo-adjustments.md`。

网站音乐默认关闭，仅在主动点击音乐按钮后播放。素材更新与文件检查无需打开或刷新浏览器。
