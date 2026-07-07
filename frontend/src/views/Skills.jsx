import React from 'react';
import { Award, ShieldAlert, Star } from 'lucide-react';

const Skills = ({ userSkills, updateSkillLevel }) => {
  // Group skills by category
  const categories = [...new Set(userSkills.map(s => s.category))];

  const getProficiencyLabel = (level) => {
    switch (level) {
      case 5: return { label: 'Grandmaster', color: 'text-amber-400' };
      case 4: return { label: 'Expert', color: 'text-purple-400' };
      case 3: return { label: 'Journeyman', color: 'text-cyan-400' };
      case 2: return { label: 'Apprentice', color: 'text-emerald-400' };
      case 1: return { label: 'Novice', color: 'text-slate-400' };
      default: return { label: 'Not Discovered', color: 'text-slate-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="glass-panel p-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-purple-950/10 to-transparent">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-cyan-400 font-display">
          SKILL SPHERE CONSOLE
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
          Select or update your proficiency in each skill sphere. Improving your proficiency raises your level, 
          adds XP to your standing, and directly increases your readiness score for your chosen career quest.
        </p>
      </div>

      {/* Grid of categories */}
      <div className="space-y-8">
        {categories.map(category => {
          const categorySkills = userSkills.filter(s => s.category === category);

          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gold-light/10 pb-2">
                <span className="text-lg">🌌</span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gold font-display">
                  {category} Sector
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categorySkills.map(skill => {
                  const ratingLabel = getProficiencyLabel(skill.level);

                  return (
                    <div 
                      key={skill.name} 
                      className="glass-panel p-5 rounded-xl flex flex-col justify-between gap-4 transition-all duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-bold text-slate-100 font-display">
                            {skill.name}
                          </h3>
                          <span className={`text-[10px] uppercase font-bold tracking-wide ${ratingLabel.color}`}>
                            {ratingLabel.label}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 bg-slate-900/40 border border-slate-800/60 px-2 py-0.5 rounded font-mono">
                          Lv.{skill.level}
                        </span>
                      </div>

                      {/* Interactive Leveling selector */}
                      <div className="flex items-center justify-between border-t border-slate-800/40 pt-4">
                        <span className="text-xs text-slate-400 font-sans">Rate Competency:</span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((lvl) => {
                            const isSelected = skill.level === lvl;
                            return (
                              <button
                                key={lvl}
                                onClick={() => updateSkillLevel(skill.name, lvl)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-all border ${
                                  isSelected 
                                    ? 'bg-gold text-bg-primary border-gold shadow-[0_0_10px_rgba(255,184,0,0.4)]'
                                    : 'bg-slate-950/40 text-slate-400 border-slate-800/80 hover:border-gold/50 hover:text-gold'
                                }`}
                              >
                                {lvl}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
