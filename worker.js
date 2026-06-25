// 今天怎么吃 · v7 AI 拍照识别 Cloudflare Worker
// 重要：不要把 OpenAI API key 写进 GitHub Pages 前端代码。
// 在 Cloudflare Worker 的 Variables and Secrets 里设置：
// OPENAI_API_KEY = 你的新 OpenAI API key（必须设为 Secret）
// APP_CLIENT_TOKEN = 你自己设置的一段访问口令（建议也设为 Secret）
// 可选：OPENAI_MODEL = gpt-4.1-mini
// 可选：ALLOWED_ORIGIN = https://celia021003-glitch.github.io

const DEFAULT_MODEL = "gpt-4.1-mini";
const DEFAULT_INPUT_PRICE_PER_1M = 0.40;
const DEFAULT_OUTPUT_PRICE_PER_1M = 1.60;

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
  if (typeof data.output_text === "string") return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    if (item.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) {
        if (typeof c.text === "string") parts.push(c.text);
        if (typeof c.output_text === "string") parts.push(c.output_text);
      }
    }
  }
  return parts.join("\n").trim();
}
function parseJsonText(text) {
  try { return JSON.parse(text); } catch (_) {}
  const match = text.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  throw new Error("模型没有返回 JSON");
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
      if (!env.OPENAI_API_KEY) return jsonResponse(request, env, { ok: false, error: "Worker 缺少 OPENAI_API_KEY Secret。" }, 500);
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

      const model = env.OPENAI_MODEL || DEFAULT_MODEL;
      const prompt = `你是一个谨慎的饮食记录助手。请分析这张${meal}图片，识别可见食物，估算份量、热量和三大营养素。\n\n用户偏好：${preference || "无"}\n用户补充：${hint || "无"}\n\n要求：\n1. 必须只返回 JSON，不要 Markdown。\n2. 如果不确定，给保守区间中间值，并在 summary/reminder 里提醒用户人工确认。\n3. category 只能用：蛋白质、蔬菜、主食、水果、饮品、甜食、外卖、调味、其他。\n4. amount 是数字；unit 可以是 g、ml、份、个、碗、杯、片、勺等。\n5. kcal/protein/carbs/fat 都用数字。\n\n返回格式：\n{\n  "foods": [\n    {"name":"米饭","amount":0.5,"unit":"碗","category":"主食","kcal":130,"protein":2.7,"carbs":28,"fat":0.3,"confidence":"medium","note":"约半碗"}\n  ],\n  "total_kcal": 0,\n  "total_protein": 0,\n  "total_carbs": 0,\n  "total_fat": 0,\n  "summary":"一句话总结",\n  "reminder":"需要用户确认的地方"\n}`;

      const openaiPayload = {
        model,
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: image, detail }
          ]
        }],
        max_output_tokens: 900
      };

      const apiRes = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(openaiPayload)
      });
      const data = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) {
        return jsonResponse(request, env, { ok: false, error: data.error?.message || `OpenAI API 请求失败：${apiRes.status}`, raw: data }, apiRes.status);
      }

      const text = extractOutputText(data);
      const parsed = normalizeAnalysis(parseJsonText(text));
      const usage = data.usage || {};
      const inputTokens = safeNumber(usage.input_tokens ?? usage.prompt_tokens);
      const outputTokens = safeNumber(usage.output_tokens ?? usage.completion_tokens);
      const totalTokens = safeNumber(usage.total_tokens) || inputTokens + outputTokens;
      const inputPrice = safeNumber(env.INPUT_PRICE_PER_1M) || DEFAULT_INPUT_PRICE_PER_1M;
      const outputPrice = safeNumber(env.OUTPUT_PRICE_PER_1M) || DEFAULT_OUTPUT_PRICE_PER_1M;
      const inputUsd = inputTokens / 1_000_000 * inputPrice;
      const outputUsd = outputTokens / 1_000_000 * outputPrice;

      return jsonResponse(request, env, {
        ok: true,
        model,
        detail,
        result: parsed,
        usage: { input_tokens: inputTokens, output_tokens: outputTokens, total_tokens: totalTokens },
        cost: {
          currency: "USD",
          input_usd: Number(inputUsd.toFixed(8)),
          output_usd: Number(outputUsd.toFixed(8)),
          total_usd: Number((inputUsd + outputUsd).toFixed(8)),
          input_price_per_1m: inputPrice,
          output_price_per_1m: outputPrice
        }
      });
    } catch (err) {
      return jsonResponse(request, env, { ok: false, error: err.message || "Worker 内部错误" }, 500);
    }
  }
};
