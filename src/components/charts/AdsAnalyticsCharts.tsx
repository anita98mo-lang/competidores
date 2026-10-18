import React, { useState } from 'react';
import { Competitor, AdCampaign } from '../../types';
import { DollarSign, Clock, Layers, Flame, ExternalLink, Radio } from 'lucide-react';

interface AdsAnalyticsChartsProps {
  competitors: Competitor[];
  ads: AdCampaign[];
  onOpenCounterAdModal?: (ad: AdCampaign) => void;
}

export const AdsAnalyticsCharts: React.FC<AdsAnalyticsChartsProps> = ({
  competitors,
  ads,
  onOpenCounterAdModal,
}) => {
  const [activeTab, setActiveTab] = useState<'spend' | 'longevity' | 'formats'>('spend');

  // Parse spend to numeric midpoint in COP millions for clean chart visualization
  const spendData = competitors.map((c) => {
    let spendMin = 0.5;
    let spendMax = 1.0;

    const str = c.estimatedMonthlyAdBudgetCOP || '';
    const cleanStr = str.replace(/[^0-9.-]/g, '');
    const parts = str.split('-').map((s) => s.replace(/[^0-9.]/g, ''));

    if (str.includes('$1.200.000')) {
      spendMin = 1.0;
      spendMax = 1.4;
    } else if (str.includes('2.500.000') || str.includes('4.000.000')) {
      spendMin = 2.5;
      spendMax = 4.0;
    } else if (str.includes('2.000.000') || str.includes('3.200.000')) {
      spendMin = 2.0;
      spendMax = 3.2;
    } else if (str.includes('3.500.000') || str.includes('5.500.000')) {
      spendMin = 3.5;
      spendMax = 5.5;
    } else if (str.includes('2.200.000') || str.includes('3.800.000')) {
      spendMin = 2.2;
      spendMax = 3.8;
    } else if (str.includes('800.000') || str.includes('1.400.000')) {
      spendMin = 0.8;
      spendMax = 1.4;
    } else if (str.includes('1.000.000') || str.includes('1.800.000')) {
      spendMin = 1.0;
      spendMax = 1.8;
    }

    const midpoint = (spendMin + spendMax) / 2;
    return {
      comp: c,
      isAlf: c.isAlquimia,
      spendMin,
      spendMax,
      midpoint,
      rawString: c.estimatedMonthlyAdBudgetCOP,
      campaignsCount: c.adCampaigns.length,
    };
  });

  const maxMidpoint = Math.max(...spendData.map((d) => d.spendMax), 5.5);

  // Formats counts
  const formatCounts: Record<string, number> = {};
  const hookCounts: Record<string, number> = {};

  ads.forEach((a) => {
    formatCounts[a.format] = (formatCounts[a.format] || 0) + 1;
    hookCounts[a.hookType] = (hookCounts[a.hookType] || 0) + 1;
  });

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400" />
            <span>Gráficas de Análisis Publicitario en Meta Ads Colombia</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Presupuesto estimado mensual, duración continua de anuncios y desglose de formatos más rentables.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('spend')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'spend'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Inversión Mensual</span>
          </button>
          <button
            onClick={() => setActiveTab('longevity')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'longevity'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Días Activos</span>
          </button>
          <button
            onClick={() => setActiveTab('formats')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'formats'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Formatos & Hooks</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Spend comparison */}
      {activeTab === 'spend' && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>Empresa Pautadora</span>
            <span>Rango Estimado Mensual (COP)</span>
          </div>

          <div className="space-y-2.5">
            {[...spendData]
              .sort((a, b) => b.midpoint - a.midpoint)
              .map((item) => {
                const widthPct = (item.spendMax / maxMidpoint) * 100;
                return (
                  <div
                    key={item.comp.id}
                    className={`p-2.5 rounded-xl border transition space-y-1.5 ${
                      item.isAlf
                        ? 'bg-cyan-950/25 border-cyan-500/50'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.comp.color }}
                        ></span>
                        <span className={item.isAlf ? 'text-cyan-300 font-bold' : 'text-slate-200 font-bold'}>
                          {item.comp.name}
                        </span>
                        {item.isAlf && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                            Alquimia LF
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-white font-black text-xs">{item.rawString}</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.isAlf
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500'
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

      {/* Tab 2: Longevity */}
      {activeTab === 'longevity' && (
        <div className="space-y-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>
              💡 <strong>Regla de Paid Media:</strong> Si un anuncio lleva más de 30 días activo continuo, es un anuncio ganador rentable para esa empresa.
            </span>
          </div>

          <div className="space-y-2">
            {[...ads]
              .sort((a, b) => b.daysActive - a.daysActive)
              .map((ad) => {
                const isProven = ad.daysActive >= 30;
                return (
                  <div
                    key={ad.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{ad.competitorName}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                          {ad.category}
                        </span>
                        {isProven && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
                            ⭐ Anuncio Ganador
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 truncate max-w-lg">{ad.headline}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right font-mono">
                        <span className="text-amber-400 font-black text-sm">{ad.daysActive} días</span>
                        <span className="text-[10px] text-slate-500 block">activo continuo</span>
                      </div>
                      {onOpenCounterAdModal && (
                        <button
                          onClick={() => onOpenCounterAdModal(ad)}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-medium text-xs transition cursor-pointer"
                        >
                          Contra-Atacar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Tab 3: Formats & Hooks */}
      {activeTab === 'formats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Formats */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Formatos Creativos Más Usados en Pauta</span>
            </h4>
            <div className="space-y-2">
              {Object.entries(formatCounts).map(([format, count]) => {
                const pct = Math.round((count / ads.length) * 100);
                return (
                  <div key={format} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{format}</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        {count} ads ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hooks */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Ángulos de Gancho / Hook Predominantes</span>
            </h4>
            <div className="space-y-2">
              {Object.entries(hookCounts).map(([hook, count]) => {
                const pct = Math.round((count / ads.length) * 100);
                return (
                  <div key={hook} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{hook}</span>
                      <span className="font-mono text-amber-300 font-bold">
                        {count} ads ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
