import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Search,
  Globe,
  Radio,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RefreshCw,
  Target,
  ArrowRight,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { Competitor } from '../types';

interface LiveAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitors: Competitor[];
  initialCompetitor?: Competitor | null;
}

export const LiveAuditModal: React.FC<LiveAuditModalProps> = ({
  isOpen,
  onClose,
  competitors,
  initialCompetitor,
}) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(
    initialCompetitor ? initialCompetitor.id : competitors[1]?.id || 'custom'
  );
  const [customName, setCustomName] = useState<string>('');
  const [customWeb, setCustomWeb] = useState<string>('');
  const [focusArea, setFocusArea] = useState<string>('Auditoría Integral 360');
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleRunAudit = async () => {
    setIsLoading(true);
    setAuditResult(null);

    const isCustom = selectedCompId === 'custom';
    const comp = competitors.find((c) => c.id === selectedCompId);

    const competitorName = isCustom ? customName : comp?.name || 'Competidor';
    const website = isCustom ? customWeb : comp?.website || '';

    try {
      const res = await fetch('/api/gemini/analyze-competitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorName,
          website,
          focusArea,
          currentData: comp || { custom: true },
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAuditResult(data.data);
      }
    } catch (err) {
      console.error('Error running live audit:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Auditoría Profunda con IA de Competidores Químicos en Colombia
            </h2>
            <p className="text-xs text-slate-400">
              Escaneo estratégico con Gemini 3.8 Flash enfocado en oportunidades para Alquimia LF
            </p>
          </div>
        </div>

        {/* Audit Configuration Form */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 mb-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">
                Seleccionar Empresa a Auditar:
              </label>
              <select
                value={selectedCompId}
                onChange={(e) => setSelectedCompId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
              >
                {competitors
                  .filter((c) => !c.isAlquimia)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.city})
                    </option>
                  ))}
                <option value="custom">+ Auditar otra empresa química no registrada...</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">
                Área de Enfoque Estratégico:
              </label>
              <select
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
              >
                <option value="Auditoría Integral 360">Auditoría Integral 360 (Redes, Pauta y Vulnerabilidades)</option>
                <option value="Pauta en Meta Ads y WhatsApp">Pauta en Meta Ads y Canales de Cierre (WhatsApp)</option>
                <option value="Estrategia Orgánica en TikTok y Reels">Estrategia Orgánica en TikTok y Video Corto</option>
                <option value="Presencia B2B en LinkedIn e Industria Pesada">Presencia B2B en LinkedIn e Industria Pesada</option>
                <option value="Guerra de Precios vs Fichas y Asesoría Técnica">Guerra de Precios vs Asesoría Técnica Alquimia</option>
              </select>
            </div>
          </div>

          {selectedCompId === 'custom' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Nombre de la Empresa Química:
                </label>
                <input
                  type="text"
                  placeholder="Ej: Distribuidora Química del Valle"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Sitio Web o Instagram:
                </label>
                <input
                  type="text"
                  placeholder="Ej: distribuidoraquimicadelvalle.com"
                  value={customWeb}
                  onChange={(e) => setCustomWeb(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleRunAudit}
            disabled={isLoading || (selectedCompId === 'custom' && !customName)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Ejecutando Diagnóstico con Gemini IA...' : 'Ejecutar Auditoría Estratégica'}</span>
          </button>
        </div>

        {/* Audit Results */}
        {auditResult && (
          <div className="space-y-5 text-xs">
            {/* Summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40">
              <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                Diagnóstico de Posicionamiento:
              </span>
              <p className="text-slate-200 leading-relaxed font-sans">
                {auditResult.summary}
              </p>
            </div>

            {/* Digital Footprint */}
            {auditResult.digitalFootprint && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-1">
                  Huella Digital Observable:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Gasto Est. Mes</span>
                    <span className="font-bold text-amber-400 font-mono text-[11px]">
                      {auditResult.digitalFootprint.estimatedMonthlyAdSpendRangeCOP || '$1M - $3M COP'}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Frecuencia</span>
                    <span className="font-bold text-slate-200 font-mono text-[11px]">
                      {auditResult.digitalFootprint.postingFrequency || '3-5 posts/sem'}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 col-span-2">
                    <span className="text-[10px] text-slate-500 uppercase block">Tono Editorial</span>
                    <span className="font-medium text-cyan-300 text-[11px]">
                      {auditResult.digitalFootprint.toneAnalysis || 'Comercial Directo'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Strengths and Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                  Fortalezas Observables:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {auditResult.observedStrengths?.map((st: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-red-500/30 space-y-2">
                <span className="text-[11px] font-mono uppercase text-red-400 font-bold block mb-1">
                  Vulnerabilidades y Brechas:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {auditResult.observedWeaknesses?.map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Opportunities for Alquimia LF */}
            {auditResult.alquimiaOpportunities && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-cyan-950/30 border border-cyan-500/40 space-y-3">
                <span className="text-[11px] font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-cyan-400" />
                  Oportunidades de Contra-Ataque para Alquimia LF:
                </span>
                <div className="space-y-2">
                  {auditResult.alquimiaOpportunities.map((op: any, i: number) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-xs">{op.opportunity}</strong>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                          Impacto: {op.expectedImpact || 'Alto'}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{op.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
