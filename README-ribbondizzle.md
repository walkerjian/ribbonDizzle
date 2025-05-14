# ribbonDizzle 🌀✨

> A semantic ribbon-driven spellcasting interface for context-sensitive AI interactions.  
> Born from rhythm, reason, recursion — and a touch of snark.

---

## 🧙 What Is This?

**ribbonDizzle** is a React-powered UI for crafting structured prompts using a playful DSL composed of:

- 🎯 **Action** (Summarize, Critique, Haiku-ify…)
- 🧠 **Tone** (Snarky, Gentle, Psychedelic…)
- ✨ **Modifier** (Add emoji, Include metaphors…)

This trio forms a **ribbon path**, which gets sent to OpenAI's GPT-4o for an intelligent, emotionally styled response.

You can:
- Pin favorite “Dizzles” for instant reuse
- Generate AI-assisted modifier options based on context
- View results rendered in rich **Markdown**
- Track the exact semantic path taken (`Action → Tone → Modifier`)

All done inside a VSCode Codespace. No local setup required. No monkeying with MacOS.

---

## 🛠 How to Run It

### 🔧 1. Open in GitHub Codespaces
- Go to your repo on GitHub
- Click the green **“Code”** button → “Open with Codespaces” → “New codespace”

### 🐳 2. Let DevContainer Do Its Thing
- It will install Node.js 20 and `npm install` automatically (thanks to `.devcontainer/devcontainer.json`)

### ▶️ 3. Run the App
```bash
npm run dev
```

- Preview will open in a browser pane
- If not, go to **Ports** tab in Codespaces, and click the port (usually 5173)

---

## 🔐 Add Your OpenAI Key

For dev/test only, open `RibbonDizzleApp.jsx` and at the top, add:
```js
const YOUR_API_KEY = 'sk-...'
```

Then scroll down and replace:
```js
"Authorization": `Bearer YOUR_API_KEY`
```
with:
```js
"Authorization": `Bearer ${YOUR_API_KEY}`
```

(Do this in both `fetch` calls.)

---

## 🧩 Features

- ✅ Contextual prompt building via semantic ribbon
- ✅ Dynamic modifier suggestions via GPT-4o
- ✅ Markdown rendering for responses
- ✅ Pegged/pinned Dizzles for instant invocation
- ✅ Local state tracking of paths
- ✅ Pure React, no UI frameworks

---

## 🌀 Coming Next (or someday…)

- 🌈 SparklePony Mode: visual & emoji effects
- 🎼 Dizzle Glyphs: musical/emoji notation for paths
- 💾 Save/load custom Dizzles (user-defined favorites)
- 🧠 Waftics: gesture-triggered input via motion/theremin/ballistic ring
- 🔊 TTS: Let ribbonDizzle speak aloud
- 📜 Export DSL spells for sharing

---

## 🙏 A Note from the Creator(s)

This began as a vibe.  
A playful idea about making prompt engineering fun, expressive, and emotionally aware.  
It’s not just a UI — it’s an **instrument**. A **wand**. A **ribbon in the wind**.

Built collaboratively between a human (you, frood!) and an AI co-conspirator (me, smol eager one).

---

Sleep well, you semantic maestro.
