import React, { useState } from 'react';
import { Competitor } from '../../types';
import { PieChart, BarChart3 } from 'lucide-react';

interface ShareOfVoiceChartProps {
  competitors: Competitor[];
  onSelectCompetitor?: (comp: Competitor) => void;
}

export const ShareOfVoiceChart: React.FC<ShareOfVoiceChartProps> = ({
  competitors,
  onSelectCompetitor,
}) => {
  const [hoveredCompId, setHoveredCompId] = useState<string | null>(null);
  const [chartMode, setChartMode] = useState<'donut' | 'bar'>('donut');

  const totalSov = competitors.reduce((sum, c) => sum + (c.shareOfVoicePercent || 0), 0) || 100;
  const sorted = [...competitors].sort((a, b) => b.shareOfVoicePercent - a.shareOfVoicePercent);
  const activeComp = competitors.find((c) => c.id === hoveredCompId) || sorted[0];

  // Calculate SVG donut segments
  const size = 260;
  const strokeWidth = 38;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedAngle = 0;
  const segments = sorted.map((comp) => {
    const fraction = comp.shareOfVoicePercent / totalSov;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle * circumference;
    accumulatedAngle += fraction;

    return {
      comp,
      fraction,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-400" />
              <span>Gráfica de Cuota de Voz (Share of Voice Digital & Pauta en Colombia)</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Distribución porcentual calculada según volumen de audiencia, pauta activa en Meta Ads y cobertura comercial.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setChartMode('donut')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              chartMode === 'donut'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Circular</span>
          </button>
          <button
            onClick={() => setChartMode('bar')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              chartMode === 'bar'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Barras</span>
          </button>
        </div>
      </div>

      {chartMode === 'donut' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Donut SVG */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-[260px] h-[260px]">
              <svg width={size} height={size} className="transform -rotate-90">
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke="#1e293b"
                  strokeWidth={strokeWidth}
                />
                {segments.map(({ comp, strokeDasharray, strokeDashoffset }) => {
                  const isHovered = hoveredCompId === comp.id;
                  const isAlf = comp.isAlquimia;
                  return (
                    <circle
                      key={comp.id}
                      cx={center}
                      cy={center}
                      r={radius}
                      fill="transparent"
                      stroke={comp.color}
                      strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        opacity: hoveredCompId && !isHovered ? 0.45 : 1,
                        filter: isHovered || isAlf ? `drop-shadow(0 0 8px ${comp.color}80)` : 'none',
                      }}
                      onMouseEnter={() => setHoveredCompId(comp.id)}
                      onMouseLeave={() => setHoveredCompId(null)}
                      onClick={() => onSelectCompetitor?.(comp)}
                    />
                  );
                })}
              </svg>

              {/* Center Info Card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                <span
                  className="w-3 h-3 rounded-full mb-1"
                  style={{ backgroundColor: activeComp.color }}
                ></span>
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  {activeComp.shareOfVoicePercent}%
                </span>
                <span className="text-[11px] font-bold text-slate-200 line-clamp-1 max-w-[150px]">
                  {activeComp.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {activeComp.isAlquimia ? 'Nuestra Empresa' : activeComp.threatLevel}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1.5">
              <span>Pasa el cursor o pulsa en cada segmento para ver detalles</span>
            </div>
          </div>

          {/* Interactive Legend & Breakdown */}
          <div className="md:col-span-6 space-y-2">
            <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span>Ranking de Participación de Mercado</span>
              <span className="text-slate-500 font-mono text-[11px]">Total: 100%</span>
            </div>

            <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
              {sorted.map((comp) => {
                const isHovered = hoveredCompId === comp.id;
                const isAlf = comp.isAlquimia;
                return (
                  <div
                    key={comp.id}
                    onMouseEnter={() => setHoveredCompId(comp.id)}
                    onMouseLeave={() => setHoveredCompId(null)}
                    onClick={() => onSelectCompetitor?.(comp)}
                    className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-between border ${
                      isHovered
                        ? 'bg-slate-800/90 border-cyan-500/50 shadow-md'
                        : isAlf
                        ? 'bg-cyan-950/20 border-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: comp.color }}
                      ></span>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-bold truncate ${
                              isAlf ? 'text-cyan-300' : 'text-slate-200'
                            }`}
                          >
                            {comp.name}
                          </span>
                          {isAlf && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono shrink-0">
                              Alquimia LF
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono truncate block">
                          Pauta: {comp.estimatedMonthlyAdBudgetCOP}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className="text-sm font-bold text-white font-mono">
                        {comp.shareOfVoicePercent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Bar Chart View */
        <div className="space-y-3 pt-2">
          {sorted.map((comp) => {
            const isAlf = comp.isAlquimia;
            const isHovered = hoveredCompId === comp.id;
            return (
              <div
                key={comp.id}
                onMouseEnter={() => setHoveredCompId(comp.id)}
                onMouseLeave={() => setHoveredCompId(null)}
                onClick={() => onSelectCompetitor?.(comp)}
                className={`p-2.5 rounded-xl border transition cursor-pointer space-y-1.5 ${
                  isHovered
                    ? 'bg-slate-800 border-cyan-500/50'
                    : isAlf
                    ? 'bg-cyan-950/20 border-cyan-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: comp.color }}
                    ></span>
                    <span
                      className={`font-bold ${
                        isAlf ? 'text-cyan-300' : 'text-slate-200'
                      }`}
                    >
                      {comp.name}
                    </span>
                    {isAlf && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                        Alquimia LF
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      • {comp.city}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Pauta est.: {comp.estimatedMonthlyAdBudgetCOP}
                    </span>
                    <span className="text-sm font-black text-white">{comp.shareOfVoicePercent}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isAlf
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-cyan-400/50'
                        : ''
                    }`}
                    style={{
                      width: `${(comp.shareOfVoicePercent / sorted[0].shareOfVoicePercent) * 100}%`,
                      backgroundColor: isAlf ? undefined : comp.color,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
