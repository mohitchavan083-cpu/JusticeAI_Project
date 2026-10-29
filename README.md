# JusticeAI

A responsive React-based legal information assistant prototype. It uses simple keyword matching (a basic NLP concept) to provide general educational information about common legal topics.

## Requirements
- Node.js 18+ (recommended)
- npm

## Run locally
1. Extract the ZIP folder.
2. Open a terminal in the `JusticeAI` folder.
3. Install packages:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Build for production
```bash
npm run build
npm run preview
```

## Project structure
```text
JusticeAI/
├── public/
│   └── justiceai-icon.svg
├── src/
│   ├── components/
│   │   ├── ChatMessage.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── data/
│   │   └── legalKnowledge.js
│   ├── utils/
│   │   └── nlp.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## How it works
- The UI is built with React components.
- `src/utils/nlp.js` normalizes the question and uses keyword scoring to select a relevant answer.
- `src/data/legalKnowledge.js` contains editable educational answer entries.
- The prototype does not call an AI API or a live legal database. Answers are predefined and intended for learning/demo purposes.

## Important legal notice
JusticeAI provides general educational information, not legal advice. Laws vary by jurisdiction and change over time. For a real legal problem, consult a qualified lawyer or an appropriate legal aid service. If you are in immediate danger, contact local emergency services.
