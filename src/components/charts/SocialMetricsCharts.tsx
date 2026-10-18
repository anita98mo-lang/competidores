import React, { useState } from 'react';
import { Competitor } from '../../types';
import { Users, Flame, Eye, Calendar, Sparkles, ArrowUpDown } from 'lucide-react';

interface SocialMetricsChartsProps {
  competitors: Competitor[];
  onSelectCompetitor?: (comp: Competitor) => void;
}

export const SocialMetricsCharts: React.FC<SocialMetricsChartsProps> = ({
  competitors,
  onSelectCompetitor,
}) => {
  const [activeMetric, setActiveMetric] = useState<'followers' | 'engagement' | 'views_cadence'>('followers');

  // Prepare data
  const data = competitors.map((comp) => {
    const ig = comp.socialChannels.find((ch) => ch.platform === 'instagram');
    const tt = comp.socialChannels.find((ch) => ch.platform === 'tiktok');
    const fb = comp.socialChannels.find((ch) => ch.platform === 'facebook');

    const igFollowers = ig?.followers || 0;
    const ttFollowers = tt?.followers || 0;
    const fbFollowers = fb?.followers || 0;
    const totalFollowers = igFollowers + ttFollowers + fbFollowers;

    const maxEngagement = Math.max(
      ig?.engagementRate || 0,
      tt?.engagementRate || 0,
      fb?.engagementRate || 0
    );

    const totalCadence = (ig?.postsPerWeek || 0) + (tt?.postsPerWeek || 0) + (fb?.postsPerWeek || 0);
    const avgViews = Math.max(
      ig?.avgViewsPerPost || 0,
      tt?.avgViewsPerPost || 0,
      fb?.avgViewsPerPost || 0
    );

    return {
      comp,
      isAlf: comp.isAlquimia,
      igFollowers,
      ttFollowers,
      fbFollowers,
      totalFollowers,
      maxEngagement,
      totalCadence,
      avgViews,
    };
  });

  const maxFollowers = Math.max(...data.map((d) => d.totalFollowers), 1);
  const maxEng = Math.max(...data.map((d) => d.maxEngagement), 10);
  const maxViews = Math.max(...data.map((d) => d.avgViews), 15000);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Chart Nav Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Gráfica Analítica de Redes Sociales: Alquimia vs Rivales</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Comparativa directa de comunidad oficial, interacción (Engagement %) y alcance promedio por publicación.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveMetric('followers')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeMetric === 'followers'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Seguidores</span>
          </button>
          <button
            onClick={() => setActiveMetric('engagement')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeMetric === 'engagement'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Engagement %</span>
          </button>
          <button
            onClick={() => setActiveMetric('views_cadence')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeMetric === 'views_cadence'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vistas & Cadencia</span>
          </button>
        </div>
      </div>

      {/* View 1: Followers breakdown */}
      {activeMetric === 'followers' && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>Competidor (Clic para auditar)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-pink-400">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span> IG
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> TikTok
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> FB
              </span>
              <span className="text-slate-300 font-bold ml-2">Total Comunidad</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {[...data]
              .sort((a, b) => b.totalFollowers - a.totalFollowers)
              .map((item) => {
                const igPct = (item.igFollowers / maxFollowers) * 100;
                const ttPct = (item.ttFollowers / maxFollowers) * 100;
                const fbPct = (item.fbFollowers / maxFollowers) * 100;

                return (
                  <div
                    key={item.comp.id}
                    onClick={() => onSelectCompetitor?.(item.comp)}
                    className={`p-2.5 rounded-xl border transition cursor-pointer space-y-1.5 ${
                      item.isAlf
                        ? 'bg-cyan-950/25 border-cyan-500/50 shadow-md shadow-cyan-950/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.comp.color }}
                        ></span>
                        <span
                          className={`font-bold ${
                            item.isAlf ? 'text-cyan-300' : 'text-slate-200'
                          }`}
                        >
                          {item.comp.name}
                        </span>
                        {item.isAlf && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                            Alquimia LF
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs">
                        {item.igFollowers > 0 && (
                          <span className="text-pink-400 text-[11px] hidden sm:inline">
                            IG: {item.igFollowers.toLocaleString('es-CO')}
                          </span>
                        )}
                        {item.ttFollowers > 0 && (
                          <span className="text-cyan-400 text-[11px] hidden sm:inline">
                            TT: {item.ttFollowers.toLocaleString('es-CO')}
                          </span>
                        )}
                        {item.fbFollowers > 0 && (
                          <span className="text-blue-400 text-[11px] hidden sm:inline">
                            FB: {item.fbFollowers.toLocaleString('es-CO')}
                          </span>
                        )}
                        <span className="text-white font-black">
                          {item.totalFollowers.toLocaleString('es-CO')} seg
                        </span>
                      </div>
                    </div>

                    {/* Stacked bar */}
                    <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden flex">
                      <div
                        className="bg-pink-500 h-full transition-all duration-500"
                        style={{ width: `${igPct}%` }}
                        title={`Instagram: ${item.igFollowers}`}
                      ></div>
                      <div
                        className="bg-cyan-400 h-full transition-all duration-500"
                        style={{ width: `${ttPct}%` }}
                        title={`TikTok: ${item.ttFollowers}`}
                      ></div>
                      <div
                        className="bg-blue-500 h-full transition-all duration-500"
                        style={{ width: `${fbPct}%` }}
                        title={`Facebook: ${item.fbFollowers}`}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* View 2: Engagement % comparison */}
      {activeMetric === 'engagement' && (
        <div className="space-y-4 pt-2">
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between">
            <span>
              <strong>Benchmark Promedio Industria Química/Resinas:</strong> ~3.5% - 4.2%
            </span>
            <span className="text-cyan-300 font-bold">
              Alquimia LF lidera en TikTok con 8.5%
            </span>
          </div>

          <div className="space-y-2.5">
            {[...data]
              .sort((a, b) => b.maxEngagement - a.maxEngagement)
              .map((item) => {
                const widthPct = (item.maxEngagement / maxEng) * 100;
                const isHigh = item.maxEngagement >= 6.0;

                return (
                  <div
                    key={item.comp.id}
                    onClick={() => onSelectCompetitor?.(item.comp)}
                    className={`p-2.5 rounded-xl border transition cursor-pointer space-y-1.5 ${
                      item.isAlf
                        ? 'bg-cyan-950/25 border-cyan-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.comp.color }}
                        ></span>
                        <span
                          className={`font-bold ${
                            item.isAlf ? 'text-cyan-300' : 'text-slate-200'
                          }`}
                        >
                          {item.comp.name}
                        </span>
                        {item.isAlf && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                            Top Engagement
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 font-mono">
                        <span
                          className={`font-black text-sm ${
                            isHigh ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {item.maxEngagement}%
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {isHigh ? '🔥 Alto' : 'Normal'}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.isAlf
                            ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-sm shadow-cyan-400/50'
                            : isHigh
                            ? 'bg-emerald-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${widthPct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* View 3: Views & Cadence */}
      {activeMetric === 'views_cadence' && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cadence */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cadencia de Publicaciones (Posts / Semana)</span>
              </h4>
              <div className="space-y-2">
                {[...data]
                  .sort((a, b) => b.totalCadence - a.totalCadence)
                  .map((item) => (
                    <div key={item.comp.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className={item.isAlf ? 'text-cyan-300 font-bold' : 'text-slate-300'}>
                          {item.comp.name}
                        </span>
                        <span className="font-mono text-white font-bold">{item.totalCadence} posts/sem</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-cyan-500 h-full rounded-full"
                          style={{ width: `${(item.totalCadence / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Views */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Alcance Promedio por Video / Publicación</span>
              </h4>
              <div className="space-y-2">
                {[...data]
                  .sort((a, b) => b.avgViews - a.avgViews)
                  .map((item) => (
                    <div key={item.comp.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className={item.isAlf ? 'text-cyan-300 font-bold' : 'text-slate-300'}>
                          {item.comp.name}
                        </span>
                        <span className="font-mono text-white font-bold">
                          {item.avgViews.toLocaleString('es-CO')} vistas
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                          style={{ width: `${(item.avgViews / maxViews) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
