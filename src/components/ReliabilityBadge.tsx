import React from 'react';
import { ShieldCheck, Calculator, Lock, Info } from 'lucide-react';
import { ReliabilityLevel } from '../types';

interface ReliabilityBadgeProps {
  level: ReliabilityLevel;
  label?: string;
  size?: 'sm' | 'md';
  showTooltip?: boolean;
}

export const ReliabilityBadge: React.FC<ReliabilityBadgeProps> = ({
  level,
  label,
  size = 'sm',
}) => {
  const isSm = size === 'sm';

  if (level === 'verified') {
    return (
      <span
        title="Dato Verificado: Extraído directamente de fuentes públicas oficiales (Biblioteca de Anuncios Meta, perfiles públicos, prensa indexada)."
        className={`inline-flex items-center gap-1 font-medium rounded border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 ${
          isSm ? 'text-[11px] px-1.5 py-0.5' : 'text-xs px-2 py-1'
        }`}
      >
        <ShieldCheck className={`${isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-400`} />
        <span>{label || 'Verificado'}</span>
      </span>
    );
  }

  if (level === 'estimated') {
    return (
      <span
        title="Dato Estimado: Proyección algorítmica para el mercado químico B2B en Colombia (CPM estándar, tasas de engagement y frecuencia observable)."
        className={`inline-flex items-center gap-1 font-medium rounded border border-amber-500/30 bg-amber-950/40 text-amber-300 ${
          isSm ? 'text-[11px] px-1.5 py-0.5' : 'text-xs px-2 py-1'
        }`}
      >
        <Calculator className={`${isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-amber-400`} />
        <span>{label || 'Estimado B2B'}</span>
      </span>
    );
  }

  return (
    <span
      title="Dato Privado / Por Recopilar: Métricas internas del competidor que no son públicas (CPL exacto, conversiones WhatsApp, ventas cerradas)."
      className={`inline-flex items-center gap-1 font-medium rounded border border-slate-700 bg-slate-900/60 text-slate-400 ${
        isSm ? 'text-[11px] px-1.5 py-0.5' : 'text-xs px-2 py-1'
      }`}
    >
      <Lock className={`${isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-slate-500`} />
      <span>{label || 'Por Recopilar (Privado)'}</span>
    </span>
  );
};

export const ReliabilityLegend: React.FC<{ onOpenExplainer: () => void }> = ({ onOpenExplainer }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2 px-3 bg-slate-900/70 border border-slate-800 rounded-lg text-xs">
      <span className="text-slate-400 font-medium flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-cyan-400" />
        Índice de Fiabilidad de Datos:
      </span>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Verificado (Público)
        </span>
        <span className="text-slate-600">|</span>
        <span className="inline-flex items-center gap-1 text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Estimado B2B (Proyección)
        </span>
        <span className="text-slate-600">|</span>
        <span className="inline-flex items-center gap-1 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-slate-500"></span>
          Por Recopilar (Métrica Privada)
        </span>
      </div>
      <button
        onClick={onOpenExplainer}
        className="ml-auto text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
      >
        Metodología y fuentes
      </button>
    </div>
  );
};
