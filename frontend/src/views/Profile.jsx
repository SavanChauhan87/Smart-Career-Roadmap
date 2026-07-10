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
    const downloadPDF = () => {
      const element = document.getElementById('printable-certificate-container');
      if (!element) return;

      // Create a temporary container clone to format specifically for the PDF
      const clone = element.cloneNode(true);

      // Force absolute light theme styling on the container clone
      clone.style.background = '#fffdf9';
      clone.style.color = '#1a202c';
      clone.style.border = '8px double #b5843b';
      clone.style.boxShadow = 'none';
      clone.style.padding = '3rem';
      clone.style.width = '800px';
      clone.style.borderRadius = '0px';

      // 1. Title colors
      const title = clone.querySelector('.cert-title');
      if (title) title.style.color = '#b5843b';

      // 2. Subtitle colors
      const sub = clone.querySelector('.cert-sub');
      if (sub) sub.style.color = '#718096';

      // 3. Central description text & highlighted spans
      const text = clone.querySelector('.cert-text');
      if (text) {
        text.style.borderColor = '#cbd5e0';
        text.style.color = '#2d3748';
        const strongs = text.querySelectorAll('strong');
        strongs.forEach(s => {
          s.style.color = '#1a202c';
        });
        const goldStrongs = text.querySelectorAll('.cert-gold');
        goldStrongs.forEach(s => {
          s.style.color = '#b5843b';
        });
        const purpleStrongs = text.querySelectorAll('.cert-purple');
        purpleStrongs.forEach(s => {
          s.style.color = '#5a52a3';
        });
      }

      // 4. Stats section styles
      const stats = clone.querySelector('.cert-stats');
      if (stats) {
        stats.style.background = '#f7fafc';
        stats.style.borderColor = '#e2e8f0';
        const values = stats.querySelectorAll('.cert-stat-val');
        values.forEach(v => {
          v.style.color = '#1a202c';
        });
        const labels = stats.querySelectorAll('.cert-stat-label');
        labels.forEach(l => {
          l.style.color = '#718096';
        });
      }

      // 5. Signatures, roles & decorative lines
      const signatures = clone.querySelectorAll('.cert-signature-name');
      signatures.forEach(s => {
        s.style.color = '#2d3748';
      });
      const roles = clone.querySelectorAll('.cert-signature-role');
      roles.forEach(r => {
        r.style.color = '#718096';
      });
      const sigLines = clone.querySelectorAll('.cert-signature-line');
      sigLines.forEach(l => {
        l.style.borderColor = '#cbd5e0';
      });
      const sigSerif = clone.querySelectorAll('.font-serif');
      sigSerif.forEach(st => {
        st.style.color = '#8c6a2c'; // Elegant dark brown/gold for signatures
      });

      // 6. Seal stamp
      const seal = clone.querySelector('.cert-seal');
      if (seal) {
        seal.style.borderColor = '#b5843b';
        seal.style.background = '#fffbeb';
        const sealTexts = seal.querySelectorAll('span, svg');
        sealTexts.forEach(t => {
          t.style.color = '#b5843b';
        });
      }

      const opt = {
        margin:       0.5,
        filename:     `SkillSathi_Certificate_${userProfile.name.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2.5, 
          useCORS: true,
          logging: false
        },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
      };

      window.html2pdf().from(clone).set(opt).save();
    };

    // Load html2pdf dynamically from cdnjs if not already present
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => {
        downloadPDF();
      };
      document.head.appendChild(script);
    } else {
      downloadPDF();
    }
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
        <div 
          id="printable-certificate-container"
          className="lg:col-span-2 glass-panel p-8 rounded-2xl border-2 border-dashed border-gold/40 bg-gradient-to-b from-bg-card to-purple-950/5 relative overflow-hidden"
        >
          {/* Ornate Gold Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-radial-gradient from-gold to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 bg-radial-gradient from-purple-600 to-transparent" />
          
          <div className="text-center space-y-6">
            <div className="space-y-1.5">
              <span className="text-3xl block filter drop-shadow-[0_0_8px_rgba(255,184,0,0.4)]">📜</span>
              <h2 className="text-xl md:text-2xl font-bold text-gold font-display tracking-widest cert-title">
                CERTIFICATE OF ACHIEVEMENTS
              </h2>
              <span className="text-xs text-slate-400 block tracking-widest font-sans italic cert-sub">
                Issued by SkillSathi Credentials Register
              </span>
            </div>

            <div className="max-w-md mx-auto text-sm text-slate-300 font-sans leading-relaxed border-t border-b border-slate-800/40 py-6 cert-text">
              This official credential registry certifies that <strong className="text-gold font-display text-xs cert-gold">{userProfile.name.toUpperCase()}</strong> has successfully reached the standing tier of <strong className="text-purple-400 font-display text-xs cert-purple">LEVEL {userProfile.level}</strong> and holds an average capability score of <strong className="text-cyan-400">{averageProficiency}/5.0</strong> across all mapped career domains on <strong className="text-gold">SkillSathi</strong>.
            </div>

            {/* Micro Stats inside Certificate */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto cert-stats bg-slate-900/30 border border-gold/10 p-3 rounded-xl">
              <div className="text-center">
                <span className="text-sm font-bold text-slate-150 font-display block cert-stat-val">
                  {activeSkillsCount}
                </span>
                <span className="text-[9px] uppercase text-slate-450 tracking-wider font-sans block mt-1 cert-stat-label">
                  Skills Mastered
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-slate-150 font-display block cert-stat-val">
                  {unlockedAchievements.length}
                </span>
                <span className="text-[9px] uppercase text-slate-450 tracking-wider font-sans block mt-1 cert-stat-label">
                  Trophies Earned
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-slate-150 font-display block cert-stat-val">
                  {selectedRole ? selectedRole.split(' ')[0] : 'None'}
                </span>
                <span className="text-[9px] uppercase text-slate-450 tracking-wider font-sans block mt-1 cert-stat-label">
                  Active Quest
                </span>
              </div>
            </div>

            {/* Professional Signatures & Stamp Layout */}
            <div className="grid grid-cols-3 items-center gap-4 pt-6 border-t border-slate-800/30">
              {/* Savan Chauhan signature line */}
              <div className="text-center space-y-1">
                <div className="text-gold-light italic font-serif text-sm h-6 select-none font-bold tracking-wider">
                  Savan Chauhan
                </div>
                <div className="w-24 mx-auto border-t border-slate-700/50 cert-signature-line" />
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest cert-signature-name">
                  Savan Chauhan
                </div>
                <div className="text-[8px] text-slate-500 font-sans cert-signature-role">
                  Founder, SkillSathi
                </div>
              </div>

              {/* Center Seal Stamp */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gold/45 bg-gold-dim/15 flex flex-col items-center justify-center text-center shadow-[0_0_10px_rgba(255,184,0,0.1)] cert-seal select-none cursor-default">
                  <span className="text-[8px] font-black text-gold font-display uppercase tracking-widest leading-none">OFFICIAL</span>
                  <Award className="w-4 h-4 text-gold my-0.5" />
                  <span className="text-[7px] text-gold font-sans uppercase tracking-widest leading-none">SEAL</span>
                </div>
              </div>

              {/* Prince Jadav signature line */}
              <div className="text-center space-y-1">
                <div className="text-gold-light italic font-serif text-sm h-6 select-none font-bold tracking-wider">
                  Prince Jadav
                </div>
                <div className="w-24 mx-auto border-t border-slate-700/50 cert-signature-line" />
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest cert-signature-name">
                  Prince Jadav
                </div>
                <div className="text-[8px] text-slate-500 font-sans cert-signature-role">
                  Co-Founder, SkillSathi
                </div>
              </div>
            </div>

            {/* Authenticity Badge */}
            <div className="pt-3 flex items-center justify-center gap-1.5 text-[9px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-gold/60" /> Authenticated Registry: SKILLSATHI-2026-REG
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
