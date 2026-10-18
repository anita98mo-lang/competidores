import React from 'react';
import { X, ShieldCheck, Calculator, Lock, Database, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ReliabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReliabilityModal: React.FC<ReliabilityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Panel de Calidad y Fiabilidad de Métricas</h2>
            <p className="text-sm text-slate-400">
              Protocolo de clasificación de datos para Alquimia LF - Inteligencia Competitiva B2B
            </p>
          </div>
        </div>

        {/* Global Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>🟢 Datos Verificados (68%)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Datos 100% observables en repositorios públicos oficiales: perfiles de redes, recuento de seguidores públicos, anuncios activos en bibliotecas oficiales, menciones indexadas en prensa.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2 text-amber-400 font-semibold text-sm">
              <Calculator className="w-4 h-4" />
              <span>🟡 Datos Estimados (24%)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modelados matemáticos a partir de CPMs de Colombia para el sector industrial/B2B ($7.500 - $12.000 COP), algoritmos de visualizaciones orgánicas y duración observable de campañas.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-400 font-semibold text-sm">
              <Lock className="w-4 h-4" />
              <span>⚪ Por Recopilar / Privado (8%)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Métricas que las plataformas no revelan a terceros (CTR privado de la cuenta, Costo por Lead en WhatsApp, facturación directa y tasa de conversión de pedidos cerrados).
            </p>
          </div>
        </div>

        {/* Sources table */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Fuentes Oficiales y Mecanismo de Extracción
          </h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Meta Ad Library (Colombia)</span>
                <p className="text-xs text-slate-300 mt-1">
                  Transparencia obligatoria de Meta. Permite auditar qué anuncios de Facebook e Instagram tienen activos Tienda Químicos, CROA SAS, INSAPOL y otros competidores, junto con sus copys y enlaces de destino.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Google Ads Transparency Center & Búsquedas de Intención</span>
                <p className="text-xs text-slate-300 mt-1">
                  Muestra las campañas de búsqueda patrocinadas por palabras clave como "resina epóxica bogotá" o "solventes petroquímicos".
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Monitoreo de Prensa y Gremios Químicos</span>
                <p className="text-xs text-slate-300 mt-1">
                  Indexación de notas en Portafolio, La República, Revista Acoplásticos, ANDI y boletines de cámaras de comercio (Bogotá, Bucaramanga, Barranquilla).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why this matters */}
        <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg text-xs text-cyan-200">
          <strong className="text-cyan-400">Por qué Alquimia LF necesita esta diferenciación:</strong> En inteligencia competitiva industrial B2B, tomar decisiones asumiendo que un dato estimado es verificado puede llevar a sobreestimar presupuestos de pauta. Nuestro semáforo garantiza que el equipo directivo sepa qué es un hecho público comprobable y qué es una estimación analítica.
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            Entendido, volver al radar
          </button>
        </div>
      </div>
    </div>
  );
};
