import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Globe,
  MapPin,
  Clock,
  Radio,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Target,
  Layers,
  MessageSquare,
  Trash2
} from 'lucide-react';
import { Competitor, AdCampaign } from '../types';
import { ReliabilityBadge } from './ReliabilityBadge';
import { CompetitorSpiderRadarChart } from './charts/CompetitorSpiderRadarChart';

interface CompetitorDetailModalProps {
  competitor: Competitor | null;
  alquimia: Competitor;
  onClose: () => void;
  onOpenAuditModalWithComp: (comp: Competitor) => void;
  onOpenCounterAdModal: (ad: AdCampaign) => void;
  onRequestDelete?: (comp: Competitor) => void;
}

export const CompetitorDetailModal: React.FC<CompetitorDetailModalProps> = ({
  competitor,
  alquimia,
  onClose,
  onOpenAuditModalWithComp,
  onOpenCounterAdModal,
  onRequestDelete,
}) => {
  if (!competitor) return null;

  const isAlf = competitor.isAlquimia;
  const totalFollowers = competitor.socialChannels.reduce((sum, ch) => sum + ch.followers, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base text-white shadow-lg"
              style={{ backgroundColor: competitor.color }}
            >
              {competitor.logoInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{competitor.name}</h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                    competitor.threatLevel === 'Alta'
                      ? 'bg-red-950/60 text-red-400 border border-red-500/30'
                      : competitor.threatLevel === 'Media'
                      ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                      : competitor.threatLevel === 'Referencia Propia'
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {competitor.threatLevel === 'Referencia Propia'
                    ? 'Línea Base Propia'
                    : `Amenaza ${competitor.threatLevel}`}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {competitor.city}
                </span>
                <span>•</span>
                <a
                  href={`https://${competitor.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {competitor.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenAuditModalWithComp(competitor);
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-2 transition cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Auditar con IA</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              Modelo Comercial
            </span>
            <span className="font-bold text-slate-200 mt-1 block">
              {competitor.businessModel}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              Seguidores Totales
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-bold text-white font-mono">
                {totalFollowers.toLocaleString('es-CO')}
              </span>
              <ReliabilityBadge level="verified" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              Presupuesto Pauta Est.
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-bold text-amber-400 font-mono text-[11px]">
                {competitor.estimatedMonthlyAdBudgetCOP}
              </span>
              <ReliabilityBadge level={competitor.adBudgetReliability} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              Soporte Técnico
            </span>
            <span className="font-medium text-slate-300 mt-1 block">
              {competitor.technicalSupportLevel.split('(')[0]}
            </span>
          </div>
        </div>

        {/* Core Portfolio */}
        <div className="mb-5 text-xs">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-2">
            Líneas de Portafolio Clave:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {competitor.corePortfolio.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Tono de Comunicación & Personalidad de Voz */}
        {competitor.communicationTone && (
          <div className="mb-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-850">
              <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                Tono de Comunicación & Disparador de Compra:
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-semibold text-[11px] w-fit">
                {competitor.communicationTone.primary}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {competitor.communicationTone.description}
            </p>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="font-mono text-[10px] text-amber-400 uppercase font-bold block">
                Disparador Psicológico de Compra:
              </span>
              <p className="text-slate-200 leading-relaxed">{competitor.communicationTone.psychologicalTrigger}</p>
            </div>

            {competitor.communicationTone.keyThemes && (
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold block">
                  Temas y Argumentos Recurrentes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {competitor.communicationTone.keyThemes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-medium"
                    >
                      #{theme}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Active Ads Section */}
        <div className="mb-5 text-xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              Anuncios Activos Observados ({competitor.adCampaigns.length}):
            </span>
            <ReliabilityBadge level="verified" />
          </div>

          {competitor.adCampaigns.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-center">
              No se detectaron anuncios activos de pauta pública en este momento para esta empresa.
            </div>
          ) : (
            <div className="space-y-3">
              {competitor.adCampaigns.map((ad) => (
                <div
                  key={ad.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{ad.headline}</span>
                    <span className="font-mono text-cyan-400 text-[11px]">
                      {ad.platform.toUpperCase()} • {ad.daysActive} días
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] italic bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                    "{ad.copy}"
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400 text-[11px]">
                      CTA: <strong className="text-emerald-400">{ad.callToAction}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCounterAdModal(ad);
                        }}
                        className="px-2 py-1 rounded bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Contra-anuncio IA</span>
                      </button>
                      <a
                        href={ad.libraryQueryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        <span>Ad Library</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-2">
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold block mb-1">
              Fortalezas Observables:
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {competitor.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-red-500/20 space-y-2">
            <span className="text-[11px] font-mono uppercase text-red-400 font-bold block mb-1">
              Debilidades / Puntos Ciegos:
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {competitor.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alquimia Counter Strategy */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-cyan-950/20 border border-cyan-500/40 text-xs space-y-2 mb-5">
          <span className="text-[11px] font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
            <Target className="w-4 h-4 text-cyan-400" />
            Táctica Recomendada para Alquimia LF:
          </span>
          <div className="space-y-1.5">
            {competitor.alquimiaCounterStrategy.map((cs, i) => (
              <p key={i} className="text-slate-200 leading-relaxed">
                • {cs}
              </p>
            ))}
          </div>
        </div>

        {/* 5D Radar Analysis Chart vs Alquimia */}
        {!isAlf && (
          <div className="mb-5">
            <CompetitorSpiderRadarChart competitor={competitor} alquimia={alquimia} />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
          {!isAlf && onRequestDelete ? (
            <button
              onClick={() => {
                onRequestDelete(competitor);
              }}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Eliminar este Competidor</span>
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
