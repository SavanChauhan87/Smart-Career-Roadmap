import React from 'react';
import { Award, Lock, ShieldCheck } from 'lucide-react';

const Achievements = ({ userProfile, unlockedAchievements, allAchievements }) => {
  return (
    <div className="space-y-6">
      {/* Intro Panel */}
      <div className="glass-panel p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 via-gold-dim to-transparent">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-gold-light font-display">
          GUILD TROPHY HALL
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
          Review your unlocked badges and honors. Complete quests, improve skill levels, and maintain active learning 
          streaks to unlock all legendary developer titles.
        </p>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allAchievements.map((ach) => {
          const isUnlocked = unlockedAchievements.includes(ach.id);
          
          return (
            <div 
              key={ach.id} 
              className={`glass-panel p-5 rounded-2xl border transition-all duration-300 text-center flex flex-col items-center justify-between gap-3 ${
                isUnlocked 
                  ? 'border-gold/30 bg-gradient-to-b from-slate-900/10 to-gold/5 shadow-[0_4px_15px_rgba(255,184,0,0.05)]' 
                  : 'opacity-50 border-slate-800 bg-slate-950/20'
              }`}
            >
              {/* Badge Icon */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 ${
                isUnlocked 
                  ? 'bg-gold-dim border-gold text-gold shadow-[0_0_15px_rgba(255,184,0,0.3)]' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-500'
              }`}>
                {isUnlocked ? ach.icon : <Lock className="w-6 h-6 text-slate-600" />}
              </div>

              {/* Title & Desc */}
              <div className="space-y-1">
                <h3 className={`text-sm font-bold font-display ${isUnlocked ? 'text-gold' : 'text-slate-400'}`}>
                  {ach.name}
                </h3>
                <p className="text-xs text-slate-400 font-sans max-w-[200px] mx-auto leading-normal">
                  {ach.description}
                </p>
              </div>

              {/* Status */}
              <div className="border-t border-slate-800/40 pt-3 w-full mt-2">
                <span className={`text-[10px] uppercase font-bold tracking-widest font-display ${
                  isUnlocked ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  {isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
