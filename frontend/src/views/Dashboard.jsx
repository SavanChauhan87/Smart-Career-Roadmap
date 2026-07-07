import React, { useEffect, useState } from 'react';
import { Award, BookOpen, CheckCircle, Shield, Target, TrendingUp, Zap } from 'lucide-react';

const Dashboard = ({ userProfile, selectedRole, userSkills, careerRoles, setPage }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Find selected role details
  const roleInfo = careerRoles.find(r => r.name === selectedRole) || careerRoles[0];

  // Calculate matching score (employability)
  const calculateEmployability = () => {
    if (!roleInfo) return 0;
    
    let totalWeight = 0;
    let earnedWeight = 0;

    roleInfo.requirements.forEach(req => {
      const userSkill = userSkills.find(s => s.name === req.skill);
      const proficiency = userSkill ? userSkill.level : 0; // 0 to 5
      
      // Calculate weight based on importance (1 to 5)
      const weight = req.importance;
      totalWeight += weight * 5; // Max possible weight (5 proficiency * weight)
      earnedWeight += weight * proficiency;
    });

    return totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  };

  const score = calculateEmployability();

  useEffect(() => {
    // Count up animation
    setAnimatedScore(0);
    const timeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(current);
        }
      }, 15);
      return () => clearInterval(interval);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  // Circumference for stroke R=68 is 2 * PI * 68 = 427.25
  const strokeCircumference = 2 * Math.PI * 68;
  const strokeDashoffset = strokeCircumference - (animatedScore / 100) * strokeCircumference;

  // Derive Readiness Label
  const getReadinessLabel = (val) => {
    if (val >= 85) return { label: '⚡ Combat Ready (Job Ready)', color: 'text-emerald-400 border-emerald-500 bg-emerald-500/10' };
    if (val >= 60) return { label: '🛡️ Vanguard (Almost Ready)', color: 'text-cyan-400 border-cyan-500 bg-cyan-500/10' };
    if (val >= 35) return { label: '⚔️ Squire (Needs Training)', color: 'text-amber-400 border-amber-500 bg-amber-500/10' };
    return { label: '🐣 Novice (Beginner)', color: 'text-red-400 border-red-500 bg-red-500/10' };
  };

  const status = getReadinessLabel(score);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden bg-gradient-to-r from-purple-900/20 via-gold-dim to-cyan-900/10 transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-full bg-radial-gradient from-gold/5 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-wide text-gold-light font-display">
              WELCOME BACK, {userProfile.name.toUpperCase()}!
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-sans">
              Your quest to conquer the <strong className="text-gold">{selectedRole}</strong> role is in progress. 
              Keep leveling up your skills to maximize your warp readiness. The tech guild awaits your ascension!
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <div className="bg-gold-dim border border-gold/30 rounded-xl px-4 py-3 text-center min-w-[85px] backdrop-blur-md">
              <span className="text-lg font-bold text-gold font-display block">🔥 {userProfile.streak}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mt-0.5">Day Streak</span>
            </div>
            <div className="bg-purple-950/30 border border-purple-800/30 rounded-xl px-4 py-3 text-center min-w-[85px] backdrop-blur-md">
              <span className="text-lg font-bold text-purple-400 font-display block">⚡ {userSkills.filter(s => s.level > 0).length}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mt-0.5">Skills Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cockpit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Employability Score Ring */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-display mb-4 flex items-center gap-1.5 self-start">
            <Shield className="w-4 h-4 text-gold" /> Combat Readiness Matrix
          </h3>
          
          <div className="relative w-44 h-44 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r="68"
                className="fill-none stroke-slate-800/60"
                strokeWidth="10"
              />
              {/* Foreground animated ring */}
              <circle
                cx="80"
                cy="80"
                r="68"
                className="fill-none stroke-gold"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={strokeCircumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'drop-shadow(0 0 8px rgba(255, 184, 0, 0.5))',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black font-decorative text-gold leading-none">
                {animatedScore}
                <span className="text-sm font-semibold">%</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 mt-1 font-sans">Match Rating</span>
            </div>
          </div>

          <div className={`mt-3 border rounded-full px-4 py-1 text-xs font-semibold tracking-wide ${status.color}`}>
            {status.label}
          </div>
          
          <p className="text-xs text-slate-400 mt-4 leading-normal font-sans">
            Targeting: <strong className="text-slate-200">{selectedRole}</strong>
          </p>
          <button 
            onClick={() => setPage('careers')}
            className="text-[10px] uppercase font-bold text-gold hover:text-gold-light hover:underline mt-2 flex items-center gap-1 font-display"
          >
            Change Target Role <Target className="w-3 h-3" />
          </button>
        </div>

        {/* Quest Telemetry Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-5 rounded-xl flex items-center gap-4 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-xl shadow-lg">
              🛡️
            </div>
            <div>
              <div className="text-lg font-bold text-slate-100 font-display leading-tight">
                LEVEL {userProfile.level}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-sans">
                Active Guild Standing Tier
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl flex items-center gap-4 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-xl shadow-lg">
              🗺️
            </div>
            <div>
              <div className="text-lg font-bold text-slate-100 font-display leading-tight">
                {userSkills.filter(s => s.level > 0).length} / {userSkills.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-sans">
                Skill Spheres Discovered
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl flex items-center gap-4 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-xl shadow-lg">
              🎓
            </div>
            <div>
              <div className="text-lg font-bold text-slate-100 font-display leading-tight">
                {userSkills.filter(s => s.level >= 4).length} Mastery
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-sans">
                High Proficiency Skills (Lv.4+)
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl flex items-center gap-4 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center text-xl shadow-lg">
              🏆
            </div>
            <div>
              <div className="text-lg font-bold text-slate-100 font-display leading-tight">
                {userProfile.badgesEarned} Badges
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-sans">
                Achievements Unlocked
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Active Quests (Roadmap Steps Preview) */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between border-b border-gold-light/10 pb-4 mb-4">
          <h3 className="text-sm font-bold tracking-wider text-slate-100 font-display flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold" /> ACTIVE QUEST LOG
          </h3>
          <button 
            onClick={() => setPage('roadmap')}
            className="text-xs font-bold text-gold hover:text-gold-light hover:underline font-display"
          >
            VIEW DETAILED ROADMAP →
          </button>
        </div>

        <div className="space-y-4">
          {/* We display missing skills as roadmap steps */}
          {roleInfo.requirements.slice(0, 3).map((req, idx) => {
            const userSkill = userSkills.find(s => s.name === req.skill);
            const level = userSkill ? userSkill.level : 0;
            const isCompleted = level >= 4;
            const inProgress = level > 0 && level < 4;

            return (
              <div 
                key={req.skill}
                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted 
                    ? 'bg-emerald-950/5 border-emerald-900/20' 
                    : inProgress 
                      ? 'bg-cyan-950/5 border-cyan-900/20' 
                      : 'bg-slate-900/20 border-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display text-xs ${
                    isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : inProgress 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                      Master {req.skill}
                      {isCompleted && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-display">Conquered</span>}
                      {inProgress && <span className="text-[9px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-display">In Progress</span>}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Importance Rating: {'★'.repeat(req.importance)}{'☆'.repeat(5 - req.importance)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Your Rating</span>
                    <span className="text-sm font-bold text-slate-100 block font-display">{level}/5</span>
                  </div>
                  <button 
                    onClick={() => setPage('skills')}
                    className="bg-gold hover:bg-gold-light text-bg-primary px-3 py-1.5 rounded-lg text-xs font-bold font-display transition-all"
                  >
                    Level Up
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
