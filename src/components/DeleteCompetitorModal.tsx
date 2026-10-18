import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { Competitor } from '../types';

interface DeleteCompetitorModalProps {
  competitor: Competitor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (competitorId: string) => void;
}

export const DeleteCompetitorModal: React.FC<DeleteCompetitorModalProps> = ({
  competitor,
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !competitor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-red-500/40 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">¿Eliminar este competidor?</h3>
            <p className="text-xs text-slate-400">Acción de depuración del radar de mercado</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-slate-300 space-y-2">
          <p>
            Estás a punto de eliminar a <strong className="text-white font-bold">{competitor.name}</strong> del análisis y las gráficas comparativas.
          </p>
          <p className="text-slate-400 text-[11px]">
            Se recalcularán automáticamente la Cuota de Voz (Share of Voice), las métricas de redes sociales y los rankings de pauta publicitaria.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirmDelete(competitor.id);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Sí, Eliminar Competidor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
