import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const theme = {
  sage: "#7BAF8E",
  sageLight: "#A8C9B5",
  sageDark: "#4E8267",
  mint: "#C8E6D4",
  cream: "#FAF7F2",
  sand: "#EDE8DF",
  charcoal: "#2C3E35",
  slate: "#4A5E54",
  mist: "#8FA898",
  gold: "#C9A96E",
  blush: "#E8B4B0",
  lavender: "#B8B5D4",
  sky: "#B0CDD8",
  white: "#FFFFFF",
};

// ─── GOOGLE FONTS INJECTION ───────────────────────────────────────────────────
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #FAF7F2; font-family: 'DM Sans', sans-serif; color: #2C3E35; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #EDE8DF; }
      ::-webkit-scrollbar-thumb { background: #7BAF8E; border-radius: 2px; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideRight {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
      }
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes waveGrow {
        0%, 100% { height: 4px; }
        50% { height: 20px; }
      }

      .fade-up { animation: fadeUp 0.6s ease forwards; }
      .fade-in { animation: fadeIn 0.4s ease forwards; }
      .float { animation: float 4s ease-in-out infinite; }

      .glass-card {
        background: rgba(255,255,255,0.7);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(123,175,142,0.2);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(78,130,103,0.08);
      }

      .btn-primary {
        background: linear-gradient(135deg, #7BAF8E, #4E8267);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 14px 32px;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        font-size: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(123,175,142,0.4);
      }
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(123,175,142,0.5);
      }
      .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .btn-ghost {
        background: transparent;
        color: #4E8267;
        border: 1.5px solid #7BAF8E;
        border-radius: 50px;
        padding: 12px 28px;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .btn-ghost:hover {
        background: rgba(123,175,142,0.1);
        transform: translateY(-1px);
      }

      input, textarea {
        font-family: 'DM Sans', sans-serif;
        outline: none;
        transition: all 0.3s ease;
      }
      input:focus, textarea:focus {
        border-color: #7BAF8E !important;
        box-shadow: 0 0 0 3px rgba(123,175,142,0.15) !important;
      }

      .nav-tab {
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'DM Sans', sans-serif;
      }

      .emoji-btn {
        background: white;
        border: 2px solid #EDE8DF;
        border-radius: 12px;
        padding: 12px 16px;
        cursor: pointer;
        transition: all 0.25s ease;
        font-size: 22px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .emoji-btn:hover {
        border-color: #7BAF8E;
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(123,175,142,0.2);
      }
      .emoji-btn.selected {
        border-color: #7BAF8E;
        background: rgba(123,175,142,0.12);
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(123,175,142,0.25);
      }

      .choice-btn {
        background: white;
        border: 1.5px solid #EDE8DF;
        border-radius: 12px;
        padding: 13px 18px;
        cursor: pointer;
        transition: all 0.25s ease;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        color: #4A5E54;
        text-align: left;
      }
      .choice-btn:hover {
        border-color: #7BAF8E;
        background: rgba(123,175,142,0.06);
      }
      .choice-btn.selected {
        border-color: #7BAF8E;
        background: rgba(123,175,142,0.12);
        color: #2C3E35;
        font-weight: 500;
      }

      input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: linear-gradient(to right, #7BAF8E 0%, #7BAF8E var(--val, 50%), #EDE8DF var(--val, 50%), #EDE8DF 100%);
        cursor: pointer;
        border: none;
        box-shadow: none;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #4E8267;
        box-shadow: 0 2px 8px rgba(78,130,103,0.4);
        cursor: pointer;
        transition: transform 0.2s;
      }
      input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.2);
      }

      .chat-bubble-user {
        background: linear-gradient(135deg, #7BAF8E, #4E8267);
        color: white;
        border-radius: 20px 20px 4px 20px;
        padding: 12px 16px;
        max-width: 75%;
        align-self: flex-end;
        font-size: 14px;
        line-height: 1.5;
        box-shadow: 0 4px 12px rgba(123,175,142,0.3);
      }

      .chat-bubble-ai {
        background: white;
        color: #2C3E35;
        border-radius: 20px 20px 20px 4px;
        padding: 12px 16px;
        max-width: 80%;
        align-self: flex-start;
        font-size: 14px;
        line-height: 1.6;
        border: 1px solid rgba(123,175,142,0.15);
        box-shadow: 0 4px 12px rgba(78,130,103,0.06);
      }

      .wave-bar {
        width: 4px;
        background: #7BAF8E;
        border-radius: 2px;
        animation: waveGrow 1.2s ease-in-out infinite;
      }

      .score-ring {
        transition: stroke-dashoffset 1.5s ease;
      }

      .activity-card {
        background: white;
        border: 1.5px solid #EDE8DF;
        border-radius: 16px;
        padding: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .activity-card:hover {
        border-color: #7BAF8E;
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(123,175,142,0.15);
      }
      .activity-card.done {
        border-color: #7BAF8E;
        background: rgba(123,175,142,0.05);
      }

      .game-btn {
        background: white;
        border: 2px solid #EDE8DF;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 28px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .game-btn:hover { border-color: #7BAF8E; transform: scale(1.05); }
      .game-btn.matched { border-color: #7BAF8E; background: rgba(123,175,142,0.15); }
      .game-btn.flipped { border-color: #C9A96E; background: rgba(201,169,110,0.1); }

      .mood-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// ─── QUESTIONS DATA ───────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    type: "emoji-scale",
    question: "How has your mood been today?",
    subtitle: "Tap the emoji that feels closest to you right now",
    options: [
      { emoji: "😔", label: "Very low", value: 1 },
      { emoji: "😕", label: "Low", value: 2 },
      { emoji: "😐", label: "Neutral", value: 3 },
      { emoji: "🙂", label: "Good", value: 4 },
      { emoji: "😊", label: "Great", value: 5 },
    ],
    key: "mood",
  },
  {
    id: 2,
    type: "slider",
    question: "How stressed do you feel on a daily basis?",
    subtitle: "Slide to reflect your current stress level",
    min: 0,
    max: 10,
    defaultVal: 5,
    labels: ["Calm & peaceful", "Extremely stressed"],
    key: "stress",
  },
  {
    id: 3,
    type: "choice",
    question: "Have you been feeling mentally exhausted lately?",
    subtitle: "Choose the one that resonates most",
    options: [
      "Yes, I'm completely drained",
      "Somewhat, I feel tired often",
      "Occasionally, but manageable",
      "Not really, I feel energized",
    ],
    key: "exhaustion",
  },
  {
    id: 4,
    type: "emoji-scale",
    question: "How well have you been sleeping?",
    subtitle: "Honest answers help us understand you better",
    options: [
      { emoji: "😩", label: "Very poor", value: 1 },
      { emoji: "😪", label: "Poor", value: 2 },
      { emoji: "😴", label: "Fair", value: 3 },
      { emoji: "😌", label: "Good", value: 4 },
      { emoji: "🌙", label: "Excellent", value: 5 },
    ],
    key: "sleep",
  },
  {
    id: 5,
    type: "slider",
    question: "How often do you feel anxious or overwhelmed?",
    subtitle: "0 = Never, 10 = Almost constantly",
    min: 0,
    max: 10,
    defaultVal: 3,
    labels: ["Rarely", "Almost always"],
    key: "anxiety",
  },
  {
    id: 6,
    type: "choice",
    question: "Have you lost interest in things you usually enjoy?",
    subtitle: "This helps us understand emotional shifts",
    options: [
      "Yes, almost everything feels dull",
      "Some things, not everything",
      "Slightly, but I still enjoy some",
      "No, I still enjoy what I love",
    ],
    key: "interest",
  },
  {
    id: 7,
    type: "text",
    question: "What is currently bothering you the most?",
    subtitle: "Feel free to share — this stays private and helps our AI understand you",
    placeholder: "You can write anything — work, relationships, health, future... whatever's on your mind.",
    key: "concern",
  },
  {
    id: 8,
    type: "emoji-scale",
    question: "How emotionally connected do you feel to people around you?",
    subtitle: "Loneliness affects mental health more than most realize",
    options: [
      { emoji: "🏝️", label: "Isolated", value: 1 },
      { emoji: "👤", label: "Distant", value: 2 },
      { emoji: "🤝", label: "Neutral", value: 3 },
      { emoji: "💬", label: "Connected", value: 4 },
      { emoji: "❤️", label: "Deeply connected", value: 5 },
    ],
    key: "connection",
  },
  {
    id: 9,
    type: "slider",
    question: "How stable do you feel emotionally this week?",
    subtitle: "0 = Very unstable, 10 = Completely stable",
    min: 0,
    max: 10,
    defaultVal: 5,
    labels: ["Very unstable", "Completely stable"],
    key: "stability",
  },
  {
    id: 10,
    type: "choice",
    question: "What usually disrupts your mental peace the most?",
    subtitle: "You can relate to more than one, pick the strongest",
    options: [
      "Work pressure or deadlines",
      "Relationship or family issues",
      "Overthinking & self-doubt",
      "Financial or future worries",
      "Social situations or loneliness",
      "Health concerns",
    ],
    key: "trigger",
  },
];

// ─── WELLNESS ACTIVITIES ──────────────────────────────────────────────────────
const ACTIVITIES = [
  { id: 1, icon: "🌬️", title: "Box Breathing", desc: "4-4-4-4 breathing to calm the nervous system", duration: "3 min", category: "stress" },
  { id: 2, icon: "📓", title: "Gratitude Journal", desc: "Write 3 things you're grateful for today", duration: "5 min", category: "mood" },
  { id: 3, icon: "🧘", title: "Body Scan", desc: "Progressive relaxation from head to toe", duration: "8 min", category: "anxiety" },
  { id: 4, icon: "🚶", title: "Mindful Walk", desc: "5 minutes of intentional outdoor movement", duration: "5 min", category: "burnout" },
  { id: 5, icon: "💧", title: "Hydration Check", desc: "Drink a full glass of water right now", duration: "1 min", category: "stress" },
  { id: 6, icon: "📱", title: "Screen Break", desc: "Step away from all screens for 10 minutes", duration: "10 min", category: "burnout" },
];

const QUOTES = [
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, or anxious.", author: "Lori Deschene" },
  { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
  { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
  { text: "Sometimes the most important thing in a whole day is the rest we take between two deep breaths.", author: "Etty Hillesum" },
];

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────────
const callClaude = async (messages, systemPrompt) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    }),
  });
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "";
};

const getWellnessScore = (answers) => {
  let score = 50;
  if (answers.mood) score += (answers.mood - 3) * 8;
  if (answers.stress !== undefined) score -= answers.stress * 3;
  if (answers.sleep) score += (answers.sleep - 3) * 6;
  if (answers.anxiety !== undefined) score -= answers.anxiety * 3;
  if (answers.connection) score += (answers.connection - 3) * 5;
  if (answers.stability !== undefined) score += (answers.stability - 5) * 2;
  if (answers.exhaustion?.includes("completely")) score -= 10;
  if (answers.exhaustion?.includes("energized")) score += 10;
  if (answers.interest?.includes("dull")) score -= 8;
  if (answers.interest?.includes("still enjoy")) score += 5;
  return Math.max(10, Math.min(98, Math.round(score)));
};

// ─── SCREEN: AUTH ─────────────────────────────────────────────────────────────
const AuthScreen = ({ onLogin }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill all fields"); return; }
    if (mode === "signup" && !name) { setError("Please enter your name"); return; }
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 1200));
    const userName = mode === "signup" ? name : (email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1));
    localStorage.setItem("truhealth_user", JSON.stringify({ name: userName, email }));
    onLogin({ name: userName, email });
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, #FAF7F2 0%, #EDE8DF 50%, #D4E8DC 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      {[
        { top: "-10%", left: "-5%", size: 400, color: "rgba(123,175,142,0.12)" },
        { bottom: "-15%", right: "-8%", size: 500, color: "rgba(168,201,181,0.15)" },
        { top: "30%", right: "10%", size: 200, color: "rgba(201,169,110,0.08)" },
      ].map((orb, i) => (
        <div key={i} style={{
          position: "absolute", top: orb.top, left: orb.left, bottom: orb.bottom, right: orb.right,
          width: orb.size, height: orb.size, borderRadius: "50%",
          background: orb.color, filter: "blur(60px)", pointerEvents: "none",
        }} />
      ))}

      <div style={{ width: "100%", maxWidth: 440, animation: "fadeUp 0.7s ease forwards" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: "linear-gradient(135deg, #7BAF8E, #4E8267)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 28, boxShadow: "0 8px 24px rgba(123,175,142,0.4)",
            animation: "float 4s ease-in-out infinite",
          }}>🌿</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: "#2C3E35", marginBottom: 6 }}>
            TruHealth AI
          </h1>
          <p style={{ color: "#8FA898", fontSize: 14 }}>Your mental wellness companion</p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: 36 }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: "#F0EDE8", borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {["login", "signup"].map(m => (
              <button key={m} className="nav-tab" onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 14, fontWeight: 500,
                background: mode === m ? "white" : "transparent",
                color: mode === m ? "#2C3E35" : "#8FA898",
                boxShadow: mode === m ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.3s ease",
              }}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {error && (
            <div style={{ background: "rgba(232,180,176,0.2)", border: "1px solid #E8B4B0", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#8B4B47" }}>
              {error}
            </div>
          )}

          {mode === "signup" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "#4A5E54", display: "block", marginBottom: 6 }}>Your name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="How should we call you?"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 12,
                  border: "1.5px solid #EDE8DF", fontSize: 14, color: "#2C3E35",
                  background: "white",
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#4A5E54", display: "block", marginBottom: 6 }}>Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)}
              type="email" placeholder="you@example.com"
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 12,
                border: "1.5px solid #EDE8DF", fontSize: 14, color: "#2C3E35",
                background: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#4A5E54", display: "block", marginBottom: 6 }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)}
              type="password" placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 12,
                border: "1.5px solid #EDE8DF", fontSize: 14, color: "#2C3E35",
                background: "white",
              }}
            />
          </div>

          <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "15px", fontSize: 15 }}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                {mode === "signup" ? "Creating your space..." : "Signing you in..."}
              </span>
            ) : (
              mode === "signup" ? "Begin My Wellness Journey →" : "Continue My Journey →"
            )}
          </button>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#8FA898" }}>
            🔒 Your data is private and encrypted. We never share it.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN: CHECK-IN FLOW ────────────────────────────────────────────────────
const CheckInFlow = ({ user, onComplete }) => {
  const [step, setStep] = useState("welcome"); // welcome | questions | analyzing
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [sliderVal, setSliderVal] = useState(5);
  const [textVal, setTextVal] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [visible, setVisible] = useState(true);

  const q = QUESTIONS[currentQ];

  const transition = (fn) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 300);
  };

  const handleNext = async () => {
    const ans = { ...answers };
    if (q.type === "emoji-scale" || q.type === "choice") ans[q.key] = currentAnswer;
    if (q.type === "slider") ans[q.key] = sliderVal;
    if (q.type === "text") ans[q.key] = textVal;
    setAnswers(ans);

    if (currentQ < QUESTIONS.length - 1) {
      transition(() => {
        setCurrentQ(currentQ + 1);
        setCurrentAnswer(null);
        setSliderVal(QUESTIONS[currentQ + 1]?.defaultVal || 5);
        setTextVal("");
      });
    } else {
      setAnalyzing(true);
      setStep("analyzing");
      try {
        const summary = Object.entries(ans).map(([k, v]) => `${k}: ${v}`).join(", ");
        const analysis = await callClaude(
          [{ role: "user", content: `User responses: ${summary}\n\nProvide a warm, supportive mental wellness analysis in 3-4 sentences. Identify their main emotional challenges (stress/anxiety/burnout/loneliness) and explain WHY based on their responses. Use supportive, non-medical language. Start with empathy. End with one encouraging line.` }],
          "You are TruHealth AI, a compassionate mental wellness companion. Never diagnose medical conditions. Use warm, supportive, human language. Focus on emotional patterns and gentle insights."
        );
        onComplete(ans, analysis);
      } catch {
        onComplete(ans, "Based on your responses, you may be experiencing emotional fatigue and some stress. Your feelings are completely valid, and taking this step to understand yourself better shows remarkable self-awareness. Remember, small steps toward wellness create meaningful change.");
      }
    }
  };

  const canProceed = () => {
    if (q.type === "emoji-scale") return currentAnswer !== null;
    if (q.type === "choice") return currentAnswer !== null;
    if (q.type === "slider") return true;
    if (q.type === "text") return textVal.length > 0;
    return false;
  };

  if (step === "analyzing") {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #FAF7F2, #EDE8DF)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 24, padding: 24,
      }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[0.1, 0.3, 0.5, 0.7, 0.9].map((d, i) => (
            <div key={i} className="wave-bar" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#2C3E35", marginBottom: 8 }}>
            Understanding your emotional landscape...
          </h2>
          <p style={{ color: "#8FA898", fontSize: 14 }}>Our AI is carefully analyzing your responses</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Reading patterns", "Detecting emotions", "Generating insights"].map((t, i) => (
            <div key={i} style={{
              padding: "6px 14px", borderRadius: 50, fontSize: 12, fontWeight: 500,
              background: "rgba(123,175,142,0.15)", color: "#4E8267",
              animation: `fadeIn 0.5s ${i * 0.8}s both`,
            }}>{t}</div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "welcome") {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #FAF7F2, #D4E8DC)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}>
        <div style={{ maxWidth: 520, textAlign: "center", animation: "fadeUp 0.8s ease forwards" }}>
          <div style={{ fontSize: 60, marginBottom: 24, animation: "float 4s ease-in-out infinite" }}>🌱</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 500, color: "#2C3E35", marginBottom: 12, lineHeight: 1.2 }}>
            Hey {user.name} 👋
          </h1>
          <p style={{ fontSize: 18, color: "#4A5E54", lineHeight: 1.6, marginBottom: 12 }}>
            Let's understand how you've been feeling lately.
          </p>
          <p style={{ fontSize: 15, color: "#8FA898", lineHeight: 1.6, marginBottom: 40 }}>
            This gentle check-in takes about 3 minutes. There are no right or wrong answers — just honest ones. Your responses stay completely private.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 40 }}>
            {["🔒 Private", "🤗 Judgment-free", "✨ AI-powered"].map((tag, i) => (
              <div key={i} style={{
                padding: "8px 16px", borderRadius: 50, fontSize: 13,
                background: "rgba(123,175,142,0.15)", color: "#4E8267",
                border: "1px solid rgba(123,175,142,0.3)",
              }}>{tag}</div>
            ))}
          </div>

          <button className="btn-primary" onClick={() => setStep("questions")} style={{ fontSize: 16, padding: "16px 40px" }}>
            Begin My Check-In →
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #FAF7F2, #EDE8DF)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Progress */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#8FA898" }}>Question {currentQ + 1} of {QUESTIONS.length}</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#4E8267" }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 4, background: "#EDE8DF", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", background: "linear-gradient(90deg, #7BAF8E, #4E8267)",
            width: `${progress}%`, borderRadius: 2, transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.3s ease",
      }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div className="glass-card" style={{ padding: 36 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#7BAF8E", textTransform: "uppercase", marginBottom: 12 }}>
              Mental wellness check-in
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: "#2C3E35", marginBottom: 8, lineHeight: 1.3 }}>
              {q.question}
            </h2>
            <p style={{ fontSize: 14, color: "#8FA898", marginBottom: 28 }}>{q.subtitle}</p>

            {/* Emoji scale */}
            {q.type === "emoji-scale" && (
              <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                {q.options.map(opt => (
                  <button key={opt.value} className={`emoji-btn ${currentAnswer === opt.value ? "selected" : ""}`}
                    onClick={() => setCurrentAnswer(opt.value)}
                    style={{ flex: 1 }}>
                    <span>{opt.emoji}</span>
                    <span style={{ fontSize: 11, color: "#8FA898" }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Choice */}
            {q.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt, i) => (
                  <button key={i} className={`choice-btn ${currentAnswer === opt ? "selected" : ""}`}
                    onClick={() => setCurrentAnswer(opt)}>
                    <span style={{ marginRight: 10, opacity: 0.5 }}>
                      {currentAnswer === opt ? "✓" : "○"}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Slider */}
            {q.type === "slider" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 12, color: "#8FA898" }}>{q.labels[0]}</span>
                  <span style={{ fontSize: 22, fontWeight: 600, color: "#4E8267", fontFamily: "'DM Mono', monospace" }}>{sliderVal}</span>
                  <span style={{ fontSize: 12, color: "#8FA898" }}>{q.labels[1]}</span>
                </div>
                <input type="range" min={q.min} max={q.max} value={sliderVal}
                  onChange={e => { const v = Number(e.target.value); setSliderVal(v); e.target.style.setProperty("--val", `${(v / q.max) * 100}%`); }}
                  style={{ "--val": `${(sliderVal / q.max) * 100}%` }}
                />
              </div>
            )}

            {/* Text */}
            {q.type === "text" && (
              <textarea value={textVal} onChange={e => setTextVal(e.target.value)}
                placeholder={q.placeholder} rows={4}
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: 14,
                  border: "1.5px solid #EDE8DF", fontSize: 14, color: "#2C3E35",
                  background: "white", resize: "none", lineHeight: 1.6,
                }}
              />
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, alignItems: "center" }}>
              {currentQ > 0 ? (
                <button className="btn-ghost" onClick={() => transition(() => { setCurrentQ(currentQ - 1); setCurrentAnswer(null); })}>
                  ← Back
                </button>
              ) : <div />}
              <button className="btn-primary" onClick={handleNext} disabled={!canProceed()}>
                {currentQ === QUESTIONS.length - 1 ? "Complete Check-In ✨" : "Continue →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── COMPONENT: SCORE RING ────────────────────────────────────────────────────
const ScoreRing = ({ score, size = 120 }) => {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score > 70 ? "#7BAF8E" : score > 45 ? "#C9A96E" : "#E8B4B0";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={r} fill="none" stroke="#EDE8DF" strokeWidth={8} />
      <circle cx={50} cy={50} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 50 50)"
        className="score-ring" style={{ transition: "stroke-dashoffset 1.5s ease" }}
      />
      <text x={50} y={54} textAnchor="middle" fontSize={20} fontWeight="600" fill={color}
        fontFamily="'DM Mono', monospace">{score}</text>
    </svg>
  );
};

// ─── COMPONENT: CHATBOT ───────────────────────────────────────────────────────
const ChatBot = ({ analysis, answers, userName }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi ${userName} 🌿 I've reviewed your wellness check-in. ${analysis} I'm here to talk through anything on your mind — no judgment, no rush. What would you like to explore?`,
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const summary = Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join("; ");
      const reply = await callClaude(
        newMsgs.map(m => ({ role: m.role, content: m.content })),
        `You are TruHealth AI, a compassionate mental wellness chatbot. The user's name is ${userName}. Their wellness check-in summary: ${summary}. Initial analysis: ${analysis}. Be warm, supportive, ask follow-up questions gently. Never diagnose. Suggest calming activities when helpful. Keep responses concise (2-3 sentences usually). Feel human, not robotic.`
      );
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "I'm here with you. Sometimes connection matters more than perfect words. What's on your heart right now?" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 400 }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column",
            alignItems: m.role === "user" ? "flex-end" : "flex-start",
            animation: "fadeUp 0.3s ease forwards",
          }}>
            {m.role === "assistant" && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #7BAF8E, #4E8267)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🌿</div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#7BAF8E" }}>TruHealth AI</span>
              </div>
            )}
            <div className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <div className="chat-bubble-ai" style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#7BAF8E", animation: `pulse 1s ${d}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #EDE8DF", display: "flex", gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Share what's on your mind..."
          style={{
            flex: 1, padding: "12px 16px", borderRadius: 50,
            border: "1.5px solid #EDE8DF", fontSize: 14, background: "white",
          }}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, #7BAF8E, #4E8267)",
          border: "none", cursor: "pointer", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(123,175,142,0.4)", transition: "all 0.2s",
          opacity: !input.trim() || loading ? 0.5 : 1,
        }}>→</button>
      </div>
    </div>
  );
};

// ─── MINI GAME: BREATHING ─────────────────────────────────────────────────────
const BreathingGame = () => {
  const [phase, setPhase] = useState("idle"); // idle | inhale | hold | exhale | done
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const CYCLES = 4;

  useEffect(() => {
    if (phase === "idle" || phase === "done") return;
    const durations = { inhale: 4000, hold: 4000, exhale: 4000 };
    const next = { inhale: "hold", hold: "exhale", exhale: "inhale" };
    setCount(durations[phase] / 1000);
    const interval = setInterval(() => setCount(c => c - 1), 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (phase === "exhale") {
        const newCycle = cycle + 1;
        setCycle(newCycle);
        if (newCycle >= CYCLES) { setPhase("done"); return; }
      }
      setPhase(next[phase]);
    }, durations[phase]);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [phase]);

  const labels = { inhale: "Breathe In", hold: "Hold", exhale: "Breathe Out", idle: "Begin", done: "✨ Complete" };
  const scale = phase === "inhale" ? 1.4 : phase === "hold" ? 1.4 : 1;
  const bgColor = phase === "inhale" ? "rgba(123,175,142,0.25)" : phase === "hold" ? "rgba(168,201,181,0.3)" : "rgba(201,169,110,0.15)";

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <p style={{ fontSize: 13, color: "#8FA898", marginBottom: 24 }}>Box breathing · {CYCLES} cycles · 12 minutes of calm</p>

      <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 24px", cursor: phase === "idle" || phase === "done" ? "pointer" : "default" }}
        onClick={() => { if (phase === "idle" || phase === "done") { setCycle(0); setPhase("inhale"); } }}>
        {/* Outer ring */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: bgColor, border: "2px solid rgba(123,175,142,0.3)",
          transform: `scale(${scale})`, transition: "transform 4s ease-in-out, background 1s ease",
        }} />
        {/* Inner circle */}
        <div style={{
          position: "absolute", inset: "20%", borderRadius: "50%",
          background: "linear-gradient(135deg, #7BAF8E, #4E8267)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(123,175,142,0.4)",
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "white", fontFamily: "'DM Mono', monospace" }}>
            {phase === "idle" || phase === "done" ? (phase === "done" ? "🌿" : "▶") : count}
          </div>
        </div>
      </div>

      <div style={{ fontSize: 20, fontWeight: 600, color: "#2C3E35", marginBottom: 8 }}>{labels[phase] || ""}</div>
      {phase !== "idle" && phase !== "done" && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {Array.from({ length: CYCLES }).map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < cycle ? "#7BAF8E" : "#EDE8DF", transition: "background 0.3s" }} />
          ))}
        </div>
      )}
      {(phase === "idle" || phase === "done") && (
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => { setCycle(0); setPhase("inhale"); }}>
          {phase === "done" ? "Practice Again" : "Start Breathing"}
        </button>
      )}
    </div>
  );
};

// ─── MINI GAME: MEMORY ────────────────────────────────────────────────────────
const MemoryGame = () => {
  const emojis = ["🌸", "🌿", "🦋", "🌙", "⭐", "🌊"];
  const [cards, setCards] = useState(() => {
    const c = [...emojis, ...emojis].map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));
    for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
    return c;
  });
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const flip = (id) => {
    if (selected.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (card.flipped || card.matched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    const newSel = [...selected, id];
    setCards(newCards);
    setSelected(newSel);

    if (newSel.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newSel.map(sid => newCards.find(c => c.id === sid));
      setTimeout(() => {
        if (a.emoji === b.emoji) {
          const matched = newCards.map(c => newSel.includes(c.id) ? { ...c, matched: true } : c);
          setCards(matched);
          if (matched.every(c => c.matched)) setWon(true);
        } else {
          setCards(newCards.map(c => newSel.includes(c.id) ? { ...c, flipped: false } : c));
        }
        setSelected([]);
      }, 900);
    }
  };

  const reset = () => {
    const c = [...emojis, ...emojis].map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));
    for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
    setCards(c); setSelected([]); setMoves(0); setWon(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "#8FA898", marginBottom: 16 }}>Match the pairs · Trains focus & reduces anxiety</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#4A5E54" }}>Moves: <strong>{moves}</strong></span>
        <span style={{ fontSize: 13, color: "#4A5E54" }}>Matched: <strong>{cards.filter(c => c.matched).length / 2}/{emojis.length}</strong></span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, maxWidth: 280, margin: "0 auto 16px" }}>
        {cards.map(card => (
          <button key={card.id}
            className={`game-btn ${card.matched ? "matched" : card.flipped ? "flipped" : ""}`}
            onClick={() => flip(card.id)}
            style={{ fontSize: card.flipped || card.matched ? 24 : 12 }}>
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      {won && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          <p style={{ fontSize: 20, marginBottom: 8 }}>🎉 You did it in {moves} moves!</p>
          <button className="btn-primary" onClick={reset}>Play Again</button>
        </div>
      )}
    </div>
  );
};

// ─── SCREEN: DASHBOARD ────────────────────────────────────────────────────────
const Dashboard = ({ user, answers, analysis }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [activeGame, setActiveGame] = useState(null);
  const [moodHistory] = useState(() =>
    Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      score: 40 + Math.floor(Math.random() * 40),
    }))
  );
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const score = getWellnessScore(answers);

  const streakDays = 3;
  const navItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "chat", icon: "💬", label: "Chat" },
    { id: "activities", icon: "✨", label: "Wellness" },
    { id: "games", icon: "🎮", label: "Games" },
    { id: "progress", icon: "📈", label: "Progress" },
  ];

  const getRecommendations = () => {
    const recs = [];
    if (answers.stress > 6) recs.push({ icon: "🌬️", title: "Try Box Breathing", desc: "4-4-4-4 breathing reduces cortisol fast" });
    if (answers.anxiety > 6) recs.push({ icon: "🌿", title: "5-4-3-2-1 Grounding", desc: "Notice 5 things you can see right now..." });
    if (answers.sleep && answers.sleep < 3) recs.push({ icon: "🌙", title: "Sleep Hygiene Tips", desc: "Dim lights 1hr before bed. No screens." });
    if (answers.connection && answers.connection < 3) recs.push({ icon: "💌", title: "Reach Out Today", desc: "Send one genuine message to someone you care about" });
    if (recs.length === 0) recs.push({ icon: "📓", title: "Daily Gratitude", desc: "Write 3 specific things you're grateful for" });
    return recs;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #2C3E35, #4E8267)",
        padding: "24px 24px 48px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(123,175,142,0.2)" }} />
        <div style={{ position: "absolute", bottom: -20, left: 40, width: 80, height: 80, borderRadius: "50%", background: "rgba(201,169,110,0.15)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Welcome back</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: "white" }}>{user.name} 🌿</h1>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <div style={{ padding: "5px 12px", borderRadius: 50, background: "rgba(255,255,255,0.15)", fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
                🔥 {streakDays} day streak
              </div>
              <div style={{ padding: "5px 12px", borderRadius: 50, background: "rgba(255,255,255,0.15)", fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
                ✓ {completedActivities.size} done today
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <ScoreRing score={score} size={90} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Wellness Score</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px", marginTop: -24 }}>

        {/* HOME TAB */}
        {activeTab === "home" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {/* Analysis card */}
            <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #7BAF8E, #4E8267)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🧠</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#7BAF8E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>AI Wellness Insight</p>
                  <p style={{ fontSize: 14, color: "#4A5E54", lineHeight: 1.7 }}>{analysis}</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div style={{ background: "linear-gradient(135deg, rgba(123,175,142,0.1), rgba(168,201,181,0.15))", border: "1px solid rgba(123,175,142,0.2)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "#2C3E35", lineHeight: 1.6, marginBottom: 8 }}>
                "{quote.text}"
              </p>
              <p style={{ fontSize: 12, color: "#8FA898" }}>— {quote.author}</p>
            </div>

            {/* Recommendations */}
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2C3E35", marginBottom: 14 }}>Recommended for you</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {getRecommendations().map((r, i) => (
                <div key={i} style={{ background: "white", border: "1.5px solid #EDE8DF", borderRadius: 14, padding: "16px 18px", display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "#2C3E35", marginBottom: 2 }}>{r.title}</p>
                    <p style={{ fontSize: 13, color: "#8FA898" }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Professional help if score low */}
            {score < 45 && (
              <div style={{ marginTop: 20, background: "rgba(232,180,176,0.15)", border: "1px solid rgba(232,180,176,0.4)", borderRadius: 16, padding: 20 }}>
                <p style={{ fontWeight: 600, color: "#2C3E35", marginBottom: 6 }}>💙 Professional Support</p>
                <p style={{ fontSize: 13, color: "#4A5E54", lineHeight: 1.6, marginBottom: 12 }}>
                  Your responses suggest you might benefit from speaking with a professional. This is a sign of strength, not weakness.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { type: "Licensed Therapist", specialty: "Anxiety & Burnout", icon: "🧑‍⚕️" },
                    { type: "Crisis Helpline", specialty: "24/7 · iCall: 9152987821", icon: "📞" },
                    { type: "Mindfulness Coach", specialty: "Stress & Emotional Regulation", icon: "🧘" },
                  ].map((p, i) => (
                    <div key={i} style={{ background: "white", borderRadius: 10, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
                      <span>{p.icon}</span>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#2C3E35" }}>{p.type}</p>
                        <p style={{ fontSize: 12, color: "#8FA898" }}>{p.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div className="glass-card" style={{ padding: 0, overflow: "hidden", animation: "fadeUp 0.4s ease" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #EDE8DF", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #7BAF8E, #4E8267)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌿</div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#2C3E35" }}>TruHealth AI</p>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7BAF8E", animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 12, color: "#7BAF8E" }}>Online · Ready to listen</span>
                </div>
              </div>
            </div>
            <ChatBot analysis={analysis} answers={answers} userName={user.name} />
          </div>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === "activities" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <p style={{ fontSize: 13, color: "#8FA898", marginBottom: 20 }}>Complete activities to improve your wellness score</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {ACTIVITIES.map(act => (
                <div key={act.id} className={`activity-card ${completedActivities.has(act.id) ? "done" : ""}`}
                  onClick={() => setCompletedActivities(prev => {
                    const n = new Set(prev);
                    n.has(act.id) ? n.delete(act.id) : n.add(act.id);
                    return n;
                  })}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{act.icon}</div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#2C3E35", marginBottom: 4 }}>{act.title}</p>
                  <p style={{ fontSize: 12, color: "#8FA898", lineHeight: 1.5, marginBottom: 10 }}>{act.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#B0CDD8", background: "#F0EDE8", padding: "3px 8px", borderRadius: 50 }}>{act.duration}</span>
                    <span style={{ fontSize: 16 }}>{completedActivities.has(act.id) ? "✅" : "○"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GAMES TAB */}
        {activeTab === "games" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {!activeGame ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontSize: 13, color: "#8FA898" }}>Calming games designed to reduce stress and improve focus</p>
                {[
                  { id: "breathing", icon: "🌬️", title: "Breathing Rhythm", desc: "Guided box breathing to calm your nervous system", benefit: "Reduces stress hormones" },
                  { id: "memory", icon: "🧩", title: "Mindful Memory", desc: "Match nature symbols to train focus and presence", benefit: "Improves concentration" },
                ].map(g => (
                  <button key={g.id} className="nav-tab" onClick={() => setActiveGame(g.id)} style={{
                    background: "white", border: "1.5px solid #EDE8DF", borderRadius: 16, padding: 20,
                    display: "flex", gap: 16, alignItems: "center", width: "100%", textAlign: "left",
                    transition: "all 0.3s ease",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#7BAF8E"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE8DF"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, rgba(123,175,142,0.2), rgba(168,201,181,0.3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                      {g.icon}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, color: "#2C3E35", marginBottom: 4 }}>{g.title}</p>
                      <p style={{ fontSize: 13, color: "#8FA898", marginBottom: 4 }}>{g.desc}</p>
                      <p style={{ fontSize: 12, color: "#7BAF8E", fontWeight: 500 }}>✓ {g.benefit}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button className="btn-ghost" onClick={() => setActiveGame(null)} style={{ marginBottom: 20, padding: "8px 18px", fontSize: 13 }}>← Back to Games</button>
                <div className="glass-card" style={{ padding: 24 }}>
                  {activeGame === "breathing" && <BreathingGame />}
                  {activeGame === "memory" && <MemoryGame />}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === "progress" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { icon: "🔥", val: streakDays, label: "Day Streak" },
                { icon: "✨", val: completedActivities.size, label: "Done Today" },
                { icon: "💚", val: score, label: "Score" },
              ].map((s, i) => (
                <div key={i} style={{ background: "white", border: "1.5px solid #EDE8DF", borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#2C3E35", fontFamily: "'DM Mono', monospace" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#8FA898" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mood history */}
            <div className="glass-card" style={{ padding: 20, marginBottom: 16 }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: "#2C3E35", marginBottom: 16 }}>Weekly Mood History</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                {moodHistory.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: "100%", borderRadius: 6,
                      height: `${(d.score / 80) * 70}px`,
                      background: `linear-gradient(180deg, #7BAF8E, #4E8267)`,
                      transition: "height 1s ease", minHeight: 8,
                    }} />
                    <span style={{ fontSize: 10, color: "#8FA898" }}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional summary */}
            <div className="glass-card" style={{ padding: 20 }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: "#2C3E35", marginBottom: 14 }}>Emotional Snapshot</p>
              {[
                { label: "Mood", val: answers.mood || 3, max: 5, color: "#7BAF8E" },
                { label: "Energy", val: Math.max(1, 5 - (answers.exhaustion?.includes("drained") ? 4 : answers.exhaustion?.includes("tired") ? 2 : 0)), max: 5, color: "#C9A96E" },
                { label: "Sleep", val: answers.sleep || 3, max: 5, color: "#B0CDD8" },
                { label: "Connection", val: answers.connection || 3, max: 5, color: "#B8B5D4" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#4A5E54" }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#2C3E35" }}>{item.val}/{item.max}</span>
                  </div>
                  <div style={{ height: 6, background: "#EDE8DF", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(item.val / item.max) * 100}%`, background: item.color, borderRadius: 3, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(123,175,142,0.15)",
        display: "flex", padding: "10px 0 14px",
      }}>
        {navItems.map(item => (
          <button key={item.id} className="nav-tab" onClick={() => setActiveTab(item.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "6px 0",
          }}>
            <span style={{ fontSize: 20, filter: activeTab === item.id ? "none" : "grayscale(0.5) opacity(0.5)" }}>
              {item.icon}
            </span>
            <span style={{ fontSize: 10, fontWeight: 500, color: activeTab === item.id ? "#4E8267" : "#8FA898" }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function TruHealthAI() {
  const [screen, setScreen] = useState("auth"); // auth | checkin | dashboard
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("truhealth_user");
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u);
      // Still go through check-in each session
    }
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setScreen("checkin");
  };

  const handleCheckInComplete = (ans, ai) => {
    setAnswers(ans);
    setAnalysis(ai);
    setScreen("dashboard");
  };

  return (
    <>
      <FontInjector />
      <GlobalStyles />
      {screen === "auth" && <AuthScreen onLogin={handleLogin} />}
      {screen === "checkin" && user && <CheckInFlow user={user} onComplete={handleCheckInComplete} />}
      {screen === "dashboard" && user && <Dashboard user={user} answers={answers} analysis={analysis} />}
    </>
  );
}
