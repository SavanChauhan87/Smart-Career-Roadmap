import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Dashboard from './views/Dashboard';
import Skills from './views/Skills';
import Careers from './views/Careers';
import Roadmap from './views/Roadmap';
import Resources from './views/Resources';
import Achievements from './views/Achievements';
import Profile from './views/Profile';
import { 
  Shield, Target, Award, BookOpen, User, 
  Menu, X, Bell, LogIn, Lock, Mail, Edit3, Map,
  Sun, Moon, Loader2
} from 'lucide-react';
import * as api from './services/api';

// Static Data definitions
const initialSkills = [
  // Frontend
  { name: 'HTML & CSS', level: 2, category: 'Frontend' },
  { name: 'JavaScript', level: 1, category: 'Frontend' },
  { name: 'React JS', level: 0, category: 'Frontend' },
  { name: 'TypeScript', level: 0, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 2, category: 'Frontend' },
  // Backend
  { name: 'C# Programming', level: 1, category: 'Backend' },
  { name: 'ASP.NET Core', level: 0, category: 'Backend' },
  { name: 'REST APIs', level: 1, category: 'Backend' },
  { name: 'PostgreSQL', level: 1, category: 'Backend' },
  { name: 'Node.js', level: 0, category: 'Backend' },
  // Python & Machine Learning
  { name: 'Python Core', level: 2, category: 'Python & ML' },
  { name: 'FastAPI', level: 0, category: 'Python & ML' },
  { name: 'scikit-learn', level: 0, category: 'Python & ML' },
  { name: 'Pandas & NumPy', level: 1, category: 'Python & ML' }
];

const careerRoles = [
  {
    name: 'Frontend Developer',
    demand: 'High Demand',
    salary: '₹6-18 LPA',
    requirements: [
      { skill: 'HTML & CSS', importance: 5 },
      { skill: 'JavaScript', importance: 5 },
      { skill: 'React JS', importance: 5 },
      { skill: 'Tailwind CSS', importance: 4 },
      { skill: 'TypeScript', importance: 4 }
    ]
  },
  {
    name: 'Backend Developer',
    demand: 'Critical',
    salary: '₹8-22 LPA',
    requirements: [
      { skill: 'C# Programming', importance: 5 },
      { skill: 'ASP.NET Core', importance: 5 },
      { skill: 'REST APIs', importance: 5 },
      { skill: 'PostgreSQL', importance: 4 },
      { skill: 'Node.js', importance: 3 }
    ]
  },
  {
    name: 'Full-Stack Developer',
    demand: 'Critical',
    salary: '₹10-25 LPA',
    requirements: [
      { skill: 'HTML & CSS', importance: 4 },
      { skill: 'JavaScript', importance: 5 },
      { skill: 'React JS', importance: 5 },
      { skill: 'C# Programming', importance: 4 },
      { skill: 'ASP.NET Core', importance: 4 },
      { skill: 'REST APIs', importance: 5 },
      { skill: 'PostgreSQL', importance: 4 }
    ]
  },
  {
    name: 'Machine Learning Engineer',
    demand: 'High Demand',
    salary: '₹12-28 LPA',
    requirements: [
      { skill: 'Python Core', importance: 5 },
      { skill: 'FastAPI', importance: 4 },
      { skill: 'scikit-learn', importance: 5 },
      { skill: 'Pandas & NumPy', importance: 5 },
      { skill: 'REST APIs', importance: 3 }
    ]
  }
];

const allAchievements = [
  { id: 'first_quest', name: 'First Milestone', description: 'Unlock your first skill node by leveling it up.', icon: '🌟' },
  { id: 'streak_3', name: 'Dedicated Learner', description: 'Gain a 3-day active quest log streak.', icon: '🔥' },
  { id: 'skills_10', name: 'Jack of All Trades', description: 'Unlock 10 distinct skill spheres.', icon: '⚡' },
  { id: 'target_chosen', name: 'Destiny Defined', description: 'Accept a career target role quest.', icon: '🎯' },
  { id: 'master_level', name: 'Guild Master', description: 'Reach Level 10 on your profile.', icon: '👑' },
  { id: 'job_ready', name: 'Vanguard Adept', description: 'Achieve 85% score readiness.', icon: '🛡️' }
];

const resourcesCatalog = {
  'HTML & CSS': [
    { title: 'HTML & CSS Full Course for Beginners', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=mU6anWqZJcc', time: '6 hrs', cost: 'Free', type: 'video' },
    { title: 'CSS Layouts Masterclass', platform: 'Coursera', url: 'https://www.coursera.org/specializations/css-design', time: '4 weeks', cost: 'Free Audit', type: 'course' }
  ],
  'JavaScript': [
    { title: 'JavaScript Tutorial for Beginners', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', time: '1 hr', cost: 'Free', type: 'video' },
    { title: 'Modern JavaScript (Deep Dive)', platform: 'Udemy', url: 'https://www.udemy.com/course/the-complete-javascript-course/', time: '68 hrs', cost: 'Paid', type: 'course' }
  ],
  'React JS': [
    { title: 'React JS Course for Beginners', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk', time: '3 hrs', cost: 'Free', type: 'video' },
    { title: 'React Documentation Core Guides', platform: 'Official Docs', url: 'https://react.dev/learn', time: 'Self-paced', cost: 'Free', type: 'article' }
  ],
  'TypeScript': [
    { title: 'TypeScript Course for Beginners', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', time: '4 hrs', cost: 'Free', type: 'video' },
    { title: 'TypeScript Official Handbook', platform: 'Official Docs', url: 'https://www.typescriptlang.org/docs/', time: 'Self-paced', cost: 'Free', type: 'article' }
  ],
  'Tailwind CSS': [
    { title: 'Tailwind CSS Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=UBOj6rqRUME', time: '2 hrs', cost: 'Free', type: 'video' },
    { title: 'Tailwind CSS Docs', platform: 'Official Docs', url: 'https://tailwindcss.com/docs', time: 'Self-paced', cost: 'Free', type: 'article' }
  ],
  'C# Programming': [
    { title: 'C# Tutorial for Beginners', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8', time: '4 hrs', cost: 'Free', type: 'video' },
    { title: 'C# Fundamentals', platform: 'Pluralsight', url: 'https://www.pluralsight.com/courses/csharp-fundamentals', time: '5 hrs', cost: 'Paid', type: 'course' }
  ],
  'ASP.NET Core': [
    { title: 'ASP.NET Core Web API Complete Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=hBso78531cf', time: '8 hrs', cost: 'Free', type: 'video' },
    { title: 'ASP.NET Core Official Microsoft Tutorials', platform: 'Microsoft Docs', url: 'https://learn.microsoft.com/en-us/aspnet/core/', time: 'Self-paced', cost: 'Free', type: 'article' }
  ],
  'REST APIs': [
    { title: 'REST API Concepts & Designing', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=-M5Ax5Uxpcg', time: '1 hr', cost: 'Free', type: 'video' }
  ],
  'PostgreSQL': [
    { title: 'PostgreSQL Tutorial for Beginners', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=qw5y87951cf', time: '4 hrs', cost: 'Free', type: 'video' }
  ],
  'Node.js': [
    { title: 'Node.js Full Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', time: '10 hrs', cost: 'Free', type: 'video' }
  ],
  'Python Core': [
    { title: 'Python for Beginners', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', time: '6 hrs', cost: 'Free', type: 'video' }
  ],
  'FastAPI': [
    { title: 'FastAPI Tutorial', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=tLKKmCO5SIk', time: '3 hrs', cost: 'Free', type: 'video' }
  ],
  'scikit-learn': [
    { title: 'Machine Learning with Scikit-Learn', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=pqNCD_5r0IU', time: '4 hrs', cost: 'Free', type: 'video' }
  ],
  'Pandas & NumPy': [
    { title: 'Data Analysis with Pandas & NumPy', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=r-uOLxNyhdw', time: '5 hrs', cost: 'Free', type: 'video' }
  ]
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');
  const [isLoggedIn, setIsLoggedIn] = useState(!!api.getStoredToken());
  const [email, setEmail] = useState('savan@guild.com');
  const [password, setPassword] = useState('password123');
  const [theme, setTheme] = useState('dark');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  
  // Game user profile state
  const [userProfile, setUserProfile] = useState({
    id: null,
    name: 'Adventurer',
    email: '',
    level: 1,
    xp: 0,
    maxXp: 3000,
    streak: 0,
    badgesEarned: 0
  });

  // User Skill matrices state (will be fetched from API)
  const [userSkills, setUserSkills] = useState(initialSkills);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  // Career roles from API
  const [careerRolesData, setCareerRolesData] = useState(careerRoles);
  // Resources from API
  const [resourcesData, setResourcesData] = useState(resourcesCatalog);
  
  // Dynamic Attributes derived from skill levels
  const [attributes, setAttributes] = useState({
    technical: 72,
    problemSolving: 65,
    collaboration: 80,
    communication: 58
  });

  // Recalculate attributes on skill levels change
  useEffect(() => {
    const activeSkills = userSkills.filter(s => s.level > 0).length;
    const avgSkillLvl = activeSkills > 0 
      ? userSkills.reduce((acc, curr) => acc + curr.level, 0) / userSkills.length 
      : 0;

    // Simulate attribute scores based on actual skill ratings
    const calculatedTech = Math.min(40 + Math.round(avgSkillLvl * 12), 100);
    const calculatedProblem = Math.min(45 + Math.round(avgSkillLvl * 10), 100);
    
    setAttributes(prev => ({
      ...prev,
      technical: calculatedTech,
      problemSolving: calculatedProblem
    }));
  }, [userSkills]);

  // ── Fetch all data from API after login ──────────────────
  useEffect(() => {
    if (!isLoggedIn) return;
    const userId = api.getStoredUserId();
    if (!userId) return;

    const loadData = async () => {
      try {
        // Fetch user profile
        const userData = await api.getUser(userId);
        if (userData) {
          setUserProfile({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            level: userData.level,
            xp: userData.xp,
            maxXp: userData.maxXp,
            streak: userData.streak,
            badgesEarned: userData.badgesEarned
          });
        }

        // Fetch user skills
        const skillsData = await api.getUserSkills(userId);
        if (skillsData && skillsData.length > 0) {
          setUserSkills(skillsData.map(s => ({
            id: s.id,
            name: s.name,
            level: s.level,
            category: s.category
          })));
        }

        // Fetch career roles
        const careersData = await api.getCareers();
        if (careersData && careersData.length > 0) {
          setCareerRolesData(careersData.map(r => ({
            id: r.id,
            name: r.name,
            demand: r.demand,
            salary: r.salary,
            requirements: r.requirements
          })));
        }

        // Fetch active quest
        const questData = await api.getActiveQuest(userId);
        if (questData && questData.roleName) {
          setSelectedRole(questData.roleName);
        }

        // Fetch achievements
        const achievementsData = await api.getAchievements(userId);
        if (achievementsData) {
          setUnlockedAchievements(achievementsData.map(a => a.achievementKey));
        }

        // Fetch resources
        const resourcesResult = await api.getResources();
        if (resourcesResult && Object.keys(resourcesResult).length > 0) {
          // Transform API response to match frontend shape
          const transformed = {};
          for (const [skillName, items] of Object.entries(resourcesResult)) {
            transformed[skillName] = items.map(r => ({
              title: r.title,
              platform: r.platform,
              url: r.url,
              time: r.duration || 'N/A',
              cost: r.cost || 'Free',
              type: r.platform === 'YouTube' ? 'video' : r.platform === 'Official Docs' ? 'article' : 'course'
            }));
          }
          setResourcesData(prev => ({ ...prev, ...transformed }));
        }
      } catch (err) {
        console.error('Failed to load data from API:', err);
        // Fallback: keep mock data if API is unreachable
      }
    };

    loadData();
  }, [isLoggedIn]);

  // ── Skill updates — calls API then syncs local state ────
  const updateSkillLevel = async (skillName, newLevel) => {
    // Find the skill's ID for the API call
    const skill = userSkills.find(s => s.name === skillName);
    const userId = api.getStoredUserId();

    // Optimistic local update first
    setUserSkills(prev => prev.map(s => s.name === skillName ? { ...s, level: newLevel } : s));

    try {
      if (skill?.id && userId) {
        const result = await api.updateSkillLevel(userId, skill.id, newLevel);
        // Sync profile with server-calculated XP/Level
        if (result?.user) {
          setUserProfile(prev => ({
            ...prev,
            xp: result.user.xp,
            level: result.user.level,
            maxXp: result.user.maxXp,
            badgesEarned: result.user.badgesEarned
          }));
        }
      } else {
        // Fallback: client-side XP calc if no API
        const oldSkill = userSkills.find(s => s.name === skillName);
        const diff = newLevel - (oldSkill?.level || 0);
        if (diff > 0) awardXp(diff * 250);
      }
    } catch (err) {
      console.error('Skill update API failed:', err);
      // Fallback: client-side XP calc
      const oldSkill = userSkills.find(s => s.name === skillName);
      const diff = newLevel - (oldSkill?.level || 0);
      if (diff > 0) awardXp(diff * 250);
    }

    // Check achievements
    const updatedSkills = userSkills.map(s => s.name === skillName ? { ...s, level: newLevel } : s);
    const activeCount = updatedSkills.filter(s => s.level > 0).length;
    if (activeCount >= 10 && !unlockedAchievements.includes('skills_10')) {
      unlockAchievement('skills_10');
    }
  };

  const awardXp = (amount) => {
    setUserProfile(prev => {
      let newXp = prev.xp + amount;
      let newLvl = prev.level;
      let newMaxXp = prev.maxXp;

      while (newXp >= newMaxXp) {
        newXp -= newMaxXp;
        newLvl += 1;
        newMaxXp = Math.round(newMaxXp * 1.25);
        
        if (newLvl >= 10 && !unlockedAchievements.includes('master_level')) {
          unlockAchievement('master_level');
        }
      }

      return { ...prev, xp: newXp, level: newLvl, maxXp: newMaxXp };
    });
  };

  const unlockAchievement = async (id) => {
    if (unlockedAchievements.includes(id)) return;
    
    setUnlockedAchievements(prev => [...prev, id]);
    setUserProfile(p => ({ ...p, badgesEarned: p.badgesEarned + 1 }));

    try {
      const userId = api.getStoredUserId();
      if (userId) await api.unlockAchievement(userId, id);
    } catch (err) {
      console.error('Achievement unlock API failed:', err);
    }
  };

  const selectTargetRole = async (roleName) => {
    setSelectedRole(roleName);

    try {
      const userId = api.getStoredUserId();
      const role = careerRolesData.find(r => r.name === roleName);
      if (userId && role?.id) {
        await api.setActiveQuest(userId, role.id);
        // Refresh profile to get updated XP from server
        const userData = await api.getUser(userId);
        if (userData) {
          setUserProfile(prev => ({
            ...prev,
            xp: userData.xp,
            level: userData.level,
            maxXp: userData.maxXp
          }));
        }
      } else {
        awardXp(200);
      }
    } catch (err) {
      console.error('Quest select API failed:', err);
      awardXp(200); // Fallback
    }

    if (!unlockedAchievements.includes('target_chosen')) {
      unlockAchievement('target_chosen');
    }
  };

  const renderView = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            userProfile={userProfile} 
            selectedRole={selectedRole}
            userSkills={userSkills}
            careerRoles={careerRolesData}
            setPage={setCurrentPage}
          />
        );
      case 'skills':
        return (
          <Skills 
            userSkills={userSkills}
            updateSkillLevel={updateSkillLevel}
          />
        );
      case 'careers':
        return (
          <Careers 
            careerRoles={careerRolesData}
            selectedRole={selectedRole}
            userSkills={userSkills}
            selectTargetRole={selectTargetRole}
          />
        );
      case 'roadmap':
        return (
          <Roadmap 
            selectedRole={selectedRole}
            userSkills={userSkills}
            careerRoles={careerRolesData}
            resourcesCatalog={resourcesData}
          />
        );
      case 'resources':
        return (
          <Resources 
            resourcesCatalog={resourcesData}
          />
        );
      case 'achievements':
        return (
          <Achievements 
            userProfile={userProfile}
            unlockedAchievements={unlockedAchievements}
            allAchievements={allAchievements}
          />
        );
      case 'profile':
        return (
          <Profile 
            userProfile={userProfile}
            userSkills={userSkills}
            selectedRole={selectedRole}
            unlockedAchievements={unlockedAchievements}
            allAchievements={allAchievements}
            onLogout={() => {
              api.clearAuth();
              setIsLoggedIn(false);
              setIsRegister(false);
              setCurrentPage('dashboard');
            }}
          />
        );
      default:
        return <Dashboard userProfile={userProfile} selectedRole={selectedRole} userSkills={userSkills} careerRoles={careerRolesData} setPage={setCurrentPage} />;
    }
  };

  const xpPercentage = (userProfile.xp / userProfile.maxXp) * 100;

  if (!isLoggedIn) {
    return (
      <div className={`flex items-center justify-center min-h-screen text-[#EDE8D8] relative font-sans ${theme === 'light' ? 'light-theme' : ''} bg-[#06070F]`}>
        <ParticleBackground />
        
        {/* Theme toggle on login page */}
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 rounded-xl bg-slate-900/60 border border-gold/20 hover:bg-gold-dim flex items-center justify-center text-slate-400 hover:text-gold transition-all cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-purple-400" />}
          </button>
        </div>

        <div className="glass-panel max-w-md w-full p-8 rounded-2xl border border-gold/20 shadow-2xl relative z-10 mx-4">
          <div className="text-center mb-6">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.5)] text-2xl mx-auto mb-4">
              ⚔️
            </span>
            <h1 className="text-2xl font-bold font-display text-gold-light tracking-wide">
              SMART CAREER ROADMAP
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1.5 font-sans">
              {isRegister ? 'Create Guild Account' : 'Enter the Adventurer Guild'}
            </p>
          </div>

          {loginError && (
            <div className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-2 font-sans">
              {loginError}
            </div>
          )}

          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoginError('');
            setIsLoading(true);
            try {
              if (isRegister) {
                // Register flow
                const data = await api.register(name, email, password);
                setUserProfile({
                  id: data.user.id,
                  name: data.user.name,
                  email: data.user.email,
                  level: data.user.level,
                  xp: data.user.xp,
                  maxXp: data.user.maxXp,
                  streak: data.user.streak,
                  badgesEarned: data.user.badgesEarned
                });
                setIsLoggedIn(true);
              } else {
                // Login flow
                const data = await api.login(email, password);
                setUserProfile({
                  id: data.user.id,
                  name: data.user.name,
                  email: data.user.email,
                  level: data.user.level,
                  xp: data.user.xp,
                  maxXp: data.user.maxXp,
                  streak: data.user.streak,
                  badgesEarned: data.user.badgesEarned
                });
                setIsLoggedIn(true);
              }
            } catch (err) {
              setLoginError(err.message || 'Authentication failed. Is the backend running?');
              // Fallback: allow mock if API is unreachable
              if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
                setLoginError('Backend API unreachable — using offline fallback.');
                setIsLoggedIn(true);
              }
            } finally {
              setIsLoading(false);
            }
          }} className="space-y-4">
            {isRegister && (
              <div className="space-y-1 animate-fadeIn">
                <label className="text-[10px] text-slate-450 font-sans block font-semibold uppercase tracking-wider">Adventurer Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Savan Chauhan"
                    className="w-full bg-slate-950/60 border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-gold/60 transition-all font-sans"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-500"><User className="w-4 h-4" /></span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] text-slate-455 font-sans block font-semibold uppercase tracking-wider">Guild Member Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@guild.com"
                  className="w-full bg-slate-950/60 border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/60 transition-all font-sans"
                />
                <span className="absolute right-3.5 top-3 text-slate-500"><Mail className="w-4 h-4" /></span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-455 font-sans block font-semibold uppercase tracking-wider">Secret Access Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/60 border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-655 focus:outline-none focus:border-gold/60 transition-all font-sans"
                />
                <span className="absolute right-3.5 top-3 text-slate-500"><Lock className="w-4 h-4" /></span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-gold to-amber-500 hover:from-gold-light hover:to-gold text-[#06070F] font-bold font-display tracking-wider py-3 rounded-xl transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> REGISTERING...</>
              ) : isRegister ? (
                <>INITIATE JOURNEY <LogIn className="w-4 h-4" /></>
              ) : (
                <>ENTER GUILD <LogIn className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button 
              onClick={() => {
                setIsRegister(prev => !prev);
                setLoginError('');
              }}
              className="text-xs text-gold hover:text-gold-light underline transition-all font-sans cursor-pointer bg-transparent border-none"
            >
              {isRegister ? 'Already have a guild account? Sign In' : 'New adventurer? Create a Guild Account'}
            </button>
          </div>

          <div className="mt-6 text-center text-[10px] text-slate-500 border-t border-gold/10 pt-4 font-sans">
            Authentication is required. Access your personalized RPG roadmap console.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen text-[#EDE8D8] relative font-sans ${theme === 'light' ? 'light-theme' : ''} bg-[#06070F]`}>
      {/* Dynamic Starfield canvas */}
      <ParticleBackground />

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99] lg:hidden"
        />
      )}

      {/* Left Sidebar console */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-[270px] bg-gradient-to-b from-[#080914] to-[#06070D] border-r border-gold/20 z-[100] transition-transform duration-300 flex flex-col justify-between shrink-0 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 p-5 border-b border-gold/15">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gold to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(255,184,0,0.4)] text-base">
              ⚔️
            </span>
            <div className="leading-tight">
              <span className="font-bold text-slate-100 tracking-wider font-display text-sm block">
                CAREER GUILD
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-sans mt-0.5">
                Console Dashboard
              </span>
            </div>
          </div>

          {/* Commander Character Widget */}
          <div 
            onClick={() => setCurrentPage('profile')} 
            className="m-4 p-5 bg-gradient-to-br from-purple-950/20 to-gold-dim border border-gold/15 rounded-2xl relative overflow-hidden text-center cursor-pointer hover:border-gold/35 transition-all group"
          >
            <div className="relative w-16 h-16 mx-auto mb-3">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-gold flex items-center justify-center text-3xl avatar-glow">
                🧙
              </div>
              <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-gold to-gold-light text-[#06070F] text-[9px] font-black px-2 py-0.5 rounded-full font-display border border-gold">
                LV.{userProfile.level}
              </span>
            </div>

            <h4 className="text-xs font-bold text-gold-light font-display">
              {userProfile.name.toUpperCase()}
            </h4>
            <span className="text-[9px] uppercase font-bold tracking-widest text-purple-400 bg-purple-500/10 border border-purple-800/30 px-2.5 py-0.5 rounded-full inline-block mt-1 font-sans">
              Apprentice Explorer
            </span>

            {/* XP Tracker */}
            <div className="mt-4">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-sans">
                <span>XP Progress</span>
                <span className="text-gold font-bold">{userProfile.xp}/{userProfile.maxXp}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-gold rounded-full transition-all duration-500"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Attributes Tiers */}
          <div className="px-5 py-3">
            <h5 className="text-[10px] text-slate-500 font-display uppercase tracking-widest border-b border-gold/10 pb-2 mb-3">
              ⚔️ Stats Attributes
            </h5>
            
            <div className="space-y-3">
              {[
                { name: '🖥️ Technical Skill', val: attributes.technical, color: 'from-cyan-500 to-blue-500' },
                { name: '🧩 Problem Solving', val: attributes.problemSolving, color: 'from-gold to-amber-500' },
                { name: '🤝 Collaboration', val: attributes.collaboration, color: 'from-emerald-500 to-teal-500' },
                { name: '💬 Communication', val: attributes.communication, color: 'from-pink-500 to-purple-500' }
              ].map(attr => (
                <div key={attr.name}>
                  <div className="flex justify-between text-xs mb-1 font-sans">
                    <span className="text-slate-400">{attr.name}</span>
                    <span className="font-bold text-slate-200">{attr.val}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-950/60 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${attr.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${attr.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1">
            <h5 className="text-[10px] text-slate-500 font-display uppercase tracking-widest border-b border-gold/10 pb-2 mb-2 px-3">
              🗺️ Guild Navigation
            </h5>

            {[
              { id: 'dashboard', label: '🏰 Dashboard', tag: null },
              { id: 'skills', label: '⚔️ Skill Tree', tag: userSkills.filter(s => s.level > 0).length },
              { id: 'careers', label: '🏆 Quest Board', tag: null },
              { id: 'roadmap', label: '🗺️ Quest Log', tag: null },
              { id: 'resources', label: '📚 Loot items', tag: null },
              { id: 'achievements', label: '🎖️ Trophies', tag: unlockedAchievements.length },
              { id: 'profile', label: '👤 Certificate', tag: null }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold font-display tracking-wide border transition-all ${
                  currentPage === item.id 
                    ? 'bg-gradient-to-r from-gold/10 to-purple-950/5 border-gold/45 text-gold shadow-[inset_0_0_8px_rgba(255,184,0,0.05)]' 
                    : 'bg-transparent border-transparent text-slate-400 hover:text-gold hover:bg-gold-dim hover:border-gold/15'
                }`}
              >
                <span>{item.label}</span>
                {item.tag !== null && (
                  <span className="bg-purple-950/50 border border-purple-800/30 text-purple-400 font-mono text-[9px] px-1.5 py-0.5 rounded-md font-bold">
                    {item.tag}
                  </span>
                )}
              </button>
            ))}
            
            <button
              onClick={() => {
                api.clearAuth();
                setIsLoggedIn(false);
                setIsRegister(false);
                setCurrentPage('dashboard');
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold font-display tracking-wide border transition-all bg-transparent border-transparent text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/25 mt-4 cursor-pointer"
            >
              <span>🚪 Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gold/10 text-center text-[10px] text-slate-500 font-sans">
          Major Project © 2026
        </div>
      </aside>

      {/* Main Bridge Frame */}
      <div className="flex-1 lg:ml-[270px] min-h-screen flex flex-col relative z-10">
        {/* Header telemetry */}
        <header className="sticky top-0 bg-[#06070F]/80 backdrop-blur-xl border-b border-gold/15 px-6 py-4 flex items-center justify-between z-50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gold border border-gold/20 hover:bg-gold-dim p-2 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <h2 className="text-sm font-bold tracking-widest text-slate-100 font-display flex items-center gap-2">
              BRIDGE CONTROL <span className="text-gold">•</span> <span className="text-[10px] text-slate-400 font-sans uppercase font-normal">Active Quest: {selectedRole}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-xl bg-slate-900/60 border border-gold/20 hover:bg-gold-dim flex items-center justify-center text-slate-400 hover:text-gold transition-all cursor-pointer"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-purple-400" />}
            </button>

            <button className="w-9 h-9 rounded-xl bg-slate-900/60 border border-gold/20 hover:bg-gold-dim flex items-center justify-center text-slate-400 hover:text-gold transition-all relative">
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div 
              onClick={() => setCurrentPage('profile')} 
              className="flex items-center gap-2 bg-slate-900/40 border border-gold/10 px-3 py-1.5 rounded-full hover:bg-gold-dim hover:border-gold/30 transition-all cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gold to-purple-600 flex items-center justify-center text-xs">
                🧙
              </div>
              <span className="text-[10px] font-bold text-slate-300 font-display group-hover:text-gold transition-all">{userProfile.name.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {renderView()}
        </main>
      </div>

    </div>
  );
}

export default App;
