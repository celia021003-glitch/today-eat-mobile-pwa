# 今天怎么吃 · v7.3 硅基流动版

本版本用于硅基流动 SiliconFlow API：

- 前端仍然放在 GitHub Pages
- API key 放在 Cloudflare Worker Secret
- Worker 调用 `https://api.siliconflow.cn/v1/chat/completions`
- 支持拍照 / 相册上传
- 支持费用窗口；价格通过 Worker 环境变量配置

## GitHub Pages 需要替换

- index.html
- styles.css
- app.js
- sw.js
- manifest.webmanifest

访问：

```
https://celia021003-glitch.github.io/today-eat-mobile-pwa/?v=73
```

## Cloudflare Worker 需要替换

把 `worker.js` 内容复制到 Cloudflare Worker 的 Edit code 里，然后 Deploy。

## Cloudflare Secret / Variables

必填：

```
SILICONFLOW_API_KEY = 你的硅基流动 API key，类型 Secret
APP_CLIENT_TOKEN = 你自己设置的访问口令，类型 Secret
```

可选：

```
SILICONFLOW_MODEL = Qwen/Qwen2.5-VL-72B-Instruct
COST_CURRENCY = CNY
INPUT_PRICE_PER_1M = 你在硅基流动模型页看到的输入价格
OUTPUT_PRICE_PER_1M = 你在硅基流动模型页看到的输出价格
ALLOWED_ORIGIN = https://celia021003-glitch.github.io
```

如果你已经把硅基流动 key 存在 `OPENAI_API_KEY`，新版 Worker 也能读取，但更建议改名为 `SILICONFLOW_API_KEY`，避免混淆。
