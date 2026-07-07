import React, { useState } from 'react';
import { Search, PlayCircle, GraduationCap, FileText, ExternalLink } from 'lucide-react';

const Resources = ({ resourcesCatalog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Convert the catalog dictionary into an array of resources, adding their skill context
  const allResources = [];
  Object.keys(resourcesCatalog).forEach(skillName => {
    resourcesCatalog[skillName].forEach(resource => {
      allResources.push({
        ...resource,
        skill: skillName
      });
    });
  });

  // Filter logic
  const filteredResources = allResources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || res.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5 text-red-400" />;
      case 'course': return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      default: return <FileText className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Panel */}
      <div className="glass-panel p-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-gold-dim to-transparent">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-cyan-400 font-display">
          GUILD LOOT DIRECTORY
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
          Browse and search the entire repository of learning resources. These guides and online courses are hand-picked 
          by top professional guild masters to accelerate your skill leveling.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search resources by skill, title, or platform..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/40 border border-slate-800 focus:border-gold outline-none transition-all text-sm font-sans"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-1 bg-slate-950/40 border border-slate-800 rounded-xl p-1 shrink-0">
          {['all', 'video', 'course', 'article'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold font-display uppercase tracking-wide transition-all ${
                typeFilter === type
                  ? 'bg-gold text-bg-primary shadow-[0_0_8px_rgba(255,184,0,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type === 'all' ? 'All' : type + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((res, index) => (
            <a
              key={index}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-center shrink-0">
                  {getIcon(res.type)}
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded font-display uppercase tracking-wide inline-block mb-1">
                    {res.skill}
                  </span>
                  <h3 className="text-xs font-bold text-slate-100 font-display truncate">
                    {res.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 block font-sans mt-0.5">
                    {res.platform} • {res.time} • {res.cost}
                  </span>
                </div>
              </div>
              
              <div className="w-8 h-8 rounded-lg bg-slate-950/20 hover:bg-gold-dim border border-slate-800/80 hover:border-gold/40 flex items-center justify-center shrink-0 text-slate-500 hover:text-gold transition-all">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 font-sans text-sm">
            No loot resources match your filter coordinates.
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
