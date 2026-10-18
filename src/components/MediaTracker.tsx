import React, { useState } from 'react';
import {
  Newspaper,
  Sparkles,
  ExternalLink,
  Tag,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { MediaMention } from '../types';
import { GENERAL_MEDIA_FEED } from '../data/competitorsData';
import { ReliabilityBadge, ReliabilityLegend } from './ReliabilityBadge';
import { MediaSentimentChart } from './charts/MediaSentimentChart';

interface MediaTrackerProps {
  onOpenReliabilityModal: () => void;
}

export const MediaTracker: React.FC<MediaTrackerProps> = ({ onOpenReliabilityModal }) => {
  const [articles, setArticles] = useState<MediaMention[]>(GENERAL_MEDIA_FEED);
  const [isScanning, setIsScanning] = useState(false);
  const [industryPulse, setIndustryPulse] = useState<string>(
    'El sector de resinas y químicos industriales en Colombia experimenta una estabilización en los costos de materias primas importadas, con foco creciente en normatividad técnica (etiquetado de tanques de agua y control de solventes por MinJusticia).'
  );
  const [filterType, setFilterType] = useState<string>('all');

  const handleScanMediaWithAI = async () => {
    setIsScanning(true);
    try {
      const response = await fetch('/api/gemini/scan-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector: 'Sector químico, resinas epóxicas, poliéster, fibra de vidrio y solventes en Colombia',
          entities: [
            'Alquimia Chemicals LF',
            'Espacio 4D',
            'Sirios Resina Epóxica',
            'IMDECO',
            'Comercial Colombia 360',
            'Químicos El Alquimista',
            'Tienda Químicos'
          ]
        })
      });

      const res = await response.json();
      if (res.success && res.data) {
        if (res.data.industryPulse) {
          setIndustryPulse(res.data.industryPulse);
        }
        if (Array.isArray(res.data.articles) && res.data.articles.length > 0) {
          const formattedArticles: MediaMention[] = res.data.articles.map(
            (art: any, i: number) => ({
              id: art.id || `live-med-${Date.now()}-${i}`,
              title: art.title || 'Mención del sector químico',
              outlet: art.outlet || 'Prensa Empresarial Colombia',
              outletType: 'Prensa Económica',
              date: art.date || 'Reciente',
              summary: art.snippet || art.summary || '',
              sentiment: (art.sentiment?.toLowerCase().includes('pos')
                ? 'positive'
                : art.sentiment?.toLowerCase().includes('desaf')
                ? 'challenging'
                : 'neutral') as any,
              relevance: (art.relevance?.toLowerCase().includes('alt') ? 'high' : 'medium') as any,
              reliability: 'verified',
              tags: ['IA Escaneada', 'Colombia B2B']
            })
          );
          setArticles((prev) => [...formattedArticles, ...prev]);
        }
      }
    } catch (err) {
      console.error('Error scanning media:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const filteredArticles = articles.filter((art) => {
    if (filterType !== 'all' && art.outletType !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
              <Newspaper className="w-3.5 h-3.5" />
              Radar de Medios, Prensa & RRPP Industrial
            </div>
            <h2 className="text-xl font-bold text-white">
              Seguimiento de Noticias, Portales Especializados y Gremios Químicos
            </h2>
            <p className="text-xs text-slate-300">
              Menciones en Portafolio, La República, Acoplásticos, revistas de manufactura y normatividad MinJusticia/MinComercio.
            </p>
          </div>

          <button
            onClick={handleScanMediaWithAI}
            disabled={isScanning}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition disabled:opacity-60 cursor-pointer"
          >
            {isScanning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-cyan-200" />
            )}
            <span>{isScanning ? 'Escaneando Medios con IA...' : 'Escanear Prensa en Tiempo Real'}</span>
          </button>
        </div>

        <div className="mt-4">
          <ReliabilityLegend onOpenExplainer={onOpenReliabilityModal} />
        </div>
      </div>

      {/* Clima de la industria */}
      <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs">
          <span className="font-semibold text-cyan-300 uppercase tracking-wider text-[11px]">
            Pulso Actual del Mercado Químico Colombiano
          </span>
          <p className="text-slate-300 leading-relaxed">{industryPulse}</p>
        </div>
      </div>

      {/* Interactive Media Sentiment & Topics Chart */}
      <MediaSentimentChart articles={articles} />

      {/* Filters */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Filtrar por tipo de medio:</span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'Todos los Medios' },
            { id: 'Prensa Económica', label: 'Prensa Económica (Portafolio / La República)' },
            { id: 'Revista Industrial', label: 'Revistas Industriales (Metalmecánica / IAlimentos)' },
            { id: 'Gremial / Asociación', label: 'Gremios (Acoplásticos / ANDI)' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-3 py-1 rounded-lg text-xs transition cursor-pointer ${
                filterType === type.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Feed List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-cyan-400 font-mono font-medium">{art.outlet}</span>
                <span className="text-slate-500 text-[11px]">{art.date}</span>
              </div>

              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                {art.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    art.sentiment === 'positive'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : art.sentiment === 'challenging'
                      ? 'bg-red-950/60 text-red-400 border border-red-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {art.sentiment === 'positive'
                    ? 'Clima Favorable'
                    : art.sentiment === 'challenging'
                    ? 'Reto Regulatorio'
                    : 'Neutral'}
                </span>

                <ReliabilityBadge level={art.reliability} />
              </div>

              <div className="flex flex-wrap gap-1">
                {art.tags.slice(0, 2).map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
