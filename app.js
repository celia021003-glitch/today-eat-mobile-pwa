const STORAGE = {
  settings: "todayEat.settings.v1",
  logs: "todayEat.logs.v1",
  pantry: "todayEat.pantry.v1",
  cravings: "todayEat.cravings.v1",
  moods: "todayEat.moods.v1",
  photos: "todayEat.photos.v1",
  water: "todayEat.water.v1",
  todos: "todayEat.todos.v1",
  money: "todayEat.money.v1",
  weight: "todayEat.weight.v1",
  periods: "todayEat.periods.v1",
  planner: "todayEat.planner.v1"
};

const THEME_PRESETS = {
  "morandi-cream": {
    label: "奶油莫兰迪",
    colors: {
      bg: "#F6F0EA", bg2: "#EFE7DE", card: "#FFFCF7", cardAlpha: 0.9,
      text: "#4B4642", muted: "#8B8179", pink: "#D8BFC0", sage: "#B8C5B2",
      blue: "#AEBCC6", brown: "#8C6F63", apricot: "#E8D4C2", lav: "#C9C1D6", danger: "#B9827E"
    }
  },
  "morandi-pink": {
    label: "雾粉莫兰迪",
    colors: {
      bg: "#F8F1EF", bg2: "#F0E4E2", card: "#FFFCF9", cardAlpha: 0.92,
      text: "#4D4643", muted: "#8F807B", pink: "#DCC1C4", sage: "#BBC8B6",
      blue: "#B6C1C9", brown: "#8F6F68", apricot: "#EAD5C5", lav: "#CCC2D8", danger: "#B77D7A"
    }
  },
  "morandi-sage": {
    label: "鼠尾草绿",
    colors: {
      bg: "#F3F3EC", bg2: "#E8ECE0", card: "#FFFDF8", cardAlpha: 0.9,
      text: "#464840", muted: "#7B8174", pink: "#D7C3BD", sage: "#AEBEAA",
      blue: "#AEBBC0", brown: "#756B5D", apricot: "#E7D6BE", lav: "#C5C0D0", danger: "#A97873"
    }
  },
  "morandi-blue": {
    label: "灰蓝冷淡风",
    colors: {
      bg: "#F0F2F2", bg2: "#E3E7E8", card: "#FFFDF9", cardAlpha: 0.88,
      text: "#42484B", muted: "#747E84", pink: "#D4BFC0", sage: "#B6C2B4",
      blue: "#A7B7C0", brown: "#6F6762", apricot: "#E2D1C0", lav: "#C2C2D2", danger: "#A97876"
    }
  },
  night: {
    label: "夜间模式",
    colors: {
      bg: "#24211F", bg2: "#302B28", card: "#39332F", cardAlpha: 0.92,
      text: "#F3ECE5", muted: "#C6B8AD", pink: "#9D7778", sage: "#7F927B",
      blue: "#7D8F9B", brown: "#D3B7A4", apricot: "#A98F76", lav: "#9186A5", danger: "#C58A84"
    }
  }
};

const COLOR_FIELDS = [
  ["bg", "背景主色"], ["bg2", "背景渐变"], ["card", "卡片底色"], ["text", "主文字"], ["muted", "次文字"],
  ["pink", "雾粉"], ["sage", "鼠尾草绿"], ["blue", "灰蓝"], ["brown", "豆沙棕"],
  ["apricot", "浅杏"], ["lav", "雾紫"], ["danger", "提醒色"]
];

const FOOD_DB = {
  "鸡胸肉": { unit: "g", base: 100, kcal: 165, protein: 31, carbs: 0, fat: 3.6, category: "蛋白质", emoji: "🍗" },
  "鸡蛋": { unit: "个", base: 1, kcal: 70, protein: 6.3, carbs: 0.6, fat: 5, category: "蛋白质", emoji: "🥚" },
  "豆腐": { unit: "g", base: 100, kcal: 82, protein: 8, carbs: 2, fat: 4.8, category: "蛋白质", emoji: "◻️" },
  "瘦牛肉": { unit: "g", base: 100, kcal: 170, protein: 26, carbs: 0, fat: 7, category: "蛋白质", emoji: "🥩" },
  "牛排": { unit: "块", base: 1, kcal: 320, protein: 35, carbs: 0, fat: 20, category: "蛋白质", emoji: "🥩" },
  "鸡腿": { unit: "个", base: 1, kcal: 220, protein: 22, carbs: 0, fat: 14, category: "蛋白质", emoji: "🍗" },
  "三文鱼": { unit: "g", base: 100, kcal: 208, protein: 20, carbs: 0, fat: 13, category: "蛋白质", emoji: "🐟" },
  "虾": { unit: "g", base: 100, kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, category: "蛋白质", emoji: "🦐" },
  "低糖酸奶": { unit: "g", base: 100, kcal: 65, protein: 5.5, carbs: 5, fat: 2, category: "蛋白质", emoji: "🥛" },
  "熟米饭": { unit: "g", base: 100, kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, category: "主食", emoji: "🍚" },
  "米饭": { unit: "碗", base: 1, kcal: 260, protein: 5.4, carbs: 56, fat: 0.6, category: "主食", emoji: "🍚" },
  "红薯": { unit: "g", base: 100, kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, category: "主食", emoji: "🍠" },
  "土豆": { unit: "个", base: 1, kcal: 160, protein: 4, carbs: 37, fat: 0.2, category: "主食", emoji: "🥔" },
  "燕麦": { unit: "g", base: 100, kcal: 389, protein: 16.9, carbs: 66.3, fat: 6.9, category: "主食", emoji: "🥣" },
  "全麦面包": { unit: "片", base: 1, kcal: 85, protein: 4, carbs: 15, fat: 1.2, category: "主食", emoji: "🍞" },
  "西兰花": { unit: "g", base: 100, kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4, category: "蔬菜", emoji: "🥦" },
  "青菜": { unit: "g", base: 100, kcal: 18, protein: 1.5, carbs: 3, fat: 0.2, category: "蔬菜", emoji: "🥬" },
  "白菜": { unit: "颗", base: 1, kcal: 80, protein: 5, carbs: 16, fat: 0.6, category: "蔬菜", emoji: "🥬" },
  "菠菜": { unit: "g", base: 100, kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: "蔬菜", emoji: "🥬" },
  "蘑菇": { unit: "g", base: 100, kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3, category: "蔬菜", emoji: "🍄" },
  "番茄": { unit: "个", base: 1, kcal: 25, protein: 1.1, carbs: 5, fat: 0.2, category: "蔬菜", emoji: "🍅" },
  "黄瓜": { unit: "根", base: 1, kcal: 28, protein: 1.2, carbs: 6, fat: 0.2, category: "蔬菜", emoji: "🥒" },
  "玉米": { unit: "个", base: 1, kcal: 180, protein: 5, carbs: 40, fat: 2, category: "主食", emoji: "🌽" },
  "苹果": { unit: "个", base: 1, kcal: 95, protein: 0.5, carbs: 25, fat: 0.3, category: "水果", emoji: "🍎" },
  "香蕉": { unit: "根", base: 1, kcal: 105, protein: 1.3, carbs: 27, fat: 0.3, category: "水果", emoji: "🍌" },
  "牛油果": { unit: "个", base: 1, kcal: 240, protein: 3, carbs: 13, fat: 22, category: "水果", emoji: "🥑" },
  "燕麦奶": { unit: "ml", base: 100, kcal: 48, protein: 1, carbs: 6.7, fat: 1.5, category: "饮品", emoji: "🥛" },
  "无糖豆奶": { unit: "ml", base: 100, kcal: 33, protein: 3, carbs: 1.2, fat: 1.8, category: "饮品", emoji: "🥛" },
  "杏仁奶": { unit: "ml", base: 100, kcal: 18, protein: 0.6, carbs: 0.3, fat: 1.5, category: "饮品", emoji: "🥛" },
  "普通奶茶": { unit: "杯", base: 1, kcal: 420, protein: 6, carbs: 58, fat: 16, category: "饮品", emoji: "🧋" },
  "麻辣烫": { unit: "份", base: 1, kcal: 650, protein: 28, carbs: 58, fat: 34, category: "外卖", emoji: "🌶️" },
  "火锅": { unit: "顿", base: 1, kcal: 900, protein: 45, carbs: 60, fat: 52, category: "外卖", emoji: "🍲" },
  "炸鸡": { unit: "份", base: 1, kcal: 780, protein: 38, carbs: 45, fat: 48, category: "外卖", emoji: "🍗" },
  "蛋糕": { unit: "块", base: 1, kcal: 360, protein: 5, carbs: 42, fat: 19, category: "甜食", emoji: "🍰" },
  "辣椒酱": { unit: "勺", base: 1, kcal: 45, protein: 0.5, carbs: 3, fat: 3.5, category: "调味", emoji: "🌶️" }
};

const CATEGORY_OPTIONS = ["蛋白质", "蔬菜", "主食", "水果", "饮品", "甜食", "外卖", "调味", "其他"];
const CATEGORY_RULES = [
  { category: "蛋白质", keywords: ["鸡胸", "鸡肉", "鸡排", "鸡腿", "鸡翅", "鸡蛋", "蛋", "牛肉", "牛排", "羊肉", "猪肉", "瘦肉", "鱼", "三文鱼", "鳕鱼", "金枪鱼", "虾", "蟹", "贝", "豆腐", "豆干", "豆皮", "腐竹", "毛豆", "鹰嘴豆", "酸奶", "希腊酸奶", "牛奶", "奶酪", "芝士", "蛋白粉"] },
  { category: "蔬菜", keywords: ["青菜", "白菜", "娃娃菜", "生菜", "菠菜", "油麦菜", "西兰花", "花菜", "蘑菇", "香菇", "金针菇", "菌菇", "番茄", "西红柿", "黄瓜", "胡萝卜", "萝卜", "芹菜", "茄子", "豆角", "四季豆", "芦笋", "南瓜", "冬瓜", "海带", "紫菜", "莲藕", "洋葱", "彩椒", "辣椒"] },
  { category: "主食", keywords: ["米饭", "饭", "糙米", "杂粮", "粥", "燕麦", "面", "面条", "意面", "荞麦", "粉", "粉丝", "米粉", "河粉", "馒头", "包子", "饺子", "馄饨", "面包", "吐司", "贝果", "饼", "煎饼", "土豆", "红薯", "紫薯", "玉米", "藜麦", "麦片"] },
  { category: "水果", keywords: ["苹果", "香蕉", "梨", "橙", "橘", "柑", "葡萄", "草莓", "蓝莓", "树莓", "猕猴桃", "奇异果", "西瓜", "哈密瓜", "芒果", "桃", "李子", "菠萝", "牛油果", "柠檬", "樱桃", "火龙果"] },
  { category: "饮品", keywords: ["奶茶", "咖啡", "拿铁", "美式", "果汁", "可乐", "汽水", "茶", "豆奶", "豆浆", "燕麦奶", "杏仁奶", "椰奶", "牛奶", "酸奶饮", "饮料", "奶昔", "smoothie"] },
  { category: "甜食", keywords: ["蛋糕", "甜甜圈", "饼干", "巧克力", "冰淇淋", "雪糕", "糖", "布丁", "奶油", "泡芙", "可颂", "曲奇", "马卡龙", "甜品", "蛋挞"] },
  { category: "外卖", keywords: ["麻辣烫", "火锅", "炸鸡", "汉堡", "披萨", "寿司", "盖饭", "拌饭", "外卖", "便当", "轻食", "沙拉", "烧烤", "串", "煲仔饭", "炒饭", "炒面", "米线", "螺蛳粉", "酸辣粉", "拉面"] },
  { category: "调味", keywords: ["酱", "辣椒酱", "沙拉酱", "蛋黄酱", "番茄酱", "酱油", "醋", "蚝油", "麻酱", "花生酱", "蜂蜜", "糖浆", "油", "橄榄油", "香油", "调料", "蘸料"] }
];

const app = document.querySelector("#app");
const dateLabel = document.querySelector("#dateLabel");
const greetingTitle = document.querySelector("#greetingTitle");
const toast = document.querySelector("#toast");
let page = "home";
let activeMeal = "早餐";
let activeListTab = "pantry";
let selectedMood = "平静";
let plannerMeal = "晚餐";
let selectedPantryIds = new Set();
let longPressTimer = null;

const today = () => new Date().toISOString().slice(0, 10);
const prettyDate = (dateStr = today()) => dateStr.replaceAll("-", "/");
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const money0 = (n) => Number(n || 0).toFixed(0);
const macro = (n) => Number(n || 0).toFixed(1);
const currency = (n) => `$${Number(n || 0).toFixed(2)}`;
const addDays = (dateStr, days) => {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + Number(days || 0));
  return d.toISOString().slice(0, 10);
};
const daysBetween = (a, b) => Math.round((new Date(`${b}T12:00:00`) - new Date(`${a}T12:00:00`)) / 86400000);

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function rgba(hex, alpha = 1) {
  const clean = String(hex || "#ffffff").replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.split("").map(x => x + x).join("") : clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, Number(alpha)))})`;
}
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

function defaultSettings() {
  return {
    appName: "今天怎么吃",
    nickname: "我",
    calorieTarget: 1600,
    proteinTarget: 80,
    waterTarget: 8,
    weightTarget: "",
    preference: "喜欢辣，喜欢热食，减脂但不想极端节食",
    cycleLength: 28,
    periodLength: 5,
    theme: "morandi-cream",
    customColors: clone(THEME_PRESETS["morandi-cream"].colors)
  };
}
function normalizeSettings(s) {
  return { ...defaultSettings(), ...(s || {}), customColors: { ...clone(THEME_PRESETS["morandi-cream"].colors), ...((s || {}).customColors || {}) } };
}
function getSettings() { return normalizeSettings(load(STORAGE.settings, defaultSettings())); }
function setSettings(s) { save(STORAGE.settings, normalizeSettings(s)); }
function getLogs() { return load(STORAGE.logs, []); }
function setLogs(v) { save(STORAGE.logs, v); }
function getPantryRaw() { return load(STORAGE.pantry, []); }
function getPantry() { return getPantryRaw().map(normalizePantryItem); }
function setPantry(v) { save(STORAGE.pantry, v.map(normalizePantryItem)); }
function getCravings() { return load(STORAGE.cravings, []); }
function setCravings(v) { save(STORAGE.cravings, v); }
function getMoods() { return load(STORAGE.moods, []); }
function setMoods(v) { save(STORAGE.moods, v); }
function getPhotos() { return load(STORAGE.photos, []); }
function setPhotos(v) { save(STORAGE.photos, v); }
function getWater() { return load(STORAGE.water, {}); }
function setWater(v) { save(STORAGE.water, v); }
function getTodos() { return load(STORAGE.todos, []); }
function setTodos(v) { save(STORAGE.todos, v); }
function getMoneyRecords() { return load(STORAGE.money, []); }
function setMoneyRecords(v) { save(STORAGE.money, v); }
function getWeights() { return load(STORAGE.weight, []); }
function setWeights(v) { save(STORAGE.weight, v); }
function getPeriods() { return load(STORAGE.periods, []); }
function setPeriods(v) { save(STORAGE.periods, v); }
function getPlannerCache() { return load(STORAGE.planner, {}); }
function setPlannerCache(v) { save(STORAGE.planner, v); }

function normalizePantryItem(item) {
  const category = item.category || classifyFoodName(item.name);
  let qty = Number(item.qty);
  let unit = item.unit;
  if (!unit || Number.isNaN(qty)) {
    const parsed = parseAmount(item.amount || "");
    qty = Number.isNaN(qty) ? parsed.qty : qty;
    unit = unit || parsed.unit;
  }
  if (!qty || qty < 0) qty = 1;
  if (!unit) unit = defaultUnitFor(category);
  return { id: item.id || uid(), name: item.name || "食材", category, qty, unit, expire: item.expire || "" };
}
function parseAmount(text) {
  const str = String(text || "").trim();
  const match = str.match(/([\d.]+)/);
  const qty = match ? Number(match[1]) : 1;
  const unit = str.replace(/[\d.\s]/g, "") || "份";
  return { qty, unit };
}
function defaultUnitFor(category) {
  return ({ 蛋白质: "份", 蔬菜: "份", 主食: "份", 水果: "个", 饮品: "瓶", 甜食: "份", 外卖: "份", 调味: "瓶", 其他: "份" }[category] || "份");
}

function applyTheme(themeName = "morandi-cream", customColors = null) {
  const s = getSettings();
  const theme = themeName || s.theme || "morandi-cream";
  document.documentElement.dataset.theme = theme;
  const colors = theme === "custom" ? (customColors || s.customColors || THEME_PRESETS["morandi-cream"].colors) : THEME_PRESETS[theme]?.colors;
  if (!colors) return;
  const root = document.documentElement.style;
  root.setProperty("--bg", colors.bg);
  root.setProperty("--bg-2", colors.bg2);
  root.setProperty("--card", rgba(colors.card, colors.cardAlpha ?? 0.9));
  root.setProperty("--card-solid", colors.card);
  root.setProperty("--text", colors.text);
  root.setProperty("--muted", colors.muted);
  root.setProperty("--pink", colors.pink);
  root.setProperty("--sage", colors.sage);
  root.setProperty("--blue", colors.blue);
  root.setProperty("--brown", colors.brown);
  root.setProperty("--apricot", colors.apricot);
  root.setProperty("--lav", colors.lav);
  root.setProperty("--danger", colors.danger);
}

function calcFood(foodName, amount) {
  const item = FOOD_DB[foodName];
  if (!item) return null;
  const ratio = Number(amount || 0) / item.base;
  return { kcal: item.kcal * ratio, protein: item.protein * ratio, carbs: item.carbs * ratio, fat: item.fat * ratio };
}
function classifyFoodName(name = "") {
  const value = String(name).trim();
  const text = value.toLowerCase().replace(/\s+/g, "");
  if (!text) return "其他";
  if (FOOD_DB[value]?.category) return FOOD_DB[value].category;
  for (const rule of CATEGORY_RULES) if (rule.keywords.some(keyword => text.includes(String(keyword).toLowerCase()))) return rule.category;
  return "其他";
}
function categoryHintText(name = "") {
  const value = String(name).trim();
  if (!value) return "输入食材后，我会先帮你自动判断分类；不准的话也可以手动改。";
  const category = classifyFoodName(value);
  return category === "其他" ? `暂时没判断出「${value}」的分类，先归到「其他」。你可以手动选择。` : `我猜「${value}」属于「${category}」。如果不准，手动改一下就好。`;
}
function totalsFor(dateStr = today()) {
  const logs = getLogs().filter(x => x.date === dateStr);
  return logs.reduce((acc, x) => {
    acc.kcal += Number(x.kcal || 0); acc.protein += Number(x.protein || 0); acc.carbs += Number(x.carbs || 0); acc.fat += Number(x.fat || 0);
    return acc;
  }, { kcal: 0, protein: 0, carbs: 0, fat: 0, logs });
}
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}
function setTopbar() {
  const s = getSettings();
  document.title = s.appName || "今天怎么吃";
  const h = new Date().getHours();
  const hello = h < 11 ? "早上好" : h < 18 ? "下午好" : "晚上好";
  dateLabel.textContent = `${prettyDate()} · ${hello}`;
  const names = { home: `${hello}，${s.nickname || "我"}`, log: "记录一餐", photo: "拍一张饭", lists: "我的清单", life: "生活小账本", body: "身体记录", journal: "心情日记" };
  greetingTitle.textContent = page === "home" ? (s.appName || names.home) : (names[page] || s.appName || "今天怎么吃");
}
function render() {
  applyTheme(getSettings().theme, getSettings().customColors);
  setTopbar();
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.page === page));
  ({ home: renderHome, log: renderLog, photo: renderPhoto, lists: renderLists, life: renderLife, body: renderBody, journal: renderJournal }[page] || renderHome)();
}

function dailyAdvice(t, s) {
  const bits = [];
  if (!t.logs.length) return "今天还没有记录。先不用追求完美，随手记下一餐就很好。";
  const pct = t.kcal / s.calorieTarget;
  if (pct < 0.55) bits.push("今天目前吃得偏少，别硬饿，下一餐可以安排热食、蛋白质和一点主食。 ");
  else if (pct <= 1.05) bits.push("今天热量节奏还稳，没有必要突然补偿性少吃。 ");
  else bits.push("今天热量已经偏高一点，但不用摆烂，下一餐清爽一点就能把节奏拉回来。 ");
  if (t.protein < s.proteinTarget * 0.65) bits.push("蛋白质还差一点，优先考虑鸡蛋、鸡胸肉、豆腐、牛肉或酸奶。 ");
  else bits.push("蛋白质表现不错，饱腹感会更稳。 ");
  if (!t.logs.some(x => x.category === "蔬菜")) bits.push("蔬菜记录偏少，晚餐加一份青菜、蘑菇或西兰花会舒服很多。 ");
  if (t.logs.some(x => ["甜食", "饮品"].includes(x.category) && x.kcal > 250)) bits.push("今天已经有甜饮/甜食了，后面就别再叠加奶茶和蛋糕。 ");
  return bits.join("").trim();
}
function recipeAdvice() {
  const pantry = getPantry();
  if (!pantry.length) return "先在食材清单里记一下你买了什么，我就能帮你拼下一餐。";
  return buildMealPlan("晚餐", pantry.slice(0, 6), "").summary;
}
function renderHome() {
  const s = getSettings();
  const t = totalsFor();
  const percent = Math.min(100, Math.round(t.kcal / s.calorieTarget * 100));
  const water = getTodayWater();
  const todoOpen = getTodos().filter(x => !x.done).length;
  const todaySpent = getMoneySummary().todayExpense;
  app.innerHTML = `
    <section class="card hero-card">
      <div class="hero-row">
        <div class="hero-kcal"><span>今日摄入</span><strong>${money0(t.kcal)}</strong><span> / ${s.calorieTarget} kcal</span></div>
        <div class="hero-badge">${percent < 65 ? "慢慢来" : percent <= 105 ? "节奏稳定" : "轻轻收一下"}</div>
      </div>
      <div class="progress-wrap"><div class="progress-label"><span>热量进度</span><span>${percent}%</span></div><div class="progress"><span style="width:${percent}%"></span></div></div>
    </section>
    <section class="stats-grid">
      <div class="stat-card"><span>蛋白质</span><strong>${macro(t.protein)}g</strong></div>
      <div class="stat-card"><span>碳水</span><strong>${macro(t.carbs)}g</strong></div>
      <div class="stat-card"><span>脂肪</span><strong>${macro(t.fat)}g</strong></div>
    </section>
    <section class="badge-grid">
      <div class="badge-card"><span>💧</span><strong>${water}/${s.waterTarget}</strong><small>今日喝水</small></div>
      <div class="badge-card"><span>📝</span><strong>${todoOpen}</strong><small>待办未完成</small></div>
      <div class="badge-card"><span>💸</span><strong>${currency(todaySpent)}</strong><small>今日支出</small></div>
    </section>
    <section class="card advice-card"><div class="card-title"><h2>今天的判断</h2><small>🫧</small></div><p class="advice-text">${dailyAdvice(t, s)}</p></section>
    <section class="card"><div class="card-title"><h2>下一餐建议</h2><small>用清单生成</small></div><p class="soft-note">${recipeAdvice()}</p><div class="tag-row" style="margin-top:12px"><span class="tag sage">🥬 有蔬菜更稳</span><span class="tag pink">🌶️ 辣可以少油</span><span class="tag blue">🍚 主食不用全戒</span></div></section>
    <section class="card"><div class="card-title"><h2>今天的记录</h2><small>${t.logs.length} 条</small></div>${t.logs.length ? `<div class="list-stack">${t.logs.map(logItemHtml).join("")}</div>` : `<div class="empty">还没有记录。先记一餐就很好，不用一开始就做到很细。</div>`}</section>`;
}

function logItemHtml(x) {
  return `<div class="list-item"><div><strong>${FOOD_DB[x.food]?.emoji || "🍽️"} ${x.food}</strong><small>${x.meal} · ${x.amount}${x.unit} · ${money0(x.kcal)} kcal</small></div><button class="delete-btn" onclick="deleteLog('${x.id}')">×</button></div>`;
}
window.deleteLog = (id) => { setLogs(getLogs().filter(x => x.id !== id)); showToast("已删除这一条"); render(); };

function renderLog() {
  const foodOptions = Object.keys(FOOD_DB).map(name => `<option value="${name}">${FOOD_DB[name].emoji} ${name} · ${FOOD_DB[name].category}</option>`).join("");
  const quick = ["鸡胸肉", "鸡蛋", "熟米饭", "燕麦奶", "青菜", "西兰花", "豆腐", "普通奶茶"];
  app.innerHTML = `<section class="card"><div class="card-title"><h2>这顿是什么？</h2><small>🍱</small></div><div class="segmented" id="mealSegment">${["早餐", "午餐", "晚餐", "加餐"].map(m => `<button class="${activeMeal === m ? "active" : ""}" data-meal="${m}">${m}</button>`).join("")}</div><div class="form-grid" style="margin-top:14px"><label>食物<select id="foodSelect">${foodOptions}</select></label><div class="form-row"><label>数量<input id="amountInput" type="number" min="0" step="10" value="100" /></label><label>单位<input id="unitInput" type="text" value="g" /></label></div><label>备注，可不填<input id="noteInput" type="text" placeholder="比如：少油、外卖、很辣" /></label><button class="primary-btn full" id="saveLogBtn">保存这一餐</button></div></section><section class="card compact"><div class="card-title"><h2>常吃快捷添加</h2><small>点一下会填入</small></div><div class="quick-grid">${quick.map(name => `<button class="quick-food" data-food="${name}"><strong>${FOOD_DB[name].emoji} ${name}</strong><small>${FOOD_DB[name].base}${FOOD_DB[name].unit} · ${FOOD_DB[name].kcal} kcal</small></button>`).join("")}</div></section><section class="card compact"><p class="soft-note">外卖和酱料类热量只是估算。油量、糖、麻酱、奶盖、小料都会让实际热量明显变化。</p></section>`;
  const foodSelect = document.querySelector("#foodSelect");
  const amountInput = document.querySelector("#amountInput");
  const unitInput = document.querySelector("#unitInput");
  const syncUnit = () => { const item = FOOD_DB[foodSelect.value]; unitInput.value = item.unit; amountInput.value = item.base; };
  foodSelect.addEventListener("change", syncUnit);
  document.querySelector("#mealSegment").addEventListener("click", (e) => { const btn = e.target.closest("button[data-meal]"); if (!btn) return; activeMeal = btn.dataset.meal; renderLog(); });
  document.querySelectorAll(".quick-food").forEach(btn => btn.addEventListener("click", () => { foodSelect.value = btn.dataset.food; syncUnit(); showToast(`已选 ${btn.dataset.food}`); }));
  document.querySelector("#saveLogBtn").addEventListener("click", () => {
    const food = foodSelect.value;
    const amount = Number(amountInput.value);
    if (!amount || amount <= 0) return showToast("数量要大于 0");
    const calc = calcFood(food, amount);
    const item = FOOD_DB[food];
    setLogs([{ id: uid(), date: today(), meal: activeMeal, food, amount, unit: unitInput.value || item.unit, category: item.category, note: document.querySelector("#noteInput").value, ...calc }, ...getLogs()]);
    showToast("这一餐记好了"); page = "home"; render();
  });
}

function renderPhoto() {
  const photos = getPhotos().filter(x => x.date === today());
  app.innerHTML = `<section class="card"><div class="card-title"><h2>拍照记录</h2><small>📷</small></div><label class="photo-drop" for="photoInput"><span class="camera">📸</span><strong>拍一张今天吃的</strong><span class="soft-note">第一版先保存照片和备注；后面再接入 AI 识别。</span><img id="previewImg" class="photo-preview" style="display:none" alt="照片预览" /></label><input class="file-input" id="photoInput" type="file" accept="image/*" capture="environment" /><div class="form-grid" style="margin-top:14px"><label>照片里的食物<input id="photoFoodInput" type="text" placeholder="比如：鸡胸肉、米饭、青菜" /></label><label>简单备注<textarea id="photoNoteInput" rows="3" placeholder="比如：外卖，油有点多；或者少油煎的"></textarea></label><button class="primary-btn full" id="savePhotoBtn">保存照片记录</button></div></section><section class="card"><div class="card-title"><h2>今天的照片</h2><small>${photos.length} 张</small></div>${photos.length ? `<div class="list-stack">${photos.map(p => `<div class="list-item"><div><strong>📷 ${p.food || "一餐"}</strong><small>${p.note || "没有备注"}</small></div><button class="delete-btn" onclick="deletePhoto('${p.id}')">×</button></div>`).join("")}</div>` : `<div class="empty">还没有照片。拍照只是为了帮你回忆，不用拍得像广告图。</div>`}</section>`;
  let imageData = "";
  const input = document.querySelector("#photoInput");
  const img = document.querySelector("#previewImg");
  input.addEventListener("change", async () => { const file = input.files?.[0]; if (!file) return; imageData = await resizeImage(file, 700); img.src = imageData; img.style.display = "block"; });
  document.querySelector("#savePhotoBtn").addEventListener("click", () => { const food = document.querySelector("#photoFoodInput").value.trim(); const note = document.querySelector("#photoNoteInput").value.trim(); if (!food && !note && !imageData) return showToast("先拍照或写一点内容"); setPhotos([{ id: uid(), date: today(), food, note, imageData }, ...getPhotos()]); showToast("照片记录保存好了"); renderPhoto(); });
}
window.deletePhoto = (id) => { setPhotos(getPhotos().filter(x => x.id !== id)); showToast("已删除照片记录"); render(); };
function resizeImage(file, maxSize = 700) {
  return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onerror = reject; reader.onload = () => { const img = new Image(); img.onload = () => { const scale = Math.min(1, maxSize / Math.max(img.width, img.height)); const canvas = document.createElement("canvas"); canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale); canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height); resolve(canvas.toDataURL("image/jpeg", 0.72)); }; img.src = reader.result; }; reader.readAsDataURL(file); });
}

function renderLists() {
  const pantry = getPantry(); const cravings = getCravings();
  app.innerHTML = `<section class="card compact"><div class="tabs-two"><button class="${activeListTab === "pantry" ? "active" : ""}" data-listtab="pantry">食材清单</button><button class="${activeListTab === "cravings" ? "active" : ""}" data-listtab="cravings">想吃清单</button></div></section>${activeListTab === "pantry" ? pantryHtml(pantry) : cravingsHtml(cravings)}`;
  document.querySelectorAll("[data-listtab]").forEach(btn => btn.addEventListener("click", () => { activeListTab = btn.dataset.listtab; renderLists(); }));
  if (activeListTab === "pantry") bindPantry(); else bindCravings();
}
function pantryHtml(pantry) {
  return `<section class="card"><div class="card-title"><h2>我的小冰箱</h2><small>🧺</small></div><div class="form-grid"><div class="form-row"><label>食材<input id="pantryName" type="text" placeholder="比如：鸡胸肉" /></label><label>分类<select id="pantryCategory">${CATEGORY_OPTIONS.map(c => `<option>${c}</option>`).join("")}</select><small id="categoryHint" class="soft-note">输入食材后，我会先帮你自动判断分类。</small></label></div><div class="form-row"><label>数量<input id="pantryQty" type="number" min="0" step="0.5" value="1" /></label><label>单位<input id="pantryUnit" type="text" placeholder="比如：块/个/袋/瓶" /></label></div><label>过期时间<input id="pantryExpire" type="date" /></label><button class="secondary-btn full" id="addPantryBtn">加入食材清单</button></div></section>${mealPlannerHtml(pantry)}<section class="card"><div class="card-title"><h2>已有食材</h2><small>${pantry.length} 个</small></div>${pantry.length ? `<div class="list-stack">${pantry.map(pantryItemHtml).join("")}</div>` : `<div class="empty">把你买的鸡胸肉、燕麦奶、鸡蛋、青菜都记在这里。之后它会帮你拼饭。</div>`}</section>`;
}
function pantryItemHtml(p) {
  return `<div class="list-item"><div><strong>${categoryEmoji(p.category)} ${p.name}</strong><small>${p.category} · ${p.qty}${p.unit}${p.expire ? ` · 到期 ${prettyDate(p.expire)}` : ""}</small></div><div class="item-actions"><button class="mini-btn" onclick="changePantryQty('${p.id}', -1)">－</button><span class="qty-pill">${p.qty}${p.unit}</span><button class="mini-btn" onclick="changePantryQty('${p.id}', 1)">＋</button><button class="mini-btn" onclick="useUpPantry('${p.id}')">用完</button><button class="delete-btn" onclick="deletePantry('${p.id}')">×</button></div></div>`;
}
function mealPlannerHtml(pantry) {
  const cache = getPlannerCache();
  const selected = pantry.filter(p => selectedPantryIds.has(p.id));
  return `<section class="card"><div class="card-title"><h2>智能搭配</h2><small>🍽️</small></div><div class="segmented" id="plannerMealSegment">${["早餐", "午餐", "晚餐", "加餐"].map(m => `<button class="${plannerMeal === m ? "active" : ""}" data-planmeal="${m}">${m}</button>`).join("")}</div><div class="form-grid" style="margin-top:12px"><label>我想吃的食材/菜名，可填冰箱外的<input id="plannerCraving" type="text" value="${cache.craving || ""}" placeholder="比如：三文鱼 / 番茄牛腩 / 牛油果吐司" /></label><div><p class="soft-note" style="margin:0 0 8px">从小冰箱选择要搭配的食材：</p><div class="chip-row">${pantry.length ? pantry.map(p => `<button class="selectable-chip ${selectedPantryIds.has(p.id) ? "active" : ""}" data-pantrypick="${p.id}">${categoryEmoji(p.category)} ${p.name}</button>`).join("") : `<span class="soft-note">小冰箱还没有食材。</span>`}</div></div><button class="primary-btn full" id="generateMealBtn">帮我搭配这一餐</button></div><div id="plannerResult" style="margin-top:14px">${cache.result ? plannerResultHtml(cache.result, selected) : ""}</div></section>`;
}
function plannerResultHtml(result, selected) {
  return `<div class="planner-result"><h3>${result.title}</h3><p class="advice-text">${result.summary}</p><p class="soft-note"><strong>已有：</strong>${result.used.length ? result.used.join("、") : "暂时没有选中冰箱食材"}</p><p class="soft-note"><strong>建议补充：</strong>${result.missing.length ? result.missing.join("、") : "这顿结构已经比较完整"}</p><div class="tag-row"><span class="tag sage">${result.balance}</span><span class="tag blue">${result.reminder}</span></div>${selected.length ? `<button class="secondary-btn full" style="margin-top:12px" id="consumeSelectedBtn">我用了这些小冰箱食材</button>` : ""}</div>`;
}
function bindPantry() {
  const nameInput = document.querySelector("#pantryName"); const categorySelect = document.querySelector("#pantryCategory"); const hint = document.querySelector("#categoryHint"); const unitInput = document.querySelector("#pantryUnit");
  const updateCategory = () => { const name = nameInput.value.trim(); const category = classifyFoodName(name); categorySelect.value = category; unitInput.value = unitInput.value || defaultUnitFor(category); if (hint) hint.textContent = categoryHintText(name); };
  nameInput.addEventListener("input", updateCategory); updateCategory();
  document.querySelector("#addPantryBtn").addEventListener("click", () => {
    const name = nameInput.value.trim(); if (!name) return showToast("先写一个食材名字");
    const category = categorySelect.value || classifyFoodName(name);
    setPantry([{ id: uid(), name, category, qty: Number(document.querySelector("#pantryQty").value || 1), unit: unitInput.value.trim() || defaultUnitFor(category), expire: document.querySelector("#pantryExpire").value }, ...getPantry()]);
    showToast(`放进小冰箱了，分类是「${category}」`); renderLists();
  });
  bindPlanner();
}
function bindPlanner() {
  document.querySelector("#plannerMealSegment")?.addEventListener("click", e => { const btn = e.target.closest("button[data-planmeal]"); if (!btn) return; plannerMeal = btn.dataset.planmeal; renderLists(); });
  document.querySelectorAll("[data-pantrypick]").forEach(btn => btn.addEventListener("click", () => { selectedPantryIds.has(btn.dataset.pantrypick) ? selectedPantryIds.delete(btn.dataset.pantrypick) : selectedPantryIds.add(btn.dataset.pantrypick); renderLists(); }));
  document.querySelector("#generateMealBtn")?.addEventListener("click", () => { const craving = document.querySelector("#plannerCraving").value.trim(); const selected = getPantry().filter(p => selectedPantryIds.has(p.id)); const result = buildMealPlan(plannerMeal, selected, craving); setPlannerCache({ meal: plannerMeal, craving, result }); renderLists(); showToast("搭配好了"); });
  document.querySelector("#consumeSelectedBtn")?.addEventListener("click", () => { consumeSelectedPantry(); });
}
function buildMealPlan(meal, selected, craving = "") {
  const all = [...selected];
  if (craving) all.push({ name: craving, category: classifyFoodName(craving), temporary: true });
  const by = cat => all.filter(x => x.category === cat).map(x => x.name);
  const proteins = by("蛋白质"), vegs = by("蔬菜"), carbs = by("主食"), fruits = by("水果"), drinks = by("饮品");
  const missing = [];
  if (!proteins.length && !["加餐"].includes(meal)) missing.push("一个蛋白质：鸡蛋/鸡胸肉/牛肉/豆腐");
  if (!vegs.length && !["早餐", "加餐"].includes(meal)) missing.push("一份蔬菜：黄瓜/番茄/白菜/青菜");
  if (!carbs.length && ["早餐", "午餐"].includes(meal)) missing.push("一点主食：米饭/土豆/全麦面包/玉米");
  const used = selected.map(x => x.name);
  const temp = craving ? `你想吃「${craving}」${selected.some(x => x.name.includes(craving)) ? "，它已经在小冰箱里。" : "，如果小冰箱里没有，就先当作本次临时食材。"}` : "";
  let combo = "";
  if (meal === "早餐") combo = `${carbs[0] || "全麦面包/燕麦"} + ${proteins[0] || "鸡蛋/酸奶"}${drinks[0] ? ` + ${drinks[0]}` : ""}`;
  else if (meal === "午餐") combo = `${proteins[0] || "蛋白质"} + ${carbs[0] || "主食"} + ${vegs.slice(0,2).join("、") || "蔬菜"}`;
  else if (meal === "晚餐") combo = `${proteins[0] || "蛋白质"} + ${vegs.slice(0,2).join("、") || "蔬菜"}${carbs[0] ? ` + 少量${carbs[0]}` : ""}`;
  else combo = `${fruits[0] || drinks[0] || "水果/饮品"} + ${proteins[0] || "一点蛋白质"}`;
  if (craving) combo = `${craving} 的减脂搭配：${combo}`;
  return { title: `${meal}建议`, summary: `${combo}。${temp} 这顿重点是别只吃单一食材，尽量有蛋白质、蔬菜和适量主食。`, used, missing, balance: "结构：蛋白质 + 蔬菜 + 适量主食", reminder: meal === "晚餐" ? "晚餐清爽一点更稳" : "不用追求完美，能执行更重要" };
}
function consumeSelectedPantry() {
  const pantry = getPantry().map(item => selectedPantryIds.has(item.id) ? { ...item, qty: Math.max(0, Number(item.qty || 0) - 1) } : item).filter(x => x.qty > 0);
  setPantry(pantry); selectedPantryIds = new Set([...selectedPantryIds].filter(id => pantry.some(p => p.id === id))); showToast("已消耗选中的食材"); renderLists();
}
function cravingsHtml(cravings) {
  return `<section class="card"><div class="card-title"><h2>最近想吃</h2><small>🌶️</small></div><div class="form-grid"><label>我想吃/喝<input id="cravingName" type="text" placeholder="比如：奶茶、麻辣烫、火锅" /></label><label>想吃程度<select id="cravingLevel"><option>有点想</option><option>很想</option><option>非常想</option></select></label><button class="secondary-btn full" id="addCravingBtn">加入想吃清单</button></div></section><section class="card"><div class="card-title"><h2>愿望小卡片</h2><small>${cravings.length} 个</small></div>${cravings.length ? `<div class="list-stack">${cravings.map(c => `<div class="list-item"><div><strong>${cravingEmoji(c.name)} ${c.name}</strong><small>${c.level} · ${cravingAdvice(c.name)}</small></div><button class="delete-btn" onclick="deleteCraving('${c.id}')">×</button></div>`).join("")}</div>` : `<div class="empty">想吃什么也可以记下来。不是禁止你吃，是帮你换一个更稳的版本。</div>`}</section>`;
}
function bindCravings() { document.querySelector("#addCravingBtn").addEventListener("click", () => { const name = document.querySelector("#cravingName").value.trim(); if (!name) return showToast("先写你想吃什么"); setCravings([{ id: uid(), name, level: document.querySelector("#cravingLevel").value, date: today() }, ...getCravings()]); showToast("记下来了，不骂你"); renderLists(); }); }
window.deletePantry = (id) => { setPantry(getPantry().filter(x => x.id !== id)); selectedPantryIds.delete(id); showToast("已移除食材"); render(); };
window.useUpPantry = (id) => { setPantry(getPantry().filter(x => x.id !== id)); selectedPantryIds.delete(id); showToast("这个食材用完了"); render(); };
window.changePantryQty = (id, delta) => { const next = getPantry().map(x => x.id === id ? { ...x, qty: Math.max(0, Number(x.qty || 0) + delta) } : x).filter(x => x.qty > 0); setPantry(next); showToast(delta > 0 ? "加回一份" : "消耗一份"); render(); };
window.deleteCraving = (id) => { setCravings(getCravings().filter(x => x.id !== id)); showToast("已移除想吃记录"); render(); };
function categoryEmoji(cat) { return ({ 蛋白质: "🍗", 蔬菜: "🥬", 主食: "🍚", 水果: "🍎", 饮品: "🥛", 甜食: "🍰", 外卖: "🥡", 调味: "🌶️", 其他: "🫙" }[cat] || "🫙"); }
function chipClass(cat) { return ({ 蛋白质: "sage", 蔬菜: "sage", 主食: "apricot", 水果: "sage", 饮品: "blue", 甜食: "pink", 外卖: "lav", 调味: "pink", 其他: "lav" }[cat] || "lav"); }
function cravingEmoji(name) { if (name.includes("奶茶")) return "🧋"; if (name.includes("火锅")) return "🍲"; if (name.includes("辣") || name.includes("麻辣")) return "🌶️"; if (name.includes("蛋糕") || name.includes("甜")) return "🍰"; if (name.includes("炸")) return "🍗"; return "🍽️"; }
function cravingAdvice(name) { if (name.includes("奶茶")) return "可以小杯少糖，今天别再叠加蛋糕。"; if (name.includes("麻辣") || name.includes("辣")) return "可以吃辣，但把蛋白质和蔬菜放前面，少油少麻酱。"; if (name.includes("火锅")) return "清汤/番茄锅更稳，少肥牛、炸响铃和宽粉。"; if (name.includes("蛋糕") || name.includes("甜")) return "先吃正餐再吃小份甜，不要空腹直接甜。"; if (name.includes("炸")) return "真的想吃就小份，别和奶茶一起叠。"; return "不是不能吃，先想一个更稳的小份版本。"; }

function getTodayWater() { return Number(getWater()[today()] || 0); }
function setTodayWater(n) { const w = getWater(); w[today()] = Math.max(0, Number(n || 0)); setWater(w); }
function getMoneySummary() {
  const records = getMoneyRecords();
  const todayExpense = records.filter(x => x.date === today() && x.type === "支出").reduce((a,b)=>a+Number(b.amount||0),0);
  const month = today().slice(0,7);
  const monthExpense = records.filter(x => x.date?.startsWith(month) && x.type === "支出").reduce((a,b)=>a+Number(b.amount||0),0);
  const monthIncome = records.filter(x => x.date?.startsWith(month) && x.type === "收入").reduce((a,b)=>a+Number(b.amount||0),0);
  return { todayExpense, monthExpense, monthIncome };
}
function renderLife() {
  const s = getSettings(); const water = getTodayWater(); const todos = getTodos(); const records = getMoneyRecords(); const summary = getMoneySummary();
  app.innerHTML = `<section class="card"><div class="card-title"><h2>喝水记录</h2><small>${water}/${s.waterTarget} 杯</small></div><div class="water-grid" id="waterGrid">${Array.from({length:s.waterTarget}).map((_,i)=>`<button class="water-cup ${i < water ? "filled" : ""}" data-water="${i+1}">💧</button>`).join("")}</div><p class="soft-note">点空杯加一杯；双击或长按已记录的水杯，可以取消一杯。每天会自动重新计数。</p></section><section class="card"><div class="card-title"><h2>To do list</h2><small>${todos.filter(x=>!x.done).length} 个未完成</small></div><div class="form-row"><input id="todoInput" placeholder="比如：买鸡蛋 / 做饭 / 运动20分钟" /><button class="secondary-btn" id="addTodoBtn">添加</button></div><div class="list-stack" style="margin-top:12px">${todos.length ? todos.map(todoHtml).join("") : `<div class="empty">今天还没有待办。你可以把买菜、做饭、喝水都放在这里。</div>`}</div></section><section class="card"><div class="card-title"><h2>记账</h2><small>今日支出 ${currency(summary.todayExpense)}</small></div><div class="form-grid"><div class="form-row"><label>类型<select id="moneyType"><option>支出</option><option>收入</option></select></label><label>金额<input id="moneyAmount" type="number" min="0" step="0.01" /></label></div><div class="form-row"><label>分类<select id="moneyCategory"><option>饮食</option><option>购物</option><option>交通</option><option>学习</option><option>娱乐</option><option>其他</option></select></label><label>日期<input id="moneyDate" type="date" value="${today()}" /></label></div><input id="moneyNote" placeholder="备注，比如：奶茶 / 超市 / 午餐" /><button class="primary-btn full" id="addMoneyBtn">记一笔</button></div><div class="money-row" style="margin-top:12px"><span>本月收入 ${currency(summary.monthIncome)}</span><strong>本月支出 ${currency(summary.monthExpense)}</strong></div><div class="list-stack" style="margin-top:12px">${records.slice(0,8).map(moneyHtml).join("") || `<div class="empty">还没有记账记录。</div>`}</div></section>`;
  bindLife();
}
function todoHtml(t) { return `<div class="list-item todo-item ${t.done ? "done" : ""}"><button class="toggle-dot ${t.done ? "done" : ""}" onclick="toggleTodo('${t.id}')">${t.done ? "✓" : ""}</button><div style="flex:1"><strong>${t.text}</strong><small>${prettyDate(t.date)}</small></div><button class="delete-btn" onclick="deleteTodo('${t.id}')">×</button></div>`; }
function moneyHtml(x) { return `<div class="list-item"><div><strong>${x.type === "收入" ? "💰" : "💸"} ${x.category} · ${currency(x.amount)}</strong><small>${prettyDate(x.date)} · ${x.note || "没有备注"}</small></div><button class="delete-btn" onclick="deleteMoney('${x.id}')">×</button></div>`; }
function bindLife() {
  document.querySelector("#waterGrid").addEventListener("click", e => { if (!e.target.closest(".water-cup")) return; setTodayWater(getTodayWater()+1); showToast("喝水 +1"); renderLife(); });
  document.querySelector("#waterGrid").addEventListener("dblclick", e => { if (!e.target.closest(".water-cup")) return; setTodayWater(getTodayWater()-1); showToast("已取消一杯"); renderLife(); });
  document.querySelectorAll(".water-cup").forEach(btn => { btn.addEventListener("touchstart", () => { longPressTimer = setTimeout(()=>{ setTodayWater(getTodayWater()-1); showToast("已取消一杯"); renderLife(); }, 650); }); btn.addEventListener("touchend", () => clearTimeout(longPressTimer)); btn.addEventListener("touchmove", () => clearTimeout(longPressTimer)); });
  document.querySelector("#addTodoBtn").addEventListener("click", () => { const text = document.querySelector("#todoInput").value.trim(); if (!text) return showToast("先写一个待办"); setTodos([{id:uid(), text, done:false, date:today()}, ...getTodos()]); showToast("已加入待办"); renderLife(); });
  document.querySelector("#addMoneyBtn").addEventListener("click", () => { const amount = Number(document.querySelector("#moneyAmount").value); if (!amount) return showToast("先输入金额"); setMoneyRecords([{ id:uid(), type:document.querySelector("#moneyType").value, amount, category:document.querySelector("#moneyCategory").value, date:document.querySelector("#moneyDate").value || today(), note:document.querySelector("#moneyNote").value.trim() }, ...getMoneyRecords()]); showToast("记好了"); renderLife(); });
}
window.toggleTodo = id => { setTodos(getTodos().map(x => x.id === id ? {...x, done:!x.done} : x)); renderLife(); };
window.deleteTodo = id => { setTodos(getTodos().filter(x => x.id !== id)); showToast("已删除待办"); renderLife(); };
window.deleteMoney = id => { setMoneyRecords(getMoneyRecords().filter(x => x.id !== id)); showToast("已删除账目"); renderLife(); };

function renderBody() {
  const weights = getWeights().sort((a,b)=>a.date.localeCompare(b.date)); const periods = getPeriods().sort((a,b)=>b.start.localeCompare(a.start)); const s = getSettings(); const prediction = predictPeriod(periods, s);
  app.innerHTML = `<section class="card"><div class="card-title"><h2>体重变化</h2><small>${weights.length} 条</small></div><div class="form-grid"><div class="form-row"><label>日期<input id="weightDate" type="date" value="${today()}" /></label><label>体重 kg<input id="weightInput" type="number" step="0.1" min="20" /></label></div><input id="weightNote" placeholder="备注，可不填，比如：水肿/生理期/运动后" /><button class="primary-btn full" id="addWeightBtn">保存体重</button></div><div class="chart-wrap" style="margin-top:14px"><canvas id="weightChart" width="380" height="220"></canvas></div><div class="list-stack" style="margin-top:12px">${weights.slice(-6).reverse().map(weightHtml).join("") || `<div class="empty">还没有体重记录。记录几次之后，这里会出现趋势曲线。</div>`}</div></section><section class="card"><div class="card-title"><h2>生理期记录</h2><small>🌙</small></div><div class="period-grid"><div class="period-pill"><strong>下次预计开始</strong><br><span>${prediction.nextStart ? prettyDate(prediction.nextStart) : "还需要记录一次"}</span></div><div class="period-pill"><strong>距离预计</strong><br><span>${prediction.daysText}</span></div></div><p class="soft-note">这是按平均周期估算的预测，只用于生活记录和提醒，不作为医疗判断。</p><div class="form-grid"><div class="form-row"><label>开始日期<input id="periodStart" type="date" value="${today()}" /></label><label>结束日期<input id="periodEnd" type="date" /></label></div><label>状态<select id="periodFlow"><option>开始</option><option>轻量</option><option>正常</option><option>较多</option><option>结束</option></select></label><textarea id="periodNote" rows="3" placeholder="备注：痛经、情绪、食欲、水肿等"></textarea><button class="secondary-btn full" id="addPeriodBtn">保存生理期记录</button></div><div class="list-stack" style="margin-top:12px">${periods.slice(0,6).map(periodHtml).join("") || `<div class="empty">记录一次开始日期后，就能预测下一次。</div>`}</div></section>`;
  bindBody(); drawWeightChart(weights, s);
}
function weightHtml(w) { return `<div class="list-item"><div><strong>⚖️ ${w.weight} kg</strong><small>${prettyDate(w.date)} · ${w.note || "没有备注"}</small></div><button class="delete-btn" onclick="deleteWeight('${w.id}')">×</button></div>`; }
function periodHtml(p) { return `<div class="list-item"><div><strong>🌙 ${prettyDate(p.start)} ${p.end ? `- ${prettyDate(p.end)}` : ""}</strong><small>${p.flow} · ${p.note || "没有备注"}</small></div><button class="delete-btn" onclick="deletePeriod('${p.id}')">×</button></div>`; }
function bindBody() {
  document.querySelector("#addWeightBtn").addEventListener("click", () => { const weight = Number(document.querySelector("#weightInput").value); if (!weight) return showToast("先输入体重"); const date = document.querySelector("#weightDate").value || today(); const note = document.querySelector("#weightNote").value.trim(); setWeights([{ id:uid(), date, weight, note }, ...getWeights().filter(x => x.date !== date)]); showToast("体重保存好了"); renderBody(); });
  document.querySelector("#addPeriodBtn").addEventListener("click", () => { const start = document.querySelector("#periodStart").value || today(); setPeriods([{ id:uid(), start, end:document.querySelector("#periodEnd").value, flow:document.querySelector("#periodFlow").value, note:document.querySelector("#periodNote").value.trim() }, ...getPeriods()]); showToast("生理期记录保存好了"); renderBody(); });
}
window.deleteWeight = id => { setWeights(getWeights().filter(x => x.id !== id)); showToast("已删除体重记录"); renderBody(); };
window.deletePeriod = id => { setPeriods(getPeriods().filter(x => x.id !== id)); showToast("已删除生理期记录"); renderBody(); };
function predictPeriod(periods, s) {
  if (!periods.length) return { nextStart: "", daysText: "暂无预测" };
  const latest = [...periods].sort((a,b)=>b.start.localeCompare(a.start))[0];
  let next = addDays(latest.start, s.cycleLength || 28);
  while (daysBetween(today(), next) < -2) next = addDays(next, s.cycleLength || 28);
  const d = daysBetween(today(), next);
  return { nextStart: next, nextEnd: addDays(next, (s.periodLength || 5) - 1), daysText: d === 0 ? "今天" : d > 0 ? `还有 ${d} 天` : `已过 ${Math.abs(d)} 天` };
}
function drawWeightChart(weights, s) {
  const canvas = document.querySelector("#weightChart"); if (!canvas) return; const ctx = canvas.getContext("2d"); const W=canvas.width, H=canvas.height; ctx.clearRect(0,0,W,H); ctx.fillStyle = getCss("--card-solid"); ctx.fillRect(0,0,W,H); ctx.strokeStyle = getCss("--line"); ctx.lineWidth = 1; for(let i=0;i<4;i++){ const y=30+i*45; ctx.beginPath(); ctx.moveTo(30,y); ctx.lineTo(W-16,y); ctx.stroke(); }
  if (weights.length < 2) { ctx.fillStyle = getCss("--muted"); ctx.font = "15px sans-serif"; ctx.fillText("记录至少 2 次后显示曲线", 82, 112); return; }
  const data = weights.slice(-12); const vals = data.map(x=>Number(x.weight)); if (s.weightTarget) vals.push(Number(s.weightTarget)); const min = Math.min(...vals)-1, max = Math.max(...vals)+1; const xAt=i=>30+i*((W-52)/(data.length-1)); const yAt=v=>H-28-((v-min)/(max-min))*(H-60);
  if (s.weightTarget) { const y=yAt(Number(s.weightTarget)); ctx.strokeStyle = getCss("--pink"); ctx.setLineDash([6,5]); ctx.beginPath(); ctx.moveTo(30,y); ctx.lineTo(W-16,y); ctx.stroke(); ctx.setLineDash([]); }
  ctx.strokeStyle = getCss("--sage"); ctx.lineWidth = 4; ctx.beginPath(); data.forEach((d,i)=>{ const x=xAt(i), y=yAt(Number(d.weight)); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }); ctx.stroke(); data.forEach((d,i)=>{ ctx.fillStyle = getCss("--blue"); ctx.beginPath(); ctx.arc(xAt(i), yAt(Number(d.weight)), 5, 0, Math.PI*2); ctx.fill(); }); ctx.fillStyle=getCss("--muted"); ctx.font="12px sans-serif"; ctx.fillText(`${min.toFixed(1)}kg`, 6, H-28); ctx.fillText(`${max.toFixed(1)}kg`, 6, 32);
}
function getCss(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }

function renderJournal() {
  const moods = getMoods().filter(x => x.date === today());
  app.innerHTML = `<section class="card"><div class="card-title"><h2>今天的情绪</h2><small>🌙</small></div><div class="mood-grid" id="moodGrid">${[["开心","☺️"],["平静","🍃"],["累","😮‍💨"],["焦虑","🫧"],["委屈","🌧️"],["暴躁","🔥"]].map(([m,e])=>`<button class="mood-btn ${selectedMood===m?"active":""}" data-mood="${m}"><span>${e}</span>${m}</button>`).join("")}</div><div class="form-grid" style="margin-top:14px"><label>今天食欲<select id="appetiteInput"><option>正常</option><option>很馋</option><option>想吃甜</option><option>想吃辣</option><option>想暴食</option></select></label><label>睡眠<select id="sleepInput"><option>还可以</option><option>很好</option><option>一般</option><option>很差</option></select></label><label>今天一句话<textarea id="journalNote" rows="4" placeholder="比如：今天很累，很想喝奶茶。"></textarea></label><button class="primary-btn full" id="saveMoodBtn">保存今天的状态</button></div></section><section class="card advice-card"><div class="card-title"><h2>小提醒</h2><small>🕯️</small></div><p class="advice-text" id="moodAdvice">${moodAdvice(selectedMood, "正常")}</p></section><section class="card"><div class="card-title"><h2>今天写过</h2><small>${moods.length} 条</small></div>${moods.length ? `<div class="list-stack">${moods.map(m=>`<div class="list-item"><div><strong>${m.mood} · ${m.appetite}</strong><small>${m.note || "没有写备注"}</small></div><button class="delete-btn" onclick="deleteMood('${m.id}')">×</button></div>`).join("")}</div>` : `<div class="empty">情绪也可以被记录。它不是借口，是你理解自己食欲的线索。</div>`}</section>`;
  document.querySelector("#moodGrid").addEventListener("click", e => { const btn=e.target.closest("button[data-mood]"); if(!btn) return; selectedMood=btn.dataset.mood; document.querySelectorAll(".mood-btn").forEach(b=>b.classList.toggle("active", b.dataset.mood===selectedMood)); document.querySelector("#moodAdvice").textContent=moodAdvice(selectedMood, document.querySelector("#appetiteInput").value); });
  document.querySelector("#appetiteInput").addEventListener("change", e => document.querySelector("#moodAdvice").textContent = moodAdvice(selectedMood, e.target.value));
  document.querySelector("#saveMoodBtn").addEventListener("click", () => { setMoods([{ id:uid(), date:today(), mood:selectedMood, appetite:document.querySelector("#appetiteInput").value, sleep:document.querySelector("#sleepInput").value, note:document.querySelector("#journalNote").value.trim() }, ...getMoods()]); showToast("今天的状态存好了"); renderJournal(); });
}
window.deleteMood = id => { setMoods(getMoods().filter(x => x.id !== id)); showToast("已删除日记"); render(); };
function moodAdvice(mood, appetite) { const heavy=["焦虑","累","委屈","暴躁"].includes(mood); const crave=["想吃甜","想吃辣","想暴食","很馋"].includes(appetite); if(heavy&&crave) return "你今天不是没自制力，是状态有点满。先吃一顿热的、有蛋白质的，再决定要不要吃甜食或外卖，会比直接硬扛稳。"; if(appetite==="想吃甜") return "甜的可以留一点位置，但别空腹吃。先吃正餐，再吃小份甜，会更容易停下来。"; if(appetite==="想吃辣") return "想吃辣可以，不必完全压住。把辣放在蛋白质和蔬菜上，少油少酱就好。"; if(mood==="累") return "累的时候别把晚餐做得太复杂。热汤、鸡蛋、豆腐、青菜，这种简单组合就很够。"; return "今天就照顾好一餐。减脂不用靠完美，靠的是明天还能继续。"; }

function buildColorPanel(colors) { return COLOR_FIELDS.map(([key,label]) => `<div class="color-row"><span>${label}</span><input type="color" data-color-key="${key}" value="${colors[key] || "#ffffff"}" /><span></span></div>`).join("") + `<div class="color-row"><span>卡片透明度</span><input type="range" min="0.55" max="1" step="0.01" data-alpha-key="cardAlpha" value="${colors.cardAlpha ?? 0.9}" /><span class="alpha">${Math.round((colors.cardAlpha ?? 0.9)*100)}%</span></div>`; }
function readColorPanel() { const colors = {}; document.querySelectorAll("[data-color-key]").forEach(i => colors[i.dataset.colorKey]=i.value); const alpha=document.querySelector("[data-alpha-key='cardAlpha']"); colors.cardAlpha = Number(alpha?.value || 0.9); return colors; }
function initSettingsDialog() {
  const dialog = document.querySelector("#settingsDialog"); const btn = document.querySelector("#settingsBtn"); const panel = document.querySelector("#customColorPanel");
  const open = () => { const s=getSettings(); document.querySelector("#appNameInput").value=s.appName; document.querySelector("#nicknameInput").value=s.nickname; document.querySelector("#calorieTargetInput").value=s.calorieTarget; document.querySelector("#proteinTargetInput").value=s.proteinTarget; document.querySelector("#waterTargetInput").value=s.waterTarget; document.querySelector("#weightTargetInput").value=s.weightTarget; document.querySelector("#cycleLengthInput").value=s.cycleLength; document.querySelector("#periodLengthInput").value=s.periodLength; document.querySelector("#preferenceInput").value=s.preference; document.querySelector("#themeInput").value=s.theme; panel.innerHTML = buildColorPanel(s.customColors); bindColorPanel(); dialog.showModal(); };
  btn.addEventListener("click", open);
  document.querySelector("#themeInput").addEventListener("change", e => { const theme=e.target.value; if(theme!=="custom") { const colors=clone(THEME_PRESETS[theme]?.colors || THEME_PRESETS["morandi-cream"].colors); panel.innerHTML = buildColorPanel(colors); bindColorPanel(); applyTheme(theme, colors); } else { applyTheme("custom", readColorPanel()); } });
  document.querySelector("#resetThemeBtn").addEventListener("click", () => { const theme=document.querySelector("#themeInput").value === "custom" ? "morandi-cream" : document.querySelector("#themeInput").value; const colors=clone(THEME_PRESETS[theme]?.colors || THEME_PRESETS["morandi-cream"].colors); panel.innerHTML=buildColorPanel(colors); bindColorPanel(); applyTheme(theme, colors); });
  document.querySelector("#saveSettingsBtn").addEventListener("click", e => { e.preventDefault(); const theme=document.querySelector("#themeInput").value; const next={ ...getSettings(), appName:document.querySelector("#appNameInput").value.trim() || "今天怎么吃", nickname:document.querySelector("#nicknameInput").value.trim() || "我", calorieTarget:Number(document.querySelector("#calorieTargetInput").value||1600), proteinTarget:Number(document.querySelector("#proteinTargetInput").value||80), waterTarget:Number(document.querySelector("#waterTargetInput").value||8), weightTarget:document.querySelector("#weightTargetInput").value, cycleLength:Number(document.querySelector("#cycleLengthInput").value||28), periodLength:Number(document.querySelector("#periodLengthInput").value||5), preference:document.querySelector("#preferenceInput").value.trim(), theme, customColors:readColorPanel() }; setSettings(next); applyTheme(next.theme,next.customColors); dialog.close(); showToast("设置保存好了"); render(); });
}
function bindColorPanel() { document.querySelectorAll("[data-color-key], [data-alpha-key]").forEach(input => input.addEventListener("input", () => { document.querySelector("#themeInput").value="custom"; document.querySelectorAll(".alpha").forEach(a => a.textContent = `${Math.round(Number(document.querySelector("[data-alpha-key='cardAlpha']").value)*100)}%`); applyTheme("custom", readColorPanel()); })); }
function initNav() { document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => { page=btn.dataset.page; window.scrollTo({top:0, behavior:"smooth"}); render(); })); }
function initPwa() { if("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("./sw.js?v=30").catch(()=>{}); }

applyTheme(getSettings().theme, getSettings().customColors);
initNav();
initSettingsDialog();
initPwa();
render();
