# 今天怎么吃 · v7.2

本版在 v7 AI 拍照识别基础上，把拍照入口改得更明显：

- 底部导航新增「拍照」入口
- 保留右下角悬浮相机按钮，并加上“拍照”文字提示
- 首页仍有“打开拍照识别”卡片
- 记录页也有“用拍照识别这一餐”按钮
- AI 后端仍然使用 Cloudflare Worker，API key 不放前端

上传 GitHub 文件：

- index.html
- styles.css
- app.js
- sw.js
- manifest.webmanifest

更新后访问：

https://celia021003-glitch.github.io/today-eat-mobile-pwa/?v=72


## v7.2 更新

- AI 拍照记录页面新增两个明确入口：`📷 现在拍一张` 和 `🖼 从相册选择`。
- 从相册选择不再使用 `capture`，可以补传已经拍好的饭菜照片。
- 现场拍照仍然优先调用后置摄像头。
