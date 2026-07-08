# 📊 Smart Career Roadmap — Project Review Slide Deck & Diagrams

This document contains the complete content, slide outlines, diagrams, and prompts for your **Smart Career Roadmap (Career RPG)** project review presentation. 

You can use the Markdown text for your slides, render the **Mermaid diagrams** directly in your IDE (or copy-paste them into the [Mermaid Live Editor](https://mermaid.live)), and use the prompts to generate visual diagrams in tools like Draw.io or Lucidchart.

---

## 📑 Slide Outline & Content

### Slide 1: Title Slide
*   **Title:** Smart Career Roadmap: A Gamified Career RPG & Skill Gap Analyzer
*   **Subtitle:** Project Review Presentation
*   **Presenter:** Savan Chauhan (Frontend Developer) & Team
*   **Concept:** Empowering students with dynamic, interactive, and personalized career roadmaps utilizing Machine Learning.

---

### Slide 2: Abstract
*   **Heading:** Abstract
*   **Content:**
    *   **Context:** Modern professional domains evolve rapidly, making static learning paths obsolete. Students struggle to track their readiness or map skill gaps dynamically.
    *   **Proposed System:** An interactive "Career RPG" dashboard that gamifies professional progression. By treating career goals as "Quests", skills as "Spheres", and experience as "XP", student engagement is maximized.
    *   **Intelligence:** Connects a React frontend prototype with an ASP.NET Core API backend, backed by a PostgreSQL database and a Python FastAPI ML service running a Random Forest Regressor to predict real-time employability readiness.
*   **Speaker Notes:** Highlight that the system bridges the gap between educational preparation and industrial requirements using active, data-driven feedback loops.

---

### Slide 3: Problem Statement
*   **Heading:** Problem Statement
*   **Bullet Points:**
    *   **Linear & Static Roadmaps:** Traditional career pathways do not adapt to industry changes or individual student speeds.
    *   **Lack of Clear Metrics:** Students do not know their exact "employability index" or how rating a specific skill changes their job readiness.
    *   **The Engagement Gap:** Plain learning lists fail to keep students motivated, leading to abandoned learning paths.
    *   **Inaccessible Resource Pairing:** Curated, high-quality learning resources are rarely mapped directly to skill deficiencies.
*   **Speaker Notes:** Explain that students are often overwhelmed by the volume of tech stacks and lack a structured, metrics-driven navigation system.

---

### Slide 4: Project Objective
*   **Heading:** Project Objectives
*   **Bullet Points:**
    *   **Gamified Career Journeys:** Develop an immersive RPG-inspired dashboard mapping skills to XP, levels, and achievements.
    *   **Dynamic Employability Index:** Implement a Machine Learning regression model to evaluate student profiles and calculate real-time career readiness.
    *   **Actionable Gap Analysis:** Highlight exactly which skills need improvement to land a target role.
    *   **Curated Resource Beacons:** Map top courses and documents directly to skill gaps.
    *   **Scalable Architecture:** Build a multi-tier decoupled system using React, ASP.NET Core, PostgreSQL, and Python.

---

### Slide 5: Novelty & Key Differentiators
*   **Heading:** Project Novelty
*   **Content Table:**
    | Feature | Traditional Platforms | Smart Career Roadmap |
    | :--- | :--- | :--- |
    | **UX Approach** | Flat checklists & profiles | Immersive RPG Roleplay (Levels, XP, Streaks) |
    | **Roadmap Nature** | Hardcoded, static flows | Dynamic, based on ML skill-weight correlation |
    | **Feedback Loop** | Self-assessed checkboxes | Real-time Employability Readiness score |
    | **Gamification** | Absent / simple badges | Multi-tier Quests, Skill Spheres, Achievements |

---

### Slide 6: Required Technologies & Tools
*   **Heading:** Technology Stack
*   **Grid Content:**
    *   **Frontend:** React JS, Tailwind CSS v4, Lucide Icons, Vite
    *   **Backend:** ASP.NET Core Web API, Entity Framework Core (EF Core)
    *   **Database:** PostgreSQL (Relation Schemas)
    *   **Machine Learning Service:** Python, FastAPI, scikit-learn (Random Forest Regressor), Pandas, NumPy
    *   **Development Tools:** Visual Studio Code / Visual Studio, pgAdmin 4, Git / GitHub, Postman (API Testing)

---

### Slide 7: System Architecture
*   **Heading:** System Architecture
*   **Mermaid Diagram:**
    ```mermaid
    flowchart TD
        subgraph Client_Layer [Client User Interface]
            React[React JS & Vite]
            Tailwind[Tailwind CSS v4]
        end

        subgraph Backend_Gateway [API & Service Layer]
            API[ASP.NET Core Web API]
        end

        subgraph Database_Layer [Storage System]
            DB[(PostgreSQL Database)]
        end

        subgraph ML_Service_Layer [Predictive Engine]
            FastAPI[Python FastAPI]
            ML[Random Forest Model]
        end

        React <-->|HTTPS / JSON REST API| API
        API <-->|EF Core queries| DB
        API <-->|HTTP Post / JSON| FastAPI
        FastAPI <-->|Model calls| ML
    ```
*   **Lucidchart/Draw.io Prompt:** "Draw a multi-tier software architecture diagram showing four logical columns: Client UI (React, Tailwind), Backend API (ASP.NET Core), Database Storage (PostgreSQL), and Machine Learning Microservice (Python FastAPI + scikit-learn). Show bidirectional connection arrows between Frontend and Backend, Backend and Database, and Backend and ML Microservice."

---

### Slide 8: Use Case Diagram
*   **Heading:** System Use Case Diagram
*   **Mermaid Diagram:**
    ```mermaid
    flowchart LR
        subgraph Actors
            Student((Student User))
            Admin((System Admin))
        end

        subgraph Smart_Career_Roadmap [System Boundary]
            UC1(View Dashboard & Stats)
            UC2(Rate Skill Competencies)
            UC3(Select Target Career Quest)
            UC4(View Curated Resources)
            UC5(Track Level & Achievements)
            UC6(Manage Catalog & Seed Data)
        end

        Student --> UC1
        Student --> UC2
        Student --> UC3
        Student --> UC4
        Student --> UC5

        Admin --> UC6
    ```
*   **Draw.io Prompt:** "Draw a standard UML Use Case Diagram inside a system boundary block labeled 'Smart Career Roadmap'. Put a stick figure on the left labeled 'Student User' and connect it to use cases: 'View Dashboard & Stats', 'Rate Skill Competencies', 'Select Target Career Quest', 'View Curated Resources', and 'Track Level & Achievements'. Put a stick figure on the right labeled 'System Admin' connected to 'Manage Catalog & Seed Data'."

---

### Slide 9: DFD Level-0 (Context Diagram)
*   **Heading:** Data Flow Diagram (Level-0)
*   **Mermaid Diagram:**
    ```mermaid
    flowchart TD
        Student[Student User]
        System(((Smart Career Roadmap System)))
        Admin[System Administrator]

        Student -->|1. Skill Ratings & Target Roles| System
        System -->|2. Employability Index, Roadmaps & Achievements| Student
        Admin -->|3. Skill Catalog Updates & Resources| System
        System -->|4. System Logs & Activity Metrics| Admin
    ```
*   **Draw.io Prompt:** "Draw a Level-0 Context DFD. Place a double-bordered circular process bubble in the center labeled 'Smart Career Roadmap System'. Draw an external entity rectangle on the left labeled 'Student User' sending data flow 'Skill Ratings & Target Roles' and receiving 'Employability Index, Roadmaps & Achievements'. Draw an external entity on the right labeled 'System Administrator' sending 'Skill Catalog Updates' and receiving 'Activity Metrics'."

---

### Slide 10: DFD Level-1 Diagram
*   **Heading:** Data Flow Diagram (Level-1)
*   **Mermaid Diagram:**
    ```mermaid
    flowchart TD
        Student[Student User]
        
        P1((1.0 <br> User Profile & <br> Quest Management))
        P2((2.0 <br> Skill Evaluation <br> Engine))
        P3((3.0 <br> ML Employability <br> Predictor))
        P4((4.0 <br> Resource & <br> Achievement Engine))
        
        D1[(Users & Quests DB)]
        D2[(Skills & Resources DB)]

        Student -->|Choose target role| P1
        P1 -->|Read/Write profiles| D1
        
        Student -->|Submit skill ratings| P2
        P2 -->|Save proficiencies| D1
        
        P2 -->|Trigger evaluation request| P3
        P3 -->|Read role requirements| D2
        P3 -->|Evaluate competency| P1
        
        P1 -->|Update achievements| P4
        P4 -->|Read resource beacons| D2
        P4 -->|Return UI display data| Student
    ```
*   **Draw.io Prompt:** "Create a DFD Level-1 Diagram with four circular processes: 1.0 User Profile & Quest Management, 2.0 Skill Evaluation Engine, 3.0 ML Employability Predictor, and 4.0 Resource & Achievement Engine. Show data stores (Users & Quests DB, Skills & Resources DB) and indicate how user skill ratings flow from the user through the evaluation processes to trigger the ML predictor, culminating in recommending resource beacons back to the user."

---

### Slide 11: Physical ER Diagram (PostgreSQL)
*   **Heading:** Physical Entity Relationship Diagram (ERD)
*   **Mermaid Diagram:**
    ```mermaid
    erDiagram
        USERS ||--o| USER_SKILLS : tracks
        USERS ||--o| ACTIVE_QUESTS : undertakes
        USERS ||--o| USER_ACHIEVEMENTS : earns
        
        SKILLS ||--o| USER_SKILLS : defines
        SKILLS ||--o| ROLE_REQUIREMENTS : sets
        
        CAREER_ROLES ||--o| ROLE_REQUIREMENTS : details
        CAREER_ROLES ||--o| ACTIVE_QUESTS : defines_target
        
        SKILLS ||--o| LEARNING_RESOURCES : holds
        
        USERS {
            uuid id PK
            varchar name
            varchar email
            integer level
            integer xp
            integer streak
        }
        
        SKILLS {
            uuid id PK
            varchar name
            varchar category
        }

        USER_SKILLS {
            uuid id PK
            uuid user_id FK
            uuid skill_id FK
            integer level
        }

        CAREER_ROLES {
            uuid id PK
            varchar name
            varchar demand
            varchar salary_range
        }
    ```
*   **Draw.io Prompt:** "Draw a physical entity-relationship diagram containing tables: USERS, SKILLS, USER_SKILLS (associative table), CAREER_ROLES, ROLE_REQUIREMENTS (associative table), ACTIVE_QUESTS, and LEARNING_RESOURCES. Show 1-to-many relationship lines with foreign key constraints, mapping User UUIDs and Skill UUIDs correctly."

---

### Slide 12: Gantt Chart (Project Roadmap)
*   **Heading:** Project Timeline & Development Phases
*   **Mermaid Diagram:**
    ```mermaid
    gantt
        title Smart Career Roadmap Project Phases
        dateFormat  YYYY-MM-DD
        section Phase 1: Prototype
        React Views & CSS Setup      :active, p1_1, 2026-06-01, 20d
        Database Schema & pgAdmin   :active, p1_2, 2026-06-15, 10d
        section Phase 2: Integration
        ASP.NET API Controllers     :crit, p2_1, 2026-07-01, 15d
        PostgreSQL Migrations & EF  :p2_2, 2026-07-10, 10d
        section Phase 3: ML Engine
        FastAPI Service Development :p3_1, 2026-07-20, 12d
        Random Forest Model Training :p3_2, 2026-07-25, 10d
        section Phase 4: QC & Review
        Testing and UI Tuning       :p4_1, 2026-08-05, 10d
    ```
*   **Draw.io Prompt:** "Create a Gantt chart showing four phases: Phase 1: Interactive Frontend Prototype & Database schema (June), Phase 2: System Integration with ASP.NET Core & PostgreSQL (July), Phase 3: ML Engine Model development with FastAPI (Late July), and Phase 4: QC Testing and UI Fine-Tuning (August)."

---

### Slide 13: Class Diagram
*   **Heading:** UML Class Diagram
*   **Mermaid Diagram:**
    ```mermaid
    classDiagram
        class User {
            +UUID id
            +String name
            +String email
            +int level
            +int xp
            +int streak
            +updateXP(int amount)
            +incrementLevel()
        }
        
        class Skill {
            +UUID id
            +String name
            +String category
        }
        
        class UserSkill {
            +UUID id
            +UUID userId
            +UUID skillId
            +int level
            +setProficiency(int val)
        }
        
        class CareerRole {
            +UUID id
            +String name
            +String demand
            +String salaryRange
        }
        
        class ActiveQuest {
            +UUID id
            +UUID userId
            +UUID roleId
            +int progressPercent
            +checkCompleteness()
        }

        User "1" --> "*" UserSkill : owns
        Skill "1" --> "*" UserSkill : mapped_to
        User "1" --> "1" ActiveQuest : initiates
        CareerRole "1" --> "*" ActiveQuest : targets
    ```
*   **Draw.io Prompt:** "Draw a UML Class Diagram showing classes User, Skill, UserSkill, CareerRole, and ActiveQuest with basic attributes (+id, +name, etc.) and methods (+updateXP, +setProficiency). Use UML class connectors representing one-to-many associations between User and UserSkill, and User and ActiveQuest."

---

### Slide 14: Sequence Diagram (Interactive Skill Evaluation)
*   **Heading:** Sequence Diagram: Rating a Competency
*   **Mermaid Diagram:**
    ```mermaid
    sequenceDiagram
        autonumber
        actor User as Student User
        participant UI as React Frontend
        participant API as ASP.NET Backend
        participant DB as PostgreSQL DB
        participant ML as Python FastAPI ML

        User->>UI: Selects & Rates Skill Competency
        UI->>API: HTTP POST /api/skills/rate (User, Skill, Level)
        API->>DB: Save skill level in user_skills table
        DB-->>API: Confirm database write
        API->>ML: HTTP POST /api/predict (Skill profile vectors)
        ML-->>API: Return Employability Score %
        API->>DB: Save progress % in active_quests table
        API-->>UI: Return updated Profile Data (XP, level-up trigger, Score)
        UI-->>User: Trigger count-up animation & XP gain indicator
    ```
*   **Draw.io Prompt:** "Draw a UML Sequence Diagram showing the flow: Student -> React Frontend -> ASP.NET Backend -> PostgreSQL DB -> Python FastAPI ML. Draw call arrows for rating updates, saving database states, requesting ML prediction calculations, storing progress, and returning updated levels/XP/animations back to the user."

---

### Slide 15: Activity Diagram (Quest Completion Workflow)
*   **Heading:** Activity Diagram: Career Quest Execution
*   **Mermaid Diagram:**
    ```mermaid
    stateDiagram-v2
        [*] --> SelectQuest : User chooses target Career Role
        SelectQuest --> CheckSkills : Assess current user_skills
        CheckSkills --> CalculateScore : Send vectors to ML Model
        
        state Evaluation <<choice>>
        CalculateScore --> Evaluation
        
        Evaluation --> UnlockBeacons : Score < 85%
        UnlockBeacons --> RateProgress : User studies resources & rates skill levels
        RateProgress --> CalculateScore
        
        Evaluation --> CombatReady : Score >= 85%
        CombatReady --> UnlockAchievement : Award "Job Ready" badge
        UnlockAchievement --> [*]
    ```
*   **Draw.io Prompt:** "Draw a UML Activity Diagram. Start node connects to activity 'User chooses target career quest', moving to 'Evaluate current skill levels', moving to a decision diamond evaluating 'Employability score >= 85%?'. If false, point to activity 'Display targeted learning resources & take action' which loops back to skill evaluation. If true, point to 'Unlock Job-Ready Badge' and end node."

---

### Slide 16: State Transition Diagram (Quest Node Lifecycle)
*   **Heading:** State Transition Diagram: Quest Node States
*   **Mermaid Diagram:**
    ```mermaid
    stateDiagram-v2
        [*] --> Locked : Target Career not selected
        Locked --> Active : Select Target Career Role
        Active --> InProgress : Rate first required skill > 0
        InProgress --> InProgress : Rate additional skills
        InProgress --> Conquered : Employability score reaches 85%+
        Conquered --> [*]
    ```
*   **Draw.io Prompt:** "Create a UML State Machine diagram tracking the life cycle of a Quest. States are: Locked (default), Active (when career path is selected), InProgress (when user rates a required skill), and Conquered (when employability score reaches 85%+). Draw transition arrows indicating actions like 'Choose target career', 'Rate skill level', and 'Reach 85% threshold'."

---

### Slide 17: Implementation Screenshot
*   **Heading:** Implementation Snapshot (Dashboard Console)
*   **Content:**
    *   **Live Prototype URL:** `http://localhost:5173/`
    *   **Visual Highlights:**
        *   **RPG character card:** Dynamically tracks XP Progress and character tier levels.
        *   **Interactive skill-rating interface:** Live rating widgets that update attributes.
        *   **Combat Readiness Score:** Visual SVG ring calculating employability match percentages.
*   **Visual Reference:**
    Please refer to the saved screenshot file in your documentation directory:
    👉 **[docs/dashboard_screenshot.png](file:///c:/Users/ASUS/OneDrive/Desktop/SEM%207/Major%20Project/SCR/docs/dashboard_screenshot.png)**

---

### Slide 18: Summary & Conclusion
*   **Heading:** Conclusion
*   **Bullet Points:**
    *   **Interactive Success:** The client-side dashboard provides an engaging RPG environment that turns static learning into structured gameplay.
    *   **De-coupled Architecture:** Decoupled frontend, backend APIs, database, and ML layers ensure clean development division and high scalability.
    *   **Next Phase Goal:** Fully wire frontend actions to database migrations via ASP.NET Core endpoints, and train the Random Forest Regressor on industry profiles.
