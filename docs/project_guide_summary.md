# 📖 Smart Career Roadmap — Project Setup & Conversation Log

This document summarizes our complete pair-programming session, architectural decisions, and setup instructions. You can open this file in any IDE (like Antigravity IDE or VS Code) to quickly review what we built, what we decided, and how to continue working on this project.

---

## 👥 Team Setup & Roles

| Member | Role | Contribution Focus |
|--------|------|--------------------|
| **Savan Chauhan** | Frontend Developer | React UI Prototype, Client Routing & State, GitHub Integration |
| **Friend** | Backend & Database | PostgreSQL Schema, ASP.NET Core API, Python ML Service |

---

## 🏗️ Project Architecture & Phases

We agreed to divide the development into **3 distinct phases**:

### Phase 1: Interactive Frontend Prototype (Current)
*   **React + Vite** frontend containing all main panels.
*   **Mock / Client-side state** simulating login sessions, attributes, level-ups, and employability score calculations.
*   **Real learning links** pointing to top courses (YouTube, Udemy, Coursera).
*   **Database Schema design** by your teammate (PostgreSQL).

### Phase 2: System Integration (Next)
*   Connect the React frontend with an **ASP.NET Core Web API** backend.
*   Configure **PostgreSQL database** migrations and link all schemas (users, skills, roadmaps).

### Phase 3: Machine Learning Model Deployment
*   Connect to a **Python FastAPI** microservice.
*   Implement a **Random Forest Regressor** to predict dynamic employability readiness percentages and build skill-gap roadmaps.

---

## 🎨 Approved Design Direction: "Career RPG"
We rejected typical boring interfaces and opted for a highly unique, gamified dashboard concept:
*   **Concept:** Career journey as a video game where you level up.
*   **Typography:** 
    *   `Orbitron` for retro indicators, badges, and card titles.
    *   `Plus Jakarta Sans` for body descriptions and readable text.
    *   `JetBrains Mono` for score numbers.
*   **Palette:** Deep space dark theme with glowing gradients:
    *   Primary: Purple (`#7B2FBE` / `#A855F7`)
    *   Secondary: Cyan (`#00C9FF`)
    *   Accent/Highlight: Gold (`#FFB800` / `#FFD966`)
*   **Mechanics:**
    *   Rating skill competencies automatically rewards XP and triggers profile levels.
    *   Accepting a job role accepts a "Quest" which unlocks specific steps and resource beacons.

---

## 🌿 Repository & Branching Guide

Our GitHub Repository is hosted at:
🔗 **[https://github.com/SavanChauhan87/Smart-Career-Roadmap.git](https://github.com/SavanChauhan87/Smart-Career-Roadmap.git)**

We set up a proper workflow where **no commits are made directly to `main`**:
*   `main` — Represents stable releases.
*   `develop` — Integration branch where team members merge features.
*   `feature/frontend-prototype` — Your branch containing the React prototype.

### How to push work:
```bash
git add .
git commit -m "Commit message"
git push origin feature/frontend-prototype
```
Once verified, create a Pull Request on GitHub to merge `feature/frontend-prototype` into `develop`.

---

## 📁 Local Directories Inside Workspace
```
SCR/                          ← Workspace Root
├── frontend/                 ← React + Vite frontend prototype (Savan)
│   ├── src/
│   │   ├── App.jsx           ← State management, global layout, routing
│   │   ├── components/       ← Particle Background Canvas
│   │   └── views/            ← Dashboard, Skills, Careers, Roadmap, Profile
│   └── package.json          ← Vite + Tailwind CSS v4 packages
├── backend/                  ← Placeholder for ASP.NET API (Friend)
├── ml-service/               ← Placeholder for Python FastAPI ML (Friend)
├── database/                 ← Database migration scripts (Friend)
└── docs/                     ← SRS document & project guides
```

---

## 🚀 Running the Local Project

To start your local development environment, open the terminal in the `/frontend` directory:

1. **Install packages** (if cloning for the first time):
   ```bash
   npm install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.
