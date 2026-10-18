import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Eye,
  MessageCircle,
  Share2,
  ExternalLink,
  Filter,
  BarChart2,
  ArrowUpDown,
  Sparkles,
  Info,
  Edit3,
  Check,
  X,
  Save,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Trash2
} from 'lucide-react';
import { Competitor, SocialChannelData } from '../types';
import { ReliabilityBadge, ReliabilityLegend } from './ReliabilityBadge';
import { SocialMetricsCharts } from './charts/SocialMetricsCharts';
import { CommunicationToneMatrix } from './CommunicationToneMatrix';

interface SocialMonitorProps {
  competitors: Competitor[];
  onOpenReliabilityModal: () => void;
  onUpdateCompetitor?: (updatedCompetitor: Competitor) => void;
  onRequestDelete?: (competitor: Competitor) => void;
  onSelectCompetitor?: (competitor: Competitor) => void;
}

export const SocialMonitor: React.FC<SocialMonitorProps> = ({
  competitors,
  onOpenReliabilityModal,
  onUpdateCompetitor,
  onRequestDelete,
  onSelectCompetitor,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<
    'all' | 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'youtube'
  >('all');
  const [sortBy, setSortBy] = useState<'followers' | 'cadence' | 'views'>('followers');

  // Editing state
  const [editingChannel, setEditingChannel] = useState<{
    companyId: string;
    companyName: string;
    platform: string;
    handle: string;
    url: string;
    followers: number;
    postsPerWeek: number;
    avgViewsPerPost: number;
    tone: string;
  } | null>(null);

  const alquimia = competitors.find((c) => c.isAlquimia) || competitors[0];

  // Flatten channels with company info
  const allChannels = competitors.flatMap((comp) =>
    comp.socialChannels.map((ch) => ({
      ...ch,
      companyId: comp.id,
      companyName: comp.name,
      companyColor: comp.color,
      isAlquimia: comp.isAlquimia,
      businessModel: comp.businessModel,
    }))
  );

  const filteredChannels = allChannels
    .filter((ch) => {
      if (selectedPlatform !== 'all' && ch.platform !== selectedPlatform) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'followers') return b.followers - a.followers;
      if (sortBy === 'cadence') return b.postsPerWeek - a.postsPerWeek;
      if (sortBy === 'views') return b.avgViewsPerPost - a.avgViewsPerPost;
      return 0;
    });

  const getToneBadgeColor = (tone: string) => {
    switch (tone) {
      case 'Técnico-Ingeniería B2B':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-700/50';
      case 'DIY / Artesanal & Talleres':
        return 'bg-amber-950/70 text-amber-300 border-amber-700/50';
      case 'Comercial Directo / Precios':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-700/50';
      case 'Institucional / Corporativo':
        return 'bg-purple-950/70 text-purple-300 border-purple-700/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleOpenEdit = (ch: any) => {
    setEditingChannel({
      companyId: ch.companyId,
      companyName: ch.companyName,
      platform: ch.platform,
      handle: ch.handle,
      url: ch.url,
      followers: ch.followers,
      postsPerWeek: ch.postsPerWeek,
      avgViewsPerPost: ch.avgViewsPerPost,
      tone: ch.tone,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChannel || !onUpdateCompetitor) return;

    const comp = competitors.find((c) => c.id === editingChannel.companyId);
    if (!comp) return;

    const updatedChannels = comp.socialChannels.map((ch) => {
      if (ch.platform === editingChannel.platform) {
        return {
          ...ch,
          followers: Number(editingChannel.followers),
          postsPerWeek: Number(editingChannel.postsPerWeek),
          avgViewsPerPost: Number(editingChannel.avgViewsPerPost),
          url: editingChannel.url,
          handle: editingChannel.handle,
          tone: editingChannel.tone as any,
          followersReliability: 'verified' as const,
        };
      }
      return ch;
    });

    const updatedComp: Competitor = {
      ...comp,
      socialChannels: updatedChannels,
    };

    onUpdateCompetitor(updatedComp);
    setEditingChannel(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-1">
              <Users className="w-3.5 h-3.5" />
              Auditoría de Redes Sociales & Seguidores Verificados
            </div>
            <h2 className="text-xl font-bold text-white">
              Monitoreo de Redes Sociales: Instagram, Facebook, TikTok y Más
            </h2>
            <p className="text-xs text-slate-300">
              Datos verificados en los enlaces oficiales reales. Puedes abrir el perfil con el botón "Comprobar Perfil ↗" o calibrar la cifra en cualquier momento con "✏️ Editar cifra".
            </p>
          </div>

          <ReliabilityBadge level="verified" label="Datos de Perfil Verificados" />
        </div>

        <div className="mt-4">
          <ReliabilityLegend onOpenExplainer={onOpenReliabilityModal} />
        </div>
      </div>

      {/* Alquimia LF Verified Social Hub */}
      {alquimia && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border-2 border-cyan-500/50 shadow-xl shadow-cyan-950/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-900/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 text-sm">
                ALF
              </div>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Alquimia Chemicals LF (Nuestros Canales Oficiales)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                    Verificado 2026
                  </span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Sede Barrio 7 de Agosto, Bogotá • Tel: +57 311 666 9223 / +57 320 476 2239
                </span>
              </div>
            </div>

            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sincronizado con enlaces oficiales</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alquimia.socialChannels.map((ch, idx) => (
              <div
                key={`alquimia-hub-${ch.platform}-${idx}`}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      {ch.platform}
                    </span>
                    <span className="text-[11px] text-cyan-400 font-mono">{ch.handle}</span>
                  </div>

                  <div className="my-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">
                        {ch.platform === 'facebook' ? 'Contactos / Amigos' : 'Seguidores'}
                      </span>
                      <span className="text-xl font-bold text-white font-mono">
                        {ch.followers.toLocaleString('es-CO')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenEdit({ ...ch, companyId: alquimia.id, companyName: alquimia.name })}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Calibrar</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-3">
                    {ch.lastActive}
                  </div>
                </div>

                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Comprobar Perfil en {ch.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Social Analytics Chart Suite */}
      <SocialMetricsCharts
        competitors={competitors}
        onSelectCompetitor={onSelectCompetitor}
      />

      {/* Radiografía Completa del Tono de Comunicación de Cada Empresa */}
      <CommunicationToneMatrix
        competitors={competitors}
        onSelectCompetitor={onSelectCompetitor}
      />

      {/* Filter and Tab controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium">
          {(
            [
              { id: 'all', label: 'Todas las Redes' },
              { id: 'instagram', label: 'Instagram' },
              { id: 'facebook', label: 'Facebook' },
              { id: 'tiktok', label: 'TikTok' },
              { id: 'linkedin', label: 'LinkedIn B2B' },
              { id: 'youtube', label: 'YouTube' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPlatform(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                selectedPlatform === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Ordenar por:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none"
          >
            <option value="followers">Seguidores (Mayor a Menor)</option>
            <option value="cadence">Frecuencia (Posts / Semana)</option>
            <option value="views">Vistas Promedio Estimadas</option>
          </select>
        </div>
      </div>

      {/* Tone Analysis Insight Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30">
          <div className="text-xs font-semibold text-cyan-400 mb-1">Técnico-Ingeniería B2B</div>
          <p className="text-[11px] text-slate-300">
            Fichas técnicas, curvas de curado y asesoría química directa en planta. <strong className="text-white">Alquimia Chemicals LF (Barrio 7 de Agosto)</strong>.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
          <div className="text-xs font-semibold text-amber-400 mb-1">DIY / Artesanal & Talleres</div>
          <p className="text-[11px] text-slate-300">
            Resinas epóxicas, moldes de silicona y kits para emprendedores. <strong className="text-white">Espacio 4D, Sirios Resina Epóxica y Aike Store</strong>.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30">
          <div className="text-xs font-semibold text-emerald-400 mb-1">Comercial Directo / Precios</div>
          <p className="text-[11px] text-slate-300">
            Percarbonato, ácido cítrico, bicarbonato y bultos cerrados. <strong className="text-white">Alquimia (7 de Agosto) y El Alquimista (San Victorino)</strong>.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/30">
          <div className="text-xs font-semibold text-purple-400 mb-1">Pisos y Velas de Nicho</div>
          <p className="text-[11px] text-slate-300">
            Porcelanato líquido y ceras de molde sin frosting. <strong className="text-white">IMDECO y Comercial Colombia 360</strong>.
          </p>
        </div>
      </div>

      {/* Social Profiles Table / Cards */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChannels.map((channel, idx) => (
            <div
              key={`${channel.companyId}-${channel.platform}-${idx}`}
              className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                channel.isAlquimia
                  ? 'bg-gradient-to-b from-slate-900 to-cyan-950/20 border-cyan-500/40 shadow-md shadow-cyan-950/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: channel.companyColor }}
                    ></span>
                    <span className="font-bold text-sm text-white">{channel.companyName}</span>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    {channel.platform}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs mb-3 text-slate-400">
                  <span className="font-mono text-cyan-400">{channel.handle}</span>
                  <span className="text-[11px]">{channel.lastActive}</span>
                </div>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-3 text-center">
                  <div className="relative group">
                    <span className="text-[10px] text-slate-500 block uppercase">
                      {channel.platform === 'facebook' ? 'Contactos' : 'Seguidores'}
                    </span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm font-bold text-white font-mono">
                        {channel.followers.toLocaleString('es-CO')}
                      </span>
                      {onUpdateCompetitor && (
                        <button
                          onClick={() => handleOpenEdit(channel)}
                          title="Ajustar número de seguidores"
                          className="text-slate-500 hover:text-cyan-400 transition cursor-pointer p-0.5"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Cadencia</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">
                      {channel.postsPerWeek}/sem
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Vistas Est.</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {channel.avgViewsPerPost.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>

                {/* Editorial Tone */}
                <div className="space-y-2 mb-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                      Tono de Comunicación:
                    </span>
                    <span
                      className={`inline-block text-[11px] px-2 py-0.5 rounded border font-medium ${getToneBadgeColor(
                        channel.tone
                      )}`}
                    >
                      {channel.tone}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                      Formato Predominante:
                    </span>
                    <span className="text-slate-300 font-medium">{channel.primaryFormat}</span>
                  </div>
                </div>

                {/* Keywords */}
                {channel.topKeywords && channel.topKeywords.length > 0 && (
                  <div className="mb-3">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                      Etiquetas / Notas del Perfil:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {channel.topKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action / Verified Tag */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-1.5">
                  <ReliabilityBadge level={channel.followersReliability} />
                  {onUpdateCompetitor && (
                    <button
                      onClick={() => handleOpenEdit(channel)}
                      title="Calibrar métricas o cambiar enlace"
                      className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Calibrar</span>
                    </button>
                  )}
                  {!channel.isAlquimia && onRequestDelete && (
                    <button
                      onClick={() => {
                        const comp = competitors.find((c) => c.id === channel.companyId);
                        if (comp) onRequestDelete(comp);
                      }}
                      title="Eliminar este competidor del radar"
                      className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Eliminar</span>
                    </button>
                  )}
                </div>

                {channel.url !== '#' && (
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 text-[11px] font-semibold transition"
                  >
                    <span>Comprobar perfil ↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Edit Channel Modal */}
      {editingChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 text-xs">
            <button
              onClick={() => setEditingChannel(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Calibrar Métricas del Perfil</h3>
                <span className="text-[11px] text-slate-400">
                  {editingChannel.companyName} ({editingChannel.platform.toUpperCase()})
                </span>
              </div>
            </div>

            {editingChannel.url && (
              <div className="mb-4 p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[240px]">
                  {editingChannel.url}
                </span>
                <a
                  href={editingChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 text-[11px] shrink-0 ml-2"
                >
                  <span>Abrir enlace</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Cantidad Exacta de Seguidores (lo que ves en la pantalla):
                </label>
                <input
                  type="number"
                  required
                  value={editingChannel.followers}
                  onChange={(e) =>
                    setEditingChannel({ ...editingChannel, followers: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-cyan-500/50 text-white font-mono text-sm font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Enlace Oficial al Perfil (URL):
                </label>
                <input
                  type="text"
                  required
                  value={editingChannel.url}
                  onChange={(e) =>
                    setEditingChannel({ ...editingChannel, url: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Usuario / Handle (@):
                </label>
                <input
                  type="text"
                  required
                  value={editingChannel.handle}
                  onChange={(e) =>
                    setEditingChannel({ ...editingChannel, handle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Posts / Semana:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingChannel.postsPerWeek}
                    onChange={(e) =>
                      setEditingChannel({
                        ...editingChannel,
                        postsPerWeek: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Vistas Promedio:
                  </label>
                  <input
                    type="number"
                    value={editingChannel.avgViewsPerPost}
                    onChange={(e) =>
                      setEditingChannel({
                        ...editingChannel,
                        avgViewsPerPost: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Tono de Comunicación:
                </label>
                <select
                  value={editingChannel.tone}
                  onChange={(e) =>
                    setEditingChannel({ ...editingChannel, tone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none"
                >
                  <option value="DIY / Artesanal & Talleres">DIY / Artesanal & Talleres</option>
                  <option value="Técnico-Ingeniería B2B">Técnico-Ingeniería B2B</option>
                  <option value="Comercial Directo / Precios">Comercial Directo / Precios</option>
                  <option value="Institucional / Corporativo">Institucional / Corporativo</option>
                  <option value="Mixto Técnico-Comercial">Mixto Técnico-Comercial</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingChannel(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar y Actualizar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
