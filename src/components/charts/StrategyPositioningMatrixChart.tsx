import React, { useState } from 'react';
import { Competitor } from '../../types';
import { Target, ShieldCheck, CheckCircle2, XCircle, Award, Sparkles, Layers } from 'lucide-react';

interface StrategyPositioningMatrixChartProps {
  competitors: Competitor[];
  selectedCompetitorId: string;
  onSelectCompetitorId: (id: string) => void;
}

export const StrategyPositioningMatrixChart: React.FC<StrategyPositioningMatrixChartProps> = ({
  competitors,
  selectedCompetitorId,
  onSelectCompetitorId,
}) => {
  const [activeView, setActiveView] = useState<'matrix' | 'portfolio'>('matrix');

  // Coordinates mapping (0 to 100 for SVG positioning)
  // X: 0 = Mayorista / Muy Competitivo, 100 = Premium / Alto Margen
  // Y: 0 = Básico / Retail Fraccionado, 100 = Asesoría Química Avanzada / Laboratorio
  const coordsMap: Record<string, { x: number; y: number; label: string }> = {
    'alquimia-lf': { x: 28, y: 88, label: 'Alquimia LF (Nuestra Empresa)' },
    'comp-espacio4d': { x: 82, y: 65, label: 'Espacio 4D' },
    'comp-sirios': { x: 78, y: 55, label: 'Sirios Resina' },
    'comp-imdeco': { x: 62, y: 60, label: 'IMDECO' },
    'comp-c360': { x: 48, y: 40, label: 'Comercial Colombia 360' },
    'comp-tq': { x: 38, y: 35, label: 'Tienda Químicos' },
    'comp-aike': { x: 55, y: 45, label: 'Aike Store' },
    'comp-alquimista': { x: 18, y: 30, label: 'Químicos El Alquimista' },
  };

  // Product categories for Portfolio Heatmap
  const portfolioCategories = [
    { key: 'resina', name: 'Resina Epóxica Gemelos 1:1' },
    { key: 'silicona', name: 'Caucho Silicona RTV p/ Moldes' },
    { key: 'percarbonato', name: 'Percarbonato de Sodio (Eco-Limpieza)' },
    { key: 'citrico', name: 'Ácido Cítrico Anhidro' },
    { key: 'velas', name: 'Cera para Velas (Soya/Parafina)' },
    { key: 'quimicos', name: 'Químicos Base Aseo (Bicarbonato, Soda)' },
    { key: 'soporte', name: 'Asesoría Química en Planta (7 de Agosto)' },
  ];

  const hasCapability = (comp: Competitor, key: string) => {
    const text = (comp.corePortfolio.join(' ') + ' ' + comp.businessModel + ' ' + (comp.technicalSupportLevel || '')).toLowerCase();
    if (key === 'resina') return text.includes('resina');
    if (key === 'silicona') return text.includes('silicon') || text.includes('molde');
    if (key === 'percarbonato') return text.includes('percarbonato');
    if (key === 'citrico') return text.includes('cítrico') || text.includes('citrico');
    if (key === 'velas') return text.includes('vela') || text.includes('cera') || text.includes('soya');
    if (key === 'quimicos') return text.includes('bicarbonato') || text.includes('aseo') || text.includes('soda');
    if (key === 'soporte') return comp.isAlquimia || text.includes('avanzado') || text.includes('planta');
    return false;
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Gráficas de Posicionamiento Estratégico & Portafolio</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Matriz de 4 cuadrantes (Precio vs Rigor Técnico) y Mapa de calor de productos monopólicos de Alquimia LF.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveView('matrix')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeView === 'matrix'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Matriz 2D</span>
          </button>
          <button
            onClick={() => setActiveView('portfolio')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeView === 'portfolio'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mapa de Portafolio</span>
          </button>
        </div>
      </div>

      {activeView === 'matrix' ? (
        <div className="space-y-4">
          {/* 2D Positioning Quadrant Matrix */}
          <div className="relative w-full aspect-[16/10] min-h-[340px] max-h-[460px] bg-slate-950/80 rounded-2xl border border-slate-800 p-6 overflow-hidden">
            {/* Quadrant Background Watermarks */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
              <div className="border-r border-b border-slate-800/80 p-3 bg-cyan-950/10">
                <span className="text-[11px] font-bold text-cyan-400/80 uppercase tracking-wider block">
                  Cuadrante 1: Liderazgo en Valor Técnico B2B
                </span>
                <span className="text-[10px] text-slate-500">
                  Alta Asesoría Química + Precio Mayorista Directo (Posición Alquimia LF)
                </span>
              </div>
              <div className="border-b border-slate-800/80 p-3 bg-purple-950/10">
                <span className="text-[11px] font-bold text-purple-400/80 uppercase tracking-wider block">
                  Cuadrante 2: Especialistas de Nicho & Cursos
                </span>
                <span className="text-[10px] text-slate-500">
                  Precios Premium / Kits Pequeños (Espacio 4D, Sirios)
                </span>
              </div>
              <div className="border-r border-slate-800/80 p-3 bg-amber-950/10">
                <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-wider block">
                  Cuadrante 3: Mayoreo Tradicional / Sin Soporte
                </span>
                <span className="text-[10px] text-slate-500">
                  Bajo Precio pero Congestión y Cero Fichas (San Victorino)
                </span>
              </div>
              <div className="p-3 bg-slate-900/10">
                <span className="text-[11px] font-bold text-slate-400/80 uppercase tracking-wider block">
                  Cuadrante 4: Retail Artesanal / Velas
                </span>
                <span className="text-[10px] text-slate-500">
                  Comercio Minorista de Hobbies (Colombia 360, Aike)
                </span>
              </div>
            </div>

            {/* Axes Labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 pointer-events-none">
              ▲ Alto Rigor Técnico & Asesoría Química en Planta
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 pointer-events-none">
              ▼ Soporte Básico / Solo Venta Fraccionada
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 pointer-events-none [writing-mode:vertical-lr] rotate-180">
              ◄ Precio Competitivo / Mayorista Directo
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-purple-400 font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 pointer-events-none [writing-mode:vertical-lr]">
              Precio Premium / Retail Alto Margen ►
            </div>

            {/* Competitor Nodes */}
            {competitors.map((comp) => {
              const coords = coordsMap[comp.id] || { x: 50, y: 50, label: comp.name };
              const isAlf = comp.isAlquimia;
              const isSelected = selectedCompetitorId === comp.id;

              return (
                <div
                  key={comp.id}
                  onClick={() => onSelectCompetitorId(comp.id)}
                  style={{
                    left: `${coords.x}%`,
                    bottom: `${coords.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-xl transition border-2 ${
                      isAlf
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-600 border-white ring-4 ring-cyan-500/40 shadow-cyan-500/50'
                        : isSelected
                        ? 'border-white ring-4 ring-amber-500/40'
                        : 'border-slate-700/80'
                    }`}
                    style={{ backgroundColor: isAlf ? undefined : comp.color }}
                  >
                    {comp.logoInitial}
                  </div>

                  {/* Name Tag */}
                  <div
                    className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-bold shadow-md pointer-events-none ${
                      isAlf
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-900/90 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {comp.name.split(' ')[0]} {isAlf && '⭐'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between px-1">
            <span>
              💡 <strong>Conclusión Estratégica:</strong> Alquimia LF es la única empresa en Bogotá ubicada en el cuadrante de <strong>Alto Rigor Técnico + Precios Mayoristas Directos</strong>, dominando la relación costo-beneficio del mercado.
            </span>
          </div>
        </div>
      ) : (
        /* Portfolio Monopoly Heatmap */
        <div className="space-y-3 pt-2 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">Línea de Producto Clave</th>
                {competitors.map((c) => (
                  <th
                    key={c.id}
                    className={`py-2.5 px-2 text-center ${
                      c.isAlquimia ? 'text-cyan-300 font-black bg-cyan-950/20' : 'text-slate-300'
                    }`}
                  >
                    <span className="block truncate max-w-[85px] mx-auto">{c.name.split(' ')[0]}</span>
                    {c.isAlquimia && <span className="text-[9px] text-cyan-400">Nuestra</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {portfolioCategories.map((cat) => (
                <tr key={cat.key} className="hover:bg-slate-800/30 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-200">{cat.name}</td>
                  {competitors.map((c) => {
                    const hasIt = hasCapability(c, cat.key);
                    const isAlf = c.isAlquimia;
                    return (
                      <td
                        key={c.id}
                        className={`py-2.5 px-2 text-center ${
                          isAlf ? 'bg-cyan-950/20' : ''
                        }`}
                      >
                        {hasIt ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800/40 text-slate-600">
                            <XCircle className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Monopolio Híbrido de Alquimia LF:</strong> Ningún otro competidor en Colombia ofrece simultáneamente resinas epóxicas 1:1, siliconas RTV, materias primas de aseo ecológico (percarbonato y cítrico) y ceras de velas con sede física en el 7 de Agosto.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
