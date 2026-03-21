<div align="center">

# 🌱 CareerSprout

### *The Premium AI-Powered Career Hub*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=three.js)](https://threejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)](https://expressjs.com/)

<br />

> **Land your dream job smarter.** CareerSprout is a full-stack, AI-enhanced job portal that combines real-time job search, intelligent resume screening, automated LinkedIn optimization, and curated learning paths — all wrapped in a stunning dark-mode UI with an interactive 3D globe.

<br />

![CareerSprout Banner](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🌍 Live Preview](#-live-preview)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#️-environment-variables)
- [📁 Project Structure](#-project-structure)
- [🛡️ Security](#️-security)
- [🎨 UI Highlights](#-ui-highlights)
- [📚 Tech Stack](#-tech-stack)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🔍 AI-Powered Job Search
- 🌐 Real-time job listings powered by the **Adzuna API** (proxied securely through the backend)
- 🗺️ Search by **role** and **location** (India 🇮🇳, UK 🇬🇧, US 🇺🇸)
- 🔧 Advanced filters: Sort by relevance, date, salary
- 📄 Pagination with smooth transitions
- 🛡️ **Fraud Risk Analysis** — every job is scored on trustworthiness with AI signals:
  - ✅ Verified company name
  - ✅ Salary transparency check
  - 🚨 Suspicious keyword detection (e.g., "urgent", "whatsapp", "guaranteed income")
  - ✅ Posting source verification
- 💼 **Apply via LinkedIn** — one-click smart redirect to matching LinkedIn job search

---

### 📄 LaTeX Resume Builder
- 📝 Fill in Personal Info, Education, Experience, Projects & Certifications
- ⚡ Generates clean, professional **LaTeX code** instantly
- 🔗 One-click open to **Overleaf** — paste and download a stunning PDF
- 📋 Copy to clipboard with a single button

---

### 🤖 ATS Resume Screening
- 📤 Upload **PDF / DOCX / TXT** or paste raw resume text
- 🎯 Optional Job Description input for keyword matching
- 📊 Detailed ATS Score with:
  - 🥊 Animated score ring (0–100%)
  - 🏅 Grade (A–F)
  - 📈 Score breakdown by category
  - ✔️ Matched skills vs ✗ Missing skills
  - 💡 AI recommendations with severity levels (critical / important / tip)
- 🔴🟡🟢 Color-coded verdict: ATS Friendly / Needs Improvement / Poor

---

### 💼 LinkedIn Profile Optimizer
- 🎯 Enter your **target role**, key skills, and years of experience
- 🤖 AI generates:
  - 🏷️ Optimized LinkedIn Headline
  - 📝 Full "About" section copy
  - 🗒️ Sample alternative headlines
- 📋 One-click copy for each section
- 🔥 Recruiter-tested language patterns built-in

---

### 🎓 Curated YouTube Course Library
Organized into **6 expert domains** — click any tab to explore:

| Domain | 🎬 Channels |
|--------|------------|
| 🌐 Web Development | Dave Gray, Bro Code, Traversy Media, Kevin Powell |
| ☕ Java & Spring Boot | Bro Code, Amigoscode, Kunal Kushwaha |
| 🤖 AI & ML | StatQuest, 3Blue1Brown, Andrej Karpathy |
| 🐳 DevOps & Cloud | TechWorld with Nana, freeCodeCamp |
| 📊 Data Structures | NeetCode, Back To Back SWE |
| 🏗️ System Design | Gaurav Sen, Hussein Nasser |

Each card links directly to the **YouTube video** — zero paywalls, forever free.

---

### 🌍 Interactive 3D Globe (Landing Page)
- Built with **Three.js r160** — no React required
- 🔵 Atmospheric glow effect (`atmosphereColor: #4da6ff`)
- 📍 13 City markers: New York, London, Tokyo, Dubai, New Delhi, Seoul, Moscow, Sydney, Shanghai, Paris, Rio, Buenos Aires, Singapore
- 🖼️ Avatar sprites on each marker
- 💫 Pulsing animated rings on markers
- 🖱️ Drag-to-rotate + auto-rotation
- 💬 Hover tooltip showing city name

---

### 🌐 Animated World Map Section
- Pure HTML5 Canvas animated connection map
- Animated dashed arcs connecting: Alaska → LA, Brazil → Lisbon, London → New Delhi, New Delhi → Vladivostok & Nairobi
- Gradient blue-to-green lines with smooth travel animation

---

### 🔐 Authentication System
- 📧 Sign Up with email + password
- 🔑 Login with persistent session via `localStorage`
- 🛡️ Protected routes — unauth users prompted to sign in
- 👑 Admin role support
- 🔒 Server validates token on every protected call

---

## 🌍 Live Preview

> Run locally at: **http://localhost:5000**

---

## 🏗️ Architecture

```
CareerSprout
├── vanilla-frontend/        ← Pure HTML/CSS/JS (no framework)
│   ├── index.html           ← Single-page app shell
│   ├── style.css            ← Full design system
│   ├── script.js            ← Application logic
│   ├── globe3d.js           ← Three.js 3D globe
│   └── world-map.js         ← Canvas world map animation
│
└── vanilla-backend/         ← Node.js + Express API
    ├── server.js            ← All API routes
    ├── users.json           ← Simple JSON user store
    └── .env                 ← 🔒 Secret API keys (never committed)
```

### 🔄 Data Flow

```
Browser ──► Express Backend ──► Adzuna API (Job Search)
                            ──► /api/jobs/verify (Risk Analysis)
                            ──► /api/courses (YouTube Data)
                            ──► job-nexus-production (ATS/Resume/LinkedIn AI)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- Adzuna API credentials (free signup at [developer.adzuna.com](https://developer.adzuna.com))

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/careersprout.git
cd careersprout
```

---

### 2️⃣ Install Backend Dependencies

```bash
cd vanilla-backend
npm install
```

---

### 3️⃣ Set Up Environment Variables

Create a `.env` file inside `vanilla-backend/`:

```bash
# vanilla-backend/.env
ADZUNA_APP_ID=your_adzuna_app_id_here
ADZUNA_API_KEY=your_adzuna_api_key_here
```

> 🔑 Get your free Adzuna credentials at: [developer.adzuna.com](https://developer.adzuna.com)

---

### 4️⃣ Start the Server

```bash
node server.js
```

Output:
```
Backend Server running on port 5000
```

---

### 5️⃣ Open the App

Visit **[http://localhost:5000](http://localhost:5000)** in your browser.

> The backend serves the frontend as static files, so no separate frontend server is needed!

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ADZUNA_APP_ID` | Your Adzuna App ID | ✅ Yes |
| `ADZUNA_API_KEY` | Your Adzuna API Key | ✅ Yes |

> ⚠️ **Never commit your `.env` file.** It is already in `.gitignore`.

---

## 📁 Project Structure

```
JobAnalysis/
│
├── 📂 vanilla-frontend/
│   ├── 📄 index.html          → SPA shell (all pages, modals, nav)
│   ├── 🎨 style.css           → Complete CSS design system
│   ├── ⚡ script.js           → All client-side app logic
│   ├── 🌍 globe3d.js          → Three.js interactive 3D globe
│   └── 🗺️  world-map.js       → Canvas animated world connections
│
├── 📂 vanilla-backend/
│   ├── 🖥️  server.js          → Express app, all API routes
│   ├── 👥 users.json          → User account store
│   ├── 📦 package.json        → Dependencies
│   └── 🔒 .env               → Secret credentials (not committed)
│
├── 📂 frontend/               → Next.js app (legacy, not active)
├── 📂 backend/                → Spring Boot app (legacy, not active)
└── 📄 README.md               → This file
```

---

## 🛡️ Security

| Area | Protection |
|------|-----------|
| 🔑 API Keys | Stored in `.env`, never exposed to frontend |
| 🌐 Job Search | Proxied through backend — Adzuna keys never in browser |
| 🔐 Auth | Token stored in `localStorage`, verified server-side on each request |
| 🚫 Route Guard | Protected pages check auth state before rendering |
| 🛡️ CORS | Configured on Express to control allowed origins |
| 🔒 Password | Stored as plain text in JSON (⚠️ use bcrypt for production) |

> 💡 **Production recommendation:** Replace `users.json` with a proper database (MongoDB / PostgreSQL) and hash passwords with `bcrypt`.

---

## 🎨 UI Highlights

| Feature | Details |
|---------|---------|
| 🌑 Dark Mode | Deep navy `#080c14` base, pure black sections |
| 🌈 Gradient Text | Blue `#3b82f6` → Green `#10b981` gradients |
| ✨ Glow Cards | Mouse-proximity spotlight effect on every card |
| 🌀 Particle BG | 60 animated floating particles on the hero |
| 🔤 Typography | Inter + Space Grotesk from Google Fonts |
| 📱 Responsive | Mobile-ready with hamburger menu |
| 🎭 Focus Cards | Hover-to-expand feature cards with Unsplash backgrounds |
| 💫 Counters | Animated number counters on scroll |
| 🔔 Toast Notifications | Styled alerts for success / warning / error |

---

## 📚 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| 🌐 HTML5 | Page structure |
| 🎨 Vanilla CSS | Design system, animations |
| ⚡ Vanilla JavaScript | All app logic, routing, API calls |
| 🌍 Three.js r160 | 3D interactive globe |
| 🎨 Font Awesome 6 | Icons throughout the UI |
| 🔤 Google Fonts | Inter + Space Grotesk typography |

### Backend
| Technology | Purpose |
|-----------|---------|
| 🟢 Node.js 18 | JavaScript runtime |
| 🚂 Express.js | HTTP server & routing |
| 🔒 dotenv | Environment variable management |
| 🌐 CORS | Cross-origin resource sharing |
| 📁 fs (built-in) | JSON file-based user storage |

### External APIs
| API | Purpose |
|----|---------|
| 🔍 Adzuna API | Real-time job listings |
| 🤖 job-nexus-production | ATS screening, Resume LaTeX, LinkedIn AI |
| 🎨 Unsplash | Background images for feature cards |
| 🖼️ Aceternity CDN | City avatar images for globe markers |
| 🌍 Three.js CDN | 3D globe rendering library |

---

## 🗺️ Roadmap

- [ ] 🔐 `bcrypt` password hashing
- [ ] 🗄️ MongoDB / PostgreSQL integration
- [ ] 📧 Email verification on signup
- [ ] 💾 Save jobs (bookmarking)
- [ ] 📊 Analytics dashboard for admin
- [ ] 🌙 Light mode toggle
- [ ] 📱 Progressive Web App (PWA) support
- [ ] 🤖 OpenAI GPT integration for deeper resume AI
- [ ] 🔔 Job alert notifications
- [ ] 📝 Cover letter generator

---

## 🤝 Contributing

Contributions are welcome! 🎉

```bash
# 1. Fork the project
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'Add some AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**.

```
Copyright © 2026 CareerSprout
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

<div align="center">

### 🌱 Built with ❤️ for every career journey

**[⬆ Back to Top](#-careersprout)**

<br />

*"Your next opportunity is one click away."*

</div>
