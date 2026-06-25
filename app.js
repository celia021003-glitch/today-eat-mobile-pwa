const STORAGE = {
  settings: "todayEat.settings.v1",
  logs: "todayEat.logs.v1",
  pantry: "todayEat.pantry.v1",
  cravings: "todayEat.cravings.v1",
  moods: "todayEat.moods.v1",
  photos: "todayEat.photos.v1",
};

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
function getSettings() {
  return load(STORAGE.settings, {
    nickname: "我",
    calorieTarget: 1600,
    proteinTarget: 80,
    preference: "喜欢辣，喜欢热食，减脂但不想极端节食",
  });
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
  dateLabel.textContent = `${prettyDate()} · ${hello}`;
  greetingTitle.textContent = page === "home" ? `今天怎么吃` : ({
    log: "记录一餐",
    photo: "拍一张饭",
    lists: "我的清单",
    journal: "心情日记",
  }[page] || `今天怎么吃`);
  if (page === "home") greetingTitle.textContent = `${hello}，${s.nickname || "我"}`;
}

function render() {
  setTopbar();
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.page === page));
  if (page === "home") renderHome();
  if (page === "log") renderLog();
  if (page === "photo") renderPhoto();
  if (page === "lists") renderLists();
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
              <option>蛋白质</option><option>蔬菜</option><option>主食</option><option>饮品</option><option>调味</option><option>其他</option>
            </select>
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
  document.querySelector("#addPantryBtn").addEventListener("click", () => {
    const name = document.querySelector("#pantryName").value.trim();
    if (!name) return showToast("先写一个食材名字");
    const item = { id: uid(), name, category: document.querySelector("#pantryCategory").value, amount: document.querySelector("#pantryAmount").value.trim(), expire: document.querySelector("#pantryExpire").value };
    setPantry([item, ...getPantry()]);
    showToast("放进小冰箱了");
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

function categoryEmoji(cat) { return ({ 蛋白质: "🍗", 蔬菜: "🥬", 主食: "🍚", 饮品: "🥛", 调味: "🌶️" }[cat] || "🫙"); }
function chipClass(cat) { return ({ 蛋白质: "sage", 蔬菜: "sage", 主食: "apricot", 饮品: "blue", 调味: "pink" }[cat] || "lav"); }
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

function initSettingsDialog() {
  const dialog = document.querySelector("#settingsDialog");
  const btn = document.querySelector("#settingsBtn");
  btn.addEventListener("click", () => {
    const s = getSettings();
    document.querySelector("#nicknameInput").value = s.nickname;
    document.querySelector("#calorieTargetInput").value = s.calorieTarget;
    document.querySelector("#proteinTargetInput").value = s.proteinTarget;
    document.querySelector("#preferenceInput").value = s.preference;
    dialog.showModal();
  });
  document.querySelector("#saveSettingsBtn").addEventListener("click", (e) => {
    e.preventDefault();
    setSettings({
      nickname: document.querySelector("#nicknameInput").value.trim() || "我",
      calorieTarget: Number(document.querySelector("#calorieTargetInput").value || 1600),
      proteinTarget: Number(document.querySelector("#proteinTargetInput").value || 80),
      preference: document.querySelector("#preferenceInput").value.trim(),
    });
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

initNav();
initSettingsDialog();
initPwa();
render();
