import React from 'react';
import { Sparkles } from 'lucide-react';
import { translations } from '../locales';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];
  
  return (
    <div className="text-center py-16 px-4 relative">
      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-semibold tracking-wide text-gray-300 uppercase">{t.subtitle}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
            {t.hero_title}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {t.hero_desc}
        </p>
      </div>
    </div>
  );
};

export default Hero;