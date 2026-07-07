import React from 'react';
import { PlayCircle, GraduationCap, FileText, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const Roadmap = ({ selectedRole, userSkills, careerRoles, resourcesCatalog }) => {
  const roleInfo = careerRoles.find(r => r.name === selectedRole) || careerRoles[0];

  return (
    <div className="space-y-6">
      {/* Intro Dashboard */}
      <div className="glass-panel p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 via-cyan-950/10 to-transparent flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-purple-400 font-display uppercase">
            {selectedRole} QUEST LOG
          </h1>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed font-sans">
            Here is your personalized roadmap sequence. To complete the path, rating each skill sphere to a level of 4 or 5 is required.
          </p>
        </div>
        <div className="flex-shrink-0 bg-gold-dim border border-gold/30 rounded-xl px-4 py-2.5 font-display text-xs text-gold">
          🗺️ {roleInfo.requirements.length} Quest Objectives
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative border-l border-gold-light/20 ml-4 pl-6 space-y-8">
        {roleInfo.requirements.map((req, index) => {
          const skill = userSkills.find(s => s.name === req.skill);
          const level = skill ? skill.level : 0;
          const isCompleted = level >= 4;
          const inProgress = level > 0 && level < 4;
          const isLocked = index > 0 && (userSkills.find(s => s.name === roleInfo.requirements[index - 1].skill)?.level || 0) < 3;

          // Find associated learning resources for this skill from the resourcesCatalog
          const skillResources = resourcesCatalog[req.skill] || [];

          return (
            <div 
              key={req.skill}
              className={`relative transition-all duration-300 ${isLocked ? 'opacity-45' : ''}`}
            >
              {/* Step indicator node on timeline */}
              <span className={`absolute -left-[35px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center font-display text-[10px] ${
                isCompleted 
                  ? 'bg-emerald-500 border-emerald-400 text-bg-primary shadow-[0_0_8px_#10b981]' 
                  : inProgress 
                    ? 'bg-cyan-500 border-cyan-400 text-bg-primary shadow-[0_0_8px_#00c9ff]' 
                    : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}>
                {isCompleted ? '✓' : index + 1}
              </span>

              {/* Box Panel */}
              <div className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-200">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/40 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
                      Objective {index + 1}: Master {req.skill}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 font-sans">
                        Required Level: <strong className="text-slate-300">4+</strong>
                      </span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] text-slate-400 font-sans">
                        Priority: <strong className="text-gold">{'★'.repeat(req.importance)}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-sans">Your Progress:</span>
                      <span className="text-xs font-bold text-slate-100 block font-mono">Level {level}/5</span>
                    </div>
                  </div>
                </div>

                {/* Content: Link Resources Beacons */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-display mb-3 flex items-center gap-1.5">
                    📡 Learning Resource Beacons
                  </h4>
                  
                  {isLocked ? (
                    <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 text-center text-xs text-slate-500 font-sans">
                      🔒 Complete the previous objectives to unlock learning resources.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {skillResources.map((res, rIdx) => {
                        const getResourceIcon = (type) => {
                          if (type === 'video') return <PlayCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
                          if (type === 'course') return <GraduationCap className="w-4 h-4 text-cyan-400 flex-shrink-0" />;
                          return <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />;
                        };

                        return (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-gold/40 hover:bg-gold-dim transition-all text-left text-xs group"
                          >
                            {getResourceIcon(res.type)}
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-slate-200 block truncate group-hover:text-gold transition-all font-display text-[10px] uppercase tracking-wide">
                                {res.title}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate font-sans">
                                {res.platform} • {res.time} • {res.cost}
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
