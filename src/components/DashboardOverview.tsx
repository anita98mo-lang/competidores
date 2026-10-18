import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Target,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Zap,
  Radio,
  Eye,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Competitor, AdCampaign } from '../types';
import { ReliabilityBadge } from './ReliabilityBadge';
import { ShareOfVoiceChart } from './charts/ShareOfVoiceChart';
import { Trash2 } from 'lucide-react';

interface DashboardOverviewProps {
  competitors: Competitor[];
  onSelectCompetitor: (competitor: Competitor) => void;
  onNavigateToTab: (tab: 'ads' | 'social' | 'media' | 'strategy') => void;
  onOpenAuditModal: () => void;
  onOpenCounterAdModal: (ad: AdCampaign) => void;
  onRequestDelete?: (competitor: Competitor) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  competitors,
  onSelectCompetitor,
  onNavigateToTab,
  onOpenAuditModal,
  onOpenCounterAdModal,
  onRequestDelete,
}) => {
  const alquimia = competitors.find((c) => c.isAlquimia) || competitors[0];
  const otherCompetitors = competitors.filter((c) => !c.isAlquimia);

  // Aggregate stats
  const allAds = competitors.flatMap((c) => c.adCampaigns);
  const activeAdsCount = allAds.filter((a) => a.status === 'active').length;
  const highThreatCompetitors = otherCompetitors.filter((c) => c.threatLevel === 'Alta');

  // Alquimia channels
  const igChannel = alquimia?.socialChannels.find((c) => c.platform === 'instagram');
  const ttChannel = alquimia?.socialChannels.find((c) => c.platform === 'tiktok');
  const fbChannel = alquimia?.socialChannels.find((c) => c.platform === 'facebook');

  return (
    <div className="space-y-6">
      {/* Welcome & Tactical Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-700/80 p-6 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Alquimia LF • Radar de Inteligencia B2B Verificado 2026
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Monitor de Pauta, Redes Sociales y Competencia en Colombia
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Monitoreo activo sobre los verdaderos competidores de Alquimia LF en sus líneas reales: <strong className="text-white">resinas epóxicas, caucho de silicona para moldes, ceras para velas y materias primas de aseo (percarbonato y ácido cítrico)</strong>.
            </p>

            {/* Alquimia real profile links */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Canales Oficiales Alquimia LF:</span>
              
              <a
                href={igChannel?.url || 'https://instagram.com/alquimiachemicals?vrfl=azA0ZDczaDQ2dXJy'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-950/40 border border-pink-500/40 text-pink-300 hover:bg-pink-900/50 transition font-medium"
              >
                <span>Instagram: {igChannel?.handle || '@alquimiachemicals'} ({(igChannel?.followers ?? 40).toLocaleString('es-CO')} seg)</span>
                <ExternalLink className="w-3 h-3 text-pink-400" />
              </a>

              <a
                href={ttChannel?.url || 'https://www.tiktok.com/@alquimialf?_r=1&_t=ZS-9AXJtytOyiC'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 transition font-medium"
              >
                <span>TikTok: {ttChannel?.handle || '@alquimialf'} ({(ttChannel?.followers ?? 9338).toLocaleString('es-CO')} seg)</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>

              <a
                href={fbChannel?.url || 'https://www.facebook.com/share/1D68sSyAPc/'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950/40 border border-blue-500/40 text-blue-300 hover:bg-blue-900/50 transition font-medium"
              >
                <span>Facebook: {fbChannel?.handle || 'Alquimia Chemicals LF'} ({(fbChannel?.followers ?? 73).toLocaleString('es-CO')} contactos)</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400 font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>Tienda física: Barrio 7 de Agosto, Bogotá • Tel: +57 311 666 9223 / +57 320 476 2239</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigateToTab('ads')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Radio className="w-4 h-4" />
              <span>Ver {activeAdsCount} Anuncios Pautados</span>
            </button>
            <button
              onClick={() => onNavigateToTab('strategy')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Playbook Alquimia LF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accuracy & Transparency Notice */}
      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <strong className="text-white">Métricas 100% Calibradas al Perfil Real:</strong> Todos los enlaces de Alquimia LF y competidores dirigen a las cuentas oficiales reales. La cantidad de seguidores mostrada ({(igChannel?.followers ?? 40).toLocaleString('es-CO')} en Instagram, {(ttChannel?.followers ?? 9338).toLocaleString('es-CO')} en TikTok con 21.8K likes, y {(fbChannel?.followers ?? 73).toLocaleString('es-CO')} en Facebook) es la comprobable al hacer clic en cada perfil oficial. Puedes pulsar el botón de lápiz (✏️) en la pestaña "Redes Sociales" para ajustar o actualizar cualquier cifra en vivo.
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Cuota de Voz Estimada (SOV)
            </span>
            <ReliabilityBadge level="estimated" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-cyan-400 font-mono">18%</span>
            <span className="text-xs text-slate-400">Alquimia LF en Bogotá</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: '18%' }}></div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Líderes en pauta y comunidad: <strong className="text-slate-200">Espacio 4D (24%) e IMDECO (22%)</strong>
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Anuncios Activos en Radar
            </span>
            <ReliabilityBadge level="verified" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400 font-mono">{activeAdsCount}</span>
            <span className="text-xs text-emerald-400 font-medium">Meta Ads Colombia</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>85% dirigen tráfico a <strong className="text-slate-200">WhatsApp</strong> de cotizaciones</span>
          </p>
          <div className="mt-1 text-[11px] text-slate-400">
            Campañas con más de 30 días activas: <strong className="text-white">6 anuncios</strong>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Amenazas Directas
            </span>
            <span className="text-[11px] font-mono text-red-400 px-1.5 py-0.5 rounded bg-red-950/40 border border-red-500/30">
              {highThreatCompetitors.length} Empresas
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">Espacio 4D & IMDECO</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Pauta activa en <strong className="text-slate-200">resina epóxica</strong> y <strong className="text-slate-200">caucho de silicona</strong> para moldes en Bogotá.
          </p>
          <div className="mt-1 text-[11px] text-cyan-400">
            Comercial Colombia 360 lidera en ceras de velas
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Ventaja Diferencial Alquimia
            </span>
            <ReliabilityBadge level="verified" />
          </div>
          <div className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 shrink-0" />
            <span>Punto 7 de Agosto & Mayoreo</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Venta desde 1 kilo a bulto cerrado, asesoría química y retiro inmediato sin congestión de San Victorino ni sobreprecio de Chapinero.
          </p>
          <button
            onClick={() => onNavigateToTab('strategy')}
            className="mt-1 text-[11px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Ver plan de contra-ataque <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Share of Voice Analysis Chart & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ShareOfVoiceChart
            competitors={competitors}
            onSelectCompetitor={onSelectCompetitor}
          />
        </div>

        {/* Live Market Alert & Playbook Box */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Alertas del Mercado de Resinas y Químicos</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                <div className="font-semibold text-emerald-300 mb-1">
                  Espacio 4D Pauta Kits de Joyería
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Campaña activa en Meta Ads promocionando resina cristal y siliconas para moldes en Chapinero. Oportunidad: Alquimia puede contra-atacar con precio por galón y kits para producción.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400/80 font-mono">Meta Ads • Bogotá</span>
                  <button
                    onClick={() => {
                      const ad = allAds.find((a) => a.competitorId === 'comp-espacio4d');
                      if (ad) onOpenCounterAdModal(ad);
                    }}
                    className="text-[11px] text-cyan-400 hover:underline font-medium cursor-pointer"
                  >
                    Contra-anuncio IA →
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
                <div className="font-semibold text-blue-300 mb-1">
                  IMDECO y Pisos de Porcelanato
                </div>
                <p className="text-slate-300 leading-relaxed">
                  IMDECO mantiene campañas permanentes de cursos y venta de resina epóxica. Alquimia puede posicionarse como distribuidor químico directo para quienes ya aprendieron y requieren abastecimiento.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
                <div className="font-semibold text-amber-300 mb-1">
                  Congestión en San Victorino
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Químicos El Alquimista atiende desde el centro. Alquimia LF ofrece parqueo cómodo y despacho ágil desde el Barrio 7 de Agosto para pedidos de percarbonato, ácido cítrico y resinas.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">¿Deseas auditar un competidor?</span>
            <button
              onClick={onOpenAuditModal}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auditoría IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Competitors Quick Grid */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Directorio de Competidores Directos en Colombia</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Empresas con coincidencia exacta de catálogo: resinas epóxicas, moldes de silicona, ceras para velas y químicos de aseo
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('social')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium underline cursor-pointer"
          >
            Ver métricas de redes →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {competitors.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onSelectCompetitor(comp)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                comp.isAlquimia
                  ? 'bg-cyan-950/20 border-cyan-500/50 hover:border-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: comp.color }}
                    ></span>
                    <span className="font-bold text-xs text-white truncate max-w-[140px]">
                      {comp.name}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      comp.threatLevel === 'Alta'
                        ? 'bg-red-950/50 text-red-400 border border-red-800/40'
                        : comp.threatLevel === 'Media'
                        ? 'bg-amber-950/50 text-amber-400 border border-amber-800/40'
                        : comp.threatLevel === 'Referencia Propia'
                        ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-800/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {comp.threatLevel}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 mb-2 truncate">
                  📍 {comp.city}
                </div>

                <div className="text-[11px] text-slate-300 line-clamp-2 mb-2 font-mono">
                  {comp.corePortfolio.slice(0, 2).join(' • ')}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{comp.socialChannels.length} perfiles</span>
                <span className="text-cyan-400 flex items-center gap-1 font-medium">
                  Ver detalle →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
