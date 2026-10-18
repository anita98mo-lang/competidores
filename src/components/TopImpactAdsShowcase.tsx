import React, { useState } from 'react';
import { AdCampaign, Competitor } from '../types';
import { Flame, Trophy, ExternalLink, Zap, ShieldCheck, Clock, Layers, ArrowUpRight, Sparkles } from 'lucide-react';

interface TopImpactAdsShowcaseProps {
  competitors: Competitor[];
  onOpenCounterAdModal: (ad: AdCampaign) => void;
}

export const TopImpactAdsShowcase: React.FC<TopImpactAdsShowcaseProps> = ({
  competitors,
  onOpenCounterAdModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract all campaigns and sort by impactScore descending
  const allAds = competitors.flatMap((c) =>
    c.adCampaigns.map((ad) => ({
      ...ad,
      competitorColor: c.color,
      competitorLogo: c.logoInitial,
      isAlf: c.isAlquimia,
    }))
  );

  const sortedAds = [...allAds].sort((a, b) => (b.impactScore || 0) - (a.impactScore || 0));

  const filteredAds = sortedAds.filter((ad) => {
    if (selectedCategory !== 'all' && ad.category !== selectedCategory) return false;
    return true;
  });

  const categories = Array.from(new Set(allAds.map((a) => a.category)));

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Ranking de Publicidades con Mayor Impacto Observadas en Colombia</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Campañas con mayor longevidad continua (60–120 días activos), mayor inversión y mejores ganchos de conversión en Meta Ads.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg transition font-medium cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todos los Anuncios ({allAds.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg transition font-medium cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* High-Impact Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAds.map((ad, idx) => {
          const isTop3 = idx < 3;
          const score = ad.impactScore || 85;

          return (
            <div
              key={ad.id}
              className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
                ad.isAlf
                  ? 'bg-gradient-to-b from-cyan-950/30 to-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                  : isTop3
                  ? 'bg-gradient-to-b from-slate-900 to-amber-950/15 border-amber-500/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Top card row: Company, Score, Rank */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md"
                      style={{ backgroundColor: ad.competitorColor }}
                    >
                      {ad.competitorLogo}
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">
                        {ad.competitorName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {ad.category} • {ad.format}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1 ${
                        idx === 0
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : idx === 1
                          ? 'bg-slate-300/20 text-slate-200 border border-slate-400/40'
                          : idx === 2
                          ? 'bg-amber-700/20 text-amber-400 border border-amber-600/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>Impacto: {score}/100</span>
                    </span>
                  </div>
                </div>

                {/* Days Active & Longevity Proof */}
                <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-950/90 border border-slate-800 font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Longevidad en Pauta:</span>
                    <strong className="text-white">{ad.daysActive} días continuos</strong>
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    {ad.daysActive >= 60 ? '⭐ Campaña Ganadora' : 'Activa'}
                  </span>
                </div>

                {/* Headline & Hook */}
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Gancho (Hook): {ad.hookType}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">
                    "{ad.headline}"
                  </h4>
                </div>

                {/* Copy Snippet */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 italic">
                  "{ad.copy}"
                </p>

                {/* Why this ad works (Impact Reason) */}
                {ad.impactReason && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-amber-400 block">
                      💡 Clave del Alto Impacto:
                    </span>
                    <p className="leading-relaxed">{ad.impactReason}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <a
                  href={ad.libraryQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 font-medium transition cursor-pointer"
                >
                  <span>Ver en Meta Library</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => onOpenCounterAdModal(ad)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-600/20 transition cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Contra-Atacar con Alquimia</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
