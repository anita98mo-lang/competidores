import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Zap,
  Copy,
  Check,
  RefreshCw,
  Target,
  ArrowRight,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { AdCampaign } from '../types';

interface CounterAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAd: AdCampaign | null;
}

export const CounterAdModal: React.FC<CounterAdModalProps> = ({
  isOpen,
  onClose,
  selectedAd,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [strategyResult, setStrategyResult] = useState<{
    competitorFlaw: string;
    alquimiaValueProposition: string;
    counterAds: {
      format: string;
      headline: string;
      primaryText: string;
      visualConcept: string;
      callToAction: string;
      projectedAngle: string;
    }[];
  } | null>(null);

  useEffect(() => {
    if (isOpen && selectedAd) {
      handleGenerate();
    }
  }, [isOpen, selectedAd]);

  if (!isOpen || !selectedAd) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setStrategyResult(null);

    try {
      const res = await fetch('/api/gemini/counter-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorAd: {
            headline: selectedAd.headline,
            copy: selectedAd.copy,
          },
          competitorName: selectedAd.competitorName,
          productCategory: selectedAd.category,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setStrategyResult(data.data);
      }
    } catch (err) {
      console.error('Error generating counter-ad:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Generador de Contra-Campaña Publicitaria con IA</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                Alquimia LF
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Diseñado para neutralizar la pauta de <strong>{selectedAd.competitorName}</strong>
            </p>
          </div>
        </div>

        {/* Competitor Observed Ad Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>Anuncio Observado del Rival:</span>
            <span className="text-amber-400">{selectedAd.platform.toUpperCase()} • {selectedAd.daysActive} días activo</span>
          </div>
          <div className="font-bold text-white text-sm">"{selectedAd.headline}"</div>
          <div className="italic text-slate-300">"{selectedAd.copy}"</div>
          <div className="pt-1 flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Producto: <strong className="text-slate-200">{selectedAd.targetProduct}</strong></span>
            <span>•</span>
            <span>Gancho: <strong className="text-slate-200">{selectedAd.hookType}</strong></span>
          </div>
        </div>

        {/* AI Loading State */}
        {isLoading && (
          <div className="py-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-200">
              Analizando debilidades del competidor y formulando contra-anuncios...
            </p>
            <p className="text-xs text-slate-400">
              Optimizando para audiencias B2B de resinas e insumos químicos en Colombia
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && strategyResult && (
          <div className="space-y-6">
            {/* SWOT Diagnosis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30">
                <span className="text-[11px] font-mono uppercase text-red-400 font-bold block mb-1">
                  Punto Débil del Anuncio Rival:
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {strategyResult.competitorFlaw}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                  Ventaja Alquimia LF a Explotar:
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {strategyResult.alquimiaValueProposition}
                </p>
              </div>
            </div>

            {/* Generated Counter Ads */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Propuestas de Contra-Anuncio para Alquimia LF (Listas para Pautar)
              </h3>

              {strategyResult.counterAds.map((ad, idx) => {
                const fullCopy = `${ad.headline}\n\n${ad.primaryText}\n\nCTA: ${ad.callToAction}`;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[11px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white">{ad.format}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {ad.projectedAngle}
                        </span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(fullCopy, idx)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="text-slate-400 text-[11px] uppercase font-semibold">
                        Titular de Alto Impacto:
                      </div>
                      <div className="text-sm font-bold text-cyan-300">
                        {ad.headline}
                      </div>

                      <div className="text-slate-400 text-[11px] uppercase font-semibold pt-1">
                        Texto de Pauta (Primary Text):
                      </div>
                      <div className="text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                        {ad.primaryText}
                      </div>

                      <div className="text-slate-400 text-[11px] uppercase font-semibold pt-1">
                        Concepto Visual Recomendado:
                      </div>
                      <div className="text-slate-300 text-[11px] italic bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                        🎬 {ad.visualConcept}
                      </div>

                      <div className="flex items-center justify-between pt-2 text-xs">
                        <span className="text-slate-400">Llamado a la Acción (CTA):</span>
                        <span className="text-emerald-400 font-mono font-bold">
                          {ad.callToAction}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generar Nuevas Variantes</span>
          </button>

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
