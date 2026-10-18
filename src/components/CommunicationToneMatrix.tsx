import React, { useState } from 'react';
import { Competitor } from '../types';
import { MessageSquare, Sparkles, Target, Zap, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CommunicationToneMatrixProps {
  competitors: Competitor[];
  onSelectCompetitor?: (comp: Competitor) => void;
}

export const CommunicationToneMatrix: React.FC<CommunicationToneMatrixProps> = ({
  competitors,
  onSelectCompetitor,
}) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(competitors[0]?.id || 'alquimia-lf');
  const activeComp = competitors.find((c) => c.id === selectedCompId) || competitors[0];

  const getToneBadgeStyle = (primaryTone: string = '') => {
    const t = primaryTone.toLowerCase();
    if (t.includes('técnico') || t.includes('tecnico')) {
      return 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40';
    }
    if (t.includes('diy') || t.includes('artesanal') || t.includes('creativo')) {
      return 'bg-pink-950/70 text-pink-300 border-pink-500/40';
    }
    if (t.includes('oportunidad') || t.includes('negocio')) {
      return 'bg-purple-950/70 text-purple-300 border-purple-500/40';
    }
    if (t.includes('comunidad') || t.includes('velas')) {
      return 'bg-orange-950/70 text-orange-300 border-orange-500/40';
    }
    if (t.includes('san victorino') || t.includes('precio') || t.includes('mayorista')) {
      return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40';
    }
    return 'bg-amber-950/70 text-amber-300 border-amber-500/40';
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Radiografía de Tonos de Comunicación de Cada Empresa</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Análisis de la personalidad de voz, temas recurrentes, disparadores psicológicos y cómo contra-atacar con Alquimia LF.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
          <span>{competitors.length} Empresas Mapeadas</span>
        </div>
      </div>

      {/* Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {competitors.map((c) => {
          const isSelected = selectedCompId === c.id;
          const isAlf = c.isAlquimia;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCompId(c.id)}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer font-medium flex items-center gap-2 ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : isAlf
                  ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/40'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: c.color }}
              ></span>
              <span>{c.name.split(' ')[0]}</span>
              {isAlf && <span className="text-[10px] font-mono">⭐</span>}
            </button>
          );
        })}
      </div>

      {/* Selected Company Tone Deep-Dive Card */}
      {activeComp && (
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-md"
                style={{ backgroundColor: activeComp.color }}
              >
                {activeComp.logoInitial}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">{activeComp.name}</h4>
                  {activeComp.isAlquimia && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                      Nuestra Empresa
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {activeComp.city} • Modelo: {activeComp.businessModel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getToneBadgeStyle(
                  activeComp.communicationTone?.primary
                )}`}
              >
                {activeComp.communicationTone?.primary || 'Mixto Técnico-Comercial'}
              </span>
            </div>
          </div>

          {/* Tone Description & Psychology Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Description */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="font-mono text-[11px] text-cyan-400 font-bold uppercase tracking-wider block">
                ¿Cómo le habla a su cliente? (Personalidad de Voz):
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeComp.communicationTone?.description ||
                  'Comunicación directa orientada a venta de insumos, soporte técnico y demostración visual de producto en redes sociales.'}
              </p>
            </div>

            {/* Psychological Trigger */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="font-mono text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                Disparador Psicológico de Compra:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeComp.communicationTone?.psychologicalTrigger ||
                  'Seguridad en el suministro, rapidez de entrega y precio competitivo en Bogotá.'}
              </p>
            </div>
          </div>

          {/* Key Themes & Vocabulary */}
          {activeComp.communicationTone?.keyThemes && (
            <div className="space-y-1.5 text-xs">
              <span className="font-mono text-[11px] text-slate-400 font-semibold uppercase">
                Temas Clave y Argumentos Recurrentes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeComp.communicationTone.keyThemes.map((theme, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-medium"
                  >
                    #{theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Counter Strategy / Differentiation */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-cyan-950/30 border border-cyan-500/40 text-xs space-y-1.5">
            <span className="font-mono text-[11px] text-cyan-300 font-bold uppercase flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {activeComp.isAlquimia
                  ? 'Fórmula Diferencial de Alquimia LF:'
                  : 'Ángulo Táctico para Desplazar a este Rival:'}
              </span>
            </span>
            <p className="text-slate-200 leading-relaxed">
              {activeComp.communicationTone?.alquimiaCounterAngle ||
                'Destacar la disponibilidad física en el Barrio 7 de Agosto, parqueo vehicular y asesoría química en planta.'}
            </p>
          </div>
        </div>
      )}

      {/* Grid Overview of all Competitors */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 font-mono uppercase">
          Resumen Comparativo de Todas las Empresas:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {competitors.map((c) => {
            const isSelected = selectedCompId === c.id;
            const isAlf = c.isAlquimia;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCompId(c.id)}
                className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-slate-850 border-cyan-500/60 shadow-lg'
                    : isAlf
                    ? 'bg-cyan-950/20 border-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    ></span>
                    <span className={`font-bold ${isAlf ? 'text-cyan-300' : 'text-white'}`}>
                      {c.name.split(' ')[0]}
                    </span>
                  </div>
                  {isAlf && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                      Propia
                    </span>
                  )}
                </div>

                <div
                  className={`text-[10px] px-2 py-0.5 rounded border inline-block font-semibold truncate max-w-full ${getToneBadgeStyle(
                    c.communicationTone?.primary
                  )}`}
                >
                  {c.communicationTone?.primary?.split('&')[0] || 'Técnico-Comercial'}
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {c.communicationTone?.description || 'Enfoque en venta de insumos químicos.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
