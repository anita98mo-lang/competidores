import React from 'react';
import { MediaMention } from '../../types';
import { Newspaper, TrendingUp, Tag } from 'lucide-react';

interface MediaSentimentChartProps {
  articles: MediaMention[];
}

export const MediaSentimentChart: React.FC<MediaSentimentChartProps> = ({ articles }) => {
  const total = articles.length || 1;
  const positive = articles.filter((a) => a.sentiment === 'positive').length;
  const neutral = articles.filter((a) => a.sentiment === 'neutral').length;
  const challenging = articles.filter((a) => a.sentiment === 'challenging').length;

  const posPct = Math.round((positive / total) * 100);
  const neuPct = Math.round((neutral / total) * 100);
  const chaPct = Math.round((challenging / total) * 100);

  // Tags aggregation
  const tagCounts: Record<string, number> = {};
  articles.forEach((a) => {
    (a.tags || []).forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      <div>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-cyan-400" />
          <span>Gráfica de Análisis de Sentimiento y Cobertura Mediática</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Clasificación del clima editorial en prensa económica y portales industriales para el sector químico.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Sentiment Distribution Bar */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span>Distribución de Sentimiento Editorial</span>
            <span className="font-mono text-cyan-400">{articles.length} artículos</span>
          </h4>

          {/* Tri-color progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${posPct}%` }}
              title={`Positivo: ${positive}`}
            ></div>
            <div
              className="bg-slate-500 h-full transition-all duration-500"
              style={{ width: `${neuPct}%` }}
              title={`Neutral: ${neutral}`}
            ></div>
            <div
              className="bg-amber-500 h-full transition-all duration-500"
              style={{ width: `${chaPct}%` }}
              title={`Desafiante: ${challenging}`}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
            <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-400">
              <span className="font-black text-sm block">{posPct}%</span>
              <span className="text-[10px]">Positivo ({positive})</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/30 text-slate-300">
              <span className="font-black text-sm block">{neuPct}%</span>
              <span className="text-[10px]">Neutral ({neutral})</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/20 text-amber-400">
              <span className="font-black text-sm block">{chaPct}%</span>
              <span className="text-[10px]">Desafíos ({challenging})</span>
            </div>
          </div>
        </div>

        {/* Topics / Tags Bar Chart */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Temas Más Discutidos en Prensa</span>
            </span>
            <span className="font-mono text-slate-500 text-[11px]">Frecuencia</span>
          </h4>

          <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
            {sortedTags.slice(0, 5).map(([tag, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={tag} className="space-y-0.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 truncate">{tag}</span>
                    <span className="font-mono text-cyan-300 font-bold">{count}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
