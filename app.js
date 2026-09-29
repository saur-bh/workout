/* DNA Fitness — app.js */
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DAYNAMES = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const STORE = "saurabhFitnessV2";

const exerciseLib = {
  squat:   { name: "Goblet squat",                reg: "Box squat", prog: "Heavier goblet squat or 1½-rep squat" },
  push:    { name: "Push-up",                     reg: "Hands-elevated push-up", prog: "Feet-elevated or deficit push-up" },
  row:     { name: "1-arm DB/KB row",             reg: "Supported lighter row", prog: "Heavier row + 1-sec squeeze" },
  rdl:     { name: "DB/KB Romanian deadlift",     reg: "Hip hinge to wall / lighter deadlift", prog: "Heavier RDL or B-stance RDL" },
  split:   { name: "Rear-foot-elevated split squat", reg: "Supported split squat", prog: "Loaded Bulgarian split squat + pause" },
  press:   { name: "DB floor press",              reg: "Light DB floor press", prog: "Heavier press + 1-sec pause" },
  slrdl:   { name: "Single-leg RDL",              reg: "Kickstand RDL with support", prog: "Unsupported loaded single-leg RDL" },
  swing:   { name: "Kettlebell swing",            reg: "KB deadlift / fast hinge", prog: "Heavier swing" },
  step:    { name: "Box step-up",                 reg: "Lower box + hand support", prog: "Loaded or higher step-up" },
  slam:    { name: "Medicine-ball slam",          reg: "Light ball controlled slam", prog: "Heavier ball / faster repeat slams" },
  deadbug: { name: "Dead bug",                    reg: "Heel taps", prog: "Long-lever / lightly loaded dead bug" },
  bridge:  { name: "Glute bridge",                reg: "Short-range bridge", prog: "Single-leg or loaded bridge" },
  birddog: { name: "Bird dog",                    reg: "Arm-only / leg-only reach", prog: "Knee-hover bird dog" },
  sideR:   { name: "Side plank right",            reg: "Bent-knee side plank", prog: "Full side plank + top-leg lift" },
  sideL:   { name: "Side plank left",             reg: "Bent-knee side plank", prog: "Full side plank + top-leg lift" },
  bear:    { name: "Bear plank shoulder tap",     reg: "Quadruped shoulder tap", prog: "Slow bear crawl" },
};

const workouts = {
  0: { title:"Full Body Strength A", focus:"Squat + push + pull + hinge", type:"strength",
      warm:["30s marching + arm circles","30s bodyweight squats","30s hip hinges","30s reverse lunges"],
      ex:["squat","push","row","rdl"], fin:["step","deadbug"],
      mob:["45s hip-flexor stretch/side","45s chest/lat stretch/side"]},
  1: { title:"VO₂ Max Intervals", focus:"Bike / rower / SkiErg", type:"vo2",
      warm:["2 min easy → moderate machine pace"], ex:[], fin:[],
      mob:["45s calf stretch/side","45s hip-flexor stretch/side"]},
  2: { title:"Full Body Strength B", focus:"Unilateral legs + horizontal push/pull", type:"strength",
      warm:["30s step-ups","30s squat-to-stand","30s shoulder circles","30s glute bridges"],
      ex:["split","row","press","slrdl"], fin:["swing","deadbug"],
      mob:["45s hamstring stretch/side","45s thoracic rotation/side"]},
  3: { title:"Aerobic Base + Core + Mobility", focus:"Zone 2 + trunk control", type:"aerobic",
      warm:["2 min easy bike / row / SkiErg"], ex:["deadbug","sideR","sideL","birddog"], fin:[],
      mob:["60s 90/90 hip switches","60s world's greatest stretch","60s couch stretch","60s thoracic rotation","60s child pose + breathing"]},
  4: { title:"Strength C + Metabolic Finisher", focus:"Power + total-body conditioning", type:"metcon",
      warm:["30s easy swings/hinges","30s bodyweight squats","30s step-ups","30s shoulder taps"],
      ex:["swing","squat","push","step"], fin:["slam"],
      mob:["45s quad stretch/side","45s glute stretch/side"]},
  5: { title:"Recovery", focus:"Walking + optional mobility", type:"rest", warm:[], ex:[], fin:[],
      mob:["20–40 min easy walk","5–10 min gentle mobility if desired"]},
  6: { title:"Recovery", focus:"Walking + meal prep", type:"rest", warm:[], ex:[], fin:[],
      mob:["20–40 min easy walk","Prepare protein/veg for the week"]},
};

const menus = [
  { name:"Monday", m:[
    ["11:00","3 eggs + 200 g low-fat Skyr + 120 g blueberries/strawberries + capsicum/radish","~40 g protein"],
    ["14:15","1 scoop whey + 300 ml unsweetened almond milk + 1 small orange","~25–30 g protein"],
    ["17:20","180–200 g chicken breast + 150 g cooked rajma + large mixed vegetables + 100–150 ml kefir","~50 g protein"]
  ]},
  { name:"Tuesday · Vegetarian", m:[
    ["11:00","250 g low-fat Skyr + 1 scoop whey + berries + cinnamon","~45 g protein"],
    ["14:15","Besan chilla from 70 g besan + vegetables + 100 g low-fat paneer","~35–40 g protein"],
    ["17:20","180 g cooked rajma + 100 g low-fat paneer + large salad/vegetables + small kuttu portion if training hunger is high","~35–40 g protein"]
  ]},
  { name:"Wednesday", m:[
    ["11:00","3 eggs + 200 g low-fat Skyr + berries + vegetables","~40 g protein"],
    ["14:15","Whey + unsweetened almond milk + berries","~25–30 g protein"],
    ["17:20","180–200 g chicken + 150 g cooked rajma + capsicum/carrot/radish + kefir","~50 g protein"]
  ]},
  { name:"Thursday", m:[
    ["11:00","250 g low-fat Skyr + whey + blueberries + 10 g collagen","~45–50 g protein"],
    ["14:15","2 eggs + vegetable plate + 20 g cheese OR extra Skyr","~20–25 g protein"],
    ["17:20","180 g chicken + large vegetables + 150–180 g cooked rajma","~45–50 g protein"]
  ]},
  { name:"Friday", m:[
    ["11:00","3 eggs + 200 g Skyr + berries + 1 orange","~40 g protein"],
    ["14:15","Whey + unsweetened almond milk + fruit","~25–30 g protein"],
    ["17:20","180–200 g chicken + 60 g dry-weight kuttu or 150 g rajma + large vegetables + kefir","~50 g protein"]
  ]},
  { name:"Saturday", m:[
    ["11:00","Eggs + Skyr + berries + vegetables","~40 g protein"],
    ["14:15","Whey + almond milk","~25 g protein"],
    ["17:20","Chicken + vegetables + rajma; keep oils/cheese measured","~50 g protein"]
  ]},
  { name:"Sunday", m:[
    ["11:00","Eggs + Skyr + strawberries/blueberries","~40 g protein"],
    ["14:15","Whey + almond milk + fruit","~25–30 g protein"],
    ["17:20","Chicken or low-fat paneer + vegetables + small low-GL carb serving","~45–50 g protein"]
  ]},
];

const state = JSON.parse(localStorage.getItem(STORE) || '{}');
state.logs = state.logs || {};
state.completed = state.completed || {};
state.startDate = state.startDate || "";

function save(){ localStorage.setItem(STORE, JSON.stringify(state)); }
function key(w,d){ return `w${w}d${d}`; }
function tempoFor(w){ return w === 3 ? "3-1-1-0" : "2-0-1-0"; }

function reps(id,w){
  const base = {
    squat:["8","10","8","8–10"], push:["8–12","10–14","8–10","8–12"], row:["6/side","7/side","6/side","6–8/side"], rdl:["10","12","8–10","10"],
    split:["6/side","7/side","6/side","6–8/side"], press:["10","12","8–10","8–12"], slrdl:["6/side","7/side","6/side","6–8/side"],
    swing:["12","15","12","15"], step:["8/side","10/side","8/side","10/side"], slam:["8","10","8","10"],
    deadbug:["6/side","8/side","6/side","8/side"], sideR:["25s","30s","30s","35s"], sideL:["25s","30s","30s","35s"], birddog:["6/side","8/side","6/side","8/side"]
  };
  return base[id]?.[w-1] || "";
}

function pillClass(color){
  if(color === "blue")   return "inline-block rounded-full px-2.5 py-1 text-[.76rem] font-extrabold bg-navy-50 text-navy-700";
  if(color === "green")  return "inline-block rounded-full px-2.5 py-1 text-[.76rem] font-extrabold bg-emerald-50 text-emerald-700";
  if(color === "amber")  return "inline-block rounded-full px-2.5 py-1 text-[.76rem] font-extrabold bg-amber-50 text-amber-700";
  return "inline-block rounded-full px-2.5 py-1 text-[.76rem] font-extrabold bg-slate-100 text-slate-700";
}

function renderExercise(id,w){
  const e = exerciseLib[id], r = reps(id,w);
  const tempo = (["row"].includes(id) ? "2-1-1-0" : tempoFor(w));
  const setCount = (w === 1 ? 2 : 3);
  return `<div class="exercise border-t border-line py-3 first:border-0 first:pt-0">
    <div class="flex justify-between items-start gap-2">
      <b class="text-slate-900">${e.name}</b>
      <span class="${pillClass("green")}">${r}</span>
    </div>
    <div class="flex gap-1.5 flex-wrap my-2">
      <span class="text-[.75rem] bg-slate-100 rounded-lg px-2 py-1 text-slate-600 font-medium">${setCount} sets</span>
      <span class="text-[.75rem] bg-slate-100 rounded-lg px-2 py-1 text-slate-600 font-medium">Tempo ${tempo}</span>
      <span class="text-[.75rem] bg-slate-100 rounded-lg px-2 py-1 text-slate-600 font-medium">Rest 45–60s</span>
      <span class="text-[.75rem] bg-slate-100 rounded-lg px-2 py-1 text-slate-600 font-medium">${w === 4 ? "1–2" : "2–3"} RIR</span>
    </div>
    <div class="text-[.8rem] text-slate-600">
      <b class="text-slate-700">Easier:</b> ${e.reg}<br/>
      <b class="text-slate-700">Harder:</b> ${e.prog}
    </div>
  </div>`;
}

function workoutHtml(w,d){
  const x = workouts[d];
  if(x.type === "rest"){
    return `<h2 class="text-[1.18rem] font-extrabold mb-2">${DAYNAMES[d]} – ${x.title}</h2>
      <p class="text-slate-500 text-[.9rem] mb-3">${x.focus}</p>
      ${x.mob.map(v => `<label class="flex items-center gap-2.5 py-2 text-[.92rem] text-slate-700"><input type="checkbox" class="w-5 h-5 rounded accent-navy-600"/> ${v}</label>`).join("")}`;
  }
  let main = "";
  if(x.type === "strength"){
    main = x.ex.map(id => renderExercise(id,w)).join("");
    const fin = x.fin.map(id => `${exerciseLib[id].name}: ${reps(id,w)}`).join(" · ");
    return `<h2 class="text-[1.18rem] font-extrabold mb-1">${DAYNAMES[d]} – ${x.title}</h2>
      <p class="text-slate-500 text-[.9rem] mb-3">${x.focus}</p>
      <span class="${pillClass("blue")}">20:00 total</span>
      <h3 style="margin-top:14px" class="font-extrabold text-slate-900 mb-1.5">Warm-up – 2:00</h3>
      ${x.warm.map(v => `<div class="text-[.8rem] text-slate-600">· ${v}</div>`).join("")}
      <h3 style="margin-top:14px" class="font-extrabold text-slate-900 mb-1.5">Strength – 13:00</h3>
      ${main}
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-1">Finisher – 3:00</h3>
      <p class="text-[.9rem] text-slate-700">${fin}. Move continuously with clean form; rest only as needed.</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Mobility – 2:00</h3>
      ${x.mob.map(v => `<div class="text-[.8rem] text-slate-600">· ${v}</div>`).join("")}`;
  }
  if(x.type === "vo2"){
    const intervals = [
      "6 × 30s hard / 60s easy",
      "6 × 40s hard / 50s easy",
      "7 × 45s hard / 45s easy",
      "6 × 60s hard / 45s easy"
    ][w-1];
    return `<h2 class="text-[1.18rem] font-extrabold mb-1">${DAYNAMES[d]} – ${x.title}</h2>
      <p class="text-slate-500 text-[.9rem] mb-3">${x.focus}</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5">Warm-up – 3:00</h3>
      <p class="text-[.9rem] text-slate-700">Easy 60s → moderate 60s → 3 × 10s brisk pickups with easy movement between.</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Main – 12:00</h3>
      <p class="text-[.95rem] text-slate-800 font-semibold">${intervals}</p>
      <p class="text-[.9rem] text-slate-700">Hard efforts = RPE 8–9/10. Aim to finish strong, not collapse. Keep moving easily during recoveries.</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Core – 3:00</h3>
      <p class="text-[.9rem] text-slate-700">Alternate 30s dead bug / 30s plank for 3 minutes.</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Mobility – 2:00</h3>
      ${x.mob.map(v => `<div class="text-[.8rem] text-slate-600">· ${v}</div>`).join("")}`;
  }
  if(x.type === "aerobic"){
    const z2 = ["8 min","9 min","10 min","10 min"][w-1];
    return `<h2 class="text-[1.18rem] font-extrabold mb-1">${DAYNAMES[d]} – ${x.title}</h2>
      <p class="text-slate-500 text-[.9rem] mb-3">${x.focus}</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5">Warm-up – 2:00</h3>
      <p class="text-[.9rem] text-slate-700">Easy bike / row / SkiErg.</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Zone 2 – ${z2}</h3>
      <p class="text-[.9rem] text-slate-700">RPE 4–5/10. You should be able to speak in short sentences. Keep cadence smooth.</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Core – ${w < 3 ? "5:00" : "4:00"}</h3>
      ${x.ex.map(id => renderExercise(id,w)).join("")}
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Mobility – ${w < 3 ? "5:00" : "4:00"}</h3>
      ${x.mob.slice(0, w < 3 ? 5 : 4).map(v => `<div class="text-[.8rem] text-slate-600">· ${v}</div>`).join("")}`;
  }
  if(x.type === "metcon"){
    const rounds = ["3 rounds","3 rounds","3 rounds with slower eccentric","4 rounds if form stays sharp"][w-1];
    return `<h2 class="text-[1.18rem] font-extrabold mb-1">${DAYNAMES[d]} – ${x.title}</h2>
      <p class="text-slate-500 text-[.9rem] mb-3">${x.focus}</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5">Warm-up – 2:00</h3>
      ${x.warm.map(v => `<div class="text-[.8rem] text-slate-600">· ${v}</div>`).join("")}
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Main circuit – 12:00</h3>
      <p class="text-[.95rem] text-slate-800 font-semibold">${rounds}. Rest 45s between rounds.</p>
      ${x.ex.map(id => renderExercise(id,w)).join("")}
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Power finisher – 4:00</h3>
      <p class="text-[.9rem] text-slate-700">Med-ball slams: 20s work / 40s easy × 4. Keep each slam explosive.</p>
      <h3 class="font-extrabold text-slate-900 mb-1.5 mt-3">Mobility – 2:00</h3>
      ${x.mob.map(v => `<div class="text-[.8rem] text-slate-600">· ${v}</div>`).join("")}`;
  }
}

function timerPhases(w,d){
  const type = workouts[d].type;
  if(type === "rest") return [{ s: 1200, label: "Recovery day – easy walk / mobility" }];
  if(type === "vo2"){
    const hard = [30,40,45,60][w-1], easy = [60,50,45,45][w-1], reps = [6,6,7,6][w-1];
    let a = [{ s:180, label:"Warm-up" }];
    for(let i = 1; i <= reps; i++){
      a.push({ s: hard, label:`Interval ${i}/${reps} – HARD` });
      a.push({ s: easy, label:`Interval ${i}/${reps} – easy recovery` });
    }
    let used = a.reduce((q,z) => q + z.s, 0);
    if(used < 1080) a.push({ s: 1080 - used, label:"Core – dead bug / plank" });
    a.push({ s:120, label:"Mobility cooldown" });
    return a;
  }
  if(type === "aerobic"){
    const z = [480,540,600,600][w-1], core = (w < 3 ? 300 : 240), mob = 1200 - 120 - z - core;
    return [{ s:120, label:"Warm-up" }, { s:z, label:"Zone 2 cardio" }, { s:core, label:"Core circuit" }, { s:mob, label:"Mobility" }];
  }
  if(type === "metcon") return [{ s:120, label:"Warm-up" }, { s:720, label:"Main circuit" }, { s:240, label:"Med-ball finisher" }, { s:120, label:"Mobility" }];
  return [{ s:120, label:"Warm-up" }, { s:780, label:"Strength block" }, { s:180, label:"Finisher" }, { s:120, label:"Mobility" }];
}

function mealHtml(day){
  const m = menus[day];
  return `<h2 class="text-[1.18rem] font-extrabold mb-1">${m.name} food plan</h2>
    <p class="text-slate-500 text-[.9rem] mb-3">Aim for 120–135 g protein and keep saturated fat controlled.</p>` +
    m.m.map(x => `<div class="meal py-3 border-t border-line first:border-0 first:pt-0">
      <div class="font-extrabold text-navy-700">${x[0]}</div>
      <div class="text-[.93rem] text-slate-800 mt-0.5">${x[1]}</div>
      <div class="text-[.77rem] text-slate-500 mt-1">${x[2]}</div>
    </div>`).join("");
}

function defaultStart(){
  if(state.startDate) return state.startDate;
  const d = new Date(), day = d.getDay(), diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0,10);
}
function currentWD(){
  const start = new Date((state.startDate || defaultStart()) + "T00:00:00");
  const now = new Date();
  const diff = Math.floor((now - start) / 86400000);
  if(diff < 0) return { w: 1, d: 0 };
  return { w: Math.min(4, Math.floor(diff / 7) + 1), d: ((diff % 7) + 7) % 7 };
}

let selected = { w: 1, d: 0 };

function navbtnClass(active){
  return active
    ? "navbtn whitespace-nowrap border border-ink bg-ink rounded-full px-3.5 py-2.5 text-[.88rem] font-semibold text-white transition"
    : "navbtn whitespace-nowrap border border-line bg-white rounded-full px-3.5 py-2.5 text-[.88rem] font-semibold text-slate-700 transition hover:border-slate-300";
}

function setNavActiveClass(btn, active){
  btn.className = navbtnClass(active);
}

function renderToday(){
  const c = currentWD();
  selected = { w: c.w, d: c.d };
  document.getElementById("todayWeek").textContent = `Week ${c.w}`;
  document.getElementById("todayTitle").textContent = `${DAYNAMES[c.d]} – ${workouts[c.d].title}`;
  document.getElementById("todayFocus").textContent = workouts[c.d].focus;
  document.getElementById("todayWorkout").innerHTML = workoutHtml(c.w, c.d);
  document.getElementById("todayMeals").innerHTML = mealHtml(c.d);
  renderTodayLog(c.w, c.d);
  resetTimer();
  document.getElementById("completeToday").textContent =
    state.completed[key(c.w, c.d)] ? "✓ Completed" : "✓ Mark today complete";
  if(typeof renderGuideLaunch === 'function') renderGuideLaunch();
}

function renderTodayLog(w,d){
  const L = state.logs[key(w,d)] || {};
  const field = (label, id, type, val, extra) =>
    `<div class="flex flex-col gap-1.5">
      <label class="text-[.82rem] font-semibold text-slate-600">${label}</label>
      <input id="${id}" type="${type}" ${extra||""} value="${val||""}"
        class="w-full border border-slate-300 rounded-[11px] px-3 py-2.5 bg-white text-slate-900 text-[.95rem]"/>
    </div>`;
  document.getElementById("todayLog").innerHTML = `
    <h2 class="text-[1.18rem] font-extrabold mb-3">Today's log</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      ${field("Morning weight (kg)", "tw", "number", L.weight, 'step=".1"')}
      ${field("Sleep (hours)", "ts", "number", L.sleep, 'step=".1"')}
      ${field("Steps", "tsteps", "number", L.steps, "")}
      ${field("Workout RPE 1–10", "trpe", "number", L.rpe, 'min="1" max="10"')}
    </div>
    <div class="flex flex-col gap-1.5 mt-3">
      <label class="text-[.82rem] font-semibold text-slate-600">Notes / loads used</label>
      <textarea id="tn" rows="3"
        class="w-full border border-slate-300 rounded-[11px] px-3 py-2.5 bg-white text-slate-900 text-[.95rem] resize-y min-h-[88px]">${L.notes || ""}</textarea>
    </div>
    <button class="mt-3 rounded-xl px-4 py-2.5 font-extrabold text-[.88rem] bg-teal-600 hover:bg-teal-700 text-white active:scale-95 transition" onclick="saveTodayLog(${w},${d})">Save log</button>`;
}

window.saveTodayLog = function(w,d){
  state.logs[key(w,d)] = {
    ...(state.logs[key(w,d)] || {}),
    weight: document.getElementById("tw").value,
    sleep: document.getElementById("ts").value,
    steps: document.getElementById("tsteps").value,
    rpe: document.getElementById("trpe").value,
    notes: document.getElementById("tn").value,
  };
  save();
  flashToast("Saved ✓");
};

function weektabClass(active){
  return active
    ? "flex-1 border border-navy-600 bg-navy-600 text-white rounded-[11px] px-2.5 py-2.5 font-bold text-[.88rem] transition active:scale-95"
    : "flex-1 border border-line bg-white rounded-[11px] px-2.5 py-2.5 font-semibold text-slate-700 text-[.88rem] transition hover:border-slate-300 active:scale-95";
}
function daytabClass(active){
  return active
    ? "border border-ink bg-ink text-white px-1 py-2 rounded-xl text-[.72rem] font-bold transition active:scale-95"
    : "border border-line bg-white px-1 py-2 rounded-xl text-[.72rem] font-semibold text-slate-700 transition hover:border-slate-300 active:scale-95";
}

function renderPlan(){
  document.getElementById("weekTabs").innerHTML =
    [1,2,3,4].map(w => `<button class="${weektabClass(w === selected.w)}" onclick="pickWeek(${w})">Week ${w}</button>`).join("");
  document.getElementById("dayTabs").innerHTML =
    DAYS.map((x,d) => `<button class="${daytabClass(d === selected.d)}" onclick="pickDay(${d})">${x}</button>`).join("");
  document.getElementById("planWorkout").innerHTML = workoutHtml(selected.w, selected.d);
}

window.pickWeek = w => { selected.w = w; renderPlan(); };
window.pickDay = d => { selected.d = d; renderPlan(); };

function renderLibrary(){
  document.getElementById("exerciseLibrary").innerHTML =
    Object.values(exerciseLib).map(e => `
      <details class="border border-line rounded-xl p-2.5 my-2 bg-white">
        <summary class="font-extrabold cursor-pointer text-slate-900 p-1">${e.name}</summary>
        <p class="mt-2 text-[.9rem] text-slate-700 px-1"><b>Regression:</b> ${e.reg}</p>
        <p class="text-[.9rem] text-slate-700 px-1"><b>Progression:</b> ${e.prog}</p>
      </details>`).join("");
}

let foodD = 0;
function renderFood(){
  document.getElementById("foodDayTabs").innerHTML =
    DAYS.map((x,d) => `<button class="${daytabClass(d === foodD)}" onclick="pickFood(${d})">${x}</button>`).join("");
  document.getElementById("foodDay").innerHTML = mealHtml(foodD);
}
window.pickFood = d => { foodD = d; renderFood(); };

function renderLogSelectors(){
  document.getElementById("logWeek").innerHTML =
    [1,2,3,4].map(w => `<option value="${w}">Week ${w}</option>`).join("");
  document.getElementById("logDay").innerHTML =
    DAYNAMES.map((x,d) => `<option value="${d}">${x}</option>`).join("");
  const c = currentWD();
  document.getElementById("logWeek").value = c.w;
  document.getElementById("logDay").value = c.d;
  renderProgressForm();
}

function fieldInput(label, id, type, val, extra){
  return `<div class="flex flex-col gap-1.5">
    <label class="text-[.82rem] font-semibold text-slate-600">${label}</label>
    <input id="${id}" type="${type}" ${extra||""} value="${val||""}"
      class="w-full border border-slate-300 rounded-[11px] px-3 py-2.5 bg-white text-slate-900 text-[.95rem]"/>
  </div>`;
}

function renderProgressForm(){
  const w = +document.getElementById("logWeek").value;
  const d = +document.getElementById("logDay").value;
  const L = state.logs[key(w,d)] || {};
  document.getElementById("progressForm").innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      ${fieldInput("Weight kg", "pweight", "number", L.weight, 'step=".1"')}
      ${fieldInput("Sleep hours", "psleep", "number", L.sleep, 'step=".1"')}
      ${fieldInput("Steps", "psteps", "number", L.steps, "")}
      ${fieldInput("Workout RPE", "prpe", "number", L.rpe, 'min="1" max="10"')}
      ${fieldInput("Protein g", "pprotein", "number", L.protein, "")}
      ${fieldInput("Calories", "pcal", "number", L.cal, "")}
    </div>
    <label class="flex items-center gap-2.5 py-2.5 text-[.92rem] text-slate-700">
      <input id="pwork" type="checkbox" class="w-5 h-5 rounded accent-navy-600"
        ${state.completed[key(w,d)] ? "checked" : ""}/> Workout completed
    </label>
    <div class="flex flex-col gap-1.5">
      <label class="text-[.82rem] font-semibold text-slate-600">Notes / loads / reps</label>
      <textarea id="pnotes" rows="3"
        class="w-full border border-slate-300 rounded-[11px] px-3 py-2.5 bg-white text-slate-900 text-[.95rem] resize-y min-h-[88px]">${L.notes || ""}</textarea>
    </div>
    <button class="mt-3 rounded-xl px-4 py-2.5 font-extrabold text-[.88rem] bg-teal-600 hover:bg-teal-700 text-white active:scale-95 transition"
      onclick="saveProgress()">Save day</button>`;
  renderWeightTable();
}

window.saveProgress = function(){
  const w = +document.getElementById("logWeek").value;
  const d = +document.getElementById("logDay").value;
  state.logs[key(w,d)] = {
    weight: document.getElementById("pweight").value,
    sleep: document.getElementById("psleep").value,
    steps: document.getElementById("psteps").value,
    rpe: document.getElementById("prpe").value,
    protein: document.getElementById("pprotein").value,
    cal: document.getElementById("pcal").value,
    notes: document.getElementById("pnotes").value,
  };
  state.completed[key(w,d)] = document.getElementById("pwork").checked;
  save();
  renderWeightTable();
  flashToast("Saved ✓");
};

function renderWeightTable(){
  let rows = [];
  for(let w = 1; w <= 4; w++){
    for(let d = 0; d < 7; d++){
      const L = state.logs[key(w,d)];
      if(L?.weight){
        rows.push(`<tr>
          <td class="py-2.5 px-1.5 border-b border-line align-top font-semibold text-slate-700">W${w} ${DAYS[d]}</td>
          <td class="py-2.5 px-1.5 border-b border-line align-top">${L.weight} kg</td>
          <td class="py-2.5 px-1.5 border-b border-line align-top">${L.sleep || "—"} h</td>
          <td class="py-2.5 px-1.5 border-b border-line align-top text-emerald-700 font-black">${state.completed[key(w,d)] ? "✓" : "—"}</td>
        </tr>`);
      }
    }
  }
  const el = document.getElementById("weightTable");
  el.innerHTML = rows.length
    ? `<table class="w-full text-[.84rem] border-collapse">
        <tr><th class="text-slate-500 font-semibold py-2.5 px-1.5 border-b border-line align-top text-left">Day</th>
            <th class="text-slate-500 font-semibold py-2.5 px-1.5 border-b border-line align-top text-left">Weight</th>
            <th class="text-slate-500 font-semibold py-2.5 px-1.5 border-b border-line align-top text-left">Sleep</th>
            <th class="text-slate-500 font-semibold py-2.5 px-1.5 border-b border-line align-top text-left">Workout</th></tr>
        ${rows.join("")}
      </table>`
    : `<p class="text-slate-500 text-[.9rem]">No entries yet.</p>`;
}

let timer = { phases:[], idx:0, left:0, total:0, elapsed:0, run:false, id:null };

function resetTimer(){
  clearInterval(timer.id);
  timer.run = false;
  const c = currentWD();
  timer.phases = timerPhases(c.w, c.d);
  timer.idx = 0;
  timer.left = timer.phases[0].s;
  timer.total = timer.phases.reduce((a,b) => a + b.s, 0);
  timer.elapsed = 0;
  paintTimer();
}
function paintTimer(){
  const m = Math.floor(timer.left / 60).toString().padStart(2,"0");
  const s = (timer.left % 60).toString().padStart(2,"0");
  document.getElementById("timerClock").textContent = `${m}:${s}`;
  document.getElementById("timerPhase").textContent = timer.phases[timer.idx]?.label || "Complete";
  document.getElementById("timerCounter").textContent =
    timer.idx < timer.phases.length ? `Phase ${timer.idx + 1} of ${timer.phases.length}` : "Done";
  document.getElementById("timerProgress").style.width =
    `${Math.min(100, 100 * timer.elapsed / timer.total)}%`;
}
function tick(){
  if(!timer.run) return;
  timer.left--; timer.elapsed++;
  if(timer.left <= 0){
    timer.idx++;
    if(timer.idx >= timer.phases.length){
      timer.run = false;
      clearInterval(timer.id);
      timer.left = 0;
      document.getElementById("timerPhase").textContent = "Workout complete ✓";
      paintTimer();
      return;
    }
    timer.left = timer.phases[timer.idx].s;
    if(navigator.vibrate) navigator.vibrate([40,20,40]);
  }
  paintTimer();
}
document.getElementById("timerStart").onclick = () => {
  if(timer.run) return;
  timer.run = true;
  timer.id = setInterval(tick, 1000);
};
document.getElementById("timerPause").onclick = () => {
  timer.run = false;
  clearInterval(timer.id);
};
document.getElementById("timerSkip").onclick = () => {
  timer.elapsed += timer.left;
  timer.idx++;
  if(timer.idx >= timer.phases.length){
    timer.run = false;
    clearInterval(timer.id);
    timer.left = 0;
  } else {
    timer.left = timer.phases[timer.idx].s;
  }
  paintTimer();
};
document.getElementById("timerReset").onclick = resetTimer;

/* Screen navigation */
document.querySelectorAll(".navbtn").forEach(b => {
  b.onclick = () => {
    document.querySelectorAll(".navbtn").forEach(x => setNavActiveClass(x, false));
    setNavActiveClass(b, true);
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(b.dataset.screen);
    target.classList.add("active");
    // force animation restart
    target.classList.remove("animate-fade-in");
    void target.offsetWidth;
    target.classList.add("animate-fade-in");
    if(b.dataset.screen === "plan") renderPlan();
    if(b.dataset.screen === "food") renderFood();
    if(b.dataset.screen === "progress") renderLogSelectors();
  };
});

document.getElementById("startDate").value = state.startDate || defaultStart();
document.getElementById("startDate").onchange = () => {
  state.startDate = document.getElementById("startDate").value;
  save();
  renderToday();
};

document.getElementById("completeToday").onclick = () => {
  const c = currentWD();
  const k = key(c.w, c.d);
  state.completed[k] = !state.completed[k];
  save();
  renderToday();
  flashToast(state.completed[k] ? "Marked complete ✓" : "Unmarked");
};

document.getElementById("jumpProgress").onclick = () => {
  document.querySelector('[data-screen="progress"]').click();
};

document.getElementById("logWeek").onchange = renderProgressForm;
document.getElementById("logDay").onchange = renderProgressForm;

document.getElementById("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "saurabh-fitness-log.json";
  a.click();
  URL.revokeObjectURL(a.href);
};
document.getElementById("importFile").onchange = e => {
  const f = e.target.files[0];
  if(!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const x = JSON.parse(r.result);
      localStorage.setItem(STORE, JSON.stringify(x));
      location.reload();
    } catch(err) {
      alert("Invalid JSON file");
    }
  };
  r.readAsText(f);
};
document.getElementById("resetData").onclick = () => {
  if(confirm("Delete all saved logs and completion marks?")){
    localStorage.removeItem(STORE);
    location.reload();
  }
};

/* ---------- Guided workout ---------- */
let guide = { steps:[], idx:-1, remain:0, run:false, timer:null, sound:true, started:false, w:1, d:0, wake:null };

function estimateEquipment(d){
  const type = workouts[d].type;
  if(type === "vo2" || type === "aerobic") return ["Bike / rower / SkiErg", "Mat"];
  if(type === "metcon") return ["Kettlebell", "Box", "Medicine ball", "Mat"];
  if(type === "rest") return ["Walking shoes"];
  return ["Kettlebell / dumbbells", "Box", "Mat"];
}
function setCountForWeek(w){ return w === 1 ? 2 : 3; }
function restSeconds(w){ return w === 1 ? 60 : (w === 2 ? 55 : 45); }
function tempoSeconds(t){ return t.split("-").reduce((a,x) => a + (+x||0), 0); }
function numericRep(r){
  const m = String(r).match(/(\d+)/);
  return m ? +m[1] : 8;
}
function exStep(id,w,setNo,sets){
  const e = exerciseLib[id];
  const rp = reps(id,w);
  const tempo = (id === "row" ? "2-1-1-0" : tempoFor(w));
  const instruction =
    id === "swing" ? "Explosive hips; arms stay relaxed." :
    id === "push"  ? "Body in one line; chest moves first." :
    id === "squat" ? "Brace, sit between hips, stand tall." :
    id === "row"   ? "Pull elbow toward hip; pause at the top." :
    id === "rdl" || id === "slrdl" ? "Hips back, neutral spine, feel hamstrings." :
    "Use controlled form and stop before technique breaks.";
  return {
    type:"exercise", title:e.name, id, setNo, sets, reps:rp, tempo,
    reg:e.reg, prog:e.prog,
    estimate: Math.max(20, numericRep(rp) * tempoSeconds(tempo)),
    instruction
  };
}

function buildGuide(w,d){
  const x = workouts[d];
  const a = [];
  a.push({ type:"preview", title: x.title });
  if(x.type === "rest"){
    a.push({ type:"timed", title:"Easy walk", label:"Recovery pace", seconds:1200,
      note:"Comfortable pace. Finish feeling better than you started." });
    return a;
  }
  if(x.type === "vo2"){
    a.push({ type:"timed", title:"Warm-up", label:"Easy → moderate", seconds:180,
      note:"Build gradually. Finish with three 10-second brisk pickups." });
    const hard = [30,40,45,60][w-1], easy = [60,50,45,45][w-1], n = [6,6,7,6][w-1];
    for(let i = 1; i <= n; i++){
      a.push({ type:"timed", title:`Hard interval ${i}/${n}`, label:"RPE 8–9/10", seconds:hard,
        note:"Strong and controlled. You should only manage a few words." });
      a.push({ type:"rest",  title:`Recovery ${i}/${n}`,     label:"Keep moving easily", seconds:easy,
        note:"Slow your breathing; do not stop completely." });
    }
    a.push({ type:"timed", title:"Core", label:"Alternate dead bug / plank", seconds:180,
      note:"Switch every 30 seconds." });
    a.push({ type:"timed", title:"Mobility", label:"Calf + hip flexor", seconds:120,
      note:"45 seconds each side, then easy breathing." });
    a.push({ type:"finish", title:"Session complete" });
    return a;
  }
  if(x.type === "aerobic"){
    const z = [480,540,600,600][w-1];
    const core = (w < 3 ? 300 : 240);
    const mob = 1200 - 120 - z - core;
    a.push({ type:"timed", title:"Warm-up", label:"Easy machine pace", seconds:120,
      note:"Nasal breathing if comfortable." });
    a.push({ type:"timed", title:"Zone 2", label:"RPE 4–5/10", seconds:z,
      note:"You should be able to speak in short sentences." });
    a.push({ type:"timed", title:"Core circuit", label:"Dead bug · side planks · bird dog", seconds:core,
      note:"Move slowly. Quality over speed." });
    a.push({ type:"timed", title:"Mobility", label:"Hips · T-spine · breathing", seconds:mob,
      note:"Use the mobility list shown in the plan." });
    a.push({ type:"finish", title:"Session complete" });
    return a;
  }
  if(x.type === "metcon"){
    a.push({ type:"timed", title:"Warm-up", label:"Prepare joints and hinges", seconds:120,
      note:"Easy swings/hinges, squats, step-ups and shoulder taps." });
    const rounds = [3,3,3,4][w-1];
    for(let r = 1; r <= rounds; r++){
      for(const id of x.ex){
        const s = exStep(id, w, r, rounds);
        s.setNo = r; s.sets = rounds; s.reps = reps(id, w);
        a.push(s);
      }
      if(r < rounds) a.push({ type:"rest", title:`Round ${r} recovery`, label:"Breathe + reset", seconds:45,
        note:"Walk around, shake arms out, prepare for the next round." });
    }
    for(let i = 1; i <= 4; i++){
      a.push({ type:"timed", title:`Med-ball slams ${i}/4`, label:"Explosive", seconds:20,
        note:"Every rep powerful." });
      if(i < 4) a.push({ type:"rest", title:"Power recovery", label:"Easy", seconds:40,
        note:"Full recovery for another explosive set." });
    }
    a.push({ type:"timed", title:"Mobility", label:"Quads + glutes", seconds:120,
      note:"45 seconds each side, then easy breathing." });
    a.push({ type:"finish", title:"Session complete" });
    return a;
  }
  // Strength days
  a.push({ type:"timed", title:"Warm-up", label:"Dynamic warm-up", seconds:120,
    note: x.warm.join(" · ") });
  const sets = setCountForWeek(w);
  const rest = restSeconds(w);
  for(const id of x.ex){
    for(let s = 1; s <= sets; s++){
      a.push(exStep(id, w, s, sets));
      if(!(id === x.ex[x.ex.length - 1] && s === sets)){
        a.push({ type:"rest", title:"Rest", label:`${rest} seconds`, seconds:rest,
          note:"Breathe slowly. Next set should feel strong, not rushed." });
      }
    }
  }
  a.push({ type:"timed", title:"Finisher",
    label: x.fin.map(id => exerciseLib[id].name).join(" + "), seconds:180,
    note:"Alternate the two movements continuously with clean form." });
  a.push({ type:"timed", title:"Mobility", label:"Cooldown", seconds:120,
    note: x.mob.join(" · ") });
  a.push({ type:"finish", title:"Session complete" });
  return a;
}

function fmt(sec){
  sec = Math.max(0, Math.ceil(sec));
  return `${String(Math.floor(sec/60)).padStart(2,"0")}:${String(sec%60).padStart(2,"0")}`;
}
function tempoDesc(t){
  const p = t.split("-");
  return `Lower ${p[0]}s · pause ${p[1]}s · lift ${p[2]}s · reset ${p[3]}s`;
}
function vib(ms = 25){ if(navigator.vibrate) navigator.vibrate(ms); }
function speak(msg){
  if(!guide.sound || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(msg);
  u.rate = 1.03; u.pitch = 1; u.volume = .85;
  speechSynthesis.speak(u);
}
async function keepAwake(){
  try {
    if("wakeLock" in navigator) guide.wake = await navigator.wakeLock.request("screen");
  } catch(e){}
}
function releaseWake(){ try { guide.wake?.release(); } catch(e){} guide.wake = null; }

function renderGuideLaunch(){
  const c = currentWD();
  const x = workouts[c.d];
  const eq = estimateEquipment(c.d);
  const sets = setCountForWeek(c.w);
  const names = x.ex?.map(id => exerciseLib[id].name) || [];
  const focusLabel =
    x.type === "vo2" ? "VO₂" :
    x.type === "aerobic" ? "Zone 2" :
    x.type === "rest" ? "Recovery" : "Strength";
  const focusLabelClass =
    x.type === "vo2" ? "text-rose-300" :
    x.type === "aerobic" ? "text-emerald-300" :
    x.type === "rest" ? "text-amber-300" : "text-navy-300";
  document.getElementById("guideLaunch").innerHTML = `
    <div class="absolute top-0 right-0 w-60 h-60 rounded-full bg-navy-500/20 blur-3xl pointer-events-none -translate-y-10 translate-x-10"></div>
    <div class="relative">
      <h2 class="text-[1.2rem] font-extrabold mb-1 leading-tight">Ready for ${x.title}?</h2>
      <div class="text-slate-300 text-[.88rem]">Preview the session first, then follow one exercise at a time. Rest countdowns start automatically.</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3.5">
        <div class="rounded-2xl p-3 text-center bg-white/8 border border-white/10 backdrop-blur-md2">
          <div class="text-[.7rem] text-slate-400 font-semibold uppercase tracking-wider">Duration</div>
          <b class="block text-[1.1rem] mt-0.5">20 min</b>
        </div>
        <div class="rounded-2xl p-3 text-center bg-white/8 border border-white/10 backdrop-blur-md2">
          <div class="text-[.7rem] text-slate-400 font-semibold uppercase tracking-wider">Week</div>
          <b class="block text-[1.1rem] mt-0.5">${c.w}/4</b>
        </div>
        <div class="rounded-2xl p-3 text-center bg-white/8 border border-white/10 backdrop-blur-md2">
          <div class="text-[.7rem] text-slate-400 font-semibold uppercase tracking-wider">Focus</div>
          <b class="block text-[1.1rem] mt-0.5 ${focusLabelClass}">${focusLabel}</b>
        </div>
        <div class="rounded-2xl p-3 text-center bg-white/8 border border-white/10 backdrop-blur-md2">
          <div class="text-[.7rem] text-slate-400 font-semibold uppercase tracking-wider">Sets</div>
          <b class="block text-[1.1rem] mt-0.5">${["strength"].includes(x.type) ? sets + " each" : "Guided"}</b>
        </div>
      </div>
      <div class="flex gap-1.5 flex-wrap">
        ${eq.map(e => `<span class="bg-white/8 border border-white/10 px-2.5 py-1 rounded-full text-[.76rem]">${e}</span>`).join("")}
      </div>
      ${names.length ? `
        <div class="grid gap-1.5 mt-3.5">
          ${names.map((n,i) => `
            <div class="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-2xl p-2.5">
              <span class="w-7 h-7 rounded-full bg-white text-ink font-black flex items-center justify-center text-[.85rem] flex-none">${i+1}</span>
              <span class="text-[.92rem]">${n}</span>
            </div>`).join("")}
        </div>` : ""}
      <button id="openGuide"
        class="w-full mt-4 rounded-2xl px-4 py-3.5 font-black text-[.95rem] bg-navy-500 hover:bg-navy-400 active:scale-[.98] transition shadow-fab">
        Preview &amp; start guided workout →
      </button>
    </div>`;
  document.getElementById("openGuide").onclick = openGuide;
}

function openGuide(){
  const c = currentWD();
  guide.w = c.w;
  guide.d = c.d;
  guide.steps = buildGuide(c.w, c.d);
  guide.idx = 0;
  guide.started = false;
  guide.run = false;
  clearInterval(guide.timer);
  const overlay = document.getElementById("guidedOverlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  keepAwake();
  renderGuide();
}
function closeGuide(){
  clearInterval(guide.timer);
  guide.run = false;
  const overlay = document.getElementById("guidedOverlay");
  overlay.classList.add("hidden");
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  releaseWake();
}

function previewMarkup(){
  const x = workouts[guide.d];
  const eq = estimateEquipment(guide.d);
  const ex = x.ex || [];
  const summary =
    x.type === "vo2"     ? "Warm-up → hard/easy intervals → core → mobility" :
    x.type === "aerobic" ? "Warm-up → Zone 2 → core → mobility" :
    x.type === "rest"    ? "Easy walking → optional mobility" :
    x.type === "metcon"  ? "Warm-up → full-body circuit → med-ball power → mobility" :
    `Warm-up → ${setCountForWeek(guide.w)} sets per exercise → finisher → mobility`;
  return `<div class="guide-kicker text-sky-300 uppercase tracking-[.14em] text-[.74rem] font-black">Before you start</div>
    <div class="guide-title text-[1.9rem] sm:text-[2.15rem] leading-[1.02] mt-2 mb-2 tracking-tight2 font-black">${x.title}</div>
    <p class="guide-note text-slate-300 text-[.92rem]">${x.focus}</p>
    <div class="mt-1">
      ${eq.map(e => `<span class="inline-block rounded-full bg-navy-900/70 text-navy-200 text-[.74rem] font-semibold px-2.5 py-1 my-1 mx-0.5 border border-navy-700/60">${e}</span>`).join("")}
    </div>
    <div class="grid gap-2 mt-3.5">
      <div class="flex justify-between items-start gap-2.5 p-3 bg-slate-900/70 border border-slate-700/70 rounded-2xl">
        <div><b class="text-white">Session flow</b><small class="block text-slate-400 mt-0.5">${summary}</small></div>
        <div class="text-navy-300 font-bold whitespace-nowrap">20 min</div>
      </div>
      ${ex.map((id,i) => `
        <div class="flex justify-between items-start gap-2.5 p-3 bg-slate-900/70 border border-slate-700/70 rounded-2xl">
          <div><b class="text-white">${i+1}. ${exerciseLib[id].name}</b>
            <small class="block text-slate-400 mt-0.5">${reps(id,guide.w,guide.d)} · tempo ${id==="row"?"2-1-1-0":tempoFor(guide.w)}</small>
          </div>
          <div class="text-navy-300 font-bold">→</div>
        </div>`).join("")}
    </div>
    <div class="mt-4 border-l-4 border-navy-500 bg-navy-950/70 p-3 rounded-r-xl text-[.86rem] text-navy-100 border border-navy-900">
      <b class="text-navy-300">Swipe controls:</b> left = next, right = back. During timed rests, the app advances automatically.
    </div>`;
}

function renderGuide(){
  clearInterval(guide.timer);
  guide.run = false;
  const s = guide.steps[guide.idx];
  const pct = guide.steps.length > 1 ? 100 * guide.idx / (guide.steps.length - 1) : 0;
  document.getElementById("guideProgress").style.width = pct + "%";
  document.getElementById("guideStepText").textContent = `${Math.max(1, guide.idx + 1)} / ${guide.steps.length}`;
  document.getElementById("guideMiniTitle").textContent = workouts[guide.d].title;
  const pauseBtn = document.getElementById("guidePause");
  pauseBtn.textContent = "Ⅱ";
  const prevBtn = document.getElementById("guidePrev");
  const nextBtn = document.getElementById("guideNext");
  const card = document.getElementById("guideCard");

  if(s.type === "preview"){
    card.className = "guide-card flex-1 flex flex-col justify-start pt-5 px-4 pb-28 animate-pop";
    card.innerHTML = previewMarkup();
    nextBtn.textContent = "Start workout";
    prevBtn.disabled = true;
    pauseBtn.style.visibility = "hidden";
    return;
  }
  prevBtn.disabled = false;
  pauseBtn.style.visibility = "visible";

  if(s.type === "exercise"){
    card.className = "guide-card flex-1 flex flex-col justify-center px-4 pb-28 animate-pop";
    card.innerHTML = `
      <div class="guide-kicker text-sky-300 uppercase tracking-[.14em] text-[.74rem] font-black">Set ${s.setNo} of ${s.sets}</div>
      <div class="guide-title text-[1.9rem] sm:text-[2.15rem] leading-[1.02] mt-2 mb-2 tracking-tight2 font-black">${s.title}</div>
      <div class="guide-reps text-[2rem] sm:text-[2.3rem] font-black my-2">${s.reps}</div>
      <div class="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-3.5 my-3">
        <div class="text-[.7rem] uppercase tracking-[.14em] text-slate-400 font-black">TEMPO</div>
        <div class="tempo-main text-[1.7rem] font-black mt-0.5">${s.tempo}</div>
        <div class="tempo-desc text-slate-300 text-[.88rem] mt-1">${tempoDesc(s.tempo)}</div>
      </div>
      <p class="guide-note text-slate-300 text-[.92rem]">${s.instruction}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
        <div class="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-3 text-[.84rem]">
          <b class="block text-sky-300 mb-1">Easier</b>
          <span class="text-slate-200">${s.reg}</span>
        </div>
        <div class="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-3 text-[.84rem]">
          <b class="block text-sky-300 mb-1">Harder</b>
          <span class="text-slate-200">${s.prog}</span>
        </div>
      </div>
      <div class="text-[.76rem] mt-3 text-slate-400">Do the prescribed reps, then tap “Set done” or swipe left. Rest begins automatically.</div>`;
    nextBtn.textContent = "Set done →";
    pauseBtn.style.visibility = "hidden";
    speak(`${s.title}. Set ${s.setNo} of ${s.sets}. ${s.reps}. Tempo ${s.tempo}.`);
    return;
  }

  if(s.type === "finish"){
    card.className = "guide-card flex-1 flex flex-col justify-center px-4 pb-28 text-center animate-pop";
    card.innerHTML = `
      <div class="guide-kicker text-emerald-300 uppercase tracking-[.14em] text-[.74rem] font-black">Done</div>
      <div class="guide-title text-[1.9rem] sm:text-[2.15rem] leading-[1.02] mt-2 mb-2 tracking-tight2 font-black">Workout complete ✓</div>
      <div class="guide-big text-[3.8rem] sm:text-[4.4rem] font-black leading-none my-3 text-sky-300 num-tab">20:00</div>
      <p class="guide-note text-slate-300 text-[.92rem]">Nice work. Log your load, RPE and notes while they are fresh.</p>`;
    nextBtn.textContent = "Finish";
    pauseBtn.style.visibility = "hidden";
    state.completed[key(guide.w, guide.d)] = true;
    save();
    vib([80,50,80]);
    speak("Workout complete");
    return;
  }

  guide.remain = s.seconds;
  card.className = "guide-card flex-1 flex flex-col justify-center px-4 pb-28 text-center animate-pop";
  const kicker = s.type === "rest"
    ? "Recovery" : "Timed block";
  const kickerColor = s.type === "rest"
    ? "text-amber-300" : "text-sky-300";
  card.innerHTML = `
    <div class="guide-kicker ${kickerColor} uppercase tracking-[.14em] text-[.74rem] font-black">${kicker}</div>
    <div class="guide-title text-[1.9rem] sm:text-[2.15rem] leading-[1.02] mt-2 mb-2 tracking-tight2 font-black">${s.title}</div>
    <div id="guideClock" class="guide-big text-[3.8rem] sm:text-[4.4rem] font-black leading-none my-3 text-sky-300 num-tab">${fmt(guide.remain)}</div>
    <div style="font-size:1.25rem" class="font-black my-1">${s.label || ""}</div>
    <p class="guide-note text-slate-300 text-[.92rem] mt-1">${s.note || ""}</p>`;
  nextBtn.textContent = "Skip →";
  pauseBtn.style.visibility = "visible";
  startGuideTimer();
  speak(`${s.title}. ${s.seconds} seconds.`);
}

function startGuideTimer(){
  clearInterval(guide.timer);
  guide.run = true;
  document.getElementById("guidePause").textContent = "Ⅱ";
  const clock = document.getElementById("guideClock");
  guide.timer = setInterval(() => {
    if(!guide.run) return;
    guide.remain--;
    if(clock) clock.textContent = fmt(guide.remain);
    if(guide.remain === 3){ vib(20); speak("3"); }
    if(guide.remain === 2){ vib(20); speak("2"); }
    if(guide.remain === 1){ vib(20); speak("1"); }
    if(guide.remain <= 0){
      clearInterval(guide.timer);
      guide.run = false;
      vib(60);
      nextGuide(true);
    }
  }, 1000);
}

function nextGuide(auto = false){
  const s = guide.steps[guide.idx];
  if(s?.type === "preview" && !guide.started){
    guide.started = true;
    guide.idx++;
    renderGuide();
    return;
  }
  if(s?.type === "finish"){
    closeGuide();
    document.querySelector('[data-screen="progress"]').click();
    return;
  }
  if(guide.idx < guide.steps.length - 1){
    guide.idx++;
    renderGuide();
  }
}
function prevGuide(){
  if(guide.idx > 0){ guide.idx--; renderGuide(); }
}
document.getElementById("guideNext").onclick = () => nextGuide(false);
document.getElementById("guidePrev").onclick = prevGuide;
document.getElementById("guideClose").onclick = () => {
  if(confirm("Exit guided workout? Your daily logs are still saved.")) closeGuide();
};
document.getElementById("guidePause").onclick = () => {
  if(!guide.run){
    guide.run = true;
    document.getElementById("guidePause").textContent = "Ⅱ";
    return;
  }
  guide.run = false;
  document.getElementById("guidePause").textContent = "▶";
};
document.getElementById("guideSound").onclick = () => {
  guide.sound = !guide.sound;
  document.getElementById("guideSound").textContent = guide.sound ? "🔊 On" : "🔇 Off";
  if(!guide.sound && "speechSynthesis" in window) speechSynthesis.cancel();
};

let sx = 0, sy = 0;
const guideCard = document.getElementById("guideCard");
guideCard.addEventListener("touchstart", e => {
  sx = e.changedTouches[0].screenX;
  sy = e.changedTouches[0].screenY;
}, { passive: true });
guideCard.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].screenX - sx;
  const dy = e.changedTouches[0].screenY - sy;
  if(Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.3){
    if(dx < 0) nextGuide(false); else prevGuide();
  }
}, { passive: true });

document.addEventListener("visibilitychange", () => {
  if(document.visibilityState === "visible" && document.getElementById("guidedOverlay").classList.contains("show")){
    keepAwake();
  }
});

/* Tiny toast */
function flashToast(msg){
  let t = document.getElementById("__toast");
  if(!t){
    t = document.createElement("div");
    t.id = "__toast";
    t.className = "fixed left-1/2 -translate-x-1/2 bottom-24 z-[200] px-4 py-2.5 rounded-2xl bg-ink text-white text-[.88rem] font-bold shadow-card opacity-0 translate-y-2 transition-all duration-200 pointer-events-none backdrop-blur-xl";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => {
    t.classList.remove("opacity-0", "translate-y-2");
    t.classList.add("opacity-100", "translate-y-0");
  });
  clearTimeout(flashToast._h);
  flashToast._h = setTimeout(() => {
    t.classList.add("opacity-0", "translate-y-2");
    t.classList.remove("opacity-100", "translate-y-0");
  }, 1400);
}

/* Initial render */
renderLibrary();
renderFood();
renderToday();
renderGuideLaunch();
