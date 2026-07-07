import React from 'react';
import { Target, TrendingUp, DollarSign, Award, Star } from 'lucide-react';

const Careers = ({ careerRoles, selectedRole, userSkills, selectTargetRole }) => {
  
  // Calculate match score for a specific role
  const getMatchScore = (role) => {
    let totalWeight = 0;
    let earnedWeight = 0;

    role.requirements.forEach(req => {
      const userSkill = userSkills.find(s => s.name === req.skill);
      const level = userSkill ? userSkill.level : 0;
      const weight = req.importance;
      
      totalWeight += weight * 5;
      earnedWeight += weight * level;
    });

    return totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Critical': return 'text-red-400 border-red-500 bg-red-500/10';
      case 'High Demand': return 'text-amber-400 border-amber-500 bg-amber-500/10';
      case 'Growing': return 'text-cyan-400 border-cyan-500 bg-cyan-500/10';
      default: return 'text-slate-400 border-slate-700 bg-slate-800/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Panel */}
      <div className="glass-panel p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 via-gold-dim to-transparent">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-gold-light font-display">
          CAREER QUEST CATALOG
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
          Select your target career quest. Each quest outlines the specific skills, industry average salary, 
          and demand level required in the professional guild. Setting a target generates a custom learning roadmap.
        </p>
      </div>

      {/* Grid of Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerRoles.map(role => {
          const matchScore = getMatchScore(role);
          const isSelected = selectedRole === role.name;

          return (
            <div 
              key={role.name}
              className={`glass-panel p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                isSelected 
                  ? 'border-gold bg-gradient-to-b from-purple-950/10 to-gold/5 shadow-[0_0_20px_rgba(255,184,0,0.15)]' 
                  : 'border-gold-light/10 hover:border-gold/30'
              }`}
            >
              {isSelected && (
                <span className="absolute top-4 right-4 bg-gold text-bg-primary px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase font-display shadow-lg animate-pulse">
                  ACTIVE QUEST
                </span>
              )}

              {/* Title & Stats */}
              <div>
                <h3 className="text-base font-bold text-slate-100 font-display pr-24">
                  {role.name}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border rounded-full ${getDemandColor(role.demand)}`}>
                    ⚡ {role.demand}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300 bg-slate-900/50 border border-slate-800/80 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                    <DollarSign className="w-3 h-3 text-gold" /> {role.salary}
                  </span>
                </div>

                {/* Match Rating Progress */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">Role Compatibility Matrix:</span>
                    <span className="font-bold text-gold font-display">{matchScore}% Match</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-gold rounded-full transition-all duration-1000"
                      style={{ width: `${matchScore}%` }}
                    />
                  </div>
                </div>

                {/* Key Prerequisites */}
                <div className="mt-5">
                  <span className="text-xs text-slate-400 font-sans block mb-2">Prerequisites:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.requirements.map(req => (
                      <span 
                        key={req.skill}
                        className="text-[10px] bg-slate-950/60 border border-slate-800/80 rounded px-2.5 py-1 text-slate-300 font-sans"
                      >
                        {req.skill} <span className="text-gold font-mono text-[9px]">★{req.importance}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <div className="mt-6 border-t border-slate-800/40 pt-4">
                <button
                  disabled={isSelected}
                  onClick={() => selectTargetRole(role.name)}
                  className={`w-full py-2.5 rounded-xl font-bold font-display text-xs tracking-wider transition-all ${
                    isSelected 
                      ? 'bg-transparent border border-gold/40 text-gold cursor-default'
                      : 'bg-gold hover:bg-gold-light text-bg-primary shadow-lg hover:shadow-[0_0_15px_rgba(255,184,0,0.3)]'
                  }`}
                >
                  {isSelected ? 'TARGET IDENTIFIED' : 'ACCEPT CAREER QUEST'}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Careers;
