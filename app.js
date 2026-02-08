/* ─── Vocabulary Data ──────────────────────────────────────────── */
const VOCABULARY = {
  title: "Class vocabulary Unit 4 and 2",
  portions: [
    {
      portion: 1, day: "Montag", date: "12.01.2026",
      vocabulary: [
        { english: "owl", german: "Eule" },
        { english: "woodpecker", german: "Specht" },
        { english: "beehive", german: "Bienenstock" },
        { english: "butterfly", german: "Schmetterling" },
        { english: "town", german: "Stadt" },
        { english: "baker", german: "Bäcker/-in" },
        { english: "butcher", german: "Metzger/-in" },
        { english: "shop assistant", german: "Verkäufer/-in, Ladenangestellte/-r" }
      ],
      sentences: ["The owl is awake in the night.", "The bees live in the beehive."]
    },
    {
      portion: 2, day: "Montag", date: "19.01.2026",
      vocabulary: [
        { english: "anthill", german: "Ameisenhaufen" },
        { english: "hedgehog", german: "Igel" },
        { english: "blackbird", german: "Amsel" },
        { english: "squirrel", german: "Eichhörnchen" },
        { english: "cross the street", german: "die Strasse überqueren" },
        { english: "waiter, waitress", german: "Serviceangestellter, Serviceangestellte" },
        { english: "police officer", german: "Polizeibeamter/-beamtin" },
        { english: "street cleaner", german: "Strassenputzer/-in" }
      ],
      sentences: ["The hedgehog likes to hide under a pile of leaves.", "The blackbird is singing."]
    },
    {
      portion: 3, day: "Montag", date: "26.01.2026",
      vocabulary: [
        { english: "mouse", german: "Maus" },
        { english: "fox", german: "Fuchs" },
        { english: "deer", german: "Hirsch, Reh" },
        { english: "a pile of (leaves)", german: "ein Haufen (Blätter)" },
        { english: "village", german: "Dorf" },
        { english: "librarian", german: "Bibliothekar/-in" },
        { english: "doctor", german: "Arzt/Ärztin" },
        { english: "reporter", german: "Reporter/-in" }
      ],
      sentences: ["The mouse likes to eat cheese.", "The deer lives in the forest."]
    },
    {
      portion: 4, day: "Montag", date: "02.02.2026",
      vocabulary: [
        { english: "branch", german: "Ast, Zweig" },
        { english: "log", german: "Baumstamm" },
        { english: "tree trunk", german: "Baumstamm" },
        { english: "root", german: "Wurzel" },
        { english: "stick", german: "Zweig, Stock" },
        { english: "work", german: "arbeiten" },
        { english: "sell", german: "verkaufen" },
        { english: "job", german: "Job, Arbeit, Beruf" }
      ],
      sentences: ["The bird is sitting on a branch.", "The frog is sitting on a log."]
    },
    {
      portion: 5, day: "Montag", date: "23.02.2026",
      vocabulary: [
        { english: "board", german: "Brett" },
        { english: "forest", german: "Wald" },
        { english: "rubbish", german: "Abfall, Müll" },
        { english: "catch", german: "fangen" },
        { english: "fly", german: "fliegen" },
        { english: "bakery", german: "Bäckerei" },
        { english: "hospital", german: "Spital, Krankenhaus" },
        { english: "library", german: "Bibliothek" }
      ],
      sentences: ["The fisher catches a fish.", "Don't leave your rubbish in the forest."]
    },
    {
      portion: 6, day: "Montag", date: "02.03.2026",
      vocabulary: [
        { english: "hunt", german: "jagen" },
        { english: "be awake", german: "wach sein" },
        { english: "cut", german: "schneiden" },
        { english: "climb", german: "klettern" },
        { english: "nail", german: "nageln" },
        { english: "cinema", german: "Kino" },
        { english: "shop", german: "Laden" },
        { english: "train station", german: "Bahnhof" }
      ],
      sentences: ["The fox is hunting a mouse.", "You can climb up a tree."]
    },
    {
      portion: 7, day: "Montag", date: "09.03.2026",
      vocabulary: [
        { english: "Don't feed the animals!", german: "Tiere nicht füttern!" },
        { english: "at night", german: "in der Nacht" },
        { english: "during the day", german: "am Tag, tagsüber" },
        { english: "bus terminal", german: "Busbahnhof" },
        { english: "map", german: "Karte, Stadtplan" },
        { english: "street", german: "Strasse" },
        { english: "countryside", german: "Land, Landschaft" },
        { english: "letter", german: "Brief" }
      ],
      sentences: ["The hedgehog is sleeping during the day.", "There are no buses at night."]
    },
    {
      portion: 8, day: "Montag", date: "16.03.2026",
      vocabulary: [
        { english: "snail", german: "Schnecke" },
        { english: "rabbit", german: "Kaninchen, Hase" },
        { english: "spiderweb", german: "Spinnennetz" },
        { english: "live", german: "leben, wohnen" },
        { english: "noisy", german: "laut, lärmend" },
        { english: "quiet", german: "leise, ruhig, still" },
        { english: "in front of the building", german: "vor dem Gebäude" },
        { english: "turn left/right", german: "nach links/rechts gehen" },
        { english: "walk straight on", german: "geradeaus gehen" }
      ],
      sentences: ["A snail is slow.", "Rabbits like to eat carrots."]
    }
  ]
};

/* ─── Constants ───────────────────────────────────────────────── */
const STREAK_GOAL = 3;
const STORAGE_PREFIX = "vociQuiz_";

/* ─── State ───────────────────────────────────────────────────── */
let state = {
  screen: "welcome",      // welcome | portions | quiz | results
  currentUser: null,
  selectedPortion: null,
  direction: "de-en",      // de-en = show German, type English
  quizWords: [],
  currentIndex: 0,
  answered: false,
  answers: [],             // { word, correct, userAnswer, correctAnswer }
};

/* ─── LocalStorage helpers ────────────────────────────────────── */
function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_PREFIX + "users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_PREFIX + "users", JSON.stringify(users));
}

function getProgress(user) {
  return JSON.parse(localStorage.getItem(STORAGE_PREFIX + "progress_" + user) || "{}");
}

function saveProgress(user, progress) {
  localStorage.setItem(STORAGE_PREFIX + "progress_" + user, JSON.stringify(progress));
}

function getTermStreak(user, portionIndex, termKey) {
  const progress = getProgress(user);
  const key = "p" + portionIndex;
  return (progress[key] && progress[key][termKey]) ? progress[key][termKey].streak : 0;
}

function updateTermStreak(user, portionIndex, termKey, correct) {
  const progress = getProgress(user);
  const key = "p" + portionIndex;
  if (!progress[key]) progress[key] = {};
  if (!progress[key][termKey]) progress[key][termKey] = { streak: 0 };
  if (correct) {
    progress[key][termKey].streak = Math.min(progress[key][termKey].streak + 1, STREAK_GOAL);
  } else {
    progress[key][termKey].streak = 0;
  }
  saveProgress(user, progress);
}

function getPortionProgress(user, portionIndex) {
  const portion = VOCABULARY.portions[portionIndex];
  const progress = getProgress(user);
  const key = "p" + portionIndex;
  const data = progress[key] || {};
  let learned = 0;
  const total = portion.vocabulary.length;
  for (const term of portion.vocabulary) {
    const termKey = term.english.toLowerCase();
    if (data[termKey] && data[termKey].streak >= STREAK_GOAL) learned++;
  }
  return { learned, total };
}

/* ─── Answer matching ─────────────────────────────────────────── */
function normalize(str) {
  return str.trim().toLowerCase()
    .replace(/[''`]/g, "'")
    .replace(/\s+/g, " ");
}

function getAcceptableAnswers(answerStr) {
  const answers = new Set();

  // Split by comma
  const parts = answerStr.split(",").map(s => s.trim());
  for (const part of parts) {
    answers.add(normalize(part));

    // Handle parenthetical content: "ein Haufen (Blätter)" → also accept "ein haufen"
    const withoutParen = part.replace(/\s*\(.*?\)\s*/g, " ").trim();
    if (withoutParen) answers.add(normalize(withoutParen));

    // Handle /-in pattern: "Bäcker/-in" → "Bäcker", "Bäckerin"
    const slashMatch = part.match(/^(.+?)\/-(.+)$/);
    if (slashMatch) {
      answers.add(normalize(slashMatch[1]));
      answers.add(normalize(slashMatch[1] + slashMatch[2]));
    }

    // Handle / pattern (not /-): "Arzt/Ärztin" → "Arzt", "Ärztin"
    if (part.includes("/") && !part.includes("/-")) {
      for (const sub of part.split("/")) {
        answers.add(normalize(sub));
      }
    }
  }

  return [...answers].filter(a => a.length > 0);
}

function checkUserAnswer(userInput, correctField) {
  const acceptable = getAcceptableAnswers(correctField);
  const input = normalize(userInput);
  return acceptable.some(a => a === input);
}

/* ─── Shuffle ─────────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Rendering ───────────────────────────────────────────────── */
const $app = document.getElementById("app");

function render() {
  switch (state.screen) {
    case "welcome":   renderWelcome(); break;
    case "portions":  renderPortions(); break;
    case "quiz":      renderQuiz(); break;
    case "results":   renderResults(); break;
  }
}

/* ── Welcome ──────────────────────────────────────── */
function renderWelcome() {
  const users = getUsers();
  let savedUsersHtml = "";
  if (users.length > 0) {
    const items = users.map(u => `
      <div class="user-item" data-user="${esc(u)}">
        <span class="name">${esc(u)}</span>
        <span class="arrow">&rarr;</span>
      </div>
    `).join("");
    savedUsersHtml = `
      <div class="saved-users">
        <h3>Gespeicherte Profile</h3>
        <div class="user-list">${items}</div>
      </div>
    `;
  }

  $app.innerHTML = `
    <div class="app-header">
      <h1>Englisch Voci Quiz</h1>
      <div class="subtitle">Unit 4 &amp; 2</div>
    </div>
    <div class="card welcome-card animate-pop">
      <h2>Wer bist du?</h2>
      <p>Gib deinen Namen ein oder wähle dein Profil.</p>
      <div class="name-input-group">
        <input id="name-input" type="text" placeholder="Dein Name..." maxlength="20" autofocus>
        <button class="btn btn-primary" id="start-btn">Los!</button>
      </div>
      ${savedUsersHtml}
    </div>
  `;

  const input = document.getElementById("name-input");
  const btn = document.getElementById("start-btn");

  btn.addEventListener("click", () => loginUser(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loginUser(input.value);
  });

  document.querySelectorAll(".user-item").forEach(el => {
    el.addEventListener("click", () => loginUser(el.dataset.user));
  });
}

function loginUser(name) {
  name = name.trim();
  if (!name) return;
  const users = getUsers();
  if (!users.includes(name)) {
    users.push(name);
    saveUsers(users);
  }
  state.currentUser = name;
  state.screen = "portions";
  render();
}

/* ── Portions ─────────────────────────────────────── */
function renderPortions() {
  const cards = VOCABULARY.portions.map((p, i) => {
    const { learned, total } = getPortionProgress(state.currentUser, i);
    const pct = Math.round((learned / total) * 100);
    const isComplete = learned === total;
    return `
      <div class="card portion-card animate-pop" data-index="${i}" style="animation-delay: ${i * 0.04}s">
        <div class="portion-num${isComplete ? " complete" : ""}">${p.portion}</div>
        <div class="portion-info">
          <div class="portion-title">Portion ${p.portion}</div>
          <div class="portion-date">${p.day}, ${p.date}</div>
          <div class="portion-progress">
            <div class="progress-bar">
              <div class="progress-fill${isComplete ? " complete" : ""}" style="width:${pct}%"></div>
            </div>
            <span class="progress-text">${learned}/${total}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  $app.innerHTML = `
    <div class="top-bar">
      <div class="user-badge">
        <div class="user-avatar">${esc(state.currentUser.charAt(0).toUpperCase())}</div>
        <span>${esc(state.currentUser)}</span>
      </div>
      <button class="btn btn-ghost btn-small" id="logout-btn">Wechseln</button>
    </div>
    <div class="app-header">
      <h1>Portionen</h1>
      <div class="subtitle">Wähle eine Portion zum Üben</div>
    </div>
    <div class="portions-grid">${cards}</div>
  `;

  document.getElementById("logout-btn").addEventListener("click", () => {
    state.currentUser = null;
    state.screen = "welcome";
    render();
  });

  document.querySelectorAll(".portion-card").forEach(el => {
    el.addEventListener("click", () => startQuiz(parseInt(el.dataset.index)));
  });
}

/* ── Quiz ─────────────────────────────────────────── */
function startQuiz(portionIndex) {
  state.selectedPortion = portionIndex;
  state.quizWords = shuffle(VOCABULARY.portions[portionIndex].vocabulary);
  state.currentIndex = 0;
  state.answered = false;
  state.answers = [];
  state.screen = "quiz";
  render();
}

function renderQuiz() {
  const portion = VOCABULARY.portions[state.selectedPortion];
  const word = state.quizWords[state.currentIndex];
  const total = state.quizWords.length;
  const idx = state.currentIndex;
  const pct = Math.round((idx / total) * 100);

  const isDeEn = state.direction === "de-en";
  const prompt = isDeEn ? word.german : word.english;
  const dirLabel = isDeEn ? "Deutsch → English" : "English → Deutsch";

  // Streak dots for this term
  const termKey = word.english.toLowerCase();
  const streak = getTermStreak(state.currentUser, state.selectedPortion, termKey);
  const dots = Array.from({ length: STREAK_GOAL }, (_, i) =>
    `<div class="streak-dot${i < streak ? " filled" : ""}"></div>`
  ).join("");

  let feedbackHtml = "";
  let inputExtra = "";
  let actionsHtml = "";

  if (state.answered) {
    const last = state.answers[state.answers.length - 1];
    if (last.correct) {
      feedbackHtml = `<div class="feedback correct animate-bounce">Richtig!</div>`;
      inputExtra = "correct";
    } else {
      const correctDisplay = isDeEn ? word.english : word.german;
      feedbackHtml = `
        <div class="feedback wrong animate-shake">Falsch!</div>
        <div class="correct-answer-display">Richtig: <strong>${esc(correctDisplay)}</strong></div>
      `;
      inputExtra = "wrong";
    }
    const isLast = idx >= total - 1;
    actionsHtml = `
      <div class="quiz-actions">
        <button class="btn btn-primary btn-block" id="next-btn">
          ${isLast ? "Ergebnis anzeigen" : "Weiter"}
        </button>
      </div>
    `;
  } else {
    actionsHtml = `
      <div class="quiz-actions">
        <button class="btn btn-primary btn-block" id="check-btn">Prüfen</button>
      </div>
    `;
  }

  $app.innerHTML = `
    <div class="quiz-header">
      <button class="back-btn" id="quiz-back">&larr;</button>
      <span class="quiz-progress-label">Portion ${portion.portion} &mdash; ${idx + 1}/${total}</span>
      <div class="streak-dots">${dots}</div>
    </div>
    <div class="quiz-progress-bar"><div class="fill" style="width:${pct}%"></div></div>
    <div class="direction-toggle">
      <button class="${state.direction === "de-en" ? "active" : ""}" data-dir="de-en">DE &rarr; EN</button>
      <button class="${state.direction === "en-de" ? "active" : ""}" data-dir="en-de">EN &rarr; DE</button>
    </div>
    <div class="card quiz-card animate-pop">
      <div class="direction-label">${esc(dirLabel)}</div>
      <div class="quiz-word">${esc(prompt)}</div>
      <div class="quiz-input-group">
        <input id="quiz-input" type="text" class="${inputExtra}"
               placeholder="Deine Antwort..." autocomplete="off"
               ${state.answered ? "disabled" : "autofocus"}>
      </div>
      ${feedbackHtml}
      ${actionsHtml}
    </div>
  `;

  // Restore user's answer if already answered
  if (state.answered) {
    const last = state.answers[state.answers.length - 1];
    document.getElementById("quiz-input").value = last.userAnswer;
  }

  // Events
  document.getElementById("quiz-back").addEventListener("click", () => {
    state.screen = "portions";
    render();
  });

  document.querySelectorAll(".direction-toggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!state.answered) {
        state.direction = btn.dataset.dir;
        render();
        document.getElementById("quiz-input").focus();
      }
    });
  });

  if (!state.answered) {
    const input = document.getElementById("quiz-input");
    document.getElementById("check-btn").addEventListener("click", () => submitAnswer(input.value));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitAnswer(input.value);
    });
    // Focus the input
    setTimeout(() => input.focus(), 50);
  } else {
    document.getElementById("next-btn").addEventListener("click", nextWord);
  }
}

function submitAnswer(userInput) {
  if (state.answered) return;
  const word = state.quizWords[state.currentIndex];
  const isDeEn = state.direction === "de-en";
  const correctField = isDeEn ? word.english : word.german;
  const correct = checkUserAnswer(userInput, correctField);
  const termKey = word.english.toLowerCase();

  state.answered = true;
  state.answers.push({
    word,
    correct,
    userAnswer: userInput,
    correctAnswer: correctField
  });

  updateTermStreak(state.currentUser, state.selectedPortion, termKey, correct);
  render();
}

function nextWord() {
  state.currentIndex++;
  state.answered = false;
  if (state.currentIndex >= state.quizWords.length) {
    state.screen = "results";
  }
  render();
}

/* ── Results ──────────────────────────────────────── */
function renderResults() {
  const portion = VOCABULARY.portions[state.selectedPortion];
  const correctCount = state.answers.filter(a => a.correct).length;
  const total = state.answers.length;
  const pct = Math.round((correctCount / total) * 100);

  // Stars based on percentage
  let stars = "";
  const starCount = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
  for (let i = 0; i < 3; i++) {
    stars += i < starCount ? "\u2B50" : "\u2606";
  }

  const items = state.answers.map(a => {
    const cls = a.correct ? "correct" : "wrong";
    const icon = a.correct ? "\u2705" : "\u274C";
    const isDeEn = state.direction === "de-en";
    const shown = isDeEn ? a.word.german : a.word.english;
    const answerDisplay = a.correct
      ? esc(a.userAnswer)
      : `<s>${esc(a.userAnswer || "–")}</s> &rarr; ${esc(a.correctAnswer)}`;
    return `
      <div class="result-item ${cls}">
        <span class="result-icon">${icon}</span>
        <span class="result-word">${esc(shown)}</span>
        <span class="result-answer">${answerDisplay}</span>
      </div>
    `;
  }).join("");

  // Updated portion progress
  const { learned, total: portionTotal } = getPortionProgress(state.currentUser, state.selectedPortion);

  $app.innerHTML = `
    <div class="app-header">
      <h1>Ergebnis</h1>
      <div class="subtitle">Portion ${portion.portion} &mdash; ${portion.day}, ${portion.date}</div>
    </div>
    <div class="card results-card animate-pop">
      <div class="results-stars">${stars}</div>
      <div class="results-score">${correctCount}/${total}</div>
      <div class="results-label">${pct}% richtig</div>
      <div class="results-label" style="margin-top:8px; font-size:0.9rem; color:var(--text-light)">
        Fortschritt: ${learned}/${portionTotal} Begriffe gelernt
      </div>
      <div class="results-list">${items}</div>
      <div class="results-actions">
        <button class="btn btn-ghost" id="back-btn">Zurück</button>
        <button class="btn btn-primary" id="retry-btn">Nochmal</button>
      </div>
    </div>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    state.screen = "portions";
    render();
  });

  document.getElementById("retry-btn").addEventListener("click", () => {
    startQuiz(state.selectedPortion);
  });
}

/* ─── Utility ─────────────────────────────────────────────────── */
function esc(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ─── Init ────────────────────────────────────────────────────── */
function init() {
  // Check if there's a saved current user
  const lastUser = localStorage.getItem(STORAGE_PREFIX + "lastUser");
  if (lastUser && getUsers().includes(lastUser)) {
    state.currentUser = lastUser;
    state.screen = "portions";
  }
  render();
}

// Save current user on each render
const originalRender = render;
render = function () {
  if (state.currentUser) {
    localStorage.setItem(STORAGE_PREFIX + "lastUser", state.currentUser);
  }
  originalRender();
};

init();
