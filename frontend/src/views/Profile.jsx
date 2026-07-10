import React, { useState } from 'react';
import { User, Mail, Calendar, Shield, Award, Printer, BookOpen, Edit2, Check, ExternalLink } from 'lucide-react';

const Profile = ({ 
  userProfile, 
  userSkills, 
  selectedRole, 
  unlockedAchievements, 
  allAchievements, 
  resourcesData = {}, 
  onLogout,
  onUpdateProfile,
  onToggleResource
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editBio, setEditBio] = useState(userProfile.bio || '');
  const [editGithub, setEditGithub] = useState(userProfile.githubUrl || '');
  const [editLinkedin, setEditLinkedin] = useState(userProfile.linkedinUrl || '');

  // Calculate average proficiency level
  const activeSkills = userSkills.filter(s => s.level > 0);
  const activeSkillsCount = activeSkills.length;
  const averageProficiency = activeSkillsCount > 0 
    ? (activeSkills.reduce((acc, curr) => acc + curr.level, 0) / activeSkillsCount).toFixed(1) 
    : '0.0';

  const handleSave = async () => {
    if (onUpdateProfile) {
      await onUpdateProfile({
        name: editName,
        bio: editBio,
        githubUrl: editGithub,
        linkedinUrl: editLinkedin
      });
    }
    setIsEditing(false);
  };

  const printCertificate = () => {
    window.print();
  };

  // Flatten learning resources from resourcesData that match user's active skills
  const activeSkillNames = new Set(activeSkills.map(s => s.name));
  const filteredCourses = [];
  
  Object.entries(resourcesData).forEach(([skillName, items]) => {
    if (activeSkillNames.has(skillName)) {
      items.forEach(item => {
        filteredCourses.push({
          ...item,
          skillName
        });
      });
    }
  });

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
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 border border-gold/30 text-gold font-bold font-display text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Edit2 className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Registry'}
          </button>
          
          <button 
            onClick={printCertificate}
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-bg-primary font-bold font-display text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Export Certificate
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detail Panel */}
        <div className="glass-panel p-6 rounded-2xl space-y-6 self-start">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-display border-b border-slate-800/40 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-gold" /> Member Registry
          </h3>

          <div className="space-y-4 text-sm font-sans">
            {isEditing ? (
              <div className="space-y-3.5">
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Adventurer Name</label>
                  <input 
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-950/60 border border-gold/20 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-gold/60"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">Guild Member Bio</label>
                  <textarea 
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Tell the guild about your goals..."
                    className="w-full bg-slate-950/60 border border-gold/20 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-gold/60 h-20 resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">GitHub Profile Link</label>
                  <input 
                    type="text"
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full bg-slate-950/60 border border-gold/20 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-gold/60"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">LinkedIn Profile Link</label>
                  <input 
                    type="text"
                    value={editLinkedin}
                    onChange={(e) => setEditLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full bg-slate-950/60 border border-gold/20 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-gold/60"
                  />
                </div>
                <button 
                  onClick={handleSave}
                  className="w-full mt-2 bg-gradient-to-r from-gold to-amber-500 text-bg-primary font-bold font-display text-xs py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Guild Records
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Guild Member:</span>
                  <span className="font-semibold text-slate-200 block text-sm">{userProfile.name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Registrar Email:</span>
                  <span className="font-semibold text-slate-200 block">{userProfile.email}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Member Bio:</span>
                  <span className="text-slate-300 block text-xs leading-relaxed italic bg-slate-950/20 border border-gold/5 p-2.5 rounded-xl">
                    {userProfile.bio || 'Adventurer has not written a bio yet.'}
                  </span>
                </div>
                <div className="flex gap-3 pt-2">
                  {userProfile.githubUrl && (
                    <a 
                      href={userProfile.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-all animate-fadeIn"
                    >
                      🌐 GitHub
                    </a>
                  )}
                  {userProfile.linkedinUrl && (
                    <a 
                      href={userProfile.linkedinUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-all animate-fadeIn"
                    >
                      🔗 LinkedIn
                    </a>
                  )}
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Educational Background:</span>
                  <span className="font-semibold text-slate-200 block">B.Tech CSE - Semester 7</span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800/40">
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 hover:border-red-500/45 text-red-400 font-semibold font-display text-xs py-2 rounded-xl transition-all cursor-pointer"
              >
                🚪 Sign Out of Guild
              </button>
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
                  {selectedRole ? selectedRole.split(' ')[0] : 'None'}
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

      {/* Skills & Recommended Courses Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 font-sans">
        {/* Skill Masteries */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-display border-b border-slate-800/40 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" /> Active Skill Tree Masteries
          </h3>
          
          {activeSkillsCount > 0 ? (
            <div className="space-y-4">
              {userSkills
                .filter(s => s.level > 0)
                .map(skill => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-200 block text-xs">{skill.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{skill.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span 
                            key={star} 
                            className={`text-xs ${star <= skill.level ? 'text-gold' : 'text-slate-700'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="bg-gold-dim border border-gold/20 text-gold font-bold text-[10px] px-2 py-0.5 rounded font-display">
                        Lvl {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-4">No skill points allocated yet. Visit the Skill Tree to level up!</p>
          )}
        </div>

        {/* Recommended & Completed Loot */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-display border-b border-slate-800/40 pb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" /> Recommended Loot Items (Courses)
          </h3>
          
          {filteredCourses.length > 0 ? (
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              {filteredCourses.map((course, idx) => (
                <div 
                  key={course.id || idx} 
                  className={`p-3 rounded-xl transition-all flex items-center justify-between gap-4 border ${
                    course.isCompleted 
                      ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/35' 
                      : 'bg-slate-950/40 border-gold/10 hover:border-gold/35'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input 
                      type="checkbox"
                      checked={!!course.isCompleted}
                      onChange={(e) => onToggleResource && onToggleResource(course.id, e.target.checked)}
                      className="mt-1 w-3.5 h-3.5 rounded border-gold/30 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <span className={`text-xs font-semibold block leading-tight ${
                        course.isCompleted ? 'text-slate-400 line-through' : 'text-slate-200'
                      }`}>
                        {course.title}
                      </span>
                      <div className="flex items-center gap-2 text-[9px] text-slate-500">
                        <span className="bg-purple-950/40 border border-purple-800/30 text-purple-400 px-1.5 py-0.25 rounded font-bold">{course.skillName}</span>
                        <span>•</span>
                        <span>{course.platform}</span>
                        <span>•</span>
                        <span>{course.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 shrink-0">
                      {course.cost}
                    </span>
                    {course.url && (
                      <a 
                        href={course.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-slate-500 hover:text-gold transition-all"
                        title="Open Resource link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-4">Activate skill levels in your Skill Tree to unlock course recommendations!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
