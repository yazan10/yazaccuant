import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales';
import { clsx } from 'clsx';

interface CookieBannerProps {
  onAccept: () => void;
  lang: Language;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, lang }) => {
  const t = translations[lang];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for entrance animation
    const enterTimer = setTimeout(() => setIsVisible(true), 1000);
    
    // Auto accept after 8 seconds
    const acceptTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onAccept, 500); // Allow exit animation to finish
    }, 8000);

    return () => {
        clearTimeout(enterTimer);
        clearTimeout(acceptTimer);
    };
  }, [onAccept]);

  const handleManualAccept = () => {
    setIsVisible(false);
    setTimeout(onAccept, 300);
  };

  const isRtl = lang === 'ar' || lang === 'he';

  return (
    <div className={clsx(
        "fixed z-40 transition-all duration-500 ease-in-out",
        isVisible ? "bottom-6 opacity-100 translate-y-0" : "-bottom-24 opacity-0 translate-y-10",
        isRtl ? "left-6" : "right-6"
    )}>
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl p-4 max-w-sm w-full relative overflow-hidden group">
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-orange-500/10 p-2 rounded-lg shrink-0">
            <Cookie className="w-6 h-6 text-orange-400" />
          </div>
          <div className="flex-1">
             <p className="text-xs text-gray-300 leading-snug pr-2">{t.cookie_text}</p>
          </div>
          <button 
            onClick={handleManualAccept}
            className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors shrink-0"
          >
            {t.cookie_accept}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 w-full origin-left transition-transform duration-[8000ms] ease-linear scale-x-0 animate-[fillWidth_8s_linear_forwards]" />
      </div>
      
      <style>{`
        @keyframes fillWidth {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;