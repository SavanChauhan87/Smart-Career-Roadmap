-- 📂 Smart Career Roadmap Database Schema & Seed Script (PostgreSQL)

-- 1. Create Tables

-- Drop tables if they exist (for easy re-running/resetting)
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS user_resources CASCADE;
DROP TABLE IF EXISTS completed_quests CASCADE;
DROP TABLE IF EXISTS learning_resources CASCADE;
DROP TABLE IF EXISTS active_quests CASCADE;
DROP TABLE IF EXISTS role_requirements CASCADE;
DROP TABLE IF EXISTS career_roles CASCADE;
DROP TABLE IF EXISTS user_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    level INT DEFAULT 1,
    xp INT DEFAULT 0,
    streak INT DEFAULT 0,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bio TEXT,
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255)
);

-- Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL -- 'Frontend', 'Backend', 'Python & ML'
);

-- User-Skills level tracking
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    level INT DEFAULT 0 CHECK (level >= 0 AND level <= 5),
    CONSTRAINT unique_user_skill UNIQUE (user_id, skill_id)
);

-- Career Roles table
CREATE TABLE career_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    demand VARCHAR(50) NOT NULL, -- 'High Demand', 'Critical'
    salary_range VARCHAR(50) NOT NULL
);

-- Role Requirements (Skills weighted for each role)
CREATE TABLE role_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    importance INT DEFAULT 3 CHECK (importance >= 1 AND importance <= 5),
    CONSTRAINT unique_role_requirement UNIQUE (role_id, skill_id)
);

-- Active target quest for user
CREATE TABLE active_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    progress_percent INT DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    is_completed BOOLEAN DEFAULT FALSE
);

-- Learning Resources Catalog
CREATE TABLE learning_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    platform VARCHAR(50) NOT NULL, -- 'YouTube', 'Udemy', 'Coursera', 'Official Docs'
    url VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    cost VARCHAR(50) -- 'Free', 'Paid'
);

-- User Achievements unlocked
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_key VARCHAR(100) NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_key)
);

-- User learning resources tracking (completion log)
CREATE TABLE user_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES learning_resources(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_resource UNIQUE (user_id, resource_id)
);

-- User completed quests history log
CREATE TABLE completed_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_completed_role UNIQUE (user_id, role_id)
);

-- -------------------------------------------------------------
-- 2. Insert Seed/Initial Data

-- Insert Skills
INSERT INTO skills (id, name, category) VALUES
('a0000000-0000-0000-0000-000000000001', 'HTML & CSS', 'Frontend'),
('a0000000-0000-0000-0000-000000000002', 'JavaScript', 'Frontend'),
('a0000000-0000-0000-0000-000000000003', 'React JS', 'Frontend'),
('a0000000-0000-0000-0000-000000000004', 'TypeScript', 'Frontend'),
('a0000000-0000-0000-0000-000000000005', 'Tailwind CSS', 'Frontend'),
('a0000000-0000-0000-0000-000000000006', 'C# Programming', 'Backend'),
('a0000000-0000-0000-0000-000000000007', 'ASP.NET Core', 'Backend'),
('a0000000-0000-0000-0000-000000000008', 'REST APIs', 'Backend'),
('a0000000-0000-0000-0000-000000000009', 'PostgreSQL', 'Backend'),
('a0000000-0000-0000-0000-000000000010', 'Node.js', 'Backend'),
('a0000000-0000-0000-0000-000000000011', 'Python Core', 'Python & ML'),
('a0000000-0000-0000-0000-000000000012', 'FastAPI', 'Python & ML'),
('a0000000-0000-0000-0000-000000000013', 'scikit-learn', 'Python & ML'),
('a0000000-0000-0000-0000-000000000014', 'Pandas & NumPy', 'Python & ML');

-- Insert Career Roles
INSERT INTO career_roles (id, name, demand, salary_range) VALUES
('b0000000-0000-0000-0000-000000000001', 'Frontend Developer', 'High Demand', '₹6-18 LPA'),
('b0000000-0000-0000-0000-000000000002', 'Backend Developer', 'Critical', '₹8-22 LPA'),
('b0000000-0000-0000-0000-000000000003', 'Full-Stack Developer', 'Critical', '₹10-25 LPA'),
('b0000000-0000-0000-0000-000000000004', 'Machine Learning Engineer', 'High Demand', '₹12-28 LPA');

-- Insert Role Requirements (Skills weights mapping)
-- Frontend Developer
INSERT INTO role_requirements (role_id, skill_id, importance) VALUES
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 5), -- HTML & CSS
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 5), -- JavaScript
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 5), -- React JS
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 4), -- Tailwind CSS
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 4); -- TypeScript

-- Backend Developer
INSERT INTO role_requirements (role_id, skill_id, importance) VALUES
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 5), -- C#
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000007', 5), -- ASP.NET Core
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000008', 5), -- REST APIs
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009', 4), -- PostgreSQL
('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000010', 3); -- Node.js

-- Full-Stack Developer
INSERT INTO role_requirements (role_id, skill_id, importance) VALUES
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 4),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 5),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 5),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000006', 4),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', 4),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', 5),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000009', 4);

-- Machine Learning Engineer
INSERT INTO role_requirements (role_id, skill_id, importance) VALUES
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000011', 5), -- Python
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000012', 4), -- FastAPI
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000013', 5), -- scikit-learn
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000014', 5), -- Pandas
('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000008', 3); -- REST APIs

-- Insert Learning Resources
INSERT INTO learning_resources (skill_id, title, platform, url, duration, cost) VALUES
('a0000000-0000-0000-0000-000000000001', 'HTML & CSS Full Course for Beginners', 'YouTube', 'https://www.youtube.com/watch?v=mU6anWqZJcc', '6 hrs', 'Free'),
('a0000000-0000-0000-0000-000000000001', 'Web Design for Beginners', 'Udemy', 'https://www.udemy.com/course/web-design-for-beginners-real-world-coding-in-html-css/', '11 hrs', 'Paid'),
('a0000000-0000-0000-0000-000000000002', 'JavaScript Complete Course 2026', 'YouTube', 'https://www.youtube.com/watch?v=ajdRvxD8kTo', '12 hrs', 'Free'),
('a0000000-0000-0000-0000-000000000003', 'React JS crash course - Programming with Mosh', 'YouTube', 'https://www.youtube.com/watch?v=SqcY0GlETPk', '2 hrs', 'Free'),
('a0000000-0000-0000-0000-000000000004', 'TypeScript Official Documentation handbook', 'Official Docs', 'https://www.typescriptlang.org/docs/', 'N/A', 'Free');

-- Insert Sample User (Savan Chauhan) — password is "password123"
INSERT INTO users (id, name, email, password_hash, level, xp, streak) VALUES
('c0000000-0000-0000-0000-000000000001', 'Savan Chauhan', 'savan@guild.com', '$2a$11$K1rSbKxqJOu8VJdLqEXVYOWQ4lDn5X0zHfJfGnXPcEaCBf2Kd5g7u', 7, 2450, 7);

-- Insert User Skills levels (matches initial state)
INSERT INTO user_skills (user_id, skill_id, level) VALUES
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 2), -- HTML & CSS (Level 2)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 1), -- JavaScript (Level 1)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 0), -- React (Level 0)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 0), -- TypeScript (Level 0)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 2), -- Tailwind (Level 2)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 1), -- C# (Level 1)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 1), -- REST APIs (Level 1)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000009', 1), -- PostgreSQL (Level 1)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 2), -- Python Core (Level 2)
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000014', 1); -- Pandas (Level 1)

-- Insert Active Target Quest (Frontend Developer role for Savan)
INSERT INTO active_quests (user_id, role_id, progress_percent, is_completed) VALUES
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 72, FALSE);

-- Insert Achievements
INSERT INTO user_achievements (user_id, achievement_key) VALUES
('c0000000-0000-0000-0000-000000000001', 'first_quest'),
('c0000000-0000-0000-0000-000000000001', 'streak_3'),
('c0000000-0000-0000-0000-000000000001', 'skills_10');
