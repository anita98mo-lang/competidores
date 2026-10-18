import React, { useState } from 'react';
import {
  Radio,
  Search,
  Filter,
  ExternalLink,
  Sparkles,
  Clock,
  DollarSign,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Competitor, AdCampaign } from '../types';
import { ReliabilityBadge, ReliabilityLegend } from './ReliabilityBadge';
import { AdsAnalyticsCharts } from './charts/AdsAnalyticsCharts';
import { TopImpactAdsShowcase } from './TopImpactAdsShowcase';

interface AdsRadarProps {
  competitors: Competitor[];
  onOpenCounterAdModal: (ad: AdCampaign) => void;
  onOpenReliabilityModal: () => void;
}

export const AdsRadar: React.FC<AdsRadarProps> = ({
  competitors,
  onOpenCounterAdModal,
  onOpenReliabilityModal,
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [competitorFilter, setCompetitorFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allAds = competitors.flatMap((c) => c.adCampaigns);

  const filteredAds = allAds.filter((ad) => {
    if (platformFilter !== 'all' && ad.platform !== platformFilter) return false;
    if (categoryFilter !== 'all' && ad.category !== categoryFilter) return false;
    if (competitorFilter !== 'all' && ad.competitorId !== competitorFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchText = `${ad.headline} ${ad.copy} ${ad.targetProduct} ${ad.competitorName}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  const categories = Array.from(new Set(allAds.map((a) => a.category)));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Radar de Publicidad Digital • Colombia
            </div>
            <h2 className="text-xl font-bold text-white">
              Anuncios Públicos Observados en Meta, Google y Redes
            </h2>
            <p className="text-xs text-slate-300">
              Monitoreo de formatos creativos, mensajes gancho, duración observable de campañas y enlace directo a la Biblioteca de Anuncios de Meta Colombia.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Total en radar: </span>
              <strong className="text-amber-400">{allAds.length} campañas</strong>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4">
          <ReliabilityLegend onOpenExplainer={onOpenReliabilityModal} />
        </div>
      </div>

      {/* Interactive Ads Analytics Charts Suite */}
      <AdsAnalyticsCharts
        competitors={competitors}
        ads={filteredAds.length > 0 ? filteredAds : allAds}
        onOpenCounterAdModal={onOpenCounterAdModal}
      />

      {/* Ranking de Publicidades con Mayor Impacto Observadas en Colombia */}
      <TopImpactAdsShowcase
        competitors={competitors}
        onOpenCounterAdModal={onOpenCounterAdModal}
      />

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por producto (epóxica, desmoldante), competidor o texto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Competitor select */}
          <select
            value={competitorFilter}
            onChange={(e) => setCompetitorFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">Todas las empresas ({competitors.length})</option>
            {competitors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Platform filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">Todas las plataformas</option>
            <option value="meta">Meta Ads (Facebook & Instagram)</option>
            <option value="google">Google Ads (Search)</option>
            <option value="linkedin">LinkedIn Ads</option>
            <option value="tiktok">TikTok Ads</option>
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">Ganchos observados:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
            Tutorial paso a paso
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
            Oferta mayoreo
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
            Solución a burbujas
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
            Cobertura nacional
          </span>
        </div>
      </div>

      {/* Ads Grid */}
      {filteredAds.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-300">No se encontraron anuncios con los filtros seleccionados</h4>
          <p className="text-xs text-slate-500 mt-1">Prueba restableciendo los filtros de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAds.map((ad) => {
            const comp = competitors.find((c) => c.id === ad.competitorId);
            const isWinner = ad.daysActive >= 45; // Ads running 45+ days usually have positive ROI

            return (
              <div
                key={ad.id}
                className="flex flex-col justify-between rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition overflow-hidden shadow-md group"
              >
                <div>
                  {/* Card Header */}
                  <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: comp?.color || '#06b6d4' }}
                        ></span>
                        <span className="font-bold text-sm text-white">{ad.competitorName}</span>
                      </div>

                      <span className="text-[11px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {ad.platform === 'meta'
                          ? 'Meta Ads'
                          : ad.platform === 'google'
                          ? 'Google Search'
                          : ad.platform === 'linkedin'
                          ? 'LinkedIn'
                          : 'TikTok Ads'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-800/60 font-mono text-[11px]">
                        {ad.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {ad.format}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    {/* Duration badge */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Activo: <strong>{ad.daysActive} días</strong></span>
                        {isWinner && (
                          <span
                            title="Campaña Ganadora: Lleva más de 45 días activa ininterrumpida"
                            className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40"
                          >
                            <Flame className="w-3 h-3 text-amber-400" /> Probable Ganador
                          </span>
                        )}
                      </div>
                      <ReliabilityBadge level={ad.daysReliability} />
                    </div>

                    {/* Headline */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition line-clamp-2">
                        "{ad.headline}"
                      </h4>
                    </div>

                    {/* Target Product */}
                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-xs">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                        Producto Promocionado:
                      </span>
                      <span className="font-medium text-amber-300">
                        {ad.targetProduct}
                      </span>
                    </div>

                    {/* Ad Copy preview */}
                    <div className="text-xs text-slate-300 bg-slate-850/60 p-3 rounded-lg border border-slate-800/80 italic leading-relaxed">
                      "{ad.copy}"
                    </div>

                    {/* Hook & CTA */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Ángulo de gancho:</span>
                        <span className="text-slate-200 font-medium">{ad.hookType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Llamado a la acción:</span>
                        <span className="text-emerald-400 font-mono text-[11px] font-semibold">
                          {ad.callToAction}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Gasto est. mensual:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-mono text-[11px] font-semibold">
                            {ad.estimatedSpendRangeCOP}
                          </span>
                          <ReliabilityBadge level={ad.spendReliability} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-950/80 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => onOpenCounterAdModal(ad)}
                    className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950/40 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generar Contra-Anuncio Alquimia LF con IA</span>
                  </button>

                  <a
                    href={ad.libraryQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition border border-slate-700"
                  >
                    <span>Abrir en Biblioteca de Anuncios Oficial</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
