import React from 'react';
import { AnalysisResult, Language } from '../types';
import { AlertTriangle, TrendingUp, Hash, Zap, RefreshCw } from 'lucide-react';
import { translations } from '../locales';
import { clsx } from 'clsx';

interface ResultsProps {
  data: AnalysisResult;
  onReset: () => void;
  lang: Language;
}

const Results: React.FC<ResultsProps> = ({ data, onReset, lang }) => {
  const t = translations[lang];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreStroke = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-fade-in-up">
      
      {/* Header Summary */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
         <div className="relative shrink-0">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              className="text-white/5"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
            <circle
              className={`${getScoreStroke(data.score)} transition-all duration-1000 ease-out`}
              strokeWidth="8"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * data.score) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className={`text-5xl font-black ${getScoreColor(data.score)}`}>{data.score}</span>
            <span className="block text-xs text-gray-500 font-bold uppercase mt-1 tracking-wider">{t.score}</span>
          </div>
         </div>
         
         <div className="flex-1 text-center md:text-start">
           <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-4">
             AI Analysis
           </div>
           <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white mb-2">{data.summary}</h2>
         </div>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{t.bio_audit}</h3>
          <p className="text-sm leading-relaxed text-gray-200">{data.profile_audit.bio_check}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{t.visual_audit}</h3>
          <p className="text-sm leading-relaxed text-gray-200">{data.profile_audit.visual_coherence}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{t.content_audit}</h3>
          <p className="text-sm leading-relaxed text-gray-200">{data.profile_audit.content_strategy}</p>
        </div>
      </div>

      {/* Problems */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
             <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          {t.problems_title}
        </h3>
        <div className="grid gap-4">
          {data.problems.map((problem, idx) => (
            <div key={idx} className="bg-red-950/20 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4 hover:border-red-500/40 transition-colors">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-red-100 text-lg">{problem.title}</h4>
                  <span className={clsx(
                    "text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider",
                    problem.severity === 'high' ? "bg-red-500 text-white" : 
                    problem.severity === 'medium' ? "bg-yellow-500/80 text-black" : 
                    "bg-gray-700 text-gray-300"
                  )}>
                    {problem.severity === 'high' ? t.high : problem.severity === 'medium' ? t.medium : t.low}
                  </span>
                </div>
                <p className="text-sm text-red-200/70 leading-relaxed">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
             <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          {t.solutions_title}
        </h3>
        <div className="grid gap-4">
          {data.solutions.map((solution, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl group hover:border-yellow-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-400 font-bold flex items-center justify-center border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                   {idx + 1}
                </div>
                <div>
                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-yellow-400 transition-colors">{solution.step}</h4>
                   <p className="text-sm text-gray-400 leading-relaxed">{solution.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Hashtags */}
       <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
             <Hash className="w-6 h-6 text-blue-400" />
          </div>
          {t.hashtags_title}
        </h3>
        <div className="flex flex-wrap gap-3">
          {data.hashtags.map((tag, idx) => (
             <span key={idx} className="bg-white/5 text-blue-200 px-4 py-2 rounded-xl text-sm border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 cursor-pointer transition-all">
               #{tag.replace('#', '')}
             </span>
          ))}
        </div>
      </div>

      <div className="pt-10 text-center">
        <button 
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105"
        >
          <RefreshCw className="w-5 h-5" />
          {t.reset_btn}
        </button>
      </div>

    </div>
  );
};

export default Results;