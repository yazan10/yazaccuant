import React, { useState } from 'react';
import { Search, Instagram, Music2, Check } from 'lucide-react';
import { translations } from '../locales';
import { Language, Platform } from '../types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AnalysisFormProps {
  onAnalyze: (username: string, niche: string, platform: Platform) => void;
  isLoading: boolean;
  lang: Language;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze, isLoading, lang }) => {
  const [username, setUsername] = useState('');
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState<Platform>('instagram');
  
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && niche) {
      onAnalyze(username, niche, platform);
    }
  };

  const isRtl = lang === 'ar' || lang === 'he';

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      {/* Glow effects */}
      <div className={clsx(
        "absolute -top-20 w-64 h-64 bg-opacity-20 blur-[100px] rounded-full pointer-events-none transition-colors duration-700",
        platform === 'instagram' ? "bg-fuchsia-600 -right-20" : "bg-cyan-500 -right-20"
      )} />
      <div className={clsx(
        "absolute -bottom-20 w-64 h-64 bg-opacity-20 blur-[100px] rounded-full pointer-events-none transition-colors duration-700",
        platform === 'instagram' ? "bg-orange-600 -left-20" : "bg-black -left-20"
      )} />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        
        {/* Platform Selector */}
        <div className="grid grid-cols-2 gap-4 p-1 bg-black/40 rounded-2xl border border-white/5">
          <button
            type="button"
            onClick={() => setPlatform('instagram')}
            className={twMerge(
              "flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-300 border border-transparent",
              platform === 'instagram' 
                ? "bg-gradient-to-br from-purple-600 to-orange-500 text-white shadow-lg border-white/10" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Instagram className="w-5 h-5" />
            <span className="font-bold">{t.platform_ig}</span>
            {platform === 'instagram' && <Check className="w-4 h-4 ml-2 opacity-50" />}
          </button>
          
          <button
            type="button"
            onClick={() => setPlatform('tiktok')}
            className={twMerge(
              "flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-300 border border-transparent",
              platform === 'tiktok' 
                ? "bg-gradient-to-br from-cyan-400 to-black text-black font-extrabold shadow-lg shadow-cyan-500/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Music2 className="w-5 h-5" />
            <span className="font-bold">{t.platform_tt}</span>
            {platform === 'tiktok' && <Check className="w-4 h-4 ml-2 opacity-50" />}
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 px-1">{t.input_username_label}</label>
            <div className="relative group">
              <span className={clsx(
                "absolute top-1/2 -translate-y-1/2 text-gray-500 font-bold transition-colors group-focus-within:text-white",
                isRtl ? "right-4" : "left-4"
              )}>@</span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.input_username_placeholder}
                className={clsx(
                  "w-full bg-black/40 border border-white/10 rounded-2xl py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all",
                  platform === 'instagram' ? "focus:ring-pink-500" : "focus:ring-cyan-500",
                  isRtl ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
                )}
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 px-1">{t.input_niche_label}</label>
            <textarea
              required
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder={t.input_niche_placeholder}
              className={clsx(
                "w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all h-28 resize-none",
                platform === 'instagram' ? "focus:ring-pink-500" : "focus:ring-cyan-500"
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !username || !niche}
          className={twMerge(
            "w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99]",
            isLoading || !username || !niche
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : platform === 'instagram'
                ? "bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
                : "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
          )}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t.analyzing}
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {t.analyze_btn}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;