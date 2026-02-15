import React from 'react';
import { Instagram, Lock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales';

interface LockOverlayProps {
  onUnlock: () => void;
  lang: Language;
}

const LockOverlay: React.FC<LockOverlayProps> = ({ onUnlock, lang }) => {
  const t = translations[lang];

  const handleFollow = () => {
    // Open Instagram in new tab
    window.open('https://instagram.com/yaz.salaq', '_blank');
    // Unlock the site
    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with strong blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-700"></div>
      
      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl text-center animate-fade-in-up">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <Lock className="w-8 h-8 text-gray-300" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">{t.lock_title}</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          {t.lock_desc}
        </p>
        
        <button
          onClick={handleFollow}
          className="w-full group relative flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]"
        >
          <Instagram className="w-6 h-6" />
          <span>{t.lock_btn}</span>
        </button>
        
        <div className="mt-6 text-xs text-gray-600">
          @yaz.salaq
        </div>
      </div>
    </div>
  );
};

export default LockOverlay;