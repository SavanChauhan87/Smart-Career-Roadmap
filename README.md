# 🚀 Smart Career Roadmap

> A web-based Career Roadmap & Employability Score system for students and professionals.

## 📌 Project Overview

Smart Career Roadmap is a major project that helps users:
- Identify their **skill gaps** based on target job roles
- Get a personalized **learning roadmap** to close those gaps
- Track their **Employability Score (0–100%)** using ML predictions
- Monitor their **learning progress** step by step

---

## 👥 Team Members

| Member | Role | Contribution |
|--------|------|-------------|
| Savan Chauhan | Frontend Developer | React UI Prototype, Integration |
| [Friend's Name] | Backend & Database Developer | PostgreSQL Schema, ASP.NET Core API |

---

## 🏗️ Project Phases

### ✅ Phase 1 — Prototype (Current)
- [ ] React + Vite Frontend with dummy data
- [ ] Database Schema Design (PostgreSQL)

### 🔜 Phase 2 — Integration
- [ ] ASP.NET Core Backend API
- [ ] Connect Frontend with Backend
- [ ] PostgreSQL Database Integration

### 🔜 Phase 3 — ML Integration
- [ ] Python FastAPI ML Microservice
- [ ] Random Forest Employability Score Model
- [ ] Career Roadmap Prediction Model

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend | ASP.NET Core Web API (.NET 8) |
| ML Service | Python FastAPI + scikit-learn |
| Database | PostgreSQL |
| Auth | JWT Bearer Tokens |

---

## 📁 Project Structure

```
Smart-Career-Roadmap/
├── frontend/          # React + Vite frontend (Savan)
├── backend/           # ASP.NET Core API (Friend)
├── ml-service/        # Python FastAPI ML service (Friend)
├── database/          # DB schema & migrations (Friend)
└── docs/              # SRS and documentation
```

---

## 🚀 Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
dotnet restore
dotnet run
```

### ML Service
```bash
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📄 Documentation
- [SRS Document](./docs/SRS_SmartCareerRoadmap.docx)
