// 今天怎么吃 · v7.3 硅基流动 SiliconFlow AI 拍照识别 Worker
// 重要：不要把 SiliconFlow API key 写进 GitHub Pages 前端代码。
// Cloudflare Worker 的 Variables and Secrets 里设置：
// SILICONFLOW_API_KEY = 你的硅基流动 API key（Secret）
// APP_CLIENT_TOKEN = 你自己设置的一段访问口令（Secret）
// 可选：SILICONFLOW_MODEL = Qwen/Qwen2.5-VL-72B-Instruct
// 可选：COST_CURRENCY = CNY
// 可选：INPUT_PRICE_PER_1M / OUTPUT_PRICE_PER_1M = 你在硅基流动模型页看到的每 1M tokens 价格
// 可选：ALLOWED_ORIGIN = https://celia021003-glitch.github.io

const DEFAULT_MODEL = "Qwen/Qwen2.5-VL-72B-Instruct";
const DEFAULT_CURRENCY = "CNY";
const DEFAULT_INPUT_PRICE_PER_1M = 0;
const DEFAULT_OUTPUT_PRICE_PER_1M = 0;

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "*";
  const allowed = env.ALLOWED_ORIGIN || "*";
  return {
    "Access-Control-Allow-Origin": allowed === "*" ? origin : allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-App-Token",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function jsonResponse(request, env, data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(request, env) }
  });
}

function extractOutputText(data) {
  const choice = data?.choices?.[0];
  const msg = choice?.message;
  if (typeof msg?.content === "string") return msg.content.trim();
  if (Array.isArray(msg?.content)) {
    return msg.content.map(x => x.text || x.content || "").join("\n").trim();
  }
  return "";
}

function parseJsonText(text) {
  const cleaned = String(text || "").replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  try { return JSON.parse(cleaned); } catch (_) {}
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  throw new Error("模型没有返回 JSON，请换一个视觉模型或降低提示复杂度。原始返回：" + cleaned.slice(0, 200));
}

function safeNumber(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}

function normalizeAnalysis(raw) {
  const foods = Array.isArray(raw.foods) ? raw.foods.slice(0, 12).map(f => ({
    name: String(f.name || "未知食物").slice(0, 40),
    amount: safeNumber(f.amount ?? f.estimated_amount ?? 1) || 1,
    estimated_amount: safeNumber(f.amount ?? f.estimated_amount ?? 1) || 1,
    unit: String(f.unit || "份").slice(0, 10),
    category: String(f.category || "其他").slice(0, 10),
    kcal: Math.max(0, Math.round(safeNumber(f.kcal))),
    protein: Math.max(0, Number(safeNumber(f.protein).toFixed(1))),
    carbs: Math.max(0, Number(safeNumber(f.carbs).toFixed(1))),
    fat: Math.max(0, Number(safeNumber(f.fat).toFixed(1))),
    confidence: String(f.confidence || "medium"),
    note: String(f.note || f.notes || "").slice(0, 120)
  })) : [];

  const total = foods.reduce((acc, f) => {
    acc.total_kcal += f.kcal;
    acc.total_protein += f.protein;
    acc.total_carbs += f.carbs;
    acc.total_fat += f.fat;
    return acc;
  }, { total_kcal: 0, total_protein: 0, total_carbs: 0, total_fat: 0 });

  return {
    foods,
    total_kcal: Math.round(safeNumber(raw.total_kcal) || total.total_kcal),
    total_protein: Number((safeNumber(raw.total_protein) || total.total_protein).toFixed(1)),
    total_carbs: Number((safeNumber(raw.total_carbs) || total.total_carbs).toFixed(1)),
    total_fat: Number((safeNumber(raw.total_fat) || total.total_fat).toFixed(1)),
    summary: String(raw.summary || "已完成初步识别，请人工确认份量和油/酱料。").slice(0, 260),
    reminder: String(raw.reminder || "AI 估算仅供记录参考，保存前请人工确认。 ").slice(0, 180)
  };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(request, env) });
    if (request.method !== "POST") return jsonResponse(request, env, { ok: false, error: "Only POST is supported." }, 405);

    try {
      const apiKey = env.SILICONFLOW_API_KEY || env.OPENAI_API_KEY;
      if (!apiKey) return jsonResponse(request, env, { ok: false, error: "Worker 缺少 SILICONFLOW_API_KEY Secret。" }, 500);
      if (!env.APP_CLIENT_TOKEN) return jsonResponse(request, env, { ok: false, error: "Worker 缺少 APP_CLIENT_TOKEN 访问口令。" }, 500);

      const token = request.headers.get("X-App-Token") || "";
      if (token !== env.APP_CLIENT_TOKEN) return jsonResponse(request, env, { ok: false, error: "AI 访问口令不正确。" }, 401);

      const body = await request.json();
      const image = String(body.image || "");
      const detail = ["low", "high", "auto"].includes(body.detail) ? body.detail : "low";
      const meal = String(body.meal || "这一餐").slice(0, 20);
      const preference = String(body.preference || "").slice(0, 240);
      const hint = String(body.hint || "").slice(0, 160);

      if (!image.startsWith("data:image/")) return jsonResponse(request, env, { ok: false, error: "请传入 base64 data URL 图片。" }, 400);
      if (image.length > 7_000_000) return jsonResponse(request, env, { ok: false, error: "图片太大，请前端先压缩。" }, 413);

      const model = env.SILICONFLOW_MODEL || env.OPENAI_MODEL || DEFAULT_MODEL;
      const prompt = `你是一个谨慎的饮食记录助手。请分析这张${meal}图片，识别可见食物，估算份量、热量和三大营养素。\n\n用户偏好：${preference || "无"}\n用户补充：${hint || "无"}\n\n要求：\n1. 必须只返回 JSON，不要 Markdown，不要解释。\n2. 如果不确定，给保守区间中间值，并在 summary/reminder 里提醒用户人工确认。\n3. category 只能用：蛋白质、蔬菜、主食、水果、饮品、甜食、外卖、调味、其他。\n4. amount 是数字；unit 可以是 g、ml、份、个、碗、杯、片、勺等。\n5. kcal/protein/carbs/fat 都用数字。\n\n返回格式：\n{\n  "foods": [\n    {"name":"米饭","amount":0.5,"unit":"碗","category":"主食","kcal":130,"protein":2.7,"carbs":28,"fat":0.3,"confidence":"medium","note":"约半碗"}\n  ],\n  "total_kcal": 0,\n  "total_protein": 0,\n  "total_carbs": 0,\n  "total_fat": 0,\n  "summary":"一句话总结",\n  "reminder":"需要用户确认的地方"\n}`;

      const payload = {
        model,
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: { url: image, detail } },
              { type: "text", text: prompt }
            ]
          }
        ],
        stream: false,
        temperature: 0.1,
        max_tokens: 900
      };

      const apiRes = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) {
        return jsonResponse(request, env, {
          ok: false,
          error: data.error?.message || data.message || `SiliconFlow API 请求失败：${apiRes.status}`,
          raw: data
        }, apiRes.status);
      }

      const text = extractOutputText(data);
      const parsed = normalizeAnalysis(parseJsonText(text));
      const usage = data.usage || {};
      const inputTokens = safeNumber(usage.prompt_tokens ?? usage.input_tokens);
      const outputTokens = safeNumber(usage.completion_tokens ?? usage.output_tokens);
      const totalTokens = safeNumber(usage.total_tokens) || inputTokens + outputTokens;

      const inputPrice = safeNumber(env.INPUT_PRICE_PER_1M) || DEFAULT_INPUT_PRICE_PER_1M;
      const outputPrice = safeNumber(env.OUTPUT_PRICE_PER_1M) || DEFAULT_OUTPUT_PRICE_PER_1M;
      const currency = String(env.COST_CURRENCY || DEFAULT_CURRENCY).toUpperCase();
      const inputCost = inputTokens / 1_000_000 * inputPrice;
      const outputCost = outputTokens / 1_000_000 * outputPrice;

      return jsonResponse(request, env, {
        ok: true,
        provider: "SiliconFlow",
        model,
        detail,
        result: parsed,
        usage: { input_tokens: inputTokens, output_tokens: outputTokens, total_tokens: totalTokens },
        cost: {
          currency,
          input_usd: Number(inputCost.toFixed(8)),
          output_usd: Number(outputCost.toFixed(8)),
          total_usd: Number((inputCost + outputCost).toFixed(8)),
          input_price_per_1m: inputPrice,
          output_price_per_1m: outputPrice,
          note: inputPrice || outputPrice ? "按你在 Worker 里配置的 SiliconFlow 价格估算" : "未配置 SiliconFlow 模型单价，费用显示为 0；tokens 仍可记录。"
        }
      });
    } catch (err) {
      return jsonResponse(request, env, { ok: false, error: err.message || "Worker 内部错误" }, 500);
    }
  }
};
