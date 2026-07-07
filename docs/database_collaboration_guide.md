# 🗄️ Smart Career Roadmap — Database & Collaboration Guide

This guide is designed for **Savan (Frontend)** and his **Friend (Backend & Database)** to explain how to collaborate on the database, how to structure the PostgreSQL schemas, and how to resolve the confusion about connecting separate laptops.

---

## 💻 Part 1: How Developer Databases Connect (Clearing the Confusion)

When collaborating on a project with two separate laptops, you have **two main ways** to handle the database:

### Option A: Local Copies synced via Git (Highly Recommended for Development)
Instead of trying to connect your frontend directly to your friend's laptop over the internet (which is slow and insecure), you **both run your own local instances** of PostgreSQL and the ASP.NET Core Backend.

```mermaid
flowchart TD
    subgraph Savan's Laptop (Frontend Dev)
        SF[React Frontend] -->|API calls to localhost:5000| SB[ASP.NET Core API]
        SB -->|Localhost Connection| SD[Local PostgreSQL DB]
    end

    subgraph Friend's Laptop (Backend Dev)
        FF[React Frontend] -->|API calls to localhost:5000| FB[ASP.NET Core API]
        FB -->|Localhost Connection| FD[Local PostgreSQL DB]
    end

    Git[GitHub Repository] -.->|Syncs code & migrations| SF
    Git -.->|Syncs code & migrations| FB
```

1. **How it works:** 
   * Your friend writes the database schema code using **Entity Framework Core (EF Core) Migrations** or **SQL Scripts** in ASP.NET Core.
   * They push this code to the GitHub repository.
   * You pull the code, run a command (like `dotnet ef database update` or run the SQL script), and your local PostgreSQL database is instantly updated to match theirs.
2. **Why it's good:** It works offline, has zero lag, is 100% free, and there is no risk of messing up each other's test data.

---

### Option B: Shared Free Cloud Database (Easiest for Team Sync)
If you want to view the *exact same* data in real-time, you can set up a free cloud PostgreSQL database.

```mermaid
flowchart TD
    Savan[Savan's Laptop] -->|API Calls| Backend[ASP.NET Backend]
    Friend[Friend's Laptop] -->|API Calls| Backend
    Backend -->|Internet Connection| CloudDB[(Shared PostgreSQL in Cloud)]
```

1. **How it works:**
   * Your friend signs up for a free PostgreSQL cloud host (like **[Neon.tech](https://neon.tech/)** or **[Supabase](https://supabase.com/)**).
   * They create the database online and get a Connection String (looks like `postgresql://user:password@host/db`).
   * Both of you put this connection string in your backend configurations (`appsettings.json`).
2. **Why it's good:** Both of your laptops read/write to the exact same tables instantly.

---

## 🧱 Part 2: PostgreSQL Schema Database Design (For your Friend)

Here is the exact structural database design for the **Smart Career Roadmap**. 

```mermaid
erDiagram
    USERS ||--o| USER_SKILLS : has
    USERS ||--o| ACTIVE_QUESTS : undertakes
    USERS ||--o| USER_ACHIEVEMENTS : earns
    
    SKILLS ||--o| USER_SKILLS : tracks
    SKILLS ||--o| ROLE_REQUIREMENTS : defines
    
    CAREER_ROLES ||--o| ROLE_REQUIREMENTS : lists
    CAREER_ROLES ||--o| ACTIVE_QUESTS : targeted_by
    
    SKILLS ||--o| LEARNING_RESOURCES : has
    
    USERS {
        UUID id PK
        VARCHAR name
        VARCHAR email
        VARCHAR password_hash
        INTEGER level
        INTEGER xp
        INTEGER streak
        TIMESTAMP last_active
    }
    
    SKILLS {
        UUID id PK
        VARCHAR name
        VARCHAR category "Frontend, Backend, Python & ML"
    }

    USER_SKILLS {
        UUID id PK
        UUID user_id FK
        UUID skill_id FK
        INTEGER level "0 to 5"
    }

    CAREER_ROLES {
        UUID id PK
        VARCHAR name "e.g. Frontend Developer"
        VARCHAR demand "High, Critical"
        VARCHAR salary_range
    }

    ROLE_REQUIREMENTS {
        UUID id PK
        UUID role_id FK
        UUID skill_id FK
        INTEGER importance "1 to 5"
    }

    ACTIVE_QUESTS {
        UUID id PK
        UUID user_id FK
        UUID role_id FK
        INTEGER progress_percent "0 to 100"
        BOOLEAN is_completed
    }

    LEARNING_RESOURCES {
        UUID id PK
        UUID skill_id FK
        VARCHAR title
        VARCHAR platform "YouTube, Udemy, etc."
        VARCHAR url
        VARCHAR duration
        VARCHAR cost "Free, Paid"
    }

    USER_ACHIEVEMENTS {
        UUID id PK
        UUID user_id FK
        VARCHAR achievement_key "first_quest, streak_3, etc."
        TIMESTAMP unlocked_at
    }
```

---

## 🚀 Part 3: Step-by-Step Execution Guide for your Friend

Copy and send these steps directly to your backend partner to get the system integrated:

### Step 1: Set up PostgreSQL
Choose whether to go with **Local PostgreSQL** or **Cloud PostgreSQL (Neon.tech/Supabase)**.
* If Local: Install PostgreSQL on the laptop, open **pgAdmin**, and create a database named `smart_career_roadmap`.

### Step 2: Initialize ASP.NET Core Web API Project
In the `/backend` folder of the repo:
1. Install Entity Framework Core packages for PostgreSQL:
   ```bash
   dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
   dotnet add package Microsoft.EntityFrameworkCore.Design
   ```
2. Create the Database Context (`AppDbContext.cs`) defining the `DbSet` tables for all the entities shown in the diagram.
3. Configure the PostgreSQL Connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=smart_career_roadmap;Username=postgres;Password=yourpassword"
   }
   ```

### Step 3: Run EF Core Migrations
Create the initial migrations to automatically generate database tables:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Step 4: Add Seed Data
Create a seed utility class to pre-fill the database with:
* The initial list of skills (React, JavaScript, PostgreSQL, scikit-learn).
* Default career roles & their skill weight requirements.
* Relevant high-quality learning resources.

### Step 5: Build API Endpoints for Frontend Integration
Create controllers with endpoints that the React frontend can fetch:
* `GET /api/profile` - Returns user level, streak, XP.
* `POST /api/skills/rate` - Updates user skill level (re-calculates XP progress, increments user level if XP threshold is crossed).
* `GET /api/dashboard` - Computes and returns the dynamic **employability score** based on current user skills vs target role requirements.
* `POST /api/quest/accept` - Sets/changes the active career target role quest.
