import { useEffect, useState } from "react";

/* ---------------- DOODLE BACKGROUND ---------------- */
function DoodleBackground() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <path
        d="M180 280 C80 80, 420 100, 360 300 C300 520, 120 480, 180 280 Z"
        fill="#e0e7ff"
        opacity="0.6"
      />
      <path
        d="M1040 220 C900 40, 1240 120, 1160 320 C1080 520, 880 420, 1040 220 Z"
        fill="#ecfeff"
        opacity="0.6"
      />
      <path
        d="M200 120 Q400 40 600 140"
        stroke="#6366f1"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 6"
        opacity="0.4"
      />
      <path
        d="M800 760 Q1040 640 1260 720"
        stroke="#06b6d4"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 6"
        opacity="0.4"
      />
    </svg>
  );
}

/* ---------------- MAIN APP ---------------- */
export default function App() {
  const conversation = [
    {
      speaker: "left",
      original: "Hello, how are you?",
      translated: "नमस्ते, आप कैसे हैं?",
    },
    {
      speaker: "right",
      original: "मैं ठीक हूँ, धन्यवाद",
      translated: "I am fine, thank you",
    },
  ];

  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(45);

  // NEW: language state
  const [leftLang, setLeftLang] = useState("English");
  const [rightLang, setRightLang] = useState("Hindi");

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((p) => (p + 1) % conversation.length);
      setSeconds((s) => (s > 0 ? s - 4 : 45));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = conversation[step];
  const time = `00:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <DoodleBackground />

      <div style={{ ...styles.page, position: "relative", zIndex: 1 }}>
        {/* HEADING */}
        <div style={styles.brandWrap}>
          <h1 style={styles.brandArt}>
            <span style={{ color: "#4f46e5" }}>V</span>
            <span style={{ color: "#06b6d4" }}>A</span>
            <span style={{ color: "#a855f7" }}>A</span>
            <span style={{ color: "#6366f1" }}>R</span>
            <span style={{ color: "#0ea5e9" }}>T</span>
            <span style={{ color: "#9333ea" }}>A</span>
          </h1>
          <svg width="200" height="18">
            <path
              d="M10 12 Q100 2 190 12"
              stroke="#6366f1"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p style={styles.tagline}>Real-time AI Phone Call Translation</p>
        <div style={styles.timer}>📞 {time}</div>

        <div style={styles.scene}>
          {/* LEFT SIDE */}
          <PersonCard
            title="Office"
            name="Rishi"
            language={leftLang}
            onLanguageChange={setLeftLang}
            speaking={current.speaker === "left"}
            text={
              current.speaker === "left"
                ? current.original
                : current.translated
            }
            isTranslated={current.speaker !== "left"}
            bg="#eef2ff"
          />

          {/* RIGHT SIDE */}
          <PersonCard
            title="Street"
            name="Ankita"
            language={rightLang}
            onLanguageChange={setRightLang}
            speaking={current.speaker === "right"}
            text={
              current.speaker === "right"
                ? current.original
                : current.translated
            }
            isTranslated={current.speaker !== "right"}
            bg="#ecfeff"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- PERSON CARD ---------------- */
function PersonCard({
  title,
  name,
  language,
  onLanguageChange,
  speaking,
  text,
  isTranslated,
  bg,
}) {
  return (
    <div style={{ ...styles.card, background: bg }}>
      <div style={styles.cardTitle}>{title}</div>

      {/* Illustrated person */}
      <svg width="160" height="220" viewBox="0 0 160 220">
        <circle cx="80" cy="40" r="26" fill="#fde68a" />
        <path d="M55 38 Q80 10 105 38" fill="#1f2937" />
        <rect x="50" y="70" width="60" height="80" rx="20" fill="#93c5fd" />
        <rect x="110" y="85" width="12" height="50" rx="6" fill="#fde68a" />
        <rect x="122" y="80" width="10" height="28" rx="3" fill="#111827" />
        <rect x="55" y="150" width="18" height="55" rx="8" fill="#1e3a8a" />
        <rect x="87" y="150" width="18" height="55" rx="8" fill="#1e3a8a" />
      </svg>

      <p style={styles.name}>{name}</p>

      {/* LANGUAGE SELECTOR */}
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        style={styles.languageSelect}
      >
        <option>English</option>
        <option>Hindi</option>
        <option>Punjabi</option>
        <option>Marathi</option>
        <option>Tamil</option>
        <option>Gujrati</option>
        <option>Bhojpuri</option>
        <option>Telugu</option>
        <option>Kannada</option>
        <option>Malayalam</option>  
        <option>Odia</option>
        <option>Assamese</option>
        <option>Maithili</option>
        <option>Urdu</option>
        <option>Bengali</option>
      </select>

      <p style={styles.status}>{speaking ? "Speaking…" : "Listening…"}</p>

      {/* TRANSLATION HIGHLIGHT */}
      <div
        style={{
          ...styles.bubble,
          ...(isTranslated ? styles.translatedBubble : {}),
        }}
      >
        <span style={{ fontWeight: isTranslated ? "700" : "400" }}>
          {text}
        </span>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "24px",
    fontFamily: "Segoe UI, sans-serif",
  },
  brandWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  brandArt: {
    fontSize: "56px",
    fontWeight: "900",
    letterSpacing: "6px",
  },
  tagline: {
    color: "#475569",
    marginBottom: "8px",
    fontSize: "15px",
  },
  timer: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#334155",
  },
  scene: {
    display: "flex",
    gap: "80px",
  },
  card: {
    width: "320px",
    borderRadius: "24px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: "10px",
    color: "#4f46e5",
  },
  name: {
    fontWeight: "700",
  },
  status: {
    fontSize: "14px",
    marginBottom: "8px",
  },
  languageSelect: {
    margin: "8px 0 10px",
    padding: "6px 10px",
    borderRadius: "10px",
    border: "1px solid #c7d2fe",
    background: "#fff",
    fontSize: "13px",
  },
  bubble: {
    background: "#ffffff",
    padding: "14px",
    borderRadius: "18px",
    fontSize: "14px",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  translatedBubble: {
    border: "2px solid #6366f1",
    boxShadow: "0 0 18px rgba(99,102,241,0.35)",
    background: "#f8fafc",
  },
};
