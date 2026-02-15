import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import AnalysisForm from './components/AnalysisForm';
import Results from './components/Results';
import LockOverlay from './components/LockOverlay';
import CookieBanner from './components/CookieBanner';
import { AnalysisResult, Language, Platform } from './types';
import { analyzeProfileWithGemini } from './services/geminiService';
import { translations } from './locales';
import { Globe, ChevronDown, Instagram } from 'lucide-react';
import { clsx } from 'clsx';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // New States for Lock and Cookies
  const [isLocked, setIsLocked] = useState(true);
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    // Check Local Storage for Lock State
    const unlocked = localStorage.getItem('instaAudit_unlocked');
    if (unlocked === 'true') {
      setIsLocked(false);
    }

    // Check Local Storage for Cookies
    const cookiesAccepted = localStorage.getItem('instaAudit_cookies');
    if (cookiesAccepted !== 'true') {
      setShowCookies(true);
    }

    // Update HTML dir and lang attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' || lang === 'he') ? 'rtl' : 'ltr';
  }, [lang]);

  const handleUnlock = () => {
    localStorage.setItem('instaAudit_unlocked', 'true');
    setIsLocked(false);
  };

  const handleCookieAccept = () => {
    localStorage.setItem('instaAudit_cookies', 'true');
    setShowCookies(false);
  };

  const handleAnalyze = async (username: string, niche: string, platform: Platform) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeProfileWithGemini(username, niche, platform, lang);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(translations[lang].error_msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-white/20">
      
      {/* Lock Overlay */}
      {isLocked && <LockOverlay onUnlock={handleUnlock} lang={lang} />}

      {/* Cookie Banner */}
      {showCookies && !isLocked && <CookieBanner onAccept={handleCookieAccept} lang={lang} />}

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Main Content - blurred when locked */}
      <div className={clsx(
        "container mx-auto px-6 max-w-5xl pt-6 pb-20 relative z-10 transition-all duration-700",
        isLocked ? "blur-md opacity-30 pointer-events-none" : "blur-0 opacity-100"
      )}>
        
        {/* Navigation / Header */}
        <nav className="flex justify-between items-center py-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-gray-400 flex items-center justify-center">
               <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <div className="text-xl font-bold tracking-tight text-white">
              {t.title}
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm font-medium text-gray-300"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{lang}</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>

            {isLangMenuOpen && (
              <div className={clsx(
                "absolute top-full mt-2 w-32 glass-panel bg-[#0f0f0f] rounded-xl shadow-xl overflow-hidden z-50 flex flex-col",
                (lang === 'ar' || lang === 'he') ? 'left-0' : 'right-0'
              )}>
                <button onClick={() => { setLang('ar'); setIsLangMenuOpen(false); }} className="px-4 py-3 text-start hover:bg-white/5 text-sm text-gray-300 hover:text-white transition-colors">العربية</button>
                <button onClick={() => { setLang('en'); setIsLangMenuOpen(false); }} className="px-4 py-3 text-start hover:bg-white/5 text-sm text-gray-300 hover:text-white transition-colors">English</button>
                <button onClick={() => { setLang('he'); setIsLangMenuOpen(false); }} className="px-4 py-3 text-start hover:bg-white/5 text-sm text-gray-300 hover:text-white transition-colors">עברית</button>
              </div>
            )}
          </div>
        </nav>

        {!result ? (
          <div className="animate-fade-in space-y-10">
            <Hero lang={lang} />
            
            {error && (
              <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-center text-sm">
                {error}
              </div>
            )}
            
            <AnalysisForm onAnalyze={handleAnalyze} isLoading={loading} lang={lang} />
          </div>
        ) : (
          <Results data={result} onReset={handleReset} lang={lang} />
        )}
        
        <footer className="flex flex-col items-center justify-center mt-32 border-t border-white/5 pt-8 text-gray-600 space-y-2">
          <p className="text-sm font-medium hover:text-white transition-colors cursor-default">
            {t.footer}
          </p>
          <a href="https://instagram.com/yaz.salaq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-pink-500 transition-colors">
            <Instagram className="w-3 h-3" />
            @yaz.salaq
          </a>
        </footer>

      </div>
    </div>
  );
};

export default App;