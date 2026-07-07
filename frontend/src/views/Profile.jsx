import React from 'react';
import { User, Mail, Calendar, Shield, Award, Printer } from 'lucide-react';

const Profile = ({ userProfile, userSkills, selectedRole, unlockedAchievements, allAchievements }) => {
  
  // Calculate average proficiency level
  const activeSkillsCount = userSkills.filter(s => s.level > 0).length;
  const averageProficiency = activeSkillsCount > 0 
    ? (userSkills.reduce((acc, curr) => acc + curr.level, 0) / activeSkillsCount).toFixed(1) 
    : '0.0';

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Intro header */}
      <div className="glass-panel p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 via-cyan-950/10 to-transparent flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-purple-400 font-display">
            GUILD MEMBER CERTIFICATE
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
            Review your overall profile credentials, standing tiers, and export your certification statistics.
          </p>
        </div>
        
        <button 
          onClick={printCertificate}
          className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-bg-primary font-bold font-display text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] shrink-0"
        >
          <Printer className="w-4 h-4" /> Export Certificate
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detail Panel */}
        <div className="glass-panel p-6 rounded-2xl space-y-6 self-start">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-display border-b border-slate-800/40 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-gold" /> Member Registry
          </h3>

          <div className="space-y-4 text-sm font-sans">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Guild Member:</span>
              <span className="font-semibold text-slate-200 block">{userProfile.name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Registrar Email:</span>
              <span className="font-semibold text-slate-200 block">{userProfile.email}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Registered On:</span>
              <span className="font-semibold text-slate-200 block">July 7, 2026</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Educational Background:</span>
              <span className="font-semibold text-slate-200 block">B.Tech CSE - Semester 7</span>
            </div>
          </div>
        </div>

        {/* Certificate Display Panel */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl border-2 border-dashed border-gold/40 bg-gradient-to-b from-bg-card to-purple-950/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-radial-gradient from-gold to-transparent" />
          
          <div className="text-center space-y-6">
            <span className="text-3xl">📜</span>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gold font-display tracking-widest">
                CERTIFICATE OF GUILD STANDING
              </h2>
              <span className="text-xs text-slate-400 block tracking-widest font-sans italic">
                Issued by the Smart Career Roadmap Guild
              </span>
            </div>

            <div className="max-w-md mx-auto text-sm text-slate-300 font-sans leading-relaxed border-t border-b border-slate-800/40 py-6">
              This credentials card verifies that <strong className="text-gold font-display text-xs">{userProfile.name.toUpperCase()}</strong> has reached the standing tier of <strong className="text-purple-400 font-display text-xs">LEVEL {userProfile.level}</strong> and holds an average skill rating of <strong className="text-cyan-400">{averageProficiency}/5.0</strong> across all active disciplines.
            </div>

            {/* Micro Stats inside Certificate */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <span className="text-sm font-bold text-slate-100 font-display block">
                  {activeSkillsCount}
                </span>
                <span className="text-[9px] uppercase text-slate-400 tracking-wider font-sans block mt-1">
                  Skills
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-slate-100 font-display block">
                  {unlockedAchievements.length}
                </span>
                <span className="text-[9px] uppercase text-slate-400 tracking-wider font-sans block mt-1">
                  Badges
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-slate-100 font-display block">
                  {selectedRole.split(' ')[0]}
                </span>
                <span className="text-[9px] uppercase text-slate-400 tracking-wider font-sans block mt-1">
                  Active Quest
                </span>
              </div>
            </div>
            
            {/* Authenticity Badge */}
            <div className="pt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-gold" /> Authenticated Registry: SCR-2026-PC
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
