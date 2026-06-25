# 今天怎么吃 v7 · AI 拍照识别版

本版本新增：

- 首页悬浮相机按钮
- 记录页内拍照入口
- AI 拍照识别食物、份量、热量、蛋白质、碳水、脂肪
- 保存前可人工修改
- AI 消耗小账本：本次费用、今日费用、本月费用、tokens
- Cloudflare Worker 安全代理，不把 OpenAI API key 放进前端代码

## GitHub Pages 前端需要上传

上传并覆盖这几个文件：

- index.html
- styles.css
- app.js
- sw.js
- manifest.webmanifest

打开：

https://celia021003-glitch.github.io/today-eat-mobile-pwa/?v=70

## Cloudflare Worker 需要部署

把 worker.js 部署到 Cloudflare Workers。

然后在 Worker 的 Settings / Variables and Secrets 里添加：

- OPENAI_API_KEY：你的新 OpenAI API key，必须设为 Secret
- APP_CLIENT_TOKEN：你自己设置的访问口令，也建议设为 Secret
- OPENAI_MODEL：gpt-4.1-mini，可选
- INPUT_PRICE_PER_1M：0.40，可选
- OUTPUT_PRICE_PER_1M：1.60，可选

部署后，把 Worker 地址填进 App 的“AI 后端地址”，例如：

https://你的-worker.workers.dev/analyze-food

如果 Worker 地址没有路径，直接填根地址也可以，因为本 Worker 对所有 POST 都按识别接口处理。

## 安全提醒

不要把 OpenAI API key 写进 app.js，也不要发到聊天里。之前暴露过的 key 应立即撤销，重新生成。
