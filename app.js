const STORAGE = {
  settings: "todayEat.settings.v2",
  oldSettings: "todayEat.settings.v1",
  logs: "todayEat.logs.v1",
  pantry: "todayEat.pantry.v1",
  cravings: "todayEat.cravings.v1",
  moods: "todayEat.moods.v1",
  photos: "todayEat.photos.v1",
  water: "todayEat.water.v1",
  todos: "todayEat.todos.v1",
  expenses: "todayEat.expenses.v1",
};

const THEME_PRESETS = {
  "morandi-cream": {
    label: "奶油莫兰迪",
    colors: {
      bg: "#F6F0EA", bg2: "#EFE7DE", card: "#FFFCF7", cardSolid: "#FFFDF8",
      text: "#4B4642", muted: "#8B8179", line: "#8C6F63",
      pink: "#D8BFC0", sage: "#B8C5B2", blue: "#AEBCC6", brown: "#8C6F63",
      apricot: "#E8D4C2", lavender: "#C9C1D6", danger: "#B9827E", white: "#FFFFFF",
      shadow: "#5B4B41"
    },
    alpha: { card: 0.88, line: 0.16, blob: 0.42, shadow: 0.14 }
  },
  "morandi-pink": {
    label: "雾粉莫兰迪",
    colors: {
      bg: "#F8F1EF", bg2: "#F0E4E2", card: "#FFFCF9", cardSolid: "#FFFDF9",
      text: "#4D4643", muted: "#8F807B", line: "#967670",
      pink: "#DCC1C4", sage: "#BBC8B6", blue: "#B6C1C9", brown: "#8F6F68",
      apricot: "#EAD5C5", lavender: "#CCC2D8", danger: "#B77D7A", white: "#FFFFFF",
      shadow: "#644B46"
    },
    alpha: { card: 0.90, line: 0.16, blob: 0.46, shadow: 0.14 }
  },
  "morandi-sage": {
    label: "鼠尾草绿",
    colors: {
      bg: "#F3F3EC", bg2: "#E8ECE0", card: "#FFFDF8", cardSolid: "#FFFDF8",
      text: "#464840", muted: "#7B8174", line: "#6F8064",
      pink: "#D7C3BD", sage: "#AEBEAA", blue: "#AEBBC0", brown: "#756B5D",
      apricot: "#E7D6BE", lavender: "#C5C0D0", danger: "#A97873", white: "#FFFFFF",
      shadow: "#46553E"
    },
    alpha: { card: 0.90, line: 0.16, blob: 0.40, shadow: 0.13 }
  },
  "morandi-blue": {
    label: "灰蓝冷淡风",
    colors: {
      bg: "#F0F2F2", bg2: "#E3E7E8", card: "#FFFDF9", cardSolid: "#FFFDF9",
      text: "#42484B", muted: "#747E84", line: "#5F6F78",
      pink: "#D4BFC0", sage: "#B6C2B4", blue: "#A7B7C0", brown: "#6F6762",
      apricot: "#E2D1C0", lavender: "#C2C2D2", danger: "#A97876", white: "#FFFFFF",
      shadow: "#414E55"
    },
    alpha: { card: 0.88, line: 0.16, blob: 0.38, shadow: 0.13 }
  },
  "night": {
    label: "夜间模式",
    colors: {
      bg: "#24211F", bg2: "#302B28", card: "#37312D", cardSolid: "#39332F",
      text: "#F3ECE5", muted: "#C6B8AD", line: "#FFFFFF",
      pink: "#9D7778", sage: "#7F927B", blue: "#7D8F9B", brown: "#D3B7A4",
      apricot: "#A98F76", lavender: "#9186A5", danger: "#C58A84", white: "#FFFFFF",
      shadow: "#000000"
    },
    alpha: { card: 0.92, line: 0.12, blob: 0.28, shadow: 0.30 }
  },
  "custom": {
    label: "自定义颜色",
    colors: {},
    alpha: {}
  }
};

const DEFAULT_THEME_NAME = "morandi-cream";
const DEFAULT_CUSTOM_COLORS = { ...THEME_PRESETS[DEFAULT_THEME_NAME].colors };
const DEFAULT_CUSTOM_ALPHA = { ...THEME_PRESETS[DEFAULT_THEME_NAME].alpha };

const COLOR_FIELDS = [
  ["bg", "页面背景"], ["bg2", "背景装饰"], ["card", "卡片底色"], ["cardSolid", "实体卡片"],
  ["text", "主文字"], ["muted", "辅助文字"], ["line", "边框线"],
  ["pink", "雾粉"], ["sage", "鼠尾草绿"], ["blue", "灰蓝"], ["brown", "豆沙棕"],
  ["apricot", "浅杏"], ["lavender", "雾紫"], ["danger", "删除/提醒"], ["shadow", "阴影颜色"]
];
const ALPHA_FIELDS = [["card", "卡片透明度"], ["line", "边框透明度"], ["blob", "装饰透明度"], ["shadow", "阴影透明度"]];


const FOOD_DB = {
  "鸡胸肉": { unit: "g", base: 100, kcal: 165, protein: 31, carbs: 0, fat: 3.6, category: "蛋白质", emoji: "🍗" },
  "鸡蛋": { unit: "个", base: 1, kcal: 70, protein: 6.3, carbs: 0.6, fat: 5, category: "蛋白质", emoji: "🥚" },
  "豆腐": { unit: "g", base: 100, kcal: 82, protein: 8, carbs: 2, fat: 4.8, category: "蛋白质", emoji: "◻️" },
  "瘦牛肉": { unit: "g", base: 100, kcal: 170, protein: 26, carbs: 0, fat: 7, category: "蛋白质", emoji: "🥩" },
  "三文鱼": { unit: "g", base: 100, kcal: 208, protein: 20, carbs: 0, fat: 13, category: "蛋白质", emoji: "🐟" },
  "虾": { unit: "g", base: 100, kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, category: "蛋白质", emoji: "🦐" },
  "低糖酸奶": { unit: "g", base: 100, kcal: 65, protein: 5.5, carbs: 5, fat: 2, category: "蛋白质", emoji: "🥛" },
  "熟米饭": { unit: "g", base: 100, kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, category: "主食", emoji: "🍚" },
  "红薯": { unit: "g", base: 100, kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, category: "主食", emoji: "🍠" },
  "燕麦": { unit: "g", base: 100, kcal: 389, protein: 16.9, carbs: 66.3, fat: 6.9, category: "主食", emoji: "🥣" },
  "全麦面包": { unit: "片", base: 1, kcal: 85, protein: 4, carbs: 15, fat: 1.2, category: "主食", emoji: "🍞" },
  "西兰花": { unit: "g", base: 100, kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4, category: "蔬菜", emoji: "🥦" },
  "青菜": { unit: "g", base: 100, kcal: 18, protein: 1.5, carbs: 3, fat: 0.2, category: "蔬菜", emoji: "🥬" },
  "菠菜": { unit: "g", base: 100, kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: "蔬菜", emoji: "🥬" },
  "蘑菇": { unit: "g", base: 100, kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3, category: "蔬菜", emoji: "🍄" },
  "番茄": { unit: "g", base: 100, kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, category: "蔬菜", emoji: "🍅" },
  "黄瓜": { unit: "g", base: 100, kcal: 16, protein: 0.7, carbs: 3.6, fat: 0.1, category: "蔬菜", emoji: "🥒" },
  "燕麦奶": { unit: "ml", base: 100, kcal: 48, protein: 1, carbs: 6.7, fat: 1.5, category: "饮品", emoji: "🥛" },
  "无糖豆奶": { unit: "ml", base: 100, kcal: 33, protein: 3, carbs: 1.2, fat: 1.8, category: "饮品", emoji: "🥛" },
  "杏仁奶": { unit: "ml", base: 100, kcal: 18, protein: 0.6, carbs: 0.3, fat: 1.5, category: "饮品", emoji: "🥛" },
  "普通奶茶": { unit: "杯", base: 1, kcal: 420, protein: 6, carbs: 58, fat: 16, category: "饮品", emoji: "🧋" },
  "麻辣烫": { unit: "份", base: 1, kcal: 650, protein: 28, carbs: 58, fat: 34, category: "外卖", emoji: "🌶️" },
  "火锅": { unit: "顿", base: 1, kcal: 900, protein: 45, carbs: 60, fat: 52, category: "外卖", emoji: "🍲" },
  "炸鸡": { unit: "份", base: 1, kcal: 780, protein: 38, carbs: 45, fat: 48, category: "外卖", emoji: "🍗" },
  "蛋糕": { unit: "块", base: 1, kcal: 360, protein: 5, carbs: 42, fat: 19, category: "甜食", emoji: "🍰" },
  "辣椒酱": { unit: "勺", base: 1, kcal: 45, protein: 0.5, carbs: 3, fat: 3.5, category: "调味", emoji: "🌶️" },
};
const CATEGORY_OPTIONS = ["蛋白质", "蔬菜", "主食", "水果", "饮品", "甜食", "外卖", "调味", "其他"];

const CATEGORY_RULES = [
  {
    category: "蛋白质",
    keywords: [
      "鸡胸", "鸡肉", "鸡腿", "鸡翅", "鸡蛋", "蛋", "牛肉", "羊肉", "猪肉", "瘦肉",
      "鱼", "三文鱼", "鳕鱼", "金枪鱼", "虾", "蟹", "贝", "豆腐", "豆干", "豆皮",
      "腐竹", "毛豆", "鹰嘴豆", "酸奶", "希腊酸奶", "牛奶", "奶酪", "芝士", "蛋白粉"
    ]
  },
  {
    category: "蔬菜",
    keywords: [
      "青菜", "白菜", "娃娃菜", "生菜", "菠菜", "油麦菜", "西兰花", "花菜",
      "蘑菇", "香菇", "金针菇", "菌菇", "番茄", "西红柿", "黄瓜", "胡萝卜",
      "萝卜", "芹菜", "茄子", "豆角", "四季豆", "芦笋", "南瓜", "冬瓜",
      "海带", "紫菜", "莲藕", "玉米笋", "洋葱", "彩椒", "辣椒"
    ]
  },
  {
    category: "主食",
    keywords: [
      "米饭", "饭", "糙米", "杂粮", "粥", "燕麦", "面", "面条", "意面",
      "荞麦", "粉", "粉丝", "米粉", "河粉", "馒头", "包子", "饺子", "馄饨",
      "面包", "吐司", "贝果", "饼", "煎饼", "土豆", "红薯", "紫薯",
      "玉米", "藜麦", "麦片"
    ]
  },
  {
    category: "水果",
    keywords: [
      "苹果", "香蕉", "梨", "橙", "橘", "柑", "葡萄", "草莓", "蓝莓",
      "树莓", "猕猴桃", "奇异果", "西瓜", "哈密瓜", "芒果", "桃", "李子",
      "菠萝", "牛油果", "柠檬", "樱桃", "火龙果"
    ]
  },
  {
    category: "饮品",
    keywords: [
      "奶茶", "咖啡", "拿铁", "美式", "果汁", "可乐", "汽水", "茶",
      "豆奶", "豆浆", "燕麦奶", "杏仁奶", "椰奶", "牛奶", "酸奶饮",
      "饮料", "奶昔", "smoothie"
    ]
  },
  {
    category: "甜食",
    keywords: [
      "蛋糕", "甜甜圈", "饼干", "巧克力", "冰淇淋", "雪糕", "糖",
      "布丁", "奶油", "泡芙", "可颂", "曲奇", "马卡龙", "甜品", "蛋挞"
    ]
  },
  {
    category: "外卖",
    keywords: [
      "麻辣烫", "火锅", "炸鸡", "汉堡", "披萨", "寿司", "盖饭", "拌饭",
      "外卖", "便当", "轻食", "沙拉", "烧烤", "串", "煲仔饭", "炒饭",
      "炒面", "米线", "螺蛳粉", "酸辣粉", "拉面"
    ]
  },
  {
    category: "调味",
    keywords: [
      "酱", "辣椒酱", "沙拉酱", "蛋黄酱", "番茄酱", "酱油", "醋",
      "蚝油", "麻酱", "花生酱", "蜂蜜", "糖浆", "油", "橄榄油",
      "香油", "调料", "蘸料"
    ]
  }
];

function classifyFoodName(name = "") {
  const value = String(name).trim();
  const text = value.toLowerCase().replace(/\s+/g, "");
  if (!text) return "其他";
  if (FOOD_DB[value]?.category) return FOOD_DB[value].category;

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some(keyword => text.includes(String(keyword).toLowerCase()))) {
      return rule.category;
    }
  }

  return "其他";
}

function categoryHintText(name = "") {
  const value = String(name).trim();
  if (!value) return "输入食材后，我会先帮你自动判断分类；不准的话你也可以手动改。";
  const category = classifyFoodName(value);
  if (category === "其他") return `暂时没判断出「${value}」的分类，先归到「其他」。你可以手动选择。`;
  return `我猜「${value}」属于「${category}」。如果不准，手动改一下就好。`;
}

const app = document.querySelector("#app");
const dateLabel = document.querySelector("#dateLabel");
const greetingTitle = document.querySelector("#greetingTitle");
const toast = document.querySelector("#toast");
let page = "home";
let activeMeal = "早餐";
let activeListTab = "pantry";
let selectedMood = "平静";

const today = () => new Date().toISOString().slice(0, 10);
const prettyDate = (dateStr = today()) => dateStr.replaceAll("-", "/");
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const money = (n) => Number(n || 0).toFixed(0);
const macro = (n) => Number(n || 0).toFixed(1);

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

const DEFAULT_SETTINGS = {
  appName: "今天怎么吃",
  nickname: "我",
  calorieTarget: 1600,
  proteinTarget: 80,
  waterTarget: 8,
  preference: "喜欢辣，喜欢热食，减脂但不想极端节食",
  theme: DEFAULT_THEME_NAME,
  customColors: DEFAULT_CUSTOM_COLORS,
  customAlpha: DEFAULT_CUSTOM_ALPHA,
};

function getSettings() {
  const stored = load(STORAGE.settings, null) || load(STORAGE.oldSettings, null) || {};
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    customColors: { ...DEFAULT_CUSTOM_COLORS, ...(stored.customColors || {}) },
    customAlpha: { ...DEFAULT_CUSTOM_ALPHA, ...(stored.customAlpha || {}) },
  };
}
function setSettings(s) { save(STORAGE.settings, s); }
function getLogs() { return load(STORAGE.logs, []); }
function setLogs(v) { save(STORAGE.logs, v); }
function getPantry() { return load(STORAGE.pantry, []); }
function setPantry(v) { save(STORAGE.pantry, v); }
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
function getExpenses() { return load(STORAGE.expenses, []); }
function setExpenses(v) { save(STORAGE.expenses, v); }

function hexToRgb(hex) {
  const clean = String(hex || "#000000").replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map(x => x + x).join("") : clean.padEnd(6, "0").slice(0, 6);
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgba(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Number(alpha)})`;
}
function getActiveThemeParts(settings = getSettings()) {
  const preset = THEME_PRESETS[settings.theme] || THEME_PRESETS[DEFAULT_THEME_NAME];
  if (settings.theme === "custom") {
    return {
      colors: { ...DEFAULT_CUSTOM_COLORS, ...(settings.customColors || {}) },
      alpha: { ...DEFAULT_CUSTOM_ALPHA, ...(settings.customAlpha || {}) },
    };
  }
  return { colors: preset.colors, alpha: preset.alpha };
}
function applyTheme(settingsOrName = getSettings()) {
  const settings = typeof settingsOrName === "string" ? { ...getSettings(), theme: settingsOrName } : settingsOrName;
  const { colors, alpha } = getActiveThemeParts(settings);
  const root = document.documentElement;
  root.dataset.theme = settings.theme || DEFAULT_THEME_NAME;
  root.style.setProperty("--bg", colors.bg);
  root.style.setProperty("--bg-2", colors.bg2);
  root.style.setProperty("--card", rgba(colors.card, alpha.card));
  root.style.setProperty("--card-solid", colors.cardSolid);
  root.style.setProperty("--text", colors.text);
  root.style.setProperty("--muted", colors.muted);
  root.style.setProperty("--line", rgba(colors.line, alpha.line));
  root.style.setProperty("--pink", colors.pink);
  root.style.setProperty("--sage", colors.sage);
  root.style.setProperty("--blue", colors.blue);
  root.style.setProperty("--brown", colors.brown);
  root.style.setProperty("--apricot", colors.apricot);
  root.style.setProperty("--lavender", colors.lavender);
  root.style.setProperty("--danger", colors.danger);
  root.style.setProperty("--white", colors.white || "#FFFFFF");
  root.style.setProperty("--blob-opacity", alpha.blob);
  root.style.setProperty("--shadow", `0 18px 45px ${rgba(colors.shadow, alpha.shadow)}`);
  root.style.setProperty("--soft-shadow", `0 10px 25px ${rgba(colors.shadow, Math.max(Number(alpha.shadow) - 0.04, 0.06))}`);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", colors.pink || colors.bg);
}
function previewThemeFromControls() {
  const theme = document.querySelector("#themeInput")?.value || DEFAULT_THEME_NAME;
  const settings = { ...getSettings(), theme };
  if (theme === "custom") {
    settings.customColors = readColorInputs();
    settings.customAlpha = readAlphaInputs();
  }
  applyTheme(settings);
}
function readColorInputs() {
  const out = {};
  COLOR_FIELDS.forEach(([key]) => { out[key] = document.querySelector(`#color_${key}`)?.value || DEFAULT_CUSTOM_COLORS[key]; });
  out.white = "#FFFFFF";
  return out;
}
function readAlphaInputs() {
  const out = {};
  ALPHA_FIELDS.forEach(([key]) => { out[key] = Number(document.querySelector(`#alpha_${key}`)?.value || DEFAULT_CUSTOM_ALPHA[key]); });
  return out;
}

function calcFood(foodName, amount) {
  const item = FOOD_DB[foodName];
  if (!item) return null;
  const ratio = Number(amount || 0) / item.base;
  return {
    kcal: item.kcal * ratio,
    protein: item.protein * ratio,
    carbs: item.carbs * ratio,
    fat: item.fat * ratio,
  };
}

function totalsFor(dateStr = today()) {
  const logs = getLogs().filter(x => x.date === dateStr);
  return logs.reduce((acc, x) => {
    acc.kcal += Number(x.kcal || 0);
    acc.protein += Number(x.protein || 0);
    acc.carbs += Number(x.carbs || 0);
    acc.fat += Number(x.fat || 0);
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
  const h = new Date().getHours();
  const hello = h < 11 ? "早上好" : h < 18 ? "下午好" : "晚上好";
  document.title = s.appName || "今天怎么吃";
  dateLabel.textContent = `${s.appName || "今天怎么吃"} · ${prettyDate()} · ${hello}`;
  greetingTitle.textContent = page === "home" ? `${hello}，${s.nickname || "我"}` : ({
    log: "记录一餐",
    photo: "拍一张饭",
    lists: "我的清单",
    life: "生活记录",
    journal: "心情日记",
  }[page] || (s.appName || "今天怎么吃"));
}

function render() {
  applyTheme(getSettings());
  setTopbar();
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.page === page));
  if (page === "home") renderHome();
  if (page === "log") renderLog();
  if (page === "photo") renderPhoto();
  if (page === "lists") renderLists();
  if (page === "life") renderLife();
  if (page === "journal") renderJournal();
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
  const vegCount = t.logs.filter(x => ["蔬菜"].includes(x.category)).length;
  if (!vegCount) bits.push("蔬菜记录偏少，晚餐加一份青菜、蘑菇或西兰花会舒服很多。 ");
  const sweet = t.logs.some(x => ["甜食", "饮品"].includes(x.category) && x.kcal > 250);
  if (sweet) bits.push("今天已经有甜饮/甜食了，后面就别再叠加奶茶和蛋糕。 ");
  return bits.join("").trim();
}

function recipeAdvice() {
  const pantry = getPantry();
  const cravings = getCravings();
  const names = pantry.map(x => x.name).join(" ");
  const crave = cravings[0]?.name || "";
  const has = (words) => words.some(w => names.includes(w));
  if (!pantry.length) return "先在食材清单里记一下你买了什么，我就能帮你拼下一餐。";
  if (crave.includes("辣") || crave.includes("麻辣") || crave.includes("火锅")) {
    if (has(["鸡胸肉", "牛肉", "豆腐", "鸡蛋"]) && has(["青菜", "西兰花", "蘑菇", "菠菜"])) {
      return "可以做一份少油辣味蛋白碗：蛋白质 + 青菜/蘑菇 + 半碗米饭。辣可以保留，但油和酱别太重。";
    }
    return "想吃辣可以，但别只靠主食和酱料。优先选蛋白质、蔬菜和热汤，少油一点。";
  }
  if (has(["鸡胸肉", "牛肉", "豆腐", "鸡蛋"]) && has(["青菜", "西兰花", "蘑菇", "菠菜"])) {
    return "下一餐很适合做：蛋白质 + 蔬菜 + 少量主食。吃热一点，饱腹感会比只喝饮品好很多。";
  }
  if (has(["燕麦奶", "酸奶", "燕麦"])) return "可以做一个轻早餐：燕麦/酸奶/燕麦奶，再加鸡蛋或豆腐这种蛋白质，不要只喝饮品。";
  return "你现在的食材可以先按一个原则配：一份蛋白质 + 一份蔬菜 + 半份主食。别弄复杂，能坚持最重要。";
}

function renderHome() {
  const s = getSettings();
  const t = totalsFor();
  const percent = Math.min(100, Math.round(t.kcal / s.calorieTarget * 100));
  const waterCount = waterCountFor(today());
  const todayTodos = getTodos().filter(x => x.date === today());
  const undoneTodos = todayTodos.filter(x => !x.done).length;
  const todayExpense = expenseTotalFor(today()).expense;
  app.innerHTML = `
    <section class="card hero-card">
      <div class="hero-row">
        <div class="hero-kcal">
          <span>今日摄入</span>
          <strong>${money(t.kcal)}</strong>
          <span> / ${s.calorieTarget} kcal</span>
        </div>
        <div class="hero-badge">${percent < 65 ? "慢慢来" : percent <= 105 ? "节奏稳定" : "轻轻收一下"}</div>
      </div>
      <div class="progress-wrap">
        <div class="progress-label"><span>热量进度</span><span>${percent}%</span></div>
        <div class="progress"><span style="width:${percent}%"></span></div>
      </div>
    </section>

    <section class="stats-grid">
      <div class="stat-card"><span>蛋白质</span><strong>${macro(t.protein)}g</strong></div>
      <div class="stat-card"><span>碳水</span><strong>${macro(t.carbs)}g</strong></div>
      <div class="stat-card"><span>脂肪</span><strong>${macro(t.fat)}g</strong></div>
    </section>

    <section class="mini-grid">
      <button class="mini-card" onclick="goPage('life')"><span>💧</span><strong>${waterCount}/${s.waterTarget}</strong><small>今日喝水</small></button>
      <button class="mini-card" onclick="goPage('life')"><span>📝</span><strong>${undoneTodos}</strong><small>待办未完成</small></button>
      <button class="mini-card" onclick="goPage('life')"><span>💸</span><strong>$${money(todayExpense)}</strong><small>今日支出</small></button>
    </section>

    <section class="card advice-card">
      <div class="card-title"><h2>今天的判断</h2><small>🫧</small></div>
      <p class="advice-text">${dailyAdvice(t, s)}</p>
    </section>

    <section class="card">
      <div class="card-title"><h2>下一餐建议</h2><small>用清单生成</small></div>
      <p class="soft-note">${recipeAdvice()}</p>
      <div class="tag-row" style="margin-top:12px">
        <span class="tag sage">🥬 有蔬菜更稳</span>
        <span class="tag pink">🌶️ 辣可以少油</span>
        <span class="tag blue">🍚 主食不用全戒</span>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><h2>今天的记录</h2><small>${t.logs.length} 条</small></div>
      ${t.logs.length ? `<div class="list-stack">${t.logs.map(logItemHtml).join("")}</div>` : `<div class="empty">还没有记录。先记一餐就很好，不用一开始就做到很细。</div>`}
    </section>
  `;
}
window.goPage = (target) => { page = target; window.scrollTo({ top: 0, behavior: "smooth" }); render(); };

function logItemHtml(x) {
  return `<div class="list-item">
    <div><strong>${FOOD_DB[x.food]?.emoji || "🍽️"} ${x.food}</strong><small>${x.meal} · ${x.amount}${x.unit} · ${money(x.kcal)} kcal</small></div>
    <button class="delete-btn" onclick="deleteLog('${x.id}')">×</button>
  </div>`;
}
window.deleteLog = (id) => { setLogs(getLogs().filter(x => x.id !== id)); showToast("已删除这一条"); render(); };

function renderLog() {
  const foodOptions = Object.keys(FOOD_DB).map(name => `<option value="${name}">${FOOD_DB[name].emoji} ${name} · ${FOOD_DB[name].category}</option>`).join("");
  const quick = ["鸡胸肉", "鸡蛋", "熟米饭", "燕麦奶", "青菜", "西兰花", "豆腐", "普通奶茶"];
  app.innerHTML = `
    <section class="card">
      <div class="card-title"><h2>这顿是什么？</h2><small>🍱</small></div>
      <div class="segmented" id="mealSegment">
        ${["早餐", "午餐", "晚餐", "加餐"].map(m => `<button class="${activeMeal === m ? "active" : ""}" data-meal="${m}">${m}</button>`).join("")}
      </div>
      <div class="form-grid" style="margin-top:14px">
        <label>食物
          <select id="foodSelect">${foodOptions}</select>
        </label>
        <div class="form-row">
          <label>数量
            <input id="amountInput" type="number" min="0" step="10" value="100" />
          </label>
          <label>单位
            <input id="unitInput" type="text" value="g" />
          </label>
        </div>
        <label>备注，可不填
          <input id="noteInput" type="text" placeholder="比如：少油、外卖、很辣" />
        </label>
        <button class="primary-btn full" id="saveLogBtn">保存这一餐</button>
      </div>
    </section>

    <section class="card compact">
      <div class="card-title"><h2>常吃快捷添加</h2><small>点一下会填入</small></div>
      <div class="quick-grid">
        ${quick.map(name => `<button class="quick-food" data-food="${name}"><strong>${FOOD_DB[name].emoji} ${name}</strong><small>${FOOD_DB[name].base}${FOOD_DB[name].unit} · ${FOOD_DB[name].kcal} kcal</small></button>`).join("")}
      </div>
    </section>

    <section class="card compact">
      <p class="soft-note">外卖和酱料类热量只是估算。油量、糖、麻酱、奶盖、小料都会让实际热量明显变化。</p>
    </section>
  `;
  const foodSelect = document.querySelector("#foodSelect");
  const amountInput = document.querySelector("#amountInput");
  const unitInput = document.querySelector("#unitInput");
  const syncUnit = () => { const item = FOOD_DB[foodSelect.value]; unitInput.value = item.unit; amountInput.value = item.base; };
  foodSelect.addEventListener("change", syncUnit);
  document.querySelector("#mealSegment").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-meal]");
    if (!btn) return;
    activeMeal = btn.dataset.meal;
    renderLog();
  });
  document.querySelectorAll(".quick-food").forEach(btn => btn.addEventListener("click", () => {
    foodSelect.value = btn.dataset.food; syncUnit(); showToast(`已选 ${btn.dataset.food}`);
  }));
  document.querySelector("#saveLogBtn").addEventListener("click", () => {
    const food = foodSelect.value;
    const amount = Number(amountInput.value);
    if (!amount || amount <= 0) return showToast("数量要大于 0");
    const calc = calcFood(food, amount);
    const item = FOOD_DB[food];
    const next = [{ id: uid(), date: today(), meal: activeMeal, food, amount, unit: unitInput.value || item.unit, category: item.category, note: document.querySelector("#noteInput").value, ...calc }, ...getLogs()];
    setLogs(next);
    showToast("这一餐记好了");
    page = "home";
    render();
  });
}

function renderPhoto() {
  const photos = getPhotos().filter(x => x.date === today());
  app.innerHTML = `
    <section class="card">
      <div class="card-title"><h2>拍照记录</h2><small>📷</small></div>
      <label class="photo-drop" for="photoInput">
        <span class="camera">📸</span>
        <strong>拍一张今天吃的</strong>
        <span class="soft-note">第一版先保存照片和备注；后面再接入 AI 识别。</span>
        <img id="previewImg" class="photo-preview" style="display:none" alt="照片预览" />
      </label>
      <input class="file-input" id="photoInput" type="file" accept="image/*" capture="environment" />
      <div class="form-grid" style="margin-top:14px">
        <label>照片里的食物
          <input id="photoFoodInput" type="text" placeholder="比如：鸡胸肉、米饭、青菜" />
        </label>
        <label>简单备注
          <textarea id="photoNoteInput" rows="3" placeholder="比如：外卖，油有点多；或者少油煎的"></textarea>
        </label>
        <button class="primary-btn full" id="savePhotoBtn">保存照片记录</button>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><h2>今天的照片</h2><small>${photos.length} 张</small></div>
      ${photos.length ? `<div class="list-stack">${photos.map(p => `<div class="list-item"><div><strong>📷 ${p.food || "一餐"}</strong><small>${p.note || "没有备注"}</small></div><button class="delete-btn" onclick="deletePhoto('${p.id}')">×</button></div>`).join("")}</div>` : `<div class="empty">还没有照片。拍照只是为了帮你回忆，不用拍得像广告图。</div>`}
    </section>
  `;
  let imageData = "";
  const input = document.querySelector("#photoInput");
  const img = document.querySelector("#previewImg");
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    imageData = await resizeImage(file, 700);
    img.src = imageData;
    img.style.display = "block";
  });
  document.querySelector("#savePhotoBtn").addEventListener("click", () => {
    const food = document.querySelector("#photoFoodInput").value.trim();
    const note = document.querySelector("#photoNoteInput").value.trim();
    if (!food && !note && !imageData) return showToast("先拍照或写一点内容");
    setPhotos([{ id: uid(), date: today(), food, note, imageData }, ...getPhotos()]);
    showToast("照片记录保存好了");
    renderPhoto();
  });
}
window.deletePhoto = (id) => { setPhotos(getPhotos().filter(x => x.id !== id)); showToast("已删除照片记录"); render(); };

function resizeImage(file, maxSize = 700) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function renderLists() {
  const pantry = getPantry();
  const cravings = getCravings();
  app.innerHTML = `
    <section class="card compact">
      <div class="tabs-two">
        <button class="${activeListTab === "pantry" ? "active" : ""}" data-listtab="pantry">食材清单</button>
        <button class="${activeListTab === "cravings" ? "active" : ""}" data-listtab="cravings">想吃清单</button>
      </div>
    </section>
    ${activeListTab === "pantry" ? pantryHtml(pantry) : cravingsHtml(cravings)}
  `;
  document.querySelectorAll("[data-listtab]").forEach(btn => btn.addEventListener("click", () => { activeListTab = btn.dataset.listtab; renderLists(); }));
  if (activeListTab === "pantry") bindPantry(); else bindCravings();
}

function pantryHtml(pantry) {
  return `
    <section class="card">
      <div class="card-title"><h2>我的小冰箱</h2><small>🧺</small></div>
      <div class="form-grid">
        <div class="form-row">
          <label>食材
            <input id="pantryName" type="text" placeholder="比如：鸡胸肉" />
          </label>
          <label>分类
           <select id="pantryCategory">
  ${CATEGORY_OPTIONS.map(c => `<option>${c}</option>`).join("")}
</select>
<small id="categoryHint" class="soft-note">输入食材后，我会先帮你自动判断分类。</small>
          </label>
        </div>
        <div class="form-row">
          <label>数量
            <input id="pantryAmount" type="text" placeholder="比如：2块" />
          </label>
          <label>过期时间
            <input id="pantryExpire" type="date" />
          </label>
        </div>
        <button class="secondary-btn full" id="addPantryBtn">加入食材清单</button>
      </div>
    </section>
    <section class="card">
      <div class="card-title"><h2>已有食材</h2><small>${pantry.length} 个</small></div>
      ${pantry.length ? `<div class="chip-row">${pantry.map(p => `<span class="chip ${chipClass(p.category)}">${categoryEmoji(p.category)} ${p.name} ${p.amount ? `· ${p.amount}` : ""}<button class="delete-btn" style="width:24px;height:24px;border-radius:10px" onclick="deletePantry('${p.id}')">×</button></span>`).join("")}</div>` : `<div class="empty">把你买的鸡胸肉、燕麦奶、鸡蛋、青菜都记在这里。之后它会帮你拼饭。</div>`}
    </section>
  `;
}

function cravingsHtml(cravings) {
  return `
    <section class="card">
      <div class="card-title"><h2>最近想吃</h2><small>🌶️</small></div>
      <div class="form-grid">
        <label>我想吃/喝
          <input id="cravingName" type="text" placeholder="比如：奶茶、麻辣烫、火锅" />
        </label>
        <label>想吃程度
          <select id="cravingLevel"><option>有点想</option><option>很想</option><option>非常想</option></select>
        </label>
        <button class="secondary-btn full" id="addCravingBtn">加入想吃清单</button>
      </div>
    </section>
    <section class="card">
      <div class="card-title"><h2>愿望小卡片</h2><small>${cravings.length} 个</small></div>
      ${cravings.length ? `<div class="list-stack">${cravings.map(c => `<div class="list-item"><div><strong>${cravingEmoji(c.name)} ${c.name}</strong><small>${c.level} · ${cravingAdvice(c.name)}</small></div><button class="delete-btn" onclick="deleteCraving('${c.id}')">×</button></div>`).join("")}</div>` : `<div class="empty">想吃什么也可以记下来。不是禁止你吃，是帮你换一个更稳的版本。</div>`}
    </section>
  `;
}

function bindPantry() {
  const nameInput = document.querySelector("#pantryName");
  const categorySelect = document.querySelector("#pantryCategory");
  const hint = document.querySelector("#categoryHint");

  const updateCategory = () => {
    const name = nameInput.value.trim();
    const category = classifyFoodName(name);
    categorySelect.value = category;
    if (hint) hint.textContent = categoryHintText(name);
  };

  nameInput.addEventListener("input", updateCategory);
  updateCategory();

  document.querySelector("#addPantryBtn").addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) return showToast("先写一个食材名字");

    const item = {
      id: uid(),
      name,
      category: categorySelect.value || classifyFoodName(name),
      amount: document.querySelector("#pantryAmount").value.trim(),
      expire: document.querySelector("#pantryExpire").value
    };

    setPantry([item, ...getPantry()]);
    showToast(`放进小冰箱了，分类是「${item.category}」`);
    renderLists();
  });
}
function bindCravings() {
  document.querySelector("#addCravingBtn").addEventListener("click", () => {
    const name = document.querySelector("#cravingName").value.trim();
    if (!name) return showToast("先写你想吃什么");
    setCravings([{ id: uid(), name, level: document.querySelector("#cravingLevel").value, date: today() }, ...getCravings()]);
    showToast("记下来了，不骂你");
    renderLists();
  });
}
window.deletePantry = (id) => { setPantry(getPantry().filter(x => x.id !== id)); showToast("已移除食材"); render(); };
window.deleteCraving = (id) => { setCravings(getCravings().filter(x => x.id !== id)); showToast("已移除想吃记录"); render(); };

function categoryEmoji(cat) {
  return ({
    蛋白质: "🍗",
    蔬菜: "🥬",
    主食: "🍚",
    水果: "🍎",
    饮品: "🥛",
    甜食: "🍰",
    外卖: "🥡",
    调味: "🌶️",
    其他: "🫙"
  }[cat] || "🫙");
}

function chipClass(cat) {
  return ({
    蛋白质: "sage",
    蔬菜: "sage",
    主食: "apricot",
    水果: "sage",
    饮品: "blue",
    甜食: "pink",
    外卖: "lav",
    调味: "pink",
    其他: "lav"
  }[cat] || "lav");
}
function cravingEmoji(name) { if (name.includes("奶茶")) return "🧋"; if (name.includes("火锅")) return "🍲"; if (name.includes("辣") || name.includes("麻辣")) return "🌶️"; if (name.includes("蛋糕") || name.includes("甜")) return "🍰"; if (name.includes("炸")) return "🍗"; return "🍽️"; }
function cravingAdvice(name) {
  if (name.includes("奶茶")) return "可以小杯少糖，今天别再叠加蛋糕。";
  if (name.includes("麻辣") || name.includes("辣")) return "可以吃辣，但把蛋白质和蔬菜放前面，少油少麻酱。";
  if (name.includes("火锅")) return "清汤/番茄锅更稳，少肥牛、炸响铃和宽粉。";
  if (name.includes("蛋糕") || name.includes("甜")) return "先吃正餐再吃小份甜，不要空腹直接甜。";
  if (name.includes("炸")) return "真的想吃就小份，别和奶茶一起叠。";
  return "不是不能吃，先想一个更稳的小份版本。";
}

function renderJournal() {
  const moods = getMoods().filter(x => x.date === today());
  app.innerHTML = `
    <section class="card">
      <div class="card-title"><h2>今天的情绪</h2><small>🌙</small></div>
      <div class="mood-grid" id="moodGrid">
        ${[
          ["开心", "☺️"], ["平静", "🍃"], ["累", "😮‍💨"],
          ["焦虑", "🫧"], ["委屈", "🌧️"], ["暴躁", "🔥"],
        ].map(([m, e]) => `<button class="mood-btn ${selectedMood === m ? "active" : ""}" data-mood="${m}"><span>${e}</span>${m}</button>`).join("")}
      </div>
      <div class="form-grid" style="margin-top:14px">
        <label>今天食欲
          <select id="appetiteInput"><option>正常</option><option>很馋</option><option>想吃甜</option><option>想吃辣</option><option>想暴食</option></select>
        </label>
        <label>睡眠
          <select id="sleepInput"><option>还可以</option><option>很好</option><option>一般</option><option>很差</option></select>
        </label>
        <label>今天一句话
          <textarea id="journalNote" rows="4" placeholder="比如：今天很累，很想喝奶茶。"></textarea>
        </label>
        <button class="primary-btn full" id="saveMoodBtn">保存今天的状态</button>
      </div>
    </section>

    <section class="card advice-card">
      <div class="card-title"><h2>小提醒</h2><small>🕯️</small></div>
      <p class="advice-text" id="moodAdvice">${moodAdvice(selectedMood, "正常")}</p>
    </section>

    <section class="card">
      <div class="card-title"><h2>今天写过</h2><small>${moods.length} 条</small></div>
      ${moods.length ? `<div class="list-stack">${moods.map(m => `<div class="list-item"><div><strong>${m.mood} · ${m.appetite}</strong><small>${m.note || "没有写备注"}</small></div><button class="delete-btn" onclick="deleteMood('${m.id}')">×</button></div>`).join("")}</div>` : `<div class="empty">情绪也可以被记录。它不是借口，是你理解自己食欲的线索。</div>`}
    </section>
  `;
  document.querySelector("#moodGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-mood]");
    if (!btn) return;
    selectedMood = btn.dataset.mood;
    document.querySelectorAll(".mood-btn").forEach(b => b.classList.toggle("active", b.dataset.mood === selectedMood));
    document.querySelector("#moodAdvice").textContent = moodAdvice(selectedMood, document.querySelector("#appetiteInput").value);
  });
  document.querySelector("#appetiteInput").addEventListener("change", (e) => {
    document.querySelector("#moodAdvice").textContent = moodAdvice(selectedMood, e.target.value);
  });
  document.querySelector("#saveMoodBtn").addEventListener("click", () => {
    const mood = selectedMood;
    const appetite = document.querySelector("#appetiteInput").value;
    const sleep = document.querySelector("#sleepInput").value;
    const note = document.querySelector("#journalNote").value.trim();
    setMoods([{ id: uid(), date: today(), mood, appetite, sleep, note }, ...getMoods()]);
    showToast("今天的状态存好了");
    renderJournal();
  });
}
window.deleteMood = (id) => { setMoods(getMoods().filter(x => x.id !== id)); showToast("已删除日记"); render(); };
function moodAdvice(mood, appetite) {
  const heavy = ["焦虑", "累", "委屈", "暴躁"].includes(mood);
  const crave = ["想吃甜", "想吃辣", "想暴食", "很馋"].includes(appetite);
  if (heavy && crave) return "你今天不是没自制力，是状态有点满。先吃一顿热的、有蛋白质的，再决定要不要吃甜食或外卖，会比直接硬扛稳。";
  if (appetite === "想吃甜") return "甜的可以留一点位置，但别空腹吃。先吃正餐，再吃小份甜，会更容易停下来。";
  if (appetite === "想吃辣") return "想吃辣可以，不必完全压住。把辣放在蛋白质和蔬菜上，少油少酱就好。";
  if (mood === "累") return "累的时候别把晚餐做得太复杂。热汤、鸡蛋、豆腐、青菜，这种简单组合就很够。";
  return "今天就照顾好一餐。减脂不用靠完美，靠的是明天还能继续。";
}


function waterCountFor(dateStr = today()) {
  return Number(getWater()[dateStr] || 0);
}
function setWaterCount(dateStr, count) {
  const all = getWater();
  all[dateStr] = Math.max(0, Number(count || 0));
  setWater(all);
}
function expenseTotalFor(dateStr = today()) {
  return getExpenses().filter(x => x.date === dateStr).reduce((acc, x) => {
    if (x.type === "income") acc.income += Number(x.amount || 0);
    else acc.expense += Number(x.amount || 0);
    return acc;
  }, { income: 0, expense: 0 });
}
function monthlyExpenseTotal() {
  const ym = today().slice(0, 7);
  return getExpenses().filter(x => x.date?.startsWith(ym)).reduce((acc, x) => {
    if (x.type === "income") acc.income += Number(x.amount || 0);
    else acc.expense += Number(x.amount || 0);
    return acc;
  }, { income: 0, expense: 0 });
}
function renderLife() {
  const s = getSettings();
  const waterCount = waterCountFor();
  const waterPercent = Math.min(100, Math.round(waterCount / Math.max(1, s.waterTarget) * 100));
  const todos = getTodos().filter(x => x.date === today());
  const expenses = getExpenses().filter(x => x.date === today());
  const dayTotal = expenseTotalFor();
  const monthTotal = monthlyExpenseTotal();
  app.innerHTML = `
    <section class="card water-card">
      <div class="card-title"><h2>喝水记录</h2><small>每天自动重新开始</small></div>
      <div class="water-main">
        <button class="water-add" id="addWaterBtn" aria-label="加一杯水"><span>💧</span><strong>+1 杯</strong></button>
        <div class="water-count"><strong>${waterCount}</strong><span>/ ${s.waterTarget} 杯</span></div>
      </div>
      <div class="progress-wrap"><div class="progress-label"><span>今日喝水</span><span>${waterPercent}%</span></div><div class="progress"><span style="width:${waterPercent}%"></span></div></div>
      <div class="cup-grid" id="cupGrid">${Array.from({ length: Math.max(waterCount, s.waterTarget) }, (_, i) => `<button class="cup ${i < waterCount ? "filled" : ""}" data-cup="${i + 1}" title="双击或长按取消一杯">${i < waterCount ? "💧" : "▫️"}</button>`).join("")}</div>
      <p class="soft-note">点一下加一杯。点错了，可以双击任意已记录水杯，或者长按它取消一杯。</p>
    </section>

    <section class="card">
      <div class="card-title"><h2>To do list</h2><small>${todos.filter(x => !x.done).length} 个未完成</small></div>
      <div class="form-row single-on-small">
        <label>今天要做什么
          <input id="todoInput" type="text" placeholder="比如：买燕麦奶、复习一小时" />
        </label>
        <button class="secondary-btn" id="addTodoBtn">加入</button>
      </div>
      ${todos.length ? `<div class="list-stack" style="margin-top:12px">${todos.map(todoItemHtml).join("")}</div>` : `<div class="empty" style="margin-top:12px">今天还没有待办。写很小的一件事也算。</div>`}
    </section>

    <section class="card">
      <div class="card-title"><h2>记账</h2><small>今日支出 $${money(dayTotal.expense)}</small></div>
      <div class="stats-grid two">
        <div class="stat-card"><span>今日支出</span><strong>$${money(dayTotal.expense)}</strong></div>
        <div class="stat-card"><span>本月支出</span><strong>$${money(monthTotal.expense)}</strong></div>
      </div>
      <div class="form-grid" style="margin-top:14px">
        <div class="form-row">
          <label>类型
            <select id="expenseType"><option value="expense">支出</option><option value="income">收入</option></select>
          </label>
          <label>金额
            <input id="expenseAmount" type="number" min="0" step="0.01" placeholder="比如：6.5" />
          </label>
        </div>
        <div class="form-row">
          <label>分类
            <select id="expenseCategory"><option>饮食</option><option>交通</option><option>学习</option><option>购物</option><option>房租</option><option>娱乐</option><option>其他</option></select>
          </label>
          <label>日期
            <input id="expenseDate" type="date" value="${today()}" />
          </label>
        </div>
        <label>备注
          <input id="expenseNote" type="text" placeholder="比如：奶茶、超市、公交" />
        </label>
        <button class="primary-btn full" id="addExpenseBtn">保存账目</button>
      </div>
      ${expenses.length ? `<div class="list-stack" style="margin-top:14px">${expenses.map(expenseItemHtml).join("")}</div>` : `<div class="empty" style="margin-top:14px">今天还没有记账。先从饮食和交通这种小支出记起。</div>`}
    </section>
  `;
  bindLife();
}
function bindLife() {
  document.querySelector("#addWaterBtn").addEventListener("click", () => {
    setWaterCount(today(), waterCountFor() + 1);
    showToast("加了一杯水");
    renderLife();
  });
  document.querySelectorAll(".cup.filled").forEach(btn => {
    let pressTimer;
    const remove = () => { setWaterCount(today(), waterCountFor() - 1); showToast("撤回一杯水"); renderLife(); };
    btn.addEventListener("dblclick", remove);
    btn.addEventListener("pointerdown", () => { pressTimer = setTimeout(remove, 650); });
    btn.addEventListener("pointerup", () => clearTimeout(pressTimer));
    btn.addEventListener("pointerleave", () => clearTimeout(pressTimer));
    btn.addEventListener("pointercancel", () => clearTimeout(pressTimer));
  });
  document.querySelector("#addTodoBtn").addEventListener("click", () => {
    const input = document.querySelector("#todoInput");
    const text = input.value.trim();
    if (!text) return showToast("先写一个待办");
    setTodos([{ id: uid(), text, done: false, date: today(), createdAt: Date.now() }, ...getTodos()]);
    showToast("待办记好了");
    renderLife();
  });
  document.querySelector("#addExpenseBtn").addEventListener("click", () => {
    const amount = Number(document.querySelector("#expenseAmount").value || 0);
    if (!amount || amount <= 0) return showToast("金额要大于 0");
    const item = {
      id: uid(),
      type: document.querySelector("#expenseType").value,
      amount,
      category: document.querySelector("#expenseCategory").value,
      note: document.querySelector("#expenseNote").value.trim(),
      date: document.querySelector("#expenseDate").value || today(),
      createdAt: Date.now(),
    };
    setExpenses([item, ...getExpenses()]);
    showToast("账目存好了");
    renderLife();
  });
}
function todoItemHtml(t) {
  return `<div class="list-item todo-item ${t.done ? "done" : ""}"><button class="check-btn" onclick="toggleTodo('${t.id}')">${t.done ? "✓" : ""}</button><div><strong>${t.text}</strong><small>${t.done ? "已完成" : "今天"}</small></div><button class="delete-btn" onclick="deleteTodo('${t.id}')">×</button></div>`;
}
function expenseItemHtml(x) {
  const sign = x.type === "income" ? "+" : "-";
  return `<div class="list-item"><div><strong>${x.type === "income" ? "收入" : "支出"} · ${x.category}</strong><small>${x.note || "没有备注"} · ${x.date}</small></div><div class="expense-amount ${x.type}">${sign}$${money(x.amount)}</div><button class="delete-btn" onclick="deleteExpense('${x.id}')">×</button></div>`;
}
window.toggleTodo = (id) => { setTodos(getTodos().map(x => x.id === id ? { ...x, done: !x.done } : x)); render(); };
window.deleteTodo = (id) => { setTodos(getTodos().filter(x => x.id !== id)); showToast("已删除待办"); render(); };
window.deleteExpense = (id) => { setExpenses(getExpenses().filter(x => x.id !== id)); showToast("已删除账目"); render(); };

function initSettingsDialog() {
  const dialog = document.querySelector("#settingsDialog");
  const btn = document.querySelector("#settingsBtn");
  const fillThemeControls = (s) => {
    document.querySelector("#appNameInput").value = s.appName;
    document.querySelector("#nicknameInput").value = s.nickname;
    document.querySelector("#calorieTargetInput").value = s.calorieTarget;
    document.querySelector("#proteinTargetInput").value = s.proteinTarget;
    document.querySelector("#waterTargetInput").value = s.waterTarget;
    document.querySelector("#preferenceInput").value = s.preference;
    document.querySelector("#themeInput").value = s.theme || DEFAULT_THEME_NAME;
    COLOR_FIELDS.forEach(([key]) => {
      const input = document.querySelector(`#color_${key}`);
      if (input) input.value = s.customColors?.[key] || DEFAULT_CUSTOM_COLORS[key];
    });
    ALPHA_FIELDS.forEach(([key]) => {
      const input = document.querySelector(`#alpha_${key}`);
      const valueLabel = document.querySelector(`#alphaValue_${key}`);
      if (input) input.value = s.customAlpha?.[key] ?? DEFAULT_CUSTOM_ALPHA[key];
      if (valueLabel) valueLabel.textContent = `${Math.round(Number(input?.value || 0) * 100)}%`;
    });
    document.querySelector("#customColorPanel")?.classList.toggle("hidden", document.querySelector("#themeInput").value !== "custom");
  };

  btn.addEventListener("click", () => {
    const s = getSettings();
    fillThemeControls(s);
    applyTheme(s);
    dialog.showModal();
  });

  document.querySelector("#themeInput").addEventListener("change", () => {
    const selected = document.querySelector("#themeInput").value;
    document.querySelector("#customColorPanel")?.classList.toggle("hidden", selected !== "custom");
    previewThemeFromControls();
  });
  document.querySelectorAll("[data-theme-control]").forEach(input => {
    input.addEventListener("input", () => {
      if (input.type === "range") {
        const label = document.querySelector(`#alphaValue_${input.dataset.alphaKey}`);
        if (label) label.textContent = `${Math.round(Number(input.value) * 100)}%`;
      }
      if (document.querySelector("#themeInput").value !== "custom") {
        document.querySelector("#themeInput").value = "custom";
        document.querySelector("#customColorPanel")?.classList.remove("hidden");
      }
      previewThemeFromControls();
    });
  });

  document.querySelector("#resetColorsBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    COLOR_FIELDS.forEach(([key]) => { document.querySelector(`#color_${key}`).value = DEFAULT_CUSTOM_COLORS[key]; });
    ALPHA_FIELDS.forEach(([key]) => {
      const input = document.querySelector(`#alpha_${key}`);
      input.value = DEFAULT_CUSTOM_ALPHA[key];
      const label = document.querySelector(`#alphaValue_${key}`);
      if (label) label.textContent = `${Math.round(DEFAULT_CUSTOM_ALPHA[key] * 100)}%`;
    });
    document.querySelector("#themeInput").value = "custom";
    previewThemeFromControls();
  });

  dialog.addEventListener("cancel", () => applyTheme(getSettings()));
  dialog.querySelector(".ghost-btn")?.addEventListener("click", () => applyTheme(getSettings()));

  document.querySelector("#saveSettingsBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const nextSettings = {
      ...getSettings(),
      appName: document.querySelector("#appNameInput").value.trim() || "今天怎么吃",
      nickname: document.querySelector("#nicknameInput").value.trim() || "我",
      calorieTarget: Number(document.querySelector("#calorieTargetInput").value || 1600),
      proteinTarget: Number(document.querySelector("#proteinTargetInput").value || 80),
      waterTarget: Number(document.querySelector("#waterTargetInput").value || 8),
      preference: document.querySelector("#preferenceInput").value.trim(),
      theme: document.querySelector("#themeInput").value || DEFAULT_THEME_NAME,
      customColors: readColorInputs(),
      customAlpha: readAlphaInputs(),
    };
    setSettings(nextSettings);
    applyTheme(nextSettings);
    dialog.close();
    showToast("设置保存好了");
    render();
  });
}

function initNav() {
  document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => {
    page = btn.dataset.page;
    window.scrollTo({ top: 0, behavior: "smooth" });
    render();
  }));
}

function initPwa() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

applyTheme(getSettings());
initNav();
initSettingsDialog();
initPwa();
render();
