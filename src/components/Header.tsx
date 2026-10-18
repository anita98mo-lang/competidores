import React from 'react';
import {
  Flame,
  FileText,
  Sparkles,
  PlusCircle,
  ShieldCheck,
  RotateCcw,
  Radio
} from 'lucide-react';

interface HeaderProps {
  onOpenReportModal: () => void;
  onOpenAuditModal: () => void;
  onOpenAddCompetitorModal: () => void;
  onOpenReliabilityModal: () => void;
  onResetToVerified?: () => void;
  competitorsCount: number;
  totalActiveAds: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReportModal,
  onOpenAuditModal,
  onOpenAddCompetitorModal,
  onOpenReliabilityModal,
  onResetToVerified,
  competitorsCount,
  totalActiveAds
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand Info */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-cyan-500 p-0.5 shadow-lg shadow-cyan-950/50">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-amber-400" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Alquimia Radar</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-medium">
                    B2B Intelligence
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>Monitoreo de Redes, Pauta y Medios</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400/90 font-medium">Alquimia LF vs Competencia Colombia</span>
              </p>
            </div>
          </div>

          {/* Key Metric Tickers */}
          <div className="hidden lg:flex items-center gap-5 px-4 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-slate-400">En radar:</span>
              <span className="text-white font-semibold">{competitorsCount} empresas</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Anuncios activos:</span>
              <span className="text-amber-400 font-semibold">{totalActiveAds} pautados</span>
            </div>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenReliabilityModal}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-sans cursor-pointer transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Semáforo de Fiabilidad</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {onResetToVerified && (
              <button
                onClick={onResetToVerified}
                title="Restablecer competidores y métricas a los datos reales y verificados de 2026"
                className="px-2.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-cyan-500/50 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Restablecer Verificados</span>
              </button>
            )}

            <button
              onClick={onOpenAuditModal}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 text-xs font-medium flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Auditar con IA</span>
            </button>

            <button
              onClick={onOpenAddCompetitorModal}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-2 transition cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>+ Competidor</span>
            </button>

            <button
              onClick={onOpenReportModal}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-900/40 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Informe Ejecutivo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
