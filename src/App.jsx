import { useState, useEffect, useCallback, useRef } from "react";
import {
  Flame,
  BookOpen,
  MessageCircle,
  Volume2,
  ChevronRight,
  Sparkles,
  Coffee,
  Plane,
  Briefcase,
  Users,
  Settings as SettingsIcon,
  Wand2,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Loader2,
  Home as HomeIcon,
  Mic,
  RotateCcw,
  Lightbulb,
  Layers,
  Check,
  X as XIcon,
} from "lucide-react";

/* ============================== DATA ============================== */

const VOCAB = [
  // Beginner
  { id: "v1", level: "beginner", en: "apple", he: "תפוח", ex: "I eat an apple every morning.", exHe: "אני אוכל תפוח כל בוקר." },
  { id: "v2", level: "beginner", en: "house", he: "בית", ex: "This is my house.", exHe: "זה הבית שלי." },
  { id: "v3", level: "beginner", en: "water", he: "מים", ex: "I drink water every day.", exHe: "אני שותה מים כל יום." },
  { id: "v4", level: "beginner", en: "friend", he: "חבר / חברה", ex: "She is my best friend.", exHe: "היא החברה הכי טובה שלי." },
  { id: "v5", level: "beginner", en: "happy", he: "שמח", ex: "I feel happy today.", exHe: "אני מרגיש שמח היום." },
  { id: "v6", level: "beginner", en: "book", he: "ספר", ex: "I am reading a good book.", exHe: "אני קורא ספר טוב." },
  { id: "v7", level: "beginner", en: "morning", he: "בוקר", ex: "Good morning, everyone.", exHe: "בוקר טוב לכולם." },
  { id: "v8", level: "beginner", en: "school", he: "בית ספר", ex: "I go to school by bus.", exHe: "אני נוסע לבית הספר באוטובוס." },
  { id: "v9", level: "beginner", en: "family", he: "משפחה", ex: "My family is very important to me.", exHe: "המשפחה שלי חשובה לי מאוד." },
  { id: "v10", level: "beginner", en: "to eat", he: "לאכול", ex: "We eat dinner at seven.", exHe: "אנחנו אוכלים ארוחת ערב בשבע." },
  // Intermediate
  { id: "v11", level: "intermediate", en: "achieve", he: "להשיג", ex: "She worked hard to achieve her goals.", exHe: "היא עבדה קשה כדי להשיג את המטרות שלה." },
  { id: "v12", level: "intermediate", en: "opportunity", he: "הזדמנות", ex: "This job is a great opportunity.", exHe: "העבודה הזאת היא הזדמנות מצוינת." },
  { id: "v13", level: "intermediate", en: "improve", he: "להשתפר", ex: "I want to improve my English.", exHe: "אני רוצה לשפר את האנגלית שלי." },
  { id: "v14", level: "intermediate", en: "decision", he: "החלטה", ex: "It was a difficult decision.", exHe: "זו הייתה החלטה קשה." },
  { id: "v15", level: "intermediate", en: "experience", he: "חוויה / ניסיון", ex: "That was an amazing experience.", exHe: "זו הייתה חוויה מדהימה." },
  { id: "v16", level: "intermediate", en: "responsible", he: "אחראי", ex: "He is responsible for the project.", exHe: "הוא אחראי על הפרויקט." },
  { id: "v17", level: "intermediate", en: "environment", he: "סביבה", ex: "We must protect the environment.", exHe: "עלינו להגן על הסביבה." },
  { id: "v18", level: "intermediate", en: "confident", he: "בטוח בעצמו", ex: "She feels confident before the exam.", exHe: "היא מרגישה בטוחה בעצמה לפני המבחן." },
  { id: "v19", level: "intermediate", en: "relationship", he: "מערכת יחסים", ex: "They have a strong relationship.", exHe: "יש להם מערכת יחסים חזקה." },
  { id: "v20", level: "intermediate", en: "imagine", he: "לדמיין", ex: "Can you imagine living there?", exHe: "אתה יכול לדמיין לגור שם?" },
  // Advanced
  { id: "v21", level: "advanced", en: "ambiguous", he: "דו-משמעי", ex: "The instructions were ambiguous.", exHe: "ההוראות היו דו-משמעיות." },
  { id: "v22", level: "advanced", en: "meticulous", he: "קפדני", ex: "He is meticulous about details.", exHe: "הוא קפדן לגבי פרטים." },
  { id: "v23", level: "advanced", en: "resilience", he: "חוסן", ex: "Her resilience helped her overcome challenges.", exHe: "החוסן שלה עזר לה להתגבר על אתגרים." },
  { id: "v24", level: "advanced", en: "inevitable", he: "בלתי נמנע", ex: "Change is inevitable.", exHe: "שינוי הוא בלתי נמנע." },
  { id: "v25", level: "advanced", en: "skeptical", he: "ספקן", ex: "I'm skeptical about that claim.", exHe: "אני ספקן לגבי הטענה הזו." },
  { id: "v26", level: "advanced", en: "profound", he: "עמוק / משמעותי", ex: "It had a profound effect on me.", exHe: "זה השפיע עליי בצורה עמוקה." },
  { id: "v27", level: "advanced", en: "versatile", he: "רב-תכליתי", ex: "She is a versatile actress.", exHe: "היא שחקנית רב-תכליתית." },
  { id: "v28", level: "advanced", en: "elaborate", he: "מפורט", ex: "He gave an elaborate explanation.", exHe: "הוא נתן הסבר מפורט." },
  { id: "v29", level: "advanced", en: "subtle", he: "עדין / דק", ex: "There was a subtle difference between them.", exHe: "היה הבדל עדין ביניהם." },
  { id: "v30", level: "advanced", en: "candid", he: "כן וגלוי לב", ex: "He gave a candid answer.", exHe: "הוא נתן תשובה כנה." },
];

const DIALOGUES = [
  {
    id: "d1",
    title: "בבית קפה",
    level: "beginner",
    Icon: Coffee,
    lines: [
      { s: "A", en: "Hi! Welcome. What can I get you?", he: "היי! ברוכים הבאים. מה אפשר להביא לך?" },
      { s: "B", en: "Hi, I'd like a large coffee, please.", he: "היי, אני רוצה קפה גדול בבקשה." },
      { s: "A", en: "Sure. Anything else?", he: "בטח. עוד משהו?" },
      { s: "B", en: "Yes, a chocolate croissant too.", he: "כן, גם קרואסון שוקולד." },
      { s: "A", en: "Great choice. For here or to go?", he: "בחירה מעולה. לשבת כאן או לקחת?" },
      { s: "B", en: "To go, please.", he: "לקחת, בבקשה." },
      { s: "A", en: "That'll be six dollars.", he: "זה יהיה שש דולר." },
      { s: "B", en: "Here you go. Thank you!", he: "הנה. תודה!" },
    ],
  },
  {
    id: "d2",
    title: "בשדה התעופה",
    level: "beginner",
    Icon: Plane,
    lines: [
      { s: "A", en: "Good morning. Can I see your passport and ticket?", he: "בוקר טוב. אפשר לראות דרכון וכרטיס?" },
      { s: "B", en: "Sure, here they are.", he: "בטח, הנה." },
      { s: "A", en: "Do you have any luggage to check in?", he: "יש לך מזוודות להטבעה?" },
      { s: "B", en: "Yes, just one bag.", he: "כן, רק תיק אחד." },
      { s: "A", en: "Okay, please put it on the scale.", he: "בסדר, שים אותו על המשקל בבקשה." },
      { s: "B", en: "Is my flight on time?", he: "הטיסה שלי בזמן?" },
      { s: "A", en: "Yes, it's boarding at gate twelve.", he: "כן, עולים למטוס בשער שתים עשרה." },
      { s: "B", en: "Perfect, thank you for your help.", he: "מושלם, תודה על העזרה." },
    ],
  },
  {
    id: "d3",
    title: "ראיון עבודה",
    level: "intermediate",
    Icon: Briefcase,
    lines: [
      { s: "A", en: "Thanks for coming in today. Tell me about yourself.", he: "תודה שבאת היום. ספר לי על עצמך." },
      { s: "B", en: "Sure. I have three years of experience in marketing.", he: "בטח. יש לי שלוש שנות ניסיון בשיווק." },
      { s: "A", en: "What made you apply for this position?", he: "מה גרם לך להגיש מועמדות לתפקיד הזה?" },
      { s: "B", en: "I'm looking for a new challenge and a chance to grow.", he: "אני מחפש אתגר חדש והזדמנות להתפתח." },
      { s: "A", en: "What's your biggest strength?", he: "מה החוזק הכי גדול שלך?" },
      { s: "B", en: "I'm very organized and I work well under pressure.", he: "אני מאוד מאורגן ועובד טוב תחת לחץ." },
      { s: "A", en: "Great. Do you have any questions for us?", he: "מעולה. יש לך שאלות אלינו?" },
      { s: "B", en: "Yes, what does a typical day look like here?", he: "כן, איך נראה יום עבודה טיפוסי כאן?" },
    ],
  },
  {
    id: "d4",
    title: "פגישת עבודה",
    level: "advanced",
    Icon: Users,
    lines: [
      { s: "A", en: "Let's get started. Can everyone see the presentation?", he: "בואו נתחיל. כולם רואים את המצגת?" },
      { s: "B", en: "Yes, it's clear. Please go ahead.", he: "כן, ברור. בבקשה תמשיך." },
      { s: "A", en: "Our revenue increased by fifteen percent this quarter.", he: "ההכנסות שלנו גדלו בחמישה עשר אחוז ברבעון הזה." },
      { s: "B", en: "That's impressive. What drove the growth?", he: "מרשים. מה הניע את הצמיחה?" },
      { s: "A", en: "Mainly our new product line and expanded marketing.", he: "בעיקר קו המוצרים החדש והשיווק המורחב." },
      { s: "B", en: "Do we have projections for next quarter?", he: "יש לנו תחזיות לרבעון הבא?" },
      { s: "A", en: "Yes, we expect similar growth if trends continue.", he: "כן, אנחנו מצפים לצמיחה דומה אם המגמות יימשכו." },
      { s: "B", en: "Sounds promising. Let's discuss the budget next.", he: "נשמע מבטיח. בואו נדבר על התקציב." },
    ],
  },
];

const LEVELS = [
  { id: "beginner", label: "מתחילים" },
  { id: "intermediate", label: "בינוני" },
  { id: "advanced", label: "מתקדם" },
];
const LEVEL_ORDER = ["beginner", "intermediate", "advanced"];

const LANGUAGES = [
  { id: "en", label: "אנגלית", nativeName: "English", speechLang: "en-US", hasLocalContent: true },
  { id: "es", label: "ספרדית", nativeName: "Español", speechLang: "es-ES", hasLocalContent: false },
  { id: "fr", label: "צרפתית", nativeName: "Français", speechLang: "fr-FR", hasLocalContent: false },
  { id: "it", label: "איטלקית", nativeName: "Italiano", speechLang: "it-IT", hasLocalContent: false },
  { id: "cs", label: "צ'כית", nativeName: "Čeština", speechLang: "cs-CZ", hasLocalContent: false },
];

function languageInfo(id) {
  return LANGUAGES.find((l) => l.id === id) || LANGUAGES[0];
}

const TOPICS = [
  "מסעדה", "קניות בחנות בגדים", "בבנק", "אצל הרופא", "תחבורה ציבורית",
  "בבית מלון", "תחביבים", "מזג אוויר", "טכנולוגיה", "תכנון חופשה",
];

const GEMINI_MODEL = "gemini-flash-lite-latest";

/* ============================== CHUNK HELPERS (pure logic) ============================== */

// Pure helpers for the "chunks" feature (phrases learned as whole units).
// Deliberately free of React / DOM code so they can be tested directly in Node.

const BOX_INTERVALS = [0, 1, 3, 7, 14, 30]; // days, index = box
const MAX_BOX = BOX_INTERVALS.length - 1;
const BANK_LIMIT = 400;

/* ---------- dates (always LOCAL calendar days) ---------- */

const pad2 = (n) => String(n).padStart(2, "0");

function dateKey(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

const todayStr = () => dateKey(new Date());

// Built from local y/m/d parts on purpose. Going through toISOString() shifts the
// result by a day for anyone east of UTC (e.g. Israel), which breaks streaks and due dates.
function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return dateKey(new Date(y, m - 1, d + days));
}

/* ---------- text matching ---------- */

function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[n];
}

// Lowercase, drop diacritics and punctuation, split into words.
// Dropping diacritics keeps matching forgiving for learners (e.g. Czech, French, Spanish).
function normTokens(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[\u2018\u2019`\u00b4]/g, "'")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^'+|'+$/g, ""))
    .filter(Boolean);
}

function tokenEq(x, y) {
  return x === y || (x.length >= 5 && y.length >= 5 && levenshtein(x, y) <= 1);
}

function lcsLen(a, b) {
  let prev = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    const cur = new Array(b.length + 1).fill(0);
    for (let j = 1; j <= b.length; j++) {
      cur[j] = tokenEq(a[i - 1], b[j - 1]) ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    }
    prev = cur;
  }
  return prev[b.length];
}

// 0..1 - how much of the chunk appears, in order and nearly contiguous, inside what was said.
function chunkMatch(chunkText, spokenText) {
  const a = normTokens(chunkText);
  const b = normTokens(spokenText);
  if (!a.length || !b.length) return 0;
  let best = 0;
  const maxLen = Math.min(b.length, a.length + 2);
  for (let len = Math.min(a.length, b.length); len <= maxLen; len++) {
    for (let i = 0; i + len <= b.length; i++) {
      const r = lcsLen(a, b.slice(i, i + len)) / a.length;
      if (r > best) best = r;
      if (best >= 1) return 1;
    }
  }
  return best;
}

/* ---------- spaced repetition ---------- */

function retrievalUpdate(chunk, known, today) {
  const box = known ? Math.min((chunk.box || 0) + 1, MAX_BOX) : 1;
  return {
    ...chunk,
    box,
    due: known ? addDays(today, BOX_INTERVALS[box]) : today,
    stage: Math.max(chunk.stage || 0, known ? 2 : 1),
    reviews: (chunk.reviews || 0) + 1,
    lapses: (chunk.lapses || 0) + (known ? 0 : 1),
    lastReviewed: today,
  };
}

function usageUpdate(chunk, score, today) {
  if (score == null) return chunk;
  const next = { ...chunk, usage: score };
  if (score >= 1) next.stage = Math.max(chunk.stage || 0, 3);
  if (score === 0) {
    const tomorrow = addDays(today, 1);
    if (!next.due || next.due > tomorrow) next.due = tomorrow;
  }
  return next;
}

// Using a learned chunk naturally in a free conversation counts as a successful recall,
// but only moves the schedule when the chunk was actually due (no inflating by repetition).
function naturalUseUpdate(chunk, today) {
  const next = { ...chunk, usedInSpeech: (chunk.usedInSpeech || 0) + 1 };
  if (!chunk.due || chunk.due <= today) {
    const box = Math.min((chunk.box || 0) + 1, MAX_BOX);
    next.box = box;
    next.due = addDays(today, BOX_INTERVALS[box]);
  }
  return next;
}

/* ---------- the chunk bank ---------- */

function pruneBank(bank, limit = BANK_LIMIT) {
  const ids = Object.keys(bank);
  if (ids.length <= limit) return bank;
  const ordered = ids
    .map((id) => bank[id])
    .sort((a, b) => (b.box || 0) - (a.box || 0) || String(a.added || "").localeCompare(String(b.added || "")));
  const drop = new Set(ordered.slice(0, ids.length - limit).map((c) => c.id));
  const out = {};
  ids.forEach((id) => {
    if (!drop.has(id)) out[id] = bank[id];
  });
  return out;
}

function dueChunks(bank, today) {
  return Object.values(bank || {})
    .filter((c) => (c.stage || 0) >= 1 && (c.due || today) <= today)
    .sort((a, b) => String(a.due).localeCompare(String(b.due)) || (a.box || 0) - (b.box || 0));
}

function chunkStatus(c) {
  if ((c.stage || 0) < 2) return { key: "new", label: "חדש" };
  if ((c.box || 0) >= 4) return { key: "mastered", label: "שולט" };
  return { key: "learning", label: "בלמידה" };
}

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// A few chunks the speaking partner should try to invite: due ones first, then the weakest.
function pickChunkHints(bank, today, count = 5) {
  const pool = Object.values(bank || {})
    .filter((c) => (c.stage || 0) >= 2)
    .sort((a, b) => String(a.due || today).localeCompare(String(b.due || today)) || (a.box || 0) - (b.box || 0))
    .slice(0, count * 2);
  return shuffled(pool).slice(0, count);
}

// Which learned chunks appear, in full, in something the learner just said.
function detectUsedChunks(bank, text) {
  if (normTokens(text).length < 2) return [];
  return Object.values(bank || {}).filter(
    (c) => (c.stage || 0) >= 2 && normTokens(c.text).length >= 2 && chunkMatch(c.text, text) >= 1
  );
}

function sanitizeChunkText(s) {
  return String(s || "").replace(/\.{2,}|…/g, " ").replace(/\s+/g, " ").trim();
}

/* ============================== HELPERS ============================== */

const isDue = (dueStr) => dueStr <= todayStr();

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "לילה טוב";
  if (h < 12) return "בוקר טוב";
  if (h < 18) return "צהריים טובים";
  return "ערב טוב";
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let cachedVoices = [];
function refreshVoiceCache() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const list = window.speechSynthesis.getVoices();
  if (list && list.length) cachedVoices = list;
}
if (typeof window !== "undefined" && window.speechSynthesis) {
  refreshVoiceCache();
  window.speechSynthesis.onvoiceschanged = refreshVoiceCache;
}

function pickVoice(lang) {
  const norm = (s) => (s || "").toLowerCase().replace("_", "-");
  const target = norm(lang);
  const base = target.split("-")[0];
  const voices = cachedVoices.length ? cachedVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
  return (
    voices.find((v) => norm(v.lang) === target) ||
    voices.find((v) => norm(v.lang).split("-")[0] === base) ||
    null
  );
}

function speak(text, lang = "en-US") {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.92;
    const voice = pickVoice(lang);
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  } catch (e) {
    /* speech synthesis unavailable */
  }
}

function levelLabel(id) {
  return LEVELS.find((l) => l.id === id)?.label || "כל הרמות";
}

function defaultLangData() {
  return {
    level: "all",
    levelStats: { beginner: { good: 0, bad: 0 }, intermediate: { good: 0, bad: 0 }, advanced: { good: 0, bad: 0 } },
    words: {}, // id -> { box, due } - only meaningful for languages with a local word bank (English)
    convosDone: {}, // id -> true
    aiSeenWords: [], // words already generated by AI for this language, to avoid repeats
    speakingMemory: { mistakeTags: [] }, // rolling log of recurring grammar/word-choice issue tags
    chunkBlocked: [], // texts of chunks the learner deleted, so the AI does not offer them again
    chunks: {}, // id -> { id, text, he, ex, exHe, slot, topic, box, due, stage, ... } (phrases learned as whole units)
  };
}

function defaultState() {
  return {
    onboarded: false,
    settings: { apiKey: "", language: "en" },
    stats: { streak: 0, lastActiveDate: null, xp: 0, sessionsCompleted: 0 },
    langData: { en: defaultLangData() },
  };
}

function migrateState(parsed) {
  if (!parsed || typeof parsed !== "object") return defaultState();
  if (parsed.langData) {
    // already the current shape - merge with defaults defensively in case new fields were added later
    return {
      ...defaultState(),
      ...parsed,
      settings: { ...defaultState().settings, ...parsed.settings },
      stats: { ...defaultState().stats, ...parsed.stats },
      langData: Object.fromEntries(
        Object.entries({ en: defaultLangData(), ...parsed.langData }).map(([k, v]) => [
          k,
          { ...defaultLangData(), ...(v || {}) },
        ])
      ),
    };
  }
  // old single-language (English-only) shape - migrate it into langData.en so existing progress isn't lost
  const enData = {
    ...defaultLangData(),
    level: parsed.settings?.level || "all",
    levelStats: parsed.stats?.levelStats || defaultLangData().levelStats,
    words: parsed.words || {},
    convosDone: parsed.convosDone || {},
    aiSeenWords: parsed.aiSeenWords || [],
    speakingMemory: parsed.speakingMemory || { mistakeTags: [] },
  };
  return {
    onboarded: !!parsed.onboarded,
    settings: { apiKey: parsed.settings?.apiKey || "", language: "en" },
    stats: {
      streak: parsed.stats?.streak || 0,
      lastActiveDate: parsed.stats?.lastActiveDate || null,
      xp: parsed.stats?.xp || 0,
      sessionsCompleted: parsed.stats?.sessionsCompleted || 0,
    },
    langData: { en: enData },
  };
}

function summarizeFocusAreas(mistakeTags) {
  if (!mistakeTags || mistakeTags.length === 0) return "";
  const recent = mistakeTags.slice(-20);
  const counts = {};
  recent.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
  const sorted = Object.entries(counts)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
  return sorted.slice(0, 3).join(", ");
}

function touchStreak(stats) {
  const today = todayStr();
  if (stats.lastActiveDate === today) return stats;
  const yesterday = addDays(today, -1);
  const streak = stats.lastActiveDate === yesterday ? stats.streak + 1 : 1;
  return { ...stats, streak, lastActiveDate: today };
}

function updateLevelStats(langData, level, accuracy) {
  if (!LEVEL_ORDER.includes(level)) return { langData, suggestion: null };
  const levelStats = { ...langData.levelStats };
  const cur = { ...(levelStats[level] || { good: 0, bad: 0 }) };
  if (accuracy >= 0.8) {
    cur.good += 1;
    cur.bad = 0;
  } else if (accuracy <= 0.4) {
    cur.bad += 1;
    cur.good = 0;
  } else {
    cur.good = 0;
    cur.bad = 0;
  }
  let suggestion = null;
  const idx = LEVEL_ORDER.indexOf(level);
  if (cur.good >= 3 && idx < LEVEL_ORDER.length - 1) {
    suggestion = { type: "up", from: level, to: LEVEL_ORDER[idx + 1] };
    cur.good = 0;
  } else if (cur.bad >= 3 && idx > 0) {
    suggestion = { type: "down", from: level, to: LEVEL_ORDER[idx - 1] };
    cur.bad = 0;
  }
  levelStats[level] = cur;
  return { langData: { ...langData, levelStats }, suggestion };
}

/* ============================== STORAGE ============================== */

async function loadState() {
  try {
    const raw = localStorage.getItem("app-state");
    if (raw) return migrateState(JSON.parse(raw));
  } catch (e) {
    /* no saved state yet */
  }
  return null;
}

async function saveState(state) {
  try {
    localStorage.setItem("app-state", JSON.stringify(state));
  } catch (e) {
    console.error("Could not save progress", e);
  }
}

/* ============================== BACKUP ============================== */

const BACKUP_META_KEY = "app-backup-meta";

function readBackupMeta() {
  try {
    return JSON.parse(localStorage.getItem(BACKUP_META_KEY) || "null") || {};
  } catch (e) {
    return {};
  }
}

function markBackup() {
  try {
    localStorage.setItem(BACKUP_META_KEY, JSON.stringify({ last: todayStr() }));
  } catch (e) { /* noop */ }
}

function daysSinceBackup() {
  const last = readBackupMeta().last;
  if (!last) return null;
  const [y, m, d] = last.split("-").map(Number);
  const [ty, tm, td] = todayStr().split("-").map(Number);
  return Math.round((new Date(ty, tm - 1, td) - new Date(y, m - 1, d)) / 86400000);
}

// the API key is deliberately left out of backups, so a shared backup file never leaks it
function buildBackup(state) {
  const safe = { ...state, settings: { ...state.settings, apiKey: "" } };
  return JSON.stringify({ app: "speakup", version: 1, exportedAt: new Date().toISOString(), state: safe }, null, 1);
}

function parseBackup(text) {
  const obj = JSON.parse(text);
  if (!obj || obj.app !== "speakup" || !obj.state || !obj.state.langData) throw new Error("זה לא קובץ גיבוי של SpeakUp");
  return migrateState(obj.state);
}

function downloadFile(name, text, mime = "application/json") {
  const blob = new Blob([text], { type: mime + ";charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function backupFileName() {
  return `speakup-backup-${todayStr()}.json`;
}

function csvCell(v) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

function chunksToCsv(bank) {
  const rows = [["צירוף", "תרגום", "משפט דוגמה", "תרגום המשפט", "נושא", "מצב"]];
  Object.values(bank || {}).forEach((c) => rows.push([c.text, c.he, c.ex, c.exHe, c.topic, chunkStatus(c).label]));
  return "﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}

// --- optional silent auto-backup into a file the user picked once (desktop Chrome/Edge only) ---
function idbOpen() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open("speakup-backup", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("kv");
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
async function idbGet(key) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const q = db.transaction("kv").objectStore("kv").get(key);
    q.onsuccess = () => resolve(q.result);
    q.onerror = () => reject(q.error);
  });
}
async function idbSet(key, val) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("kv", "readwrite");
    if (val === undefined) tx.objectStore("kv").delete(key);
    else tx.objectStore("kv").put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

const canAutoFileBackup = () => typeof window !== "undefined" && !!window.showSaveFilePicker && !!window.indexedDB;

async function connectBackupFile(state) {
  const handle = await window.showSaveFilePicker({
    suggestedName: "speakup-backup.json",
    types: [{ description: "SpeakUp backup", accept: { "application/json": [".json"] } }],
  });
  await idbSet("fileHandle", handle);
  await writeBackupFile(state);
  return handle.name;
}

async function disconnectBackupFile() {
  await idbSet("fileHandle", undefined);
}

async function connectedBackupName() {
  try {
    if (!canAutoFileBackup()) return null;
    const h = await idbGet("fileHandle");
    return h ? h.name : null;
  } catch (e) {
    return null;
  }
}

async function writeBackupFile(state) {
  try {
    if (!canAutoFileBackup()) return "unsupported";
    const h = await idbGet("fileHandle");
    if (!h) return "none";
    let perm = await h.queryPermission({ mode: "readwrite" });
    if (perm !== "granted") perm = await h.requestPermission({ mode: "readwrite" });
    if (perm !== "granted") return "denied";
    const w = await h.createWritable();
    await w.write(buildBackup(state));
    await w.close();
    markBackup();
    return "ok";
  } catch (e) {
    return "error";
  }
}

/* ============================== GEMINI AI ============================== */

async function callGemini(apiKey, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.9 },
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`שגיאת שרת (${res.status}): ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
  if (!text) throw new Error("לא התקבלה תשובה מהמודל.");
  return JSON.parse(text);
}

async function generateAIWords(apiKey, lang, level, excludeWords) {
  const langInfo = languageInfo(lang);
  const prompt = `אתה עוזר ליצירת תוכן לימודי לאפליקציית לימוד שפות לדוברי עברית. שפת היעד הנלמדת היא ${langInfo.label} (${langInfo.nativeName}).
צור מערך JSON של בדיוק 8 מילים או ביטויים ב${langInfo.label} ברמת קושי "${levelLabel(level)}", מתאימים ללומד ישראלי מבוגר.
אל תשתמש במילים הבאות (כבר נלמדו): ${excludeWords.length ? excludeWords.join(", ") : "אין"}.
כל איבר במערך חייב להיות אובייקט עם השדות בדיוק האלה: "en" (המילה או הביטוי ב${langInfo.label}, בשפת היעד עצמה - השם en הוא רק שם השדה הטכני), "he" (תרגום מדויק לעברית), "ex" (משפט דוגמה קצר וטבעי ב${langInfo.label} המשתמש במילה), "exHe" (תרגום טבעי של המשפט לעברית).
החזר אך ורק JSON תקין - מערך של 8 אובייקטים - בלי שום טקסט נוסף, בלי הסברים.`;
  const arr = await callGemini(apiKey, prompt);
  if (!Array.isArray(arr) || arr.length === 0) throw new Error("פורמט תשובה לא תקין");
  return arr
    .filter((w) => w && w.en && w.he)
    .slice(0, 8)
    .map((w, i) => ({
      id: `ai-${Date.now()}-${i}`,
      level,
      en: String(w.en),
      he: String(w.he),
      ex: String(w.ex || ""),
      exHe: String(w.exHe || ""),
    }));
}

async function generateAIDialogue(apiKey, lang, level, topic) {
  const langInfo = languageInfo(lang);
  const prompt = `אתה עוזר ליצירת תוכן לימודי לאפליקציית לימוד שפות לדוברי עברית. שפת היעד הנלמדת היא ${langInfo.label} (${langInfo.nativeName}).
צור דיאלוג קצר ב${langInfo.label} ללימוד שפה, ברמת קושי "${levelLabel(level)}", בנושא "${topic}", בין שני דוברים A ו-B.
החזר אובייקט JSON בפורמט הבא בדיוק: {"title": "כותרת קצרה בעברית לתרגיל", "lines": [{"s":"A","en":"...","he":"..."}, {"s":"B","en":"...","he":"..."}]} - שים לב: השדה "en" בכל שורה צריך להכיל טקסט ב${langInfo.label}, לא באנגלית (אלא אם שפת היעד היא אכן אנגלית).
כלול 6 עד 8 שורות דיאלוג טבעי, קולח ורלוונטי לנושא. תרגם כל שורה לעברית בצורה מדויקת וטבעית.
החזר אך ורק JSON תקין, בלי שום טקסט נוסף.`;
  const obj = await callGemini(apiKey, prompt);
  if (!obj || !Array.isArray(obj.lines) || obj.lines.length === 0) throw new Error("פורמט תשובה לא תקין");
  return {
    id: `ai-${Date.now()}`,
    title: String(obj.title || topic),
    level,
    isAI: true,
    Icon: Wand2,
    lines: obj.lines.map((l) => ({ s: l.s === "B" ? "B" : "A", en: String(l.en || ""), he: String(l.he || "") })),
  };
}

async function generateAIChunks(apiKey, lang, level, topic, excludeTexts) {
  const langInfo = languageInfo(lang);
  const prompt = `אתה עוזר ליצירת תוכן לימודי לאפליקציית לימוד שפות לדוברי עברית. שפת היעד היא ${langInfo.label} (${langInfo.nativeName}).
המטרה: ללמד "צ'אנקים" - צירופי מילים קבועים ושימושיים שדוברים אמיתיים אומרים כיחידה אחת, כדי שהלומד ישלוף אותם בשטף בשיחה (למשל "I'd like to ...", "How long does it take to ...", "I'm thinking about ...").
צור בדיוק 7 צ'אנקים ב${langInfo.label} ברמת "${levelLabel(level)}", סביב הנושא "${topic}". הצ'אנקים צריכים להיות קשורים זה לזה ולהתאים לשיחה אמיתית בנושא, באורך 2 עד 6 מילים כל אחד, ולא מילים בודדות.
חשוב מאוד: בחר רק צירופים נפוצים וטבעיים שדוברים ילידים באמת אומרים בשיחה יומיומית (כאלה שהיית מצפה לשמוע שוב ושוב). אל תמציא צירופים, אל תשתמש בצירופים נדירים, ספרותיים, טכניים מאוד או יצירתיים מדי, ואל תבחר שילובי מילים שנשמעים לא טבעיים או שקשה לזהות כשהם נאמרים בקול. העדף ניסוחים שגרתיים וקצרים.
אל תשתמש בצ'אנקים האלה (כבר נלמדו): ${excludeTexts.length ? excludeTexts.slice(-40).join(" | ") : "אין"}.
כל איבר במערך הוא אובייקט עם השדות בדיוק האלה: "text" (הצ'אנק ב${langInfo.label}, בלי שלוש נקודות), "he" (תרגום טבעי לעברית), "ex" (משפט דוגמה טבעי ב${langInfo.label} שמשתמש בצ'אנק במלואו כמו שהוא), "exHe" (תרגום המשפט לעברית), "slot" (תיאור קצר בעברית של מה אפשר להחליף בצ'אנק, למשל "אפשר להחליף את הפועל", או מחרוזת ריקה אם אין).
החזר אך ורק JSON תקין - מערך של 7 אובייקטים - בלי טקסט נוסף.`;
  const arr = await callGemini(apiKey, prompt);
  if (!Array.isArray(arr) || arr.length === 0) throw new Error("פורמט תשובה לא תקין");
  const stamp = Date.now();
  return arr
    .filter((c) => c && c.text && c.he)
    .slice(0, 8)
    .map((c, i) => ({
      id: `ch-${stamp}-${i}`,
      text: sanitizeChunkText(c.text),
      he: String(c.he),
      ex: String(c.ex || ""),
      exHe: String(c.exHe || ""),
      slot: String(c.slot || ""),
      topic,
      level,
    }))
    .filter((c) => c.text);
}

async function evaluateChunkUsage(apiKey, lang, level, chunk, sentence) {
  const langInfo = languageInfo(lang);
  const prompt = `אתה מורה סבלני ל${langInfo.label} (${langInfo.nativeName}) ללומד ישראלי ברמת "${levelLabel(level)}".
התלמיד למד את הצ'אנק: "${chunk.text}" (${chunk.he}) ונתבקש לבנות משפט משלו שמשתמש בו.
המשפט של התלמיד (ייתכן שהוקלד או תומלל מדיבור, אז התעלם משגיאות איות/פיסוק קלות): "${sentence}"
החזר אובייקט JSON בפורמט הבא בדיוק:
{"usedChunk": true אם הצ'אנק מופיע במשפט בצורה סבירה (גם עם שינוי קל בזמן/גוף) אחרת false, "score": 2 אם המשפט נכון וטבעי, 1 אם המסר ברור אך יש טעות או ניסוח לא טבעי, 0 אם הצ'אנק לא נעשה בו שימוש נכון, "correction": "גרסה טבעית ומתוקנת ב${langInfo.label} של המשפט, או null אם אין צורך", "feedbackHe": "משפט אחד קצר, חם ומעודד בעברית עם התיקון או החיזוק", "alt": "משפט דוגמה נוסף ב${langInfo.label} עם אותו צ'אנק, בנושא אחר"}
החזר אך ורק JSON תקין, בלי טקסט נוסף.`;
  const obj = await callGemini(apiKey, prompt);
  if (!obj || typeof obj !== "object") throw new Error("פורמט תשובה לא תקין");
  let score = Number(obj.score);
  if (![0, 1, 2].includes(score)) score = obj.usedChunk ? 1 : 0;
  if (obj.usedChunk === false) score = 0;
  return {
    score,
    correction: obj.correction ? String(obj.correction) : null,
    feedbackHe: String(obj.feedbackHe || ""),
    alt: obj.alt ? String(obj.alt) : "",
  };
}

async function generateSpeakingTurn(apiKey, lang, level, topic, history, recentFocus, chunkTexts = []) {
  const langInfo = languageInfo(lang);
  const levelHe = levelLabel(level);
  const isOpening = history.length === 0;
  const historyText = history.map((h) => `${h.role === "ai" ? "AI" : "תלמיד"}: ${h.text}`).join("\n");
  const focusNote = recentFocus
    ? `\nמידע רקע (לשימושך בלבד, אל תזכיר את זה במפורש לתלמיד): לאחרונה התלמיד נטה לטעות בעיקר בתחומים הבאים: ${recentFocus}. אם רלוונטי לשיחה, אפשר לתת לו הזדמנות עדינה לתרגל את זה, אבל בלי להעמיס - ואם הוא כבר לא טועה בזה, אל תחזור על ההערה שוב ושוב.\n`
    : "";
  const chunkNote = chunkTexts.length
    ? `\nהתלמיד למד לאחרונה את הצ'אנקים האלה (צירופי מילים): ${chunkTexts.map((t) => `"${t}"`).join(", ")}. נסח את השאלה/התגובה שלך כך שתזמין אותו באופן טבעי להשתמש באחד או שניים מהם בתשובתו (בלי לציין זאת במפורש). אל תכריח - רק אם זה מתאים לשיחה.\n`
    : "";
  const hintSpec = `2-3 צ'אנקים שימושיים (צירופי מילים קצרים של 2-5 מילים, לא מילים בודדות) ב${langInfo.label} שהתלמיד יכול להשתמש בהם כדי לענות, ואם אפשר העדף את הצ'אנקים שלמד`;
  const prompt = isOpening
    ? `אתה שותף שיחה סבלני וממריץ לתרגול ${langInfo.label} (${langInfo.nativeName}) מדוברת, עבור לומד ישראלי ברמת "${levelHe}"${topic ? ` בנושא "${topic}"` : ""}.${focusNote}${chunkNote}
פתח בשאלה קצרה, טבעית וידידותית ב${langInfo.label} שתתחיל שיחה קצרה בנושא הזה.
החזר אובייקט JSON בפורמט הבא בדיוק (השדה reply חייב להיות ב${langInfo.label}, לא בעברית ולא באנגלית אלא אם שפת היעד היא אנגלית):
{"reply": "המשפט/שאלה הפותחת שלך ב${langInfo.label}, קצרה וטבעית", "replyHe": "תרגום לעברית של reply", "correction": null, "feedbackHe": null, "mistakeTag": null, "hint": ["${hintSpec}"]}
החזר אך ורק JSON תקין, בלי שום טקסט נוסף.`
    : `אתה שותף שיחה סבלני וממריץ לתרגול ${langInfo.label} (${langInfo.nativeName}) מדוברת, עבור לומד ישראלי ברמת "${levelHe}"${topic ? ` בנושא "${topic}"` : ""}.${focusNote}${chunkNote}
זהו המשך שיחה. הנה תמלול השיחה עד כה (תמלול המשפטים של התלמיד נעשה מזיהוי דיבור אוטומטי, ולכן ייתכנו שגיאות תעתיק קלות - התייחס בעיקר לדקדוק, מבנה משפט ובחירת מילים, ולא לשגיאות איות שנובעות מתעתיק):
${historyText}

הגב באופן טבעי וקצר להמשך השיחה ב${langInfo.label} (כמו שותף שיחה אמיתי, לא כמורה), ובנוסף תקן בעדינות את המשפט האחרון של התלמיד רק אם יש בו טעות דקדוק או מבנה משמעותית.
החזר אובייקט JSON בפורמט הבא בדיוק (reply ו-correction חייבים להיות ב${langInfo.label}):
{"reply": "התגובה או השאלה הבאה שלך ב${langInfo.label}, קצרה וטבעית", "replyHe": "תרגום לעברית של reply", "correction": "גרסה מתוקנת ומשופרת ב${langInfo.label} של משפט התלמיד האחרון - רק אם היו טעויות משמעותיות, אחרת null", "feedbackHe": "משפט עידוד קצר וממוקד בעברית שמסביר בעדינות את התיקון - רק אם יש correction, אחרת null", "mistakeTag": "תיוג קצר מאוד (2-3 מילים בעברית) של סוג הטעות, למשל 'זמן עבר', 'מילות יחס', 'סדר מילים' - רק אם יש correction, אחרת null", "hint": ["${hintSpec}"]}
היה חם, סבלני ומעודד. התמקד במסירת המסר ולא בשלמות לשונית - אם התלמיד הצליח להעביר את הכוונה בבירור, ציין זאת בחיוב גם אם המשפט לא מושלם לחלוטין.
החזר אך ורק JSON תקין, בלי שום טקסט נוסף.`;
  const obj = await callGemini(apiKey, prompt);
  if (!obj || !obj.reply) throw new Error("פורמט תשובה לא תקין");
  return {
    reply: String(obj.reply),
    replyHe: String(obj.replyHe || ""),
    correction: obj.correction ? String(obj.correction) : null,
    feedbackHe: obj.feedbackHe ? String(obj.feedbackHe) : null,
    mistakeTag: obj.mistakeTag ? String(obj.mistakeTag) : null,
    hint: Array.isArray(obj.hint) ? obj.hint.slice(0, 3).map(String) : [],
  };
}

function getSpeechRecognition() {
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  return SR ? new SR() : null;
}



function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');

      :root {
        --ink: #1C2541;
        --paper: #FAF6EF;
        --card: #FFFFFF;
        --sage: #4F7965;
        --sage-light: #E1EAE4;
        --gold: #D9A441;
        --gold-light: #F6E7C8;
        --rose: #C1554A;
        --rose-light: #F5DEDB;
        --mist: #E4DCC8;
        --muted: #7B7566;
      }

      .ela-root {
        direction: rtl;
        font-family: 'Heebo', sans-serif;
        background: var(--paper);
        color: var(--ink);
        min-height: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .ela-root * { box-sizing: border-box; }
      .ela-en {
        direction: ltr;
        font-family: 'Fraunces', serif;
        unicode-bidi: isolate;
      }
      .ela-shell {
        display: flex;
        flex: 1;
        max-width: 920px;
        width: 100%;
        margin: 0 auto;
      }
      .ela-nav-desktop { display: none; }
      .ela-main {
        flex: 1;
        padding: 20px 18px 240px 18px;
        min-width: 0;
      }
      @media (min-width: 760px) {
        .ela-nav-desktop {
          display: flex;
          flex-direction: column;
          width: 220px;
          padding: 28px 16px;
          gap: 6px;
          border-left: 1px solid var(--mist);
        }
        .ela-main { padding: 32px 36px 40px 36px; }
        .ela-nav-mobile { display: none !important; }
      }
      .ela-navbtn {
        display: flex; align-items: center; gap: 10px;
        padding: 11px 14px; border-radius: 10px;
        font-size: 15px; font-weight: 500; color: var(--muted);
        cursor: pointer; border: none; background: transparent;
        text-align: right; font-family: 'Heebo', sans-serif;
      }
      .ela-navbtn.active { background: var(--sage-light); color: var(--sage); font-weight: 700; }
      .ela-navbtn:hover:not(.active) { background: #F0ECE1; }

      .ela-nav-mobile {
        position: fixed; bottom: 0; left: 0; right: 0;
        display: flex; background: var(--card); border-top: 1px solid var(--mist);
        padding: 6px 10px calc(6px + env(safe-area-inset-bottom, 0px)) 10px;
        z-index: 20; max-width: 920px; margin: 0 auto;
      }
      .ela-nav-mobile button {
        flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
        padding: 6px 0; border: none; background: none; color: var(--muted);
        font-family: 'Heebo', sans-serif; font-size: 11.5px; font-weight: 500; cursor: pointer;
      }
      .ela-nav-mobile button.active { color: var(--sage); font-weight: 700; }

      .ela-h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 500; margin: 0 0 4px 0; letter-spacing: -0.3px; }
      .ela-sub { color: var(--muted); font-size: 15px; margin: 0 0 22px 0; }

      .ela-streak {
        display: inline-flex; align-items: center; gap: 6px;
        background: var(--gold-light); color: #8A6412;
        padding: 6px 12px; border-radius: 999px; font-weight: 700; font-size: 14px;
      }
      .ela-aibadge {
        display: inline-flex; align-items: center; gap: 5px;
        background: var(--sage-light); color: var(--sage);
        padding: 5px 11px; border-radius: 999px; font-weight: 700; font-size: 12.5px;
        margin-inline-start: 8px;
      }

      .ela-cardrow { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 18px; }
      @media (min-width: 560px) { .ela-cardrow { grid-template-columns: 1fr 1fr; } }

      .ela-bigcard {
        background: var(--card); border-radius: 18px; padding: 22px;
        border: 1px solid var(--mist); cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease; text-align: right;
      }
      .ela-bigcard:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(28,37,65,0.08); }
      .ela-bigcard .icon-wrap {
        width: 46px; height: 46px; border-radius: 12px;
        display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
      }
      .ela-bigcard h3 { font-size: 18px; margin: 0 0 6px 0; font-weight: 700; }
      .ela-bigcard p { font-size: 13.5px; color: var(--muted); margin: 0; line-height: 1.5; }

      .ela-chip {
        display: inline-flex; padding: 7px 14px; border-radius: 999px;
        font-size: 13.5px; font-weight: 600; border: 1px solid var(--mist);
        background: var(--card); color: var(--muted); cursor: pointer;
      }
      .ela-chip.util { border: 1.5px solid var(--gold); background: var(--gold-light); color: #8A6412; }
      .ela-chip.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
      .ela-chiprow { display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0 6px 0; }

      .ela-flashcard {
        background: var(--card); border: 1px solid var(--mist); border-radius: 22px;
        padding: 40px 24px; text-align: center; cursor: pointer; min-height: 220px;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
      }
      .ela-flashcard .word { font-family: 'Fraunces', serif; font-size: 40px; direction: ltr; }
      .ela-flashcard .hint { color: var(--muted); font-size: 13px; margin-top: 6px; }
      .ela-flashcard .translation { font-size: 22px; font-weight: 700; color: var(--sage); }
      .ela-flashcard .example { direction: ltr; color: var(--muted); font-size: 15px; margin-top: 4px; max-width: 340px; }
      .ela-flashcard .exampleHe { color: var(--muted); font-size: 13.5px; margin-top: 2px; }

      .ela-optbtn {
        width: 100%; text-align: right; padding: 15px 16px; border-radius: 13px;
        border: 1.5px solid var(--mist); background: var(--card);
        font-family: 'Heebo', sans-serif; font-size: 16px; font-weight: 600; color: var(--ink);
        cursor: pointer; margin-bottom: 10px; display: block;
      }
      .ela-optbtn.correct { border-color: var(--sage); background: var(--sage-light); color: var(--sage); }
      .ela-optbtn.wrong { border-color: var(--rose); background: var(--rose-light); color: var(--rose); }
      .ela-optbtn:disabled { cursor: default; }

      .ela-progressbar { width: 100%; height: 6px; background: var(--mist); border-radius: 999px; overflow: hidden; margin-bottom: 20px; }
      .ela-progressbar > div { height: 100%; background: var(--sage); border-radius: 999px; transition: width 0.25s ease; }

      .ela-iconbtn {
        display: inline-flex; align-items: center; justify-content: center;
        width: 38px; height: 38px; border-radius: 999px;
        background: var(--sage-light); color: var(--sage); border: none; cursor: pointer; flex-shrink: 0;
      }
      .ela-iconbtn:hover { background: var(--sage); color: white; }

      .ela-bubble {
        background: var(--card); border: 1px solid var(--mist); border-radius: 16px;
        padding: 14px 16px; margin-bottom: 12px; display: flex; gap: 12px; align-items: flex-start;
      }
      .ela-bubble.speakerB { background: var(--sage-light); border-color: transparent; }
      .ela-bubble .txt { flex: 1; min-width: 0; }
      .ela-bubble .en { font-family: 'Fraunces', serif; font-size: 17px; direction: ltr; text-align: left; }
      .ela-bubble .he { color: var(--muted); font-size: 13.5px; margin-top: 4px; }
      .ela-tag { display: inline-block; font-size: 11px; font-weight: 700; color: var(--muted); background: var(--mist); border-radius: 6px; padding: 2px 7px; margin-bottom: 2px; }

      .ela-btn {
        display: inline-flex; align-items: center; gap: 8px;
        background: var(--ink); color: var(--paper); padding: 13px 22px; border-radius: 12px; border: none;
        font-family: 'Heebo', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer;
      }
      .ela-btn:hover { opacity: 0.9; }
      .ela-btn:disabled { opacity: 0.5; cursor: default; }
      .ela-btn.secondary { background: var(--card); color: var(--ink); border: 1.5px solid var(--mist); }

      .ela-backrow { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; cursor: pointer; color: var(--muted); font-weight: 600; font-size: 14px; }

      .ela-scenecard {
        display: flex; align-items: center; gap: 14px;
        background: var(--card); border: 1px solid var(--mist); border-radius: 16px;
        padding: 16px; margin-bottom: 12px; cursor: pointer;
      }
      .ela-scenecard:hover { border-color: var(--sage); }
      .ela-scenecard .icon-wrap { width: 44px; height: 44px; border-radius: 12px; background: var(--gold-light); color: #8A6412; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .ela-scenecard h4 { margin: 0 0 3px 0; font-size: 15.5px; }
      .ela-scenecard .done { color: var(--sage); font-size: 12px; font-weight: 700; }

      .ela-summary { text-align: center; padding: 30px 10px; }
      .ela-summary .num { font-family: 'Fraunces', serif; font-size: 54px; }

      .ela-banner {
        background: var(--gold-light); border: 1px solid var(--gold);
        border-radius: 16px; padding: 18px; margin: 18px 0; text-align: center;
      }
      .ela-banner p { margin: 0 0 12px 0; font-weight: 600; color: #6B4A0C; }
      .ela-bannerbtns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

      .ela-field {
        width: 100%; padding: 13px 14px; border-radius: 12px; border: 1.5px solid var(--mist);
        font-family: 'Heebo', sans-serif; font-size: 15px; background: var(--card); color: var(--ink);
      }
      .ela-fieldrow { display: flex; gap: 8px; align-items: center; }
      .ela-loadingbox { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px 10px; color: var(--muted); }
      .ela-spin { animation: ela-spin 1s linear infinite; }
      @keyframes ela-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .ela-errbox { background: var(--rose-light); color: var(--rose); border-radius: 12px; padding: 12px 14px; font-size: 13.5px; margin-bottom: 14px; }
      .ela-note { color: var(--muted); font-size: 13px; margin-top: 8px; line-height: 1.6; }

      .ela-chat { display: flex; flex-direction: column; gap: 12px; margin-bottom: 90px; }
      .ela-chatrow { display: flex; }
      .ela-chatrow.ai { justify-content: flex-start; }
      .ela-chatrow.user { justify-content: flex-end; }
      .ela-chatbubble {
        max-width: 82%; border-radius: 16px; padding: 12px 14px;
      }
      .ela-chatrow.ai .ela-chatbubble { background: var(--card); border: 1px solid var(--mist); border-bottom-left-radius: 4px; }
      .ela-chatrow.user .ela-chatbubble { background: var(--sage); color: white; border-bottom-right-radius: 4px; }
      .ela-chatbubble .en { font-family: 'Fraunces', serif; font-size: 16.5px; direction: ltr; text-align: left; }
      .ela-chatrow.ai .ela-chatbubble .he { color: var(--muted); font-size: 12.5px; margin-top: 5px; }
      .ela-chatrow.user .ela-chatbubble .he { color: rgba(255,255,255,0.8); font-size: 12.5px; margin-top: 5px; }
      .ela-chatrow.ai .ela-chatbubble .speakbtn { margin-top: 6px; }
      .ela-correction {
        background: var(--gold-light); border-radius: 12px; padding: 10px 12px;
        margin-top: 8px; max-width: 82%; align-self: flex-end; font-size: 13px;
      }
      .ela-correction .label { font-weight: 700; color: #6B4A0C; font-size: 11.5px; margin-bottom: 3px; }
      .ela-correction .fixed { font-family: 'Fraunces', serif; direction: ltr; text-align: left; color: #6B4A0C; }
      .ela-correction .fb { color: #6B4A0C; margin-top: 4px; }

      .ela-hintrow { display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0 2px 0; }
      .ela-hintchip {
        font-size: 12px; background: var(--sage-light); color: var(--sage);
        border-radius: 999px; padding: 4px 10px; border: none; direction: ltr;
      }

      .ela-speakbar {
        position: fixed; bottom: calc(64px + env(safe-area-inset-bottom, 0px)); left: 0; right: 0;
        background: var(--paper); border-top: 1px solid var(--mist);
        padding: 14px 18px 14px 18px;
        display: flex; flex-direction: column; align-items: center; gap: 10px;
        max-width: 920px; margin: 0 auto; z-index: 21;
      }
      @media (min-width: 760px) { .ela-speakbar { position: static; border-top: none; padding: 10px 0 0 0; z-index: auto; } }

      .ela-micbtn {
        width: 68px; height: 68px; border-radius: 50%; border: none; cursor: pointer;
        background: var(--sage); color: white; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 6px 18px rgba(79,121,101,0.35); transition: transform 0.15s ease;
        touch-action: none; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;
      }
      .ela-micbtn.listening { background: var(--rose); animation: ela-pulse 1.4s ease-in-out infinite; }
      .ela-micbtn:disabled { opacity: 0.5; cursor: default; }
      @keyframes ela-gap { from { width: 0; } to { width: 100%; } }
      @keyframes ela-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(193,85,74,0.4); } 50% { box-shadow: 0 0 0 14px rgba(193,85,74,0); } }

      .ela-transcriptbox {
        width: 100%; background: var(--card); border: 1.5px solid var(--mist); border-radius: 14px;
        padding: 12px 14px; font-family: 'Fraunces', serif; font-size: 16px; direction: ltr; text-align: left;
        min-height: 46px; resize: vertical; outline: none;
      }
      .ela-transcriptbox:focus { border-color: var(--sage); }
    `}</style>
  );
}

/* ============================== HOME VIEW ============================== */

function Home({ state, langData, currentLang, setLevel, setLanguage, dueCount, newCount, chunkDue, chunkTotal, backupStale, onGo }) {
  const doneToday = state.stats.lastActiveDate === todayStr();
  const aiOn = !!state.settings.apiKey;
  const langInfo = languageInfo(currentLang);
  const usingLocalContent = langInfo.hasLocalContent && !aiOn;
  const recentFocus = summarizeFocusAreas(langData.speakingMemory?.mistakeTags || []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="ela-h1">{greeting()}</h1>
          <p className="ela-sub">{doneToday ? "כבר תרגלת היום, כל הכבוד!" : "מוכנים לתרגול של היום?"}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="ela-streak"><Flame size={16} />{state.stats.streak}</div>
          {aiOn && <div className="ela-aibadge"><Sparkles size={13} />AI פעיל</div>}
        </div>
      </div>

      <p className="ela-sub" style={{ marginBottom: 6, fontWeight: 600 }}>שפה נלמדת:</p>
      <div className="ela-chiprow">
        {LANGUAGES.map((l) => (
          <button key={l.id} className={"ela-chip" + (currentLang === l.id ? " active" : "")} onClick={() => setLanguage(l.id)}>
            {l.label}
          </button>
        ))}
      </div>
      {!langInfo.hasLocalContent && !aiOn && (
        <div className="ela-note" style={{ background: "var(--rose-light)", color: "var(--rose)", borderRadius: 12, padding: "10px 12px", marginBottom: 4 }}>
          לימוד {langInfo.label} דורש חיבור ל-AI. עברו להגדרות והוסיפו מפתח Gemini כדי להתחיל.
        </div>
      )}

      {backupStale && (
        <div className="ela-note" style={{ background: "var(--gold-light)", color: "#8A6412", borderRadius: 12, padding: "10px 12px", margin: "12px 0", cursor: "pointer" }} onClick={() => onGo("settings")}>
          כדאי לגבות את ההתקדמות שלך - לחצו כאן להגדרות הגיבוי.
        </div>
      )}

      {recentFocus && (
        <div className="ela-note" style={{ background: "var(--sage-light)", color: "var(--sage)", borderRadius: 12, padding: "10px 12px", margin: "12px 0" }}>
          תחום להתמקדות לאחרונה: <b>{recentFocus}</b>
        </div>
      )}

      <p className="ela-sub" style={{ marginBottom: 6, marginTop: 16, fontWeight: 600 }}>רמה:</p>
      <div className="ela-chiprow">
        {[{ id: "all", label: "כל הרמות" }, ...LEVELS].map((lv) => (
          <button key={lv.id} className={"ela-chip" + (langData.level === lv.id ? " active" : "")} onClick={() => setLevel(lv.id)}>
            {lv.label}
          </button>
        ))}
      </div>

      <div className="ela-cardrow">
        <div className="ela-bigcard" onClick={() => onGo("vocab")}>
          <div className="icon-wrap" style={{ background: "var(--sage-light)", color: "var(--sage)" }}><BookOpen size={22} /></div>
          <h3>אוצר מילים</h3>
          <p>
            {!usingLocalContent && !aiOn
              ? `דורש מפתח AI עבור ${langInfo.label}`
              : aiOn
              ? "8 מילים חדשות שנוצרות במיוחד בשבילך בכל תרגול"
              : dueCount > 0
              ? `${dueCount} מילים ממתינות לחזרה`
              : newCount > 0
              ? `${Math.min(8, newCount)} מילים חדשות מוכנות ללמידה`
              : "סיימת את כל המילים הזמינות ברמה הזו"}
          </p>
        </div>
        <div className="ela-bigcard" onClick={() => onGo("convo")}>
          <div className="icon-wrap" style={{ background: "var(--gold-light)", color: "#8A6412" }}><MessageCircle size={22} /></div>
          <h3>שיחה</h3>
          <p>
            {!usingLocalContent && !aiOn
              ? `דורש מפתח AI עבור ${langInfo.label}`
              : aiOn
              ? "דיאלוגים קבועים, ואפשרות ליצור שיחה חדשה עם AI לפי נושא"
              : "תרגלו דיאלוגים אמיתיים עם הגייה מוקראת, לפי מצבים יומיומיים."}
          </p>
        </div>
        {aiOn && (
          <div className="ela-bigcard" onClick={() => onGo("chunks")}>
            <div className="icon-wrap" style={{ background: "var(--sage-light)", color: "var(--sage)" }}><Layers size={22} /></div>
            <h3>צ'אנקים</h3>
            <p>
              {chunkDue > 0
                ? `${chunkDue} צירופי מילים מחכים לשליפה בדיבור`
                : chunkTotal > 0
                ? "ללמוד עוד צירופים שימושיים ולשלוף אותם בשטף"
                : "לומדים צירופי מילים שלמים ושולפים אותם בקול - הדרך לשטף בשיחה."}
            </p>
          </div>
        )}
        {aiOn && (
          <div className="ela-bigcard" onClick={() => onGo("speaking")}>
            <div className="icon-wrap" style={{ background: "var(--rose-light)", color: "var(--rose)" }}><Mic size={22} /></div>
            <h3>תרגול דיבור</h3>
            <p>דברו עם ה-AI ב{langInfo.label} וקבלו תיקונים עדינים בזמן אמת - תרגול הפקה פעילה.</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: 26, display: "flex", gap: 20, color: "var(--muted)", fontSize: 13.5 }}>
        <span><b style={{ color: "var(--ink)" }}>{state.stats.sessionsCompleted}</b> תרגולים הושלמו</span>
        <span><b style={{ color: "var(--ink)" }}>{state.stats.xp}</b> נק' ניסיון</span>
      </div>
    </div>
  );
}

/* ============================== LEVEL SUGGESTION BANNER ============================== */

function LevelBanner({ suggestion, onAccept, onDismiss }) {
  if (!suggestion) return null;
  const up = suggestion.type === "up";
  return (
    <div className="ela-banner">
      <p>
        {up ? <TrendingUp size={16} style={{ verticalAlign: "middle" }} /> : <TrendingDown size={16} style={{ verticalAlign: "middle" }} />}{" "}
        {up
          ? `ביצועים מצוינים ברמת ${levelLabel(suggestion.from)}! רוצה לעבור לרמת ${levelLabel(suggestion.to)}?`
          : `נראה שרמת ${levelLabel(suggestion.from)} מאתגרת כרגע. לרדת לרמת ${levelLabel(suggestion.to)} ולהתחזק?`}
      </p>
      <div className="ela-bannerbtns">
        <button className="ela-btn" onClick={onAccept}>{up ? `כן, עברו לרמת ${levelLabel(suggestion.to)}` : `כן, ירדו לרמת ${levelLabel(suggestion.to)}`}</button>
        <button className="ela-btn secondary" onClick={onDismiss}>השאירו אותי ברמה הנוכחית</button>
      </div>
    </div>
  );
}

/* ============================== VOCAB VIEW ============================== */

function buildSession(langData, levelFilter) {
  const pool = VOCAB.filter((w) => levelFilter === "all" || w.level === levelFilter);
  const due = pool.filter((w) => langData.words[w.id] && isDue(langData.words[w.id].due));
  const fresh = pool.filter((w) => !langData.words[w.id]);
  const picked = [...shuffle(due), ...shuffle(fresh)].slice(0, 8);
  if (picked.length === 0) {
    return shuffle(pool.filter((w) => langData.words[w.id])).slice(0, 8);
  }
  return picked;
}

function makeOptions(word, pool) {
  const candidates = pool.filter((w) => w.id !== word.id);
  const distractors = shuffle(candidates).slice(0, 3);
  return shuffle([word, ...distractors]);
}

function VocabSession({ state, langData, lang, apiKey, onFinish, onBack }) {
  const levelFilter = langData.level;
  const isEnglish = lang === "en";
  const useAI = !!apiKey;
  const [words, setWords] = useState(() => (useAI || !isEnglish ? [] : buildSession(langData, levelFilter)));
  const [loading, setLoading] = useState(useAI);
  const [error, setError] = useState(null);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("flip");
  const [flipped, setFlipped] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!useAI) return;
    let cancelled = false;
    (async () => {
      try {
        const effectiveLevel = levelFilter === "all" ? shuffle(LEVEL_ORDER)[0] : levelFilter;
        const generated = await generateAIWords(apiKey, lang, effectiveLevel, langData.aiSeenWords.slice(-40));
        if (!cancelled) setWords(generated);
      } catch (e) {
        if (!cancelled) setError(e.message || "שגיאה ביצירת התרגול");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (words[0]) setOptions(makeOptions(words[0], useAI ? words : VOCAB.filter((w) => levelFilter === "all" || w.level === words[0].level)));
  }, [words]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!useAI && !isEnglish) {
    return (
      <div>
        <BackRow onBack={onBack} />
        <div className="ela-errbox">לימוד {languageInfo(lang).label} דורש חיבור ל-AI. עברו להגדרות והוסיפו מפתח Gemini כדי להתחיל.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <BackRow onBack={onBack} />
        <div className="ela-loadingbox">
          <Loader2 size={30} className="ela-spin" />
          <p>ה-AI יוצר לך תרגול חדש...</p>
        </div>
      </div>
    );
  }

  if (error || words.length === 0) {
    const fallback = isEnglish ? buildSession(langData, levelFilter) : [];
    return (
      <div>
        <BackRow onBack={onBack} />
        {error && <div className="ela-errbox">{error} — {isEnglish ? "נטען תרגול מהמאגר המקומי במקום." : ""}</div>}
        {fallback.length > 0 ? (
          <VocabSession state={state} langData={langData} lang={lang} apiKey={null} onFinish={onFinish} onBack={onBack} />
        ) : (
          <div className="ela-summary">
            <p>אין עדיין מילים זמינות לתרגול ברמה זו.</p>
            <button className="ela-btn" onClick={onBack}>חזרה</button>
          </div>
        )}
      </div>
    );
  }

  const word = words[idx];
  const pool = useAI ? words : VOCAB.filter((w) => levelFilter === "all" || w.level === word.level);

  function toQuiz() {
    setOptions(makeOptions(word, pool));
    setSelected(null);
    setPhase("quiz");
  }

  function advanceQuiz(nextResults) {
    if (idx + 1 < words.length) {
      setIdx(idx + 1);
      setFlipped(false);
      setPhase("flip");
    } else {
      onFinish(nextResults, useAI);
    }
  }

  function choose(opt) {
    if (selected) return;
    setSelected(opt.id);
    const correct = opt.id === word.id;
    const nextResults = [...results, { id: word.id, en: word.en, correct }];
    setResults(nextResults);
    if (correct) {
      // already knew it - move on quickly
      setTimeout(() => advanceQuiz(nextResults), 900);
    }
    // when wrong, wait for the person to tap "המשך" below, so there's no rush to read the correct answer
  }

  return (
    <div>
      <BackRow onBack={onBack} label="עצירת תרגול" />
      <div className="ela-progressbar"><div style={{ width: `${(idx / words.length) * 100}%` }} /></div>

      {phase === "flip" && (
        <div className="ela-flashcard" onClick={() => setFlipped((f) => !f)}>
          {!flipped ? (
            <>
              <div className="ela-en word">{word.en}</div>
              <div className="hint">הקישו כדי לראות את התרגום</div>
            </>
          ) : (
            <>
              <div className="translation">{word.he}</div>
              {word.ex && <div className="ela-en example">{word.ex}</div>}
              {word.exHe && <div className="exampleHe">{word.exHe}</div>}
            </>
          )}
        </div>
      )}

      {phase === "flip" && (
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18 }}>
          <button className="ela-iconbtn" onClick={(e) => { e.stopPropagation(); speak(word.en, languageInfo(lang).speechLang); }} aria-label="השמעת הגייה"><Volume2 size={18} /></button>
          <button className="ela-btn" onClick={toQuiz}>המשך לתרגיל</button>
        </div>
      )}

      {phase === "quiz" && (
        <div>
          <p className="ela-sub" style={{ marginBottom: 14 }}>
            מה התרגום של <span className="ela-en" style={{ fontWeight: 700, color: "var(--ink)" }}>{word.en}</span>?
          </p>
          {options.map((opt) => {
            let cls = "ela-optbtn";
            if (selected) {
              if (opt.id === word.id) cls += " correct";
              else if (opt.id === selected) cls += " wrong";
            }
            return (
              <button key={opt.id} className={cls} disabled={!!selected} onClick={() => choose(opt)}>{opt.he}</button>
            );
          })}
          {selected && selected !== word.id && (
            <button className="ela-btn" style={{ marginTop: 8 }} onClick={() => advanceQuiz(results)}>המשך</button>
          )}
        </div>
      )}
    </div>
  );
}

function BackRow({ onBack, label = "חזרה" }) {
  return (
    <div className="ela-backrow" onClick={onBack}>
      <ChevronRight size={16} />
      {label}
    </div>
  );
}

function VocabSummary({ results, suggestion, onAcceptLevel, onDismissLevel, onDone }) {
  const correct = results.filter((r) => r.correct).length;
  return (
    <div className="ela-summary">
      <Sparkles size={30} color="var(--gold)" />
      <div className="num">{correct}/{results.length}</div>
      <p className="ela-sub">תשובות נכונות בתרגול הזה</p>
      <LevelBanner suggestion={suggestion} onAccept={onAcceptLevel} onDismiss={onDismissLevel} />
      <button className="ela-btn" onClick={onDone}>סיום</button>
    </div>
  );
}

/* ============================== CONVERSATION VIEW ============================== */

function ConvoList({ state, langData, lang, onOpen, onOpenAI, onBack }) {
  const aiOn = !!state.settings.apiKey;
  const isEnglish = lang === "en";
  const [pickingTopic, setPickingTopic] = useState(false);

  return (
    <div>
      <h1 className="ela-h1">שיחה</h1>
      <p className="ela-sub">בחרו מצב לתרגול, או צרו שיחה חדשה עם AI. הקישו על כל שורה כדי לשמוע הגייה.</p>

      {!aiOn && !isEnglish && (
        <div className="ela-errbox">לימוד {languageInfo(lang).label} דורש חיבור ל-AI. עברו להגדרות והוסיפו מפתח Gemini כדי להתחיל.</div>
      )}

      {aiOn && (
        <div style={{ marginBottom: 18 }}>
          {!pickingTopic ? (
            <button className="ela-btn" onClick={() => setPickingTopic(true)}><Wand2 size={16} />צרו שיחה חדשה עם AI</button>
          ) : (
            <div>
              <p className="ela-sub" style={{ marginBottom: 10 }}>באיזה נושא?</p>
              <div className="ela-chiprow">
                <button className="ela-chip" onClick={() => onOpenAI(shuffle(TOPICS)[0])}>הפתיעו אותי</button>
                {TOPICS.map((t) => (
                  <button key={t} className="ela-chip" onClick={() => onOpenAI(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isEnglish && DIALOGUES.map((d) => (
        <div className="ela-scenecard" key={d.id} onClick={() => onOpen(d)}>
          <div className="icon-wrap"><d.Icon size={20} /></div>
          <div style={{ flex: 1 }}>
            <h4>{d.title}</h4>
            <span style={{ color: "var(--muted)", fontSize: 12.5 }}>{levelLabel(d.level)}</span>
          </div>
          {langData.convosDone[d.id] && <span className="done">הושלם ✓</span>}
        </div>
      ))}
    </div>
  );
}

function ConvoPlayer({ dialogue, speechLang, onBack, onComplete, done }) {
  const [shown, setShown] = useState(1);
  const allShown = shown >= dialogue.lines.length;

  return (
    <div>
      <BackRow onBack={onBack} />
      <h1 className="ela-h1">{dialogue.title}</h1>
      <p className="ela-sub">הקישו על כפתור ההשמעה כדי לשמוע כל משפט, ונסו לחזור עליו בקול.</p>

      {dialogue.lines.slice(0, shown).map((line, i) => (
        <div className={"ela-bubble" + (line.s === "B" ? " speakerB" : "")} key={i}>
          <button className="ela-iconbtn" onClick={() => speak(line.en, speechLang)} aria-label="השמעה"><Volume2 size={16} /></button>
          <div className="txt">
            <span className="ela-tag">{line.s === "A" ? "דובר א" : "דובר ב"}</span>
            <div className="ela-en en">{line.en}</div>
            <div className="he">{line.he}</div>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        {!allShown ? (
          <button className="ela-btn secondary" onClick={() => setShown((s) => s + 1)}>השורה הבאה</button>
        ) : (
          <button className="ela-btn" onClick={onComplete}>{done ? "לסיים שוב" : "סיימתי לתרגל"}</button>
        )}
      </div>
    </div>
  );
}

/* ============================== SETTINGS VIEW ============================== */

function Settings({ state, onSave, onRestore, onBackedUp }) {
  const [value, setValue] = useState(state.settings.apiKey || "");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(null); // { ok: bool, msg }
  const [checking, setChecking] = useState(false);
  const [bkMsg, setBkMsg] = useState(null); // { ok, msg }
  const [fileName, setFileName] = useState(null);
  const [days, setDays] = useState(daysSinceBackup());
  const fileInputRef = useRef(null);

  useEffect(() => {
    connectedBackupName().then(setFileName);
  }, []);

  function backedUp() {
    markBackup();
    setDays(daysSinceBackup());
    if (onBackedUp) onBackedUp();
  }

  async function downloadBackup() {
    const text = buildBackup(state);
    try {
      const file = new File([text], backupFileName(), { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
        await navigator.share({ files: [file], title: "SpeakUp backup" });
        backedUp();
        setBkMsg({ ok: true, msg: "הגיבוי נשלח לשמירה. מומלץ לבחור Google Drive או 'שמירה בקבצים'." });
        return;
      }
    } catch (e) {
      if (e && e.name === "AbortError") return;
    }
    downloadFile(backupFileName(), text);
    backedUp();
    setBkMsg({ ok: true, msg: "הגיבוי הורד לתיקיית ההורדות." });
  }

  async function connectFile() {
    try {
      const name = await connectBackupFile(state);
      setFileName(name);
      backedUp();
      setBkMsg({ ok: true, msg: `מחובר. בסיום כל תרגול הגיבוי יתעדכן אוטומטית בקובץ ${name}.` });
    } catch (e) {
      if (!e || e.name !== "AbortError") setBkMsg({ ok: false, msg: "לא הצלחנו לחבר קובץ גיבוי." });
    }
  }

  async function disconnectFile() {
    await disconnectBackupFile();
    setFileName(null);
    setBkMsg({ ok: true, msg: "החיבור לקובץ הגיבוי בוטל." });
  }

  async function onPickRestore(e) {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    try {
      const restored = parseBackup(await f.text());
      if (!window.confirm("השחזור יחליף את ההתקדמות הנוכחית במכשיר הזה בנתוני הגיבוי. להמשיך?")) return;
      onRestore(restored);
      setBkMsg({ ok: true, msg: "ההתקדמות שוחזרה בהצלחה." });
    } catch (err) {
      setBkMsg({ ok: false, msg: err.message || "קובץ הגיבוי לא תקין." });
    }
  }

  async function testKey(key) {
    setChecking(true);
    setStatus(null);
    try {
      await callGemini(key, 'החזר אך ורק את המחרוזת הבאה כטקסט JSON: {"ok": true}');
      setStatus({ ok: true, msg: "המפתח תקין! ה-AI מוכן לפעולה." });
    } catch (e) {
      setStatus({ ok: false, msg: "לא הצלחנו להתחבר עם המפתח הזה: " + (e.message || "") });
    } finally {
      setChecking(false);
    }
  }

  return (
    <div>
      <h1 className="ela-h1">הגדרות</h1>
      <p className="ela-sub">חברו מפתח Gemini API כדי לאפשר יצירת מילים ושיחות חדשות באמצעות AI.</p>

      <div className="ela-fieldrow">
        <input
          className="ela-field"
          type={show ? "text" : "password"}
          placeholder="הדביקו כאן את מפתח ה-API"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          dir="ltr"
        />
        <button className="ela-iconbtn" onClick={() => setShow((s) => !s)} aria-label="הצג/הסתר">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button className="ela-btn" disabled={!value.trim()} onClick={() => onSave(value.trim())}>שמירת מפתח</button>
        <button className="ela-btn secondary" disabled={!value.trim() || checking} onClick={() => testKey(value.trim())}>
          {checking ? "בודק..." : "בדיקת חיבור"}
        </button>
        {state.settings.apiKey && (
          <button className="ela-btn secondary" onClick={() => { setValue(""); onSave(""); }}>הסרת מפתח</button>
        )}
      </div>

      {status && <div className={status.ok ? "ela-note" : "ela-errbox"} style={{ marginTop: 14 }}>{status.msg}</div>}

      <p className="ela-note">
        המפתח נשמר רק בדפדפן הזה (localStorage) ונשלח ישירות מהדפדפן ל-Google לצורך יצירת התרגילים — הוא לא עובר דרך שום שרת אחר.
        אפשר ליצור מפתח בחינם באתר Google AI Studio.
      </p>

      <h2 className="ela-h1" style={{ fontSize: 20, marginTop: 30 }}>גיבוי ושחזור</h2>
      <p className="ela-sub" style={{ marginBottom: 12 }}>
        ההתקדמות (מילים, צ'אנקים, חזרות) שמורה בדפדפן בלבד. גיבוי מגן עליה אם מנקים נתוני אתר או מחליפים מכשיר. מפתח ה-AI לא נכלל בגיבוי.
      </p>
      <p className="ela-note" style={{ marginTop: 0 }}>
        {days === null ? "עדיין לא בוצע גיבוי." : days === 0 ? "הגיבוי האחרון: היום." : `הגיבוי האחרון: לפני ${days} ימים.`}
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="ela-btn" onClick={downloadBackup}>גיבוי עכשיו</button>
        <button className="ela-btn secondary" onClick={() => fileInputRef.current && fileInputRef.current.click()}>שחזור מקובץ</button>
        {canAutoFileBackup() && !fileName && (
          <button className="ela-btn secondary" onClick={connectFile}>גיבוי אוטומטי לקובץ</button>
        )}
        {fileName && <button className="ela-btn secondary" onClick={disconnectFile}>ניתוק גיבוי אוטומטי</button>}
      </div>
      <input ref={fileInputRef} type="file" accept=".json,application/json" style={{ display: "none" }} onChange={onPickRestore} />
      {fileName && (
        <div className="ela-note">גיבוי אוטומטי פעיל לקובץ <b>{fileName}</b> - מתעדכן בסיום כל תרגול (הדפדפן עשוי לבקש אישור פעם בכל הפעלה).</div>
      )}
      {!canAutoFileBackup() && (
        <div className="ela-note">בטלפון אין גיבוי אוטומטי לקובץ (מגבלה של הדפדפן), לכן יופיע תזכורת בדף הבית כשעבר זמן מהגיבוי האחרון.</div>
      )}
      {bkMsg && <div className={bkMsg.ok ? "ela-note" : "ela-errbox"} style={{ marginTop: 10 }}>{bkMsg.msg}</div>}
    </div>
  );
}

/* ============================== SPEAKING PRACTICE VIEW ============================== */

function SpeakingPractice({ level, lang, apiKey, recentFocus, chunks, onChunksUsed, onMistakeTag, onBack, onSessionEnd }) {
  const [topic, setTopic] = useState(null);
  const [customTopic, setCustomTopic] = useState("");
  const [history, setHistory] = useState([]); // { role: 'ai'|'user', text, textHe?, correction?, feedbackHe?, mistakeTag?, hint? }
  const [phase, setPhase] = useState("pick"); // pick -> loading -> ready -> listening -> reviewing -> sending
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const recRef = useRef(null);
  const isHeldRef = useRef(false);
  const committedTextRef = useRef("");
  const stopScheduledRef = useRef(false);
  const speechSupported = !!getSpeechRecognition();
  const langInfo = languageInfo(lang);

  useEffect(() => {
    return () => {
      isHeldRef.current = false;
      try { recRef.current && recRef.current.abort(); } catch (e) { /* noop */ }
    };
  }, []);

  const effectiveLevel = level === "all" ? "intermediate" : level;
  // a few already-learned chunks the partner should try to invite into the conversation
  const chunkHintsRef = useRef(null);
  if (chunkHintsRef.current === null) {
    chunkHintsRef.current = pickChunkHints(chunks || {}, todayStr(), 5).map((c) => c.text);
  }

  async function startTopic(t) {
    setTopic(t);
    setPhase("loading");
    setError(null);
    try {
      const turn = await generateSpeakingTurn(apiKey, lang, effectiveLevel, t, [], recentFocus, chunkHintsRef.current);
      setHistory([{ role: "ai", text: turn.reply, textHe: turn.replyHe, hint: turn.hint }]);
      setPhase("ready");
    } catch (e) {
      setError(e.message || "שגיאה ביצירת השיחה");
      setPhase("pick");
    }
  }

  function launchRecognitionSession() {
    try { recRef.current && recRef.current.abort(); } catch (e) { /* noop */ }
    const rec = getSpeechRecognition();
    if (!rec) return;
    recRef.current = rec;
    rec.lang = langInfo.speechLang;
    rec.continuous = true;
    rec.interimResults = false; // only care about the finalized result, shown once the button is released
    rec.maxAlternatives = 1;
    let sessionFinal = "";
    rec.onaudiostart = () => setPhase((p) => (p === "starting" ? "listening" : p));
    rec.onresult = (event) => {
      // Some platforms (e.g. Android Chrome) resend a cumulative transcript instead of just the
      // new delta - detect that and replace rather than append, to avoid duplicated words.
      let parts = [];
      for (let i = 0; i < event.results.length; i++) {
        const t = (event.results[i][0].transcript || "").trim();
        if (!t) continue;
        const joined = parts.join(" ");
        if (joined && t.toLowerCase().startsWith(joined.toLowerCase())) {
          parts = [t];
        } else if (!joined.toLowerCase().includes(t.toLowerCase())) {
          parts.push(t);
        }
      }
      sessionFinal = parts.join(" ");
    };
    rec.onerror = (event) => {
      if (event.error === "not-allowed") {
        isHeldRef.current = false;
        setError("הגישה למיקרופון נחסמה. אשרו הרשאת מיקרופון בדפדפן ונסו שוב.");
        setPhase("ready");
      }
      // other errors (like 'no-speech' during a natural pause) are handled by onend below
    };
    rec.onend = () => {
      if (sessionFinal) {
        committedTextRef.current = (committedTextRef.current + " " + sessionFinal).trim();
      }
      if (isHeldRef.current) {
        // the engine ended on its own (e.g. it heard a pause) but the button is still held down -
        // this is exactly the case that used to cause early cutoffs/duplication, so just resume
        // seamlessly without the user noticing.
        launchRecognitionSession();
      } else {
        setTranscript(committedTextRef.current);
        setPhase(committedTextRef.current ? "reviewing" : "ready");
      }
    };
    try {
      rec.start();
    } catch (e) {
      /* start() can throw if called too quickly in succession; safe to ignore */
    }
  }

  function startHold() {
    if (isHeldRef.current) return;
    stopScheduledRef.current = false;
    isHeldRef.current = true;
    committedTextRef.current = "";
    setError(null);
    setPhase("starting");
    launchRecognitionSession();
  }

  function stopHold() {
    if (!isHeldRef.current || stopScheduledRef.current) return;
    stopScheduledRef.current = true;
    // small grace period so the last word isn't clipped right as the button is released -
    // the recognizer needs a beat to finish processing audio it already captured
    setTimeout(() => {
      stopScheduledRef.current = false;
      isHeldRef.current = false;
      try {
        recRef.current && recRef.current.stop();
      } catch (e) {
        setTranscript(committedTextRef.current);
        setPhase(committedTextRef.current ? "reviewing" : "ready");
      }
    }, 400);
  }

  function recordAgain() {
    committedTextRef.current = "";
    setTranscript("");
    setPhase("ready");
  }

  function typeInstead() {
    setError(null);
    setTranscript("");
    setPhase("reviewing");
  }

  async function sendAnswer(text) {
    if (!text || !text.trim()) return;
    const userTurn = { role: "user", text: text.trim() };
    if (onChunksUsed) {
      const used = detectUsedChunks(chunks || {}, userTurn.text);
      if (used.length) onChunksUsed(used.map((c) => c.id));
    }
    const nextHistory = [...history, userTurn];
    setHistory(nextHistory);
    setPhase("sending");
    setShowHint(false);
    setTranscript("");
    try {
      const turn = await generateSpeakingTurn(apiKey, lang, effectiveLevel, topic, nextHistory, recentFocus, chunkHintsRef.current);
      const withFeedback = nextHistory.map((h, i) =>
        i === nextHistory.length - 1 ? { ...h, correction: turn.correction, feedbackHe: turn.feedbackHe, mistakeTag: turn.mistakeTag } : h
      );
      setHistory([...withFeedback, { role: "ai", text: turn.reply, textHe: turn.replyHe, hint: turn.hint }]);
      setPhase("ready");
      if (turn.correction && turn.mistakeTag && onMistakeTag) onMistakeTag(turn.mistakeTag);
    } catch (e) {
      setError(e.message || "שגיאה בקבלת תגובה");
      setPhase("ready");
    }
  }

  const lastAI = [...history].reverse().find((h) => h.role === "ai");

  if (phase === "pick") {
    return (
      <div>
        <BackRow onBack={onBack} />
        <h1 className="ela-h1">תרגול דיבור</h1>
        <p className="ela-sub">דברו עם ה-AI ב{langInfo.label}, קבלו תיקונים עדינים, ותתקדמו בביטחון.</p>
        {!speechSupported && (
          <div className="ela-errbox">
            הדפדפן הזה לא תומך בזיהוי דיבור. עדיין אפשר לתרגל בהקלדה, אבל לחוויה הכי טובה מומלץ Chrome.
          </div>
        )}
        {error && <div className="ela-errbox">{error}</div>}
        {recentFocus && (
          <div className="ela-note" style={{ background: "var(--sage-light)", color: "var(--sage)", borderRadius: 12, padding: "10px 12px", marginBottom: 10 }}>
            שמנו לב שלאחרונה יש קושי חוזר עם: <b>{recentFocus}</b> - ננסה לתת לזה תשומת לב עדינה תוך כדי השיחה.
          </div>
        )}
        <p className="ela-sub" style={{ marginBottom: 10 }}>על מה תרצו לדבר? אפשר להקליד נושא משלכם:</p>
        <div className="ela-fieldrow" style={{ marginBottom: 14 }}>
          <input
            className="ela-field"
            placeholder="למשל: ראיון עבודה שיש לי מחר"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && customTopic.trim()) startTopic(customTopic.trim()); }}
          />
          <button className="ela-btn" disabled={!customTopic.trim()} onClick={() => startTopic(customTopic.trim())}>התחילו</button>
        </div>
        <div className="ela-chiprow">
          <button className="ela-chip" onClick={() => startTopic(null)}>שיחה חופשית</button>
          {TOPICS.map((t) => (
            <button key={t} className="ela-chip" onClick={() => startTopic(t)}>{t}</button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div>
        <BackRow onBack={onBack} />
        <div className="ela-loadingbox"><Loader2 size={30} className="ela-spin" /><p>ה-AI מכין שאלת פתיחה...</p></div>
      </div>
    );
  }

  return (
    <div>
      <BackRow onBack={onBack} />
      <h1 className="ela-h1">תרגול דיבור</h1>
      <p className="ela-sub">{topic || "שיחה חופשית"}</p>

      <div className="ela-chat">
        {history.map((h, i) => (
          <div key={i}>
            <div className={"ela-chatrow " + h.role}>
              <div className="ela-chatbubble">
                <div className="en">{h.text}</div>
                {h.role === "ai" && h.textHe && <div className="he">{h.textHe}</div>}
                {h.role === "ai" && (
                  <button className="ela-iconbtn speakbtn" style={{ width: 30, height: 30 }} onClick={() => speak(h.text, langInfo.speechLang)} aria-label="השמעה">
                    <Volume2 size={14} />
                  </button>
                )}
              </div>
            </div>
            {h.role === "user" && h.correction && (
              <div className="ela-correction">
                <div className="label">גרסה משופרת{h.mistakeTag ? ` · ${h.mistakeTag}` : ""}</div>
                <div className="fixed">{h.correction}</div>
                {h.feedbackHe && <div className="fb">{h.feedbackHe}</div>}
              </div>
            )}
          </div>
        ))}
        {phase === "sending" && (
          <div className="ela-chatrow ai"><div className="ela-chatbubble"><Loader2 size={16} className="ela-spin" /></div></div>
        )}
      </div>

      {lastAI && lastAI.hint && lastAI.hint.length > 0 && (phase === "ready" || phase === "listening" || phase === "starting" || phase === "reviewing") && (
        <div style={{ marginBottom: 8 }}>
          {!showHint ? (
            <button className="ela-chip" onClick={() => setShowHint(true)}><Lightbulb size={13} style={{ marginLeft: 4 }} />הצג רמז</button>
          ) : (
            <div className="ela-hintrow">
              {lastAI.hint.map((h, i) => (
                <span className="ela-hintchip" key={i}>{h}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {error && phase === "ready" && <div className="ela-errbox">{error}</div>}

      <div className="ela-speakbar">
        {phase === "reviewing" ? (
          <>
            <textarea
              className="ela-transcriptbox"
              dir="ltr"
              rows={2}
              placeholder={`Type or edit your answer in ${langInfo.nativeName}...`}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              autoFocus
            />
            <div style={{ display: "flex", gap: 10 }}>
              {speechSupported && (
                <button className="ela-btn secondary" onClick={recordAgain}><RotateCcw size={15} />הקלטה מחדש</button>
              )}
              <button className="ela-btn" disabled={!transcript.trim()} onClick={() => sendAnswer(transcript)}>שליחה</button>
            </div>
          </>
        ) : speechSupported ? (
          <>
            <button
              className={"ela-micbtn" + (phase === "listening" || phase === "starting" ? " listening" : "")}
              disabled={phase === "sending" || phase === "loading"}
              onPointerDown={(e) => { e.preventDefault(); startHold(); }}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Mic size={26} />
            </button>
            <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
              {phase === "starting" ? "מתחברים למיקרופון..." : phase === "listening" ? "מקליט... דברו, שחררו כשסיימתם" : "לחצו והחזיקו כדי לדבר"}
            </span>
            {phase === "ready" && (
              <button
                onClick={typeInstead}
                style={{ background: "none", border: "none", color: "var(--sage)", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline", fontFamily: "Heebo, sans-serif" }}
              >
                או הקלידו את התשובה במקום
              </button>
            )}
          </>
        ) : (
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <input
              className="ela-field"
              dir="ltr"
              placeholder={`Type your answer in ${langInfo.nativeName}...`}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendAnswer(transcript); }}
            />
            <button className="ela-btn" disabled={!transcript.trim()} onClick={() => sendAnswer(transcript)}>שליחה</button>
          </div>
        )}
      </div>

      {history.length >= 2 && phase === "ready" && (
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <button className="ela-btn secondary" onClick={onSessionEnd}>סיום תרגול</button>
        </div>
      )}
    </div>
  );
}

/* ============================== CHUNKS ============================== */

// Hold-to-talk speech capture. Mirrors the recognition engine of the translator app, which proved accurate on this phone:
// continuous + interim results, text = finalized parts + the still-interim tail (so the last words are not lost),
// a fresh recognizer instance for every (re)start, a grace period after release and a safety timer.
function useHoldToTalk(speechLang, onFinish) {
  const [phase, setPhase] = useState("idle"); // idle | starting | listening
  const [error, setError] = useState(null);
  const recRef = useRef(null);
  const heldRef = useRef(false);
  const committedRef = useRef(""); // text from earlier recognizer instances in this press
  const liveRef = useRef(""); // text of the current instance (final + interim)
  const doneRef = useRef(true);
  const stopScheduledRef = useRef(false);
  const safetyRef = useRef(null);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;
  const supported = !!getSpeechRecognition();

  useEffect(() => {
    return () => {
      heldRef.current = false;
      clearTimeout(safetyRef.current);
      try { recRef.current && recRef.current.abort(); } catch (e) { /* noop */ }
    };
  }, []);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimeout(safetyRef.current);
    setPhase("idle");
    const text = (committedRef.current + " " + liveRef.current).trim();
    committedRef.current = "";
    liveRef.current = "";
    if (text && finishRef.current) finishRef.current(text);
  }

  function launch() {
    const rec = getSpeechRecognition();
    if (!rec) return;
    recRef.current = rec;
    liveRef.current = "";
    rec.lang = speechLang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.onaudiostart = () => setPhase((p) => (p === "starting" ? "listening" : p));
    rec.onresult = (event) => {
      // some Android engines resend cumulative finals: replace when a final extends what we have, ignore stale ones
      let finalPart = "";
      let interimPart = "";
      for (let i = 0; i < event.results.length; i++) {
        const t = (event.results[i][0].transcript || "").trim();
        if (!t) continue;
        if (event.results[i].isFinal) {
          if (!finalPart || t.startsWith(finalPart)) finalPart = t;
          else if (finalPart.startsWith(t)) { /* stale shorter duplicate */ }
          else finalPart = (finalPart + " " + t).trim();
        } else {
          interimPart = (interimPart + " " + t).trim();
        }
      }
      liveRef.current = (finalPart + " " + interimPart).trim();
    };
    rec.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        heldRef.current = false;
        setError("הגישה למיקרופון נחסמה. אשרו הרשאת מיקרופון בדפדפן ונסו שוב.");
        doneRef.current = true;
        setPhase("idle");
      }
    };
    rec.onend = () => {
      if (recRef.current !== rec) return; // an old instance, ignore
      if (heldRef.current) {
        // the engine stopped on its own (pause) while the button is still held: keep what we have, start a new instance
        committedRef.current = (committedRef.current + " " + liveRef.current).trim();
        liveRef.current = "";
        launch();
      } else {
        finish();
      }
    };
    try { rec.start(); } catch (e) { /* start() can throw if called too quickly */ }
  }

  function startHold() {
    if (heldRef.current) return;
    try { recRef.current && recRef.current.abort(); } catch (e) { /* noop */ }
    stopScheduledRef.current = false;
    heldRef.current = true;
    doneRef.current = false;
    committedRef.current = "";
    liveRef.current = "";
    setError(null);
    setPhase("starting");
    launch();
  }

  function stopHold() {
    if (!heldRef.current || stopScheduledRef.current) return;
    stopScheduledRef.current = true;
    setTimeout(() => {
      stopScheduledRef.current = false;
      heldRef.current = false;
      try { recRef.current && recRef.current.stop(); } catch (e) { finish(); }
      // safety net: if the engine never reports its end, finish with what we have
      clearTimeout(safetyRef.current);
      safetyRef.current = setTimeout(finish, 1500);
    }, 500); // grace period so the last word isn't clipped
  }

  return { phase, error, supported, startHold, stopHold };
}

// ---- Gemini transcription: the app records audio itself and has Gemini write down what was actually said ----

async function blobToWav16k(blob) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const ctx = new Ctx();
  let decoded;
  try {
    decoded = await ctx.decodeAudioData(await blob.arrayBuffer());
  } finally {
    try { ctx.close(); } catch (e) { /* noop */ }
  }
  const off = new Offline(1, Math.max(1, Math.ceil(decoded.duration * 16000)), 16000);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start();
  const pcm = (await off.startRendering()).getChannelData(0);
  const buf = new ArrayBuffer(44 + pcm.length * 2);
  const v = new DataView(buf);
  const str = (o, t) => { for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); };
  str(0, "RIFF"); v.setUint32(4, 36 + pcm.length * 2, true); str(8, "WAVE"); str(12, "fmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, 16000, true); v.setUint32(28, 32000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  str(36, "data"); v.setUint32(40, pcm.length * 2, true);
  for (let i = 0; i < pcm.length; i++) {
    const x = Math.max(-1, Math.min(1, pcm[i]));
    v.setInt16(44 + i * 2, x < 0 ? x * 0x8000 : x * 0x7fff, true);
  }
  return { blob: new Blob([buf], { type: "audio/wav" }), seconds: decoded.duration };
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

async function transcribeWithGemini(apiKey, base64, mime, langLabel) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{
          text: `You are a strict, literal speech-to-text engine inside a language-learning app. The speaker is a learner of ${langLabel} and may pronounce words imperfectly. Write down exactly the words that were actually spoken, in ${langLabel}. Do not correct grammar, do not complete missing words, do not make the sentence more logical or more common, do not translate, and do not add punctuation beyond what is needed. If a word is unclear, write the closest-sounding word that was really said. If there is no intelligible speech, return an empty string. Return only JSON: {"text": "..."}.`,
        }],
      },
      contents: [{ role: "user", parts: [{ text: `Transcribe this short recording (${langLabel}).` }, { inline_data: { mime_type: mime, data: base64 } }] }],
      generationConfig: { temperature: 0, responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    const e = new Error(`שגיאת שרת (${res.status}): ${errText.slice(0, 160)}`);
    e.status = res.status;
    throw e;
  }
  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
  try {
    return String(JSON.parse(raw).text || "").trim();
  } catch (e) {
    return raw.replace(/[{}"]|text:/g, "").trim();
  }
}

const geminiMicSupported = () =>
  typeof navigator !== "undefined" && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && typeof window !== "undefined" && !!window.MediaRecorder;

// Hold-to-talk that records audio and sends it to Gemini. Same interface as useHoldToTalk, plus the "processing" phase.
function useGeminiHoldToTalk(apiKey, langLabel, onFinish, enabled) {
  const [phase, setPhase] = useState("idle"); // idle | starting | listening | processing
  const [error, setError] = useState(null);
  const heldRef = useRef(false);
  const streamRef = useRef(null);
  const streamPromiseRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const stopScheduledRef = useRef(false);
  const aliveRef = useRef(true);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  function getStream() {
    if (streamRef.current) return Promise.resolve(streamRef.current);
    if (!streamPromiseRef.current) {
      streamPromiseRef.current = navigator.mediaDevices
        .getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
        .then((st) => {
          if (!aliveRef.current) { st.getTracks().forEach((t) => t.stop()); return st; }
          streamRef.current = st;
          return st;
        })
        .catch((e) => { streamPromiseRef.current = null; throw e; });
    }
    return streamPromiseRef.current;
  }

  useEffect(() => {
    aliveRef.current = true;
    // open the microphone ahead of the first press so the first words are not clipped
    if (enabled) getStream().catch(() => {});
    return () => {
      aliveRef.current = false;
      heldRef.current = false;
      try { recorderRef.current && recorderRef.current.state !== "inactive" && recorderRef.current.stop(); } catch (e) { /* noop */ }
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function process(blob) {
    if (!aliveRef.current) return;
    setPhase("processing");
    try {
      let mime = "audio/wav";
      let payload;
      let seconds = 1;
      try {
        const wav = await blobToWav16k(blob);
        payload = wav.blob;
        seconds = wav.seconds;
      } catch (e) {
        payload = blob; // could not convert: send the original recording
        mime = (blob.type || "audio/webm").split(";")[0];
      }
      if (seconds < 0.25) throw new Error("ההקלטה קצרה מדי - החזיקו את הכפתור לאורך כל המשפט.");
      const text = await transcribeWithGemini(apiKey, await blobToBase64(payload), mime, langLabel);
      if (!aliveRef.current) return;
      setPhase("idle");
      if (!text) setError("לא זוהה דיבור. נסו להקליט שוב, או להקליד.");
      else if (finishRef.current) finishRef.current(text);
    } catch (e) {
      if (!aliveRef.current) return;
      setPhase("idle");
      setError(
        e.status === 429
          ? "הגעתם למכסת הבקשות של Gemini כרגע. נסו שוב בעוד רגע, או הקלידו."
          : e.message || "שגיאה בתמלול. נסו שוב, או הקלידו."
      );
    }
  }

  async function startHold() {
    if (heldRef.current) return;
    heldRef.current = true;
    stopScheduledRef.current = false;
    setError(null);
    setPhase("starting");
    let stream;
    try {
      stream = await getStream();
    } catch (e) {
      heldRef.current = false;
      setPhase("idle");
      setError("הגישה למיקרופון נחסמה. אשרו הרשאת מיקרופון בדפדפן ונסו שוב.");
      return;
    }
    if (!heldRef.current || !aliveRef.current) { setPhase("idle"); return; } // released while the microphone was opening
    chunksRef.current = [];
    let rec;
    try {
      const types = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
      const mt = types.find((t) => window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(t));
      rec = mt ? new MediaRecorder(stream, { mimeType: mt }) : new MediaRecorder(stream);
    } catch (e) {
      heldRef.current = false;
      setPhase("idle");
      setError("לא הצלחנו להתחיל הקלטה במכשיר הזה. אפשר להקליד.");
      return;
    }
    recorderRef.current = rec;
    rec.ondataavailable = (ev) => { if (ev.data && ev.data.size) chunksRef.current.push(ev.data); };
    rec.onstart = () => setPhase("listening");
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
      chunksRef.current = [];
      process(blob);
    };
    rec.start();
  }

  function stopHold() {
    if (!heldRef.current || stopScheduledRef.current) return;
    stopScheduledRef.current = true;
    setTimeout(() => {
      stopScheduledRef.current = false;
      heldRef.current = false;
      const rec = recorderRef.current;
      if (rec && rec.state !== "inactive") {
        try { rec.stop(); } catch (e) { setPhase("idle"); }
      } else {
        setPhase("idle");
      }
    }, 500); // grace period so the last word isn't clipped
  }

  return { phase, error, supported: enabled, startHold, stopHold };
}

function HoldMic({ mic, label }) {
  const active = mic.phase === "listening" || mic.phase === "starting";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <button
        className={"ela-micbtn" + (active ? " listening" : "")}
        disabled={mic.phase === "processing"}
        onPointerDown={(e) => { e.preventDefault(); mic.startHold(); }}
        onPointerUp={mic.stopHold}
        onPointerLeave={mic.stopHold}
        onPointerCancel={mic.stopHold}
        onContextMenu={(e) => e.preventDefault()}
        aria-label="החזיקו כדי לדבר"
      >
        <Mic size={26} />
      </button>
      <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
        {mic.phase === "starting" ? "מתחברים למיקרופון..." : mic.phase === "listening" ? "מקליט... שחררו כשסיימתם" : mic.phase === "processing" ? "מתמללים..." : label}
      </span>
      {mic.error && <div className="ela-errbox">{mic.error}</div>}
    </div>
  );
}

function ChunkStep({ step, chunk, lang, level, apiKey, langInfo, onResult }) {
  // step.type: recognize | retrieve | use
  const [revealed, setRevealed] = useState(false);
  const [heard, setHeard] = useState("");
  const [typing, setTyping] = useState(false);
  const [typed, setTyped] = useState("");
  const [gaveUp, setGaveUp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fb, setFb] = useState(null);
  const [err, setErr] = useState(null);

  const onHeard = (t) => {
    setHeard(t);
    if (step.type === "use") setTyped(t);
  };
  // preferred: record audio and let Gemini transcribe it literally; otherwise the browser's own recognizer
  const useGemini = !!apiKey && geminiMicSupported();
  const browserMic = useHoldToTalk(langInfo.speechLang, onHeard);
  const geminiMic = useGeminiHoldToTalk(apiKey, langInfo.label, onHeard, useGemini && step.type !== "recognize");
  const mic = useGemini ? geminiMic : browserMic;

  useEffect(() => {
    if (step.type === "recognize") speak(chunk.text, langInfo.speechLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (step.type === "recognize") {
    return (
      <div>
        <div className="ela-flashcard" style={{ cursor: "default" }}>
          <div className="hint">שלב 1 · הכירו את הצ'אנק</div>
          <div className="word" style={{ fontSize: 32 }}>{chunk.text}</div>
          <button className="ela-iconbtn" onClick={() => speak(chunk.text, langInfo.speechLang)} aria-label="השמעה"><Volume2 size={18} /></button>
          <div className="translation">{chunk.he}</div>
          {chunk.ex && <div className="example">{chunk.ex}</div>}
          {chunk.exHe && <div className="exampleHe">{chunk.exHe}</div>}
          {chunk.slot && <div className="hint">💡 {chunk.slot}</div>}
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="ela-btn" onClick={() => onResult({ ok: true })}>הבנתי, הבא</button>
        </div>
      </div>
    );
  }

  if (step.type === "retrieve") {
    const match = heard ? chunkMatch(chunk.text, heard) : 0;
    const good = match >= 0.8;
    const submitTyped = () => {
      if (!typed.trim()) return;
      setHeard(typed.trim());
      setRevealed(true);
    };
    return (
      <div>
        <div className="ela-flashcard" style={{ cursor: "default" }}>
          <div className="hint">שלב 2 · אמרו בקול את הצ'אנק</div>
          <div className="translation" style={{ fontSize: 26 }}>{chunk.he}</div>
          {chunk.slot && !revealed && <div className="hint">{chunk.slot}</div>}
          {revealed && (
            <>
              <div className="word" style={{ fontSize: 30 }}>{chunk.text}</div>
              <button className="ela-iconbtn" onClick={() => speak(chunk.text, langInfo.speechLang)} aria-label="השמעה"><Volume2 size={18} /></button>
              {heard && (
                <div className="example" style={{ color: good ? "var(--sage)" : "var(--rose)" }}>
                  {good ? "✓ נשמע שאמרתם: " : "שמענו: "}“{heard}”
                </div>
              )}
              {chunk.ex && <div className="example">{chunk.ex}</div>}
            </>
          )}
        </div>
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          {!revealed && heard ? (
            <>
              <div className="ela-correction" style={{ width: "100%", textAlign: "center" }}>
                <div className="label">זה מה ששמענו</div>
                <div className="fixed" dir="ltr">“{heard}”</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="ela-btn secondary" onClick={() => { setHeard(""); setTyped(""); }}><RotateCcw size={15} />הקלטה מחדש</button>
                <button className="ela-btn" onClick={() => setRevealed(true)}>בדיקה</button>
              </div>
            </>
          ) : !revealed ? (
            <>
              {mic.supported && !typing && <HoldMic mic={mic} label="החזיקו ואמרו את הצ'אנק" />}
              {(!mic.supported || typing) && (
                <div style={{ display: "flex", gap: 8, width: "100%" }}>
                  <input
                    className="ela-field" dir="ltr" autoFocus value={typed}
                    placeholder={`הקלידו את הצ'אנק ב${langInfo.label}...`}
                    onChange={(e) => setTyped(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") submitTyped(); }}
                  />
                  <button className="ela-btn" disabled={!typed.trim()} onClick={submitTyped}>בדיקה</button>
                </div>
              )}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                {mic.supported && (
                  <button className="ela-chip" onClick={() => setTyping((v) => !v)}>{typing ? "חזרה להקלטה" : "להקליד במקום"}</button>
                )}
                <button className="ela-chip" onClick={() => { setGaveUp(true); setRevealed(true); }}>הצג תשובה</button>
              </div>
            </>
          ) : gaveUp && !heard ? (
            <button className="ela-btn" onClick={() => onResult({ known: false })}>נחזור על זה בקרוב</button>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <button className="ela-btn secondary" onClick={() => onResult({ known: false })}><XIcon size={16} />עוד לא</button>
              <button className="ela-btn" style={good ? undefined : { background: "var(--sage)" }} onClick={() => onResult({ known: true })}><Check size={16} />ידעתי</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // step.type === "use": build your own sentence with the chunk
  async function submit() {
    const sentence = typed.trim();
    if (!sentence) return;
    setBusy(true);
    setErr(null);
    try {
      setFb(await evaluateChunkUsage(apiKey, lang, level, chunk, sentence));
    } catch (e) {
      setErr(e.message || "שגיאה בבדיקת המשפט");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="ela-flashcard" style={{ cursor: "default", minHeight: 150 }}>
        <div className="hint">שלב 3 · בנו משפט משלכם</div>
        <div className="word" style={{ fontSize: 28 }}>{chunk.text}</div>
        <div className="translation" style={{ fontSize: 18 }}>{chunk.he}</div>
        {chunk.slot && <div className="hint">💡 {chunk.slot}</div>}
      </div>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        {!fb ? (
          <>
            {mic.supported && <HoldMic mic={mic} label="החזיקו ואמרו משפט עם הצ'אנק" />}
            <textarea
              className="ela-transcriptbox" dir="ltr" rows={2} value={typed}
              placeholder={`משפט ב${langInfo.label} עם "${chunk.text}"`}
              onChange={(e) => setTyped(e.target.value)}
            />
            {err && <div className="ela-errbox">{err}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="ela-btn secondary" onClick={() => onResult({ skip: true })}>דלגו</button>
              <button className="ela-btn" disabled={!typed.trim() || busy} onClick={submit}>
                {busy ? <Loader2 size={16} className="ela-spin" /> : null}בדיקה
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="ela-correction" style={{ width: "100%" }}>
              <div className="label">{fb.score === 2 ? "מצוין!" : fb.score === 1 ? "כמעט שם" : "ננסה שוב בהמשך"}</div>
              {fb.correction && <div className="fixed">{fb.correction}</div>}
              {fb.feedbackHe && <div className="fb">{fb.feedbackHe}</div>}
              {fb.alt && <div className="fb" dir="ltr" style={{ marginTop: 6 }}>{fb.alt}</div>}
            </div>
            <button className="ela-btn" onClick={() => onResult({ score: fb.score })}>המשך</button>
          </>
        )}
      </div>
    </div>
  );
}

function speakWait(text, lang) {
  return new Promise((resolve) => {
    try {
      if (!window.speechSynthesis || !text) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.92;
      const v = pickVoice(lang);
      if (v) u.voice = v;
      let done = false;
      const finish = () => { if (!done) { done = true; clearTimeout(t); resolve(); } };
      // some browsers never fire onend - never let the loop hang
      const t = setTimeout(finish, 6000 + text.length * 160);
      u.onend = finish;
      u.onerror = finish;
      window.speechSynthesis.speak(u);
    } catch (e) {
      resolve();
    }
  });
}

const sleepMs = (ms) => new Promise((r) => setTimeout(r, ms));

// Hands-free listening: Hebrew prompt -> a pause to say it aloud -> the chunk -> its example sentence.
function ChunkListen({ chunks, lang, onBack }) {
  const langInfo = languageInfo(lang);
  const [queue] = useState(() => {
    const t = todayStr();
    const learned = Object.values(chunks || {}).filter((c) => (c.stage || 0) >= 1);
    const dueIds = new Set(dueChunks(chunks || {}, t).map((c) => c.id));
    const due = shuffle(learned.filter((c) => dueIds.has(c.id)));
    const rest = shuffle(learned.filter((c) => !dueIds.has(c.id)));
    return [...due, ...rest].slice(0, 15);
  });
  const [i, setI] = useState(0);
  const [stage, setStage] = useState("idle"); // he | gap | chunk | ex | idle
  const [playing, setPlaying] = useState(true);
  const [gapSec, setGapSec] = useState(5);
  const [finished, setFinished] = useState(false);
  const wakeRef = useRef(null);

  useEffect(() => {
    try {
      if (navigator.wakeLock) navigator.wakeLock.request("screen").then((l) => { wakeRef.current = l; }).catch(() => {});
    } catch (e) { /* noop */ }
    return () => {
      try { wakeRef.current && wakeRef.current.release(); } catch (e) { /* noop */ }
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* noop */ }
    };
  }, []);

  useEffect(() => {
    if (!playing || finished || !queue[i]) return undefined;
    let cancelled = false;
    const c = queue[i];
    (async () => {
      setStage("he");
      await speakWait(c.he, "he-IL");
      if (cancelled) return;
      setStage("gap");
      await sleepMs(gapSec * 1000);
      if (cancelled) return;
      setStage("chunk");
      await speakWait(c.text, langInfo.speechLang);
      if (cancelled) return;
      await sleepMs(1200);
      if (cancelled) return;
      if (c.ex) {
        setStage("ex");
        await speakWait(c.ex, langInfo.speechLang);
        if (cancelled) return;
        await sleepMs(900);
        if (cancelled) return;
      }
      if (i + 1 >= queue.length) { setFinished(true); setStage("idle"); }
      else setI(i + 1);
    })();
    return () => {
      cancelled = true;
      try { window.speechSynthesis.cancel(); } catch (e) { /* noop */ }
    };
  }, [i, playing, gapSec, finished]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!queue.length) {
    return (
      <div>
        <BackRow onBack={onBack} />
        <p className="ela-sub">עדיין אין צ'אנקים להאזנה. למדו קודם כמה צ'אנקים חדשים.</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ textAlign: "center", paddingTop: 20 }}>
        <Sparkles size={30} color="var(--gold)" />
        <h1 className="ela-h1" style={{ marginTop: 12 }}>סיימתם סבב האזנה</h1>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
          <button className="ela-btn secondary" onClick={() => { setI(0); setFinished(false); setPlaying(true); }}>עוד סבב</button>
          <button className="ela-btn" onClick={onBack}>חזרה</button>
        </div>
      </div>
    );
  }

  const c = queue[i];
  return (
    <div>
      <BackRow onBack={onBack} label="סיום האזנה" />
      <div className="ela-progressbar"><div style={{ width: `${(i / queue.length) * 100}%` }} /></div>
      <div className="ela-flashcard" style={{ cursor: "default" }}>
        <div className="hint">{i + 1} מתוך {queue.length}</div>
        <div className="translation" style={{ fontSize: 26 }}>{c.he}</div>
        {stage === "gap" && (
          <>
            <div className="hint">עכשיו אמרו בקול...</div>
            <div style={{ width: 200, height: 6, background: "var(--mist)", borderRadius: 999, overflow: "hidden" }}>
              <div key={i + "gap"} style={{ height: "100%", background: "var(--sage)", animation: `ela-gap ${gapSec}s linear forwards` }} />
            </div>
          </>
        )}
        {(stage === "chunk" || stage === "ex") && <div className="word" style={{ fontSize: 30 }}>{c.text}</div>}
        {stage === "ex" && c.ex && <div className="example">{c.ex}</div>}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
        <button className="ela-btn secondary" disabled={i === 0} onClick={() => setI(i - 1)}>הקודם</button>
        <button className="ela-btn" onClick={() => setPlaying((p) => !p)}>{playing ? "השהיה" : "המשך"}</button>
        <button className="ela-btn secondary" onClick={() => (i + 1 >= queue.length ? setFinished(true) : setI(i + 1))}>הבא</button>
      </div>
      <p className="ela-sub" style={{ textAlign: "center", marginTop: 18, marginBottom: 6 }}>זמן להשלמה בקול:</p>
      <div className="ela-chiprow" style={{ justifyContent: "center" }}>
        {[3, 5, 8].map((n) => (
          <button key={n} className={"ela-chip" + (gapSec === n ? " active" : "")} onClick={() => setGapSec(n)}>{n} שניות</button>
        ))}
      </div>
      <p className="ela-note" style={{ textAlign: "center" }}>
        ההאזנה עובדת כשהמסך דולק והאפליקציה פתוחה. זה תרגול שליפה פסיבי - ההתקדמות בחזרות לא משתנה.
      </p>
    </div>
  );
}

function ChunkPractice({ lang, level, apiKey, chunks, blocked, onSave, onFinish, onBack }) {
  const langInfo = languageInfo(lang);
  const effectiveLevel = level === "all" ? "intermediate" : level;
  const bankRef = useRef(chunks || {});
  const blockedRef = useRef(blocked || []);
  const [view, setView] = useState("menu"); // menu | loading | session | summary
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState({ known: 0, missed: 0, used: 0 });
  const [customTopic, setCustomTopic] = useState("");
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(false);
  const [, force] = useState(0);
  const today = todayStr();

  const bank = bankRef.current;
  const all = Object.values(bank);
  const due = dueChunks(bank, today);
  const counts = { new: 0, learning: 0, mastered: 0 };
  all.forEach((c) => { counts[chunkStatus(c).key]++; });

  function commit(next, xp = 0, newBlocked) {
    bankRef.current = next;
    if (newBlocked) blockedRef.current = newBlocked;
    onSave(next, xp, newBlocked);
    force((n) => n + 1);
  }

  function removeChunk(c) {
    if (!window.confirm(`למחוק את "${c.text}" מהרשימה? הוא לא יחזור בחזרות ולא יוצע שוב.`)) return;
    const next = { ...bankRef.current };
    delete next[c.id];
    commit(next, 0, [...blockedRef.current, c.text].slice(-300));
  }

  function beginSession(list, includeUse) {
    const ids = list.map((c) => c.id);
    const s = [];
    if (list.some((c) => (c.stage || 0) < 1)) ids.forEach((id) => s.push({ type: "recognize", id }));
    ids.forEach((id) => s.push({ type: "retrieve", id }));
    if (includeUse) {
      list.filter((c) => (c.stage || 0) < 3).slice(0, 3).forEach((c) => s.push({ type: "use", id: c.id }));
    }
    setSteps(s);
    setIdx(0);
    setResults({ known: 0, missed: 0, used: 0 });
    setView("session");
  }

  async function startNew(topic) {
    setError(null);
    setView("loading");
    try {
      const exclude = [...Object.values(bankRef.current).map((c) => c.text), ...blockedRef.current];
      const fresh = await generateAIChunks(apiKey, lang, effectiveLevel, topic, exclude);
      if (!fresh.length) throw new Error("לא נוצרו צ'אנקים, נסו שוב.");
      const next = { ...bankRef.current };
      fresh.forEach((c) => { next[c.id] = { ...c, box: 0, due: todayStr(), stage: 0, added: todayStr(), reviews: 0, lapses: 0 }; });
      commit(pruneBank(next));
      beginSession(fresh.map((c) => bankRef.current[c.id]).filter(Boolean), true);
    } catch (e) {
      setError(e.message || "שגיאה ביצירת צ'אנקים");
      setView("menu");
    }
  }

  function startReview() {
    beginSession(dueChunks(bankRef.current, todayStr()).slice(0, 10), true);
  }

  function handleResult(r) {
    const step = steps[idx];
    const cur = bankRef.current[step.id];
    if (cur) {
      const t = todayStr();
      if (step.type === "recognize") {
        commit({ ...bankRef.current, [cur.id]: { ...cur, stage: Math.max(cur.stage || 0, 1) } });
      } else if (step.type === "retrieve") {
        commit({ ...bankRef.current, [cur.id]: retrievalUpdate(cur, !!r.known, t) }, r.known ? 10 : 2);
        setResults((x) => ({ ...x, known: x.known + (r.known ? 1 : 0), missed: x.missed + (r.known ? 0 : 1) }));
      } else if (step.type === "use" && !r.skip) {
        commit({ ...bankRef.current, [cur.id]: usageUpdate(cur, r.score, t) }, r.score === 2 ? 15 : 8);
        setResults((x) => ({ ...x, used: x.used + 1 }));
      }
    }
    if (idx + 1 >= steps.length) setView("summary");
    else setIdx(idx + 1);
  }

  if (view === "loading") {
    return (
      <div>
        <BackRow onBack={onBack} />
        <div className="ela-loadingbox"><Loader2 size={30} className="ela-spin" /><p>ה-AI מכין צ'אנקים חדשים...</p></div>
      </div>
    );
  }

  if (view === "listen") {
    return <ChunkListen chunks={bankRef.current} lang={lang} onBack={() => setView("menu")} />;
  }

  if (view === "session") {
    const step = steps[idx];
    const chunk = bankRef.current[step.id];
    return (
      <div>
        <BackRow onBack={() => setView("menu")} label="סיום מוקדם" />
        <div className="ela-progressbar"><div style={{ width: `${(idx / steps.length) * 100}%` }} /></div>
        <ChunkStep key={idx} step={step} chunk={chunk} lang={lang} level={effectiveLevel} apiKey={apiKey} langInfo={langInfo} onResult={handleResult} />
      </div>
    );
  }

  if (view === "summary") {
    return (
      <div style={{ textAlign: "center", paddingTop: 20 }}>
        <Sparkles size={30} color="var(--gold)" />
        <h1 className="ela-h1" style={{ marginTop: 12 }}>סיימתם!</h1>
        <p className="ela-sub">
          שלפתם נכון {results.known} צ'אנקים{results.missed ? `, ${results.missed} יחזרו אליכם בקרוב` : ""}
          {results.used ? `, ובניתם ${results.used} משפטים משלכם` : ""}.
        </p>
        <p className="ela-sub" style={{ marginTop: -8 }}>בתרגול הדיבור ה-AI ינסה להזמין אתכם להשתמש בצ'אנקים שלמדתם.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
          <button className="ela-btn secondary" onClick={() => setView("menu")}>עוד צ'אנקים</button>
          <button className="ela-btn" onClick={() => onFinish()}>לדף הבית</button>
        </div>
      </div>
    );
  }

  const topicBtn = (t) => (
    <button key={t} className="ela-chip" onClick={() => startNew(t)}>{t}</button>
  );
  return (
    <div>
      <BackRow onBack={onBack} />
      <h1 className="ela-h1">צ'אנקים</h1>
      <p className="ela-sub">
        לומדים צירופי מילים שלמים ב{langInfo.label} ושולפים אותם בשטף - במקום מילים בודדות. זיהוי, שליפה בדיבור, ובניית משפט משלכם.
      </p>
      {error && <div className="ela-errbox">{error}</div>}

      {all.length > 0 && (
        <div style={{ display: "flex", gap: 18, color: "var(--muted)", fontSize: 13.5, marginBottom: 14, flexWrap: "wrap" }}>
          <span><b style={{ color: "var(--ink)" }}>{all.length}</b> צ'אנקים</span>
          <span><b style={{ color: "var(--ink)" }}>{counts.learning + counts.new}</b> בלמידה</span>
          <span><b style={{ color: "var(--sage)" }}>{counts.mastered}</b> שולטים</span>
        </div>
      )}

      {due.length > 0 && (
        <div className="ela-bigcard" style={{ marginBottom: 16 }} onClick={startReview}>
          <div className="icon-wrap" style={{ background: "var(--rose-light)", color: "var(--rose)" }}><Layers size={22} /></div>
          <h3>חזרה על צ'אנקים</h3>
          <p>{due.length} צ'אנקים מחכים לשליפה. זה בדיוק התרגול שמחזק את השטף.</p>
        </div>
      )}

      {all.some((c) => (c.stage || 0) >= 1) && (
        <div className="ela-bigcard" style={{ marginBottom: 16 }} onClick={() => setView("listen")}>
          <div className="icon-wrap" style={{ background: "var(--gold-light)", color: "#8A6412" }}><Volume2 size={22} /></div>
          <h3>מצב האזנה</h3>
          <p>האפליקציה אומרת את העברית, אתם משלימים בקול, והיא משמיעה את הצירוף. מתאים להליכה או לנסיעה.</p>
        </div>
      )}

      <p className="ela-sub" style={{ marginBottom: 10, fontWeight: 600 }}>צ'אנקים חדשים - בחרו נושא או כתבו משלכם:</p>
      <div className="ela-fieldrow" style={{ marginBottom: 14 }}>
        <input
          className="ela-field" placeholder="למשל: שיחת חולין עם עמית לעבודה" value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && customTopic.trim()) startNew(customTopic.trim()); }}
        />
        <button className="ela-btn" disabled={!customTopic.trim()} onClick={() => startNew(customTopic.trim())}>התחילו</button>
      </div>
      <div className="ela-chiprow">{TOPICS.map(topicBtn)}</div>

      {all.length > 0 && (
        <div style={{ marginTop: 22, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="ela-chip util" onClick={() => setShowList((v) => !v)}>{showList ? "הסתר את הצ'אנקים שלי" : "הצ'אנקים שלי"}</button>
          <button className="ela-chip util" onClick={() => downloadFile(`speakup-chunks-${lang}-${todayStr()}.csv`, chunksToCsv(bankRef.current), "text/csv")}>ייצוא לקובץ (CSV)</button>
          {showList && (
            <div style={{ marginTop: 4, width: "100%" }}>
              {[...all].reverse().slice(0, 60).map((c) => (
                <div key={c.id} className="ela-optbtn" style={{ cursor: "default", display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span dir="ltr" style={{ textAlign: "left" }}>{c.text}</span>
                  <span style={{ fontWeight: 500, color: "var(--muted)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 8 }}>
                    {c.he} · {chunkStatus(c).label}
                    <button
                      onClick={() => removeChunk(c)}
                      aria-label="מחיקת הצ'אנק"
                      style={{ border: "1px solid var(--mist)", background: "var(--card)", color: "var(--rose)", borderRadius: 8, width: 28, height: 28, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <XIcon size={14} />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================== ONBOARDING ============================== */

function Onboarding({ onFinish }) {
  return (
    <div style={{ padding: "40px 6px", textAlign: "center" }}>
      <Sparkles size={30} color="var(--gold)" />
      <h1 className="ela-h1" style={{ marginTop: 14 }}>ברוכים הבאים ללימוד שפות</h1>
      <p className="ela-sub">תרגול קצר ויומיומי של מילים ושיחות — עובד גם בנייד וגם במחשב. אפשר להתחיל עם אנגלית, ולהוסיף שפות נוספות בהמשך ממסך הבית.</p>
      <p className="ela-sub" style={{ marginTop: -10 }}>באיזו רמה תרצו להתחיל באנגלית?</p>
      <div className="ela-chiprow" style={{ justifyContent: "center" }}>
        {[{ id: "all", label: "לא בטוח, התחילו מהכל" }, ...LEVELS].map((lv) => (
          <button key={lv.id} className="ela-chip" onClick={() => onFinish(lv.id)}>{lv.label}</button>
        ))}
      </div>
    </div>
  );
}

/* ============================== APP ============================== */

export default function App() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("home");
  const [convoOpen, setConvoOpen] = useState(null);
  const [convoLoading, setConvoLoading] = useState(false);
  const [convoError, setConvoError] = useState(null);
  const [vocabPhase, setVocabPhase] = useState("session");
  const [lastResults, setLastResults] = useState([]);
  const [levelSuggestion, setLevelSuggestion] = useState(null);
  const [backupTick, setBackupTick] = useState(0);

  useEffect(() => {
    (async () => {
      const loaded = await loadState();
      setState(loaded || defaultState());
      setLoading(false);
    })();
  }, []);

  const persist = useCallback((next) => {
    setState(next);
    saveState(next);
  }, []);

  // ask the browser not to evict our saved progress under storage pressure
  useEffect(() => {
    try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) { /* noop */ }
  }, []);

  // after every completed practice session, refresh the auto-backup file (if one was connected)
  const prevSessionsRef = useRef(null);
  useEffect(() => {
    if (!state) return;
    const n = state.stats.sessionsCompleted;
    if (prevSessionsRef.current !== null && n > prevSessionsRef.current) {
      writeBackupFile(state).then((r) => { if (r === "ok") setBackupTick((t) => t + 1); });
    }
    prevSessionsRef.current = n;
  }, [state]);

  if (loading || !state) {
    return (
      <div className="ela-root">
        <GlobalStyle />
        <div style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>טוען...</div>
      </div>
    );
  }

  if (!state.onboarded) {
    return (
      <div className="ela-root">
        <GlobalStyle />
        <Onboarding
          onFinish={(level) =>
            persist({
              ...state,
              onboarded: true,
              langData: { ...state.langData, en: { ...state.langData.en, level } },
            })
          }
        />
      </div>
    );
  }

  const currentLang = state.settings.language || "en";
  const langData = state.langData[currentLang] || defaultLangData();
  const langInfo = languageInfo(currentLang);
  const levelFilter = langData.level;
  const pool = VOCAB.filter((w) => levelFilter === "all" || w.level === levelFilter);
  const dueCount = currentLang === "en" ? pool.filter((w) => langData.words[w.id] && isDue(langData.words[w.id].due)).length : 0;
  const newCount = currentLang === "en" ? pool.filter((w) => !langData.words[w.id]).length : 0;

  function updateLangData(updates) {
    persist({
      ...state,
      langData: { ...state.langData, [currentLang]: { ...langData, ...updates } },
    });
  }

  function setLevel(level) {
    updateLangData({ level });
  }

  function setLanguage(lang) {
    persist({
      ...state,
      settings: { ...state.settings, language: lang },
      langData: { ...state.langData, [lang]: state.langData[lang] || defaultLangData() },
    });
    setLevelSuggestion(null);
    goTab("home");
  }

  function saveApiKey(key) {
    persist({ ...state, settings: { ...state.settings, apiKey: key } });
  }

  function finishVocabSession(results, wasAI) {
    let words = { ...langData.words };
    let aiSeenWords = langData.aiSeenWords;
    if (wasAI) {
      const newWords = results.map((r) => r.en).filter(Boolean);
      aiSeenWords = [...aiSeenWords, ...newWords].slice(-60);
    } else {
      results.forEach(({ id, correct }) => {
        const prev = words[id] || { box: 0, due: todayStr() };
        const box = correct ? Math.min(prev.box + 1, BOX_INTERVALS.length - 1) : 1;
        words[id] = { box, due: addDays(todayStr(), correct ? BOX_INTERVALS[box] : 0) };
      });
    }
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = results.length ? correctCount / results.length : 0;
    const stats = touchStreak({
      ...state.stats,
      xp: state.stats.xp + correctCount * 10,
      sessionsCompleted: state.stats.sessionsCompleted + 1,
    });
    const { langData: newLangData, suggestion } = updateLevelStats({ ...langData, words, aiSeenWords }, levelFilter, accuracy);
    persist({ ...state, stats, langData: { ...state.langData, [currentLang]: newLangData } });
    setLastResults(results);
    setLevelSuggestion(suggestion);
    setVocabPhase("summary");
  }

  function acceptLevelSuggestion() {
    if (levelSuggestion) setLevel(levelSuggestion.to);
    setLevelSuggestion(null);
  }

  function completeConvo(id, persistDone = true) {
    const convosDone = persistDone ? { ...langData.convosDone, [id]: true } : langData.convosDone;
    const stats = touchStreak({ ...state.stats, xp: state.stats.xp + 15, sessionsCompleted: state.stats.sessionsCompleted + 1 });
    persist({ ...state, stats, langData: { ...state.langData, [currentLang]: { ...langData, convosDone } } });
  }

  function recordMistakeTag(tag) {
    const mistakeTags = [...(langData.speakingMemory?.mistakeTags || []), tag].slice(-30);
    updateLangData({ speakingMemory: { ...langData.speakingMemory, mistakeTags } });
  }

  function saveChunks(chunks, xp = 0, chunkBlocked) {
    const stats = xp ? { ...state.stats, xp: state.stats.xp + xp } : state.stats;
    const next = chunkBlocked ? { ...langData, chunks, chunkBlocked } : { ...langData, chunks };
    persist({ ...state, stats, langData: { ...state.langData, [currentLang]: next } });
  }

  function finishChunkSession() {
    persist({
      ...state,
      stats: touchStreak({ ...state.stats, sessionsCompleted: state.stats.sessionsCompleted + 1 }),
    });
    goTab("home");
  }

  // learned chunks used naturally in a speaking conversation count as a successful recall
  function markChunksUsed(ids) {
    const t = todayStr();
    const chunks = { ...(langData.chunks || {}) };
    let changed = false;
    ids.forEach((id) => {
      if (chunks[id]) { chunks[id] = naturalUseUpdate(chunks[id], t); changed = true; }
    });
    if (changed) saveChunks(chunks, 5 * ids.length);
  }

  const recentFocus = summarizeFocusAreas(langData.speakingMemory?.mistakeTags || []);

  async function openAIConvo(topic) {
    setConvoError(null);
    setConvoLoading(true);
    try {
      const effectiveLevel = levelFilter === "all" ? "intermediate" : levelFilter;
      const dlg = await generateAIDialogue(state.settings.apiKey, currentLang, effectiveLevel, topic);
      setConvoOpen(dlg);
    } catch (e) {
      setConvoError(e.message || "שגיאה ביצירת השיחה");
    } finally {
      setConvoLoading(false);
    }
  }

  function goTab(next) {
    setTab(next);
    setVocabPhase("session");
    setConvoOpen(null);
    setConvoError(null);
    setLevelSuggestion(null);
  }

  const navItems = [
    { id: "home", label: "בית", Icon: HomeIcon },
    { id: "vocab", label: "מילים", Icon: BookOpen },
    { id: "convo", label: "שיחה", Icon: MessageCircle },
    ...(state.settings.apiKey ? [{ id: "chunks", label: "צ'אנקים", Icon: Layers }] : []),
    ...(state.settings.apiKey ? [{ id: "speaking", label: "דיבור", Icon: Mic }] : []),
    { id: "settings", label: "הגדרות", Icon: SettingsIcon },
  ];

  return (
    <div className="ela-root">
      <GlobalStyle />
      <div className="ela-shell">
        <nav className="ela-nav-desktop">
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, padding: "4px 12px 18px 12px" }}>
            Speak<span style={{ color: "var(--sage)" }}>Up</span>
          </div>
          {navItems.map(({ id, label, Icon }) => (
            <button key={id} className={"ela-navbtn" + (tab === id ? " active" : "")} onClick={() => goTab(id)}>
              <Icon size={18} />{label}
            </button>
          ))}
        </nav>

        <main className="ela-main">
          {tab === "home" && (
            <Home
              state={state}
              langData={langData}
              currentLang={currentLang}
              setLevel={setLevel}
              setLanguage={setLanguage}
              dueCount={dueCount}
              newCount={newCount}
              chunkDue={dueChunks(langData.chunks || {}, todayStr()).length}
              chunkTotal={Object.keys(langData.chunks || {}).length}
              backupStale={state.stats.sessionsCompleted >= 3 && (() => { const d = daysSinceBackup(); return d === null || d >= 7; })()}
              onGo={goTab}
            />
          )}

          {tab === "vocab" && vocabPhase === "session" && (
            <VocabSession
              key={currentLang + levelFilter + dueCount + state.settings.apiKey}
              state={state}
              langData={langData}
              lang={currentLang}
              apiKey={state.settings.apiKey || null}
              onFinish={finishVocabSession}
              onBack={() => goTab("home")}
            />
          )}
          {tab === "vocab" && vocabPhase === "summary" && (
            <VocabSummary
              results={lastResults}
              suggestion={levelSuggestion}
              onAcceptLevel={acceptLevelSuggestion}
              onDismissLevel={() => setLevelSuggestion(null)}
              onDone={() => goTab("home")}
            />
          )}

          {tab === "convo" && !convoOpen && !convoLoading && (
            <ConvoList state={state} langData={langData} lang={currentLang} onOpen={setConvoOpen} onOpenAI={openAIConvo} onBack={() => goTab("home")} />
          )}
          {tab === "convo" && convoLoading && (
            <div>
              <BackRow onBack={() => goTab("home")} />
              <div className="ela-loadingbox"><Loader2 size={30} className="ela-spin" /><p>ה-AI כותב שיחה חדשה...</p></div>
            </div>
          )}
          {tab === "convo" && convoError && !convoLoading && (
            <div>
              <BackRow onBack={() => setConvoError(null)} />
              <div className="ela-errbox">{convoError}</div>
            </div>
          )}
          {tab === "convo" && convoOpen && (
            <ConvoPlayer
              dialogue={convoOpen}
              speechLang={langInfo.speechLang}
              done={!!langData.convosDone[convoOpen.id]}
              onBack={() => setConvoOpen(null)}
              onComplete={() => {
                completeConvo(convoOpen.id, !convoOpen.isAI);
                setConvoOpen(null);
              }}
            />
          )}

          {tab === "settings" && (
            <Settings
              state={state}
              onSave={saveApiKey}
              onRestore={(restored) => persist({ ...restored, onboarded: true, settings: { ...restored.settings, apiKey: state.settings.apiKey } })}
              onBackedUp={() => setBackupTick((t) => t + 1)}
            />
          )}

          {tab === "chunks" && state.settings.apiKey && (
            <ChunkPractice
              key={currentLang + levelFilter}
              lang={currentLang}
              level={levelFilter}
              apiKey={state.settings.apiKey}
              chunks={langData.chunks || {}}
              blocked={langData.chunkBlocked || []}
              onSave={saveChunks}
              onFinish={finishChunkSession}
              onBack={() => goTab("home")}
            />
          )}

          {tab === "speaking" && state.settings.apiKey && (
            <SpeakingPractice
              key={currentLang + levelFilter}
              chunks={langData.chunks || {}}
              onChunksUsed={markChunksUsed}
              level={levelFilter}
              lang={currentLang}
              apiKey={state.settings.apiKey}
              recentFocus={recentFocus}
              onMistakeTag={recordMistakeTag}
              onBack={() => goTab("home")}
              onSessionEnd={() => {
                completeConvo(`speaking-${Date.now()}`, false);
                goTab("home");
              }}
            />
          )}
        </main>
      </div>

      <div className="ela-nav-mobile">
        {navItems.map(({ id, label, Icon }) => (
          <button key={id} className={tab === id ? "active" : ""} onClick={() => goTab(id)}>
            <Icon size={20} />{label}
          </button>
        ))}
      </div>
    </div>
  );
}

