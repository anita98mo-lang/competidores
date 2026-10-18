import React from 'react';
import { Competitor } from '../../types';

interface CompetitorSpiderRadarChartProps {
  competitor: Competitor;
  alquimia: Competitor;
}

export const CompetitorSpiderRadarChart: React.FC<CompetitorSpiderRadarChartProps> = ({
  competitor,
  alquimia,
}) => {
  // 5 dimensions on scale 0 to 100
  const computeScores = (comp: Competitor) => {
    // 1. Social reach
    const totalFollowers = comp.socialChannels.reduce((sum, ch) => sum + ch.followers, 0);
    const socialScore = Math.min(Math.round((totalFollowers / 85000) * 100) + 15, 100);

    // 2. Ad intensity
    const adScore = comp.isAlquimia
      ? 65
      : comp.threatLevel === 'Alta'
      ? 85
      : comp.threatLevel === 'Media'
      ? 55
      : 35;

    // 3. Technical support
    const techScore = comp.isAlquimia
      ? 95
      : comp.technicalSupportLevel?.includes('Avanzado')
      ? 90
      : comp.technicalSupportLevel?.includes('Intermedio')
      ? 60
      : 30;

    // 4. Portfolio breadth
    const portScore = comp.isAlquimia ? 95 : Math.min(comp.corePortfolio.length * 18, 90);

    // 5. Price competitiveness
    const priceScore = comp.isAlquimia
      ? 90
      : comp.priceOrientation?.toLowerCase().includes('económico')
      ? 92
      : comp.priceOrientation?.toLowerCase().includes('medio')
      ? 75
      : 40;

    return [
      { name: 'Audiencia Digital', score: socialScore },
      { name: 'Pauta Meta Ads', score: adScore },
      { name: 'Soporte Químico', score: techScore },
      { name: 'Amplitud Portafolio', score: portScore },
      { name: 'Competitividad Precios', score: priceScore },
    ];
  };

  const compScores = computeScores(competitor);
  const alfScores = computeScores(alquimia);

  // SVG Radar math
  const size = 260;
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = compScores.length;

  const getPoint = (score: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (score / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const compPoints = compScores.map((item, i) => getPoint(item.score, i));
  const alfPoints = alfScores.map((item, i) => getPoint(item.score, i));

  const compPath = compPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  const alfPath = alfPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <h4 className="font-bold text-white flex items-center gap-2">
          <span>Gráfica Radar 5D: {competitor.name} vs Alquimia LF</span>
        </h4>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Alquimia LF
          </span>
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> {competitor.name.split(' ')[0]}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Concentric grid circles */}
          {[0.25, 0.5, 0.75, 1].map((pct, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius * pct}
              fill="transparent"
              stroke="#334155"
              strokeDasharray={pct < 1 ? '3 3' : undefined}
              strokeWidth={1}
            />
          ))}

          {/* Axes lines */}
          {compScores.map((_, i) => {
            const pt = getPoint(100, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={pt.x}
                y2={pt.y}
                stroke="#334155"
                strokeWidth={1}
              />
            );
          })}

          {/* Alquimia Polygon */}
          <path
            d={alfPath}
            fill="#06b6d4"
            fillOpacity={0.25}
            stroke="#06b6d4"
            strokeWidth={2.5}
          />

          {/* Competitor Polygon */}
          <path
            d={compPath}
            fill="#f59e0b"
            fillOpacity={0.25}
            stroke="#f59e0b"
            strokeWidth={2.5}
          />

          {/* Dots on points */}
          {alfPoints.map((pt, i) => (
            <circle key={`alf-${i}`} cx={pt.x} cy={pt.y} r={3.5} fill="#06b6d4" />
          ))}
          {compPoints.map((pt, i) => (
            <circle key={`comp-${i}`} cx={pt.x} cy={pt.y} r={3.5} fill="#f59e0b" />
          ))}

          {/* Dimension Labels */}
          {compScores.map((item, i) => {
            const pt = getPoint(118, i);
            return (
              <text
                key={`lbl-${i}`}
                x={pt.x}
                y={pt.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-slate-300 text-[10px] font-semibold font-mono"
              >
                {item.name}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800/80">
        <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 space-y-0.5">
          <span className="font-bold block">Ventaja Alquimia LF:</span>
          <span>Soporte químico en planta, portafolio híbrido único y retiro en el 7 de Agosto.</span>
        </div>
        <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-300 space-y-0.5">
          <span className="font-bold block">Foco de {competitor.name.split(' ')[0]}:</span>
          <span>{competitor.businessModel} ({competitor.priceOrientation}).</span>
        </div>
      </div>
    </div>
  );
};
