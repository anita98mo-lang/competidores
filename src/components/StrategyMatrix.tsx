import React, { useState } from 'react';
import {
  Target,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  TrendingUp,
  Scale,
  Trash2
} from 'lucide-react';
import { Competitor } from '../types';
import { ReliabilityBadge, ReliabilityLegend } from './ReliabilityBadge';
import { StrategyPositioningMatrixChart } from './charts/StrategyPositioningMatrixChart';

interface StrategyMatrixProps {
  competitors: Competitor[];
  onOpenAuditModal: () => void;
  onOpenReliabilityModal: () => void;
  onRequestDelete?: (competitor: Competitor) => void;
}

export const StrategyMatrix: React.FC<StrategyMatrixProps> = ({
  competitors,
  onOpenAuditModal,
  onOpenReliabilityModal,
  onRequestDelete,
}) => {
  const otherCompetitors = competitors.filter((c) => !c.isAlquimia);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>(
    otherCompetitors[0]?.id || 'comp-espacio4d'
  );

  const alquimia = competitors.find((c) => c.isAlquimia) || competitors[0];
  const activeCompetitor =
    competitors.find((c) => c.id === selectedCompetitorId) || otherCompetitors[0] || competitors[1];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
              <Target className="w-3.5 h-3.5" />
              Matriz Estratégica & Counter-Playbook
            </div>
            <h2 className="text-xl font-bold text-white">
              Análisis Comparativo B2B y Oportunidades de Alquimia LF en Colombia
            </h2>
            <p className="text-xs text-slate-300">
              Evaluación cara a cara entre Alquimia LF y cada competidor: fortalezas observables, vulnerabilidades y tácticas de contra-ataque comercial.
            </p>
          </div>

          <button
            onClick={onOpenAuditModal}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Auditar Nuevo Competidor</span>
          </button>
        </div>

        <div className="mt-4">
          <ReliabilityLegend onOpenExplainer={onOpenReliabilityModal} />
        </div>
      </div>

      {/* Interactive 2D Strategic Positioning Matrix & Portfolio Heatmap */}
      <StrategyPositioningMatrixChart
        competitors={competitors}
        selectedCompetitorId={selectedCompetitorId}
        onSelectCompetitorId={setSelectedCompetitorId}
      />

      {/* Head-to-Head Selector & Dual Card */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Seleccionar rival a contrastar contra Alquimia LF:</span>
          {competitors
            .filter((c) => !c.isAlquimia)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCompetitorId(c.id)}
                className={`px-3 py-1.5 rounded-lg transition font-medium cursor-pointer ${
                  selectedCompetitorId === c.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {c.name}
              </button>
            ))}
        </div>

        {/* Dual Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alquimia LF Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-cyan-950/20 border-2 border-cyan-500/50 shadow-xl shadow-cyan-950/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 text-sm">
                  ALF
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Alquimia Chemicals LF (Nuestra Empresa)</h3>
                  <span className="text-xs text-cyan-400 font-mono">Sede Barrio 7 de Agosto, Bogotá</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                Propia
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Asesoría Técnica:</span>
                <span className="text-emerald-400 font-semibold text-right">
                  Ingenieros Químicos en Planta
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Control de Calidad:</span>
                <span className="text-emerald-400 font-semibold text-right">
                  Certificado de Lote + Ficha MSDS Homologada
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Velocidad de Entrega:</span>
                <span className="text-slate-200 font-semibold text-right">
                  Mismo día / 24h Bogotá (7 de Agosto) / 48-72h Nacional
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Enfoque de Mercado:</span>
                <span className="text-cyan-300 font-semibold text-right">
                  B2B Industrial & Talleres Especializados
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                Nuestras Fortalezas Competitivas:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {alquimia.strengths.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Active Competitor Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                  style={{ backgroundColor: activeCompetitor.color }}
                >
                  {activeCompetitor.logoInitial}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{activeCompetitor.name}</h3>
                  <span className="text-xs text-slate-400">{activeCompetitor.city} • {activeCompetitor.website}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                    activeCompetitor.threatLevel === 'Alta'
                      ? 'bg-red-950/60 text-red-400 border border-red-500/30'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  Amenaza {activeCompetitor.threatLevel}
                </span>

                {!activeCompetitor.isAlquimia && onRequestDelete && (
                  <button
                    onClick={() => onRequestDelete(activeCompetitor)}
                    title="Eliminar este competidor del análisis"
                    className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 text-red-400 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Asesoría Técnica:</span>
                <span className="text-slate-300 text-right">
                  {activeCompetitor.technicalSupportLevel}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Presupuesto Pauta Est.:</span>
                <span className="text-amber-400 font-mono font-semibold text-right">
                  {activeCompetitor.estimatedMonthlyAdBudgetCOP}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Velocidad de Entrega:</span>
                <span className="text-slate-300 text-right">
                  {activeCompetitor.deliverySpeed}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Orientación de Precio:</span>
                <span className="text-slate-300 text-right">
                  {activeCompetitor.priceOrientation}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-2">
                Puntos Ciegos / Vulnerabilidades Observadas:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeCompetitor.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tactical Counter-Playbook Box for this competitor */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-sm text-white">
              Estrategia Táctica Recomendada para Alquimia LF vs {activeCompetitor.name}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {activeCompetitor.alquimiaCounterStrategy.map((strat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">{strat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Industry Benchmarking Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Matriz Consolidada de Posicionamiento en Colombia</span>
          </h3>
          <p className="text-xs text-slate-400">
            Comparativa de portafolio, modelo de atención, velocidad logística y actividad publicitaria
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Empresa</th>
                <th className="py-3 px-3">Sede / Cobertura</th>
                <th className="py-3 px-3">Enfoque Primario</th>
                <th className="py-3 px-3">Nivel Soporte Técnico</th>
                <th className="py-3 px-3">Entrega Bogotá / Nal.</th>
                <th className="py-3 px-3">Pauta Activa</th>
                <th className="py-3 px-3">Nivel Riesgo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {competitors.map((comp) => {
                const isAlf = comp.isAlquimia;
                const activeAds = comp.adCampaigns.filter((a) => a.status === 'active').length;

                return (
                  <tr
                    key={comp.id}
                    className={`hover:bg-slate-850/60 transition ${
                      isAlf ? 'bg-cyan-950/20 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: comp.color }}
                        ></span>
                        <span className={isAlf ? 'text-cyan-300 font-bold' : 'text-white'}>
                          {comp.name} {isAlf && '(Alquimia)'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{comp.city}</td>
                    <td className="py-3 px-3 text-slate-300">
                      <span className="line-clamp-1">{comp.corePortfolio[0]}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[11px] ${
                          comp.technicalSupportLevel.includes('Avanzado')
                            ? 'text-emerald-400 font-medium'
                            : 'text-slate-400'
                        }`}
                      >
                        {comp.technicalSupportLevel.split('(')[0]}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{comp.deliverySpeed}</td>
                    <td className="py-3 px-3 font-mono">
                      <span className={activeAds > 0 ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                        {activeAds > 0 ? `${activeAds} anuncios` : '0 observados'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          comp.threatLevel === 'Alta'
                            ? 'bg-red-950/60 text-red-400 border border-red-500/30'
                            : comp.threatLevel === 'Media'
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                            : comp.threatLevel === 'Referencia Propia'
                            ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {comp.threatLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
