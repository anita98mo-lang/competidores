import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Radio,
  Users,
  Newspaper,
  Target,
  ShieldCheck,
  Sparkles,
  FileText,
  PlusCircle,
  HelpCircle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Competitor, AdCampaign } from './types';
import { INITIAL_COMPETITORS } from './data/competitorsData';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { AdsRadar } from './components/AdsRadar';
import { SocialMonitor } from './components/SocialMonitor';
import { MediaTracker } from './components/MediaTracker';
import { StrategyMatrix } from './components/StrategyMatrix';
import { ReliabilityModal } from './components/ReliabilityModal';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { LiveAuditModal } from './components/LiveAuditModal';
import { CounterAdModal } from './components/CounterAdModal';
import { AddCompetitorModal } from './components/AddCompetitorModal';
import { CompetitorDetailModal } from './components/CompetitorDetailModal';
import { DeleteCompetitorModal } from './components/DeleteCompetitorModal';

export default function App() {
  const [competitors, setCompetitors] = useState<Competitor[]>(() => {
    // Purge old stale keys so browser never shows outdated numbers
    try {
      const CURRENT_VERSION = 'v7_screenshots_verified_2026';
      if (localStorage.getItem('alquimia_app_version') !== CURRENT_VERSION) {
        const keysToRemove = [
          'alquimia_radar_competitors_v1',
          'alquimia_radar_competitors_v2',
          'alquimia_radar_competitors_v3',
          'alquimia_radar_competitors_v4',
          'alquimia_radar_competitors_v5',
          'alquimia_radar_custom_comps_v1',
          'alquimia_radar_custom_comps_v2',
          'alquimia_radar_metric_overrides_v1',
          'alquimia_radar_metric_overrides_v2',
          'alquimia_radar_channel_overrides_v1'
        ];
        keysToRemove.forEach((k) => localStorage.removeItem(k));
        localStorage.setItem('alquimia_app_version', CURRENT_VERSION);
      }
    } catch (e) {}

    // Load custom added competitors or specific metric overrides
    try {
      const customCompsStr = localStorage.getItem('alquimia_radar_custom_comps_v2');
      const overridesStr = localStorage.getItem('alquimia_radar_metric_overrides_v2');

      let current = [...INITIAL_COMPETITORS];

      if (customCompsStr) {
        const custom = JSON.parse(customCompsStr);
        if (Array.isArray(custom)) {
          current = [...custom, ...current];
        }
      }

      if (overridesStr) {
        const overrides = JSON.parse(overridesStr);
        current = current.map((comp) => {
          const compOverrides = overrides[comp.id];
          if (!compOverrides) return comp;
          return {
            ...comp,
            socialChannels: comp.socialChannels.map((ch) => {
              const chOverride = compOverrides[ch.platform];
              if (!chOverride) return ch;
              return { ...ch, ...chOverride };
            }),
          };
        });
      }

      const deletedIdsStr = localStorage.getItem('alquimia_radar_deleted_ids_v2');
      if (deletedIdsStr) {
        const deletedIds = JSON.parse(deletedIdsStr);
        if (Array.isArray(deletedIds)) {
          current = current.filter((c) => !deletedIds.includes(c.id));
        }
      }

      return current;
    } catch (e) {
      return INITIAL_COMPETITORS;
    }
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'ads' | 'social' | 'media' | 'strategy'>('overview');
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
  const [competitorToDelete, setCompetitorToDelete] = useState<Competitor | null>(null);
  const [auditTargetComp, setAuditTargetComp] = useState<Competitor | null>(null);
  const [counterAdTarget, setCounterAdTarget] = useState<AdCampaign | null>(null);

  // Modals state
  const [isReliabilityModalOpen, setIsReliabilityModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isAddCompetitorModalOpen, setIsAddCompetitorModalOpen] = useState(false);

  const handleAddCompetitor = (newComp: Competitor) => {
    setCompetitors((prev) => {
      const next = [newComp, ...prev];
      try {
        const customOnly = next.filter((c) => !INITIAL_COMPETITORS.some((init) => init.id === c.id));
        localStorage.setItem('alquimia_radar_custom_comps_v2', JSON.stringify(customOnly));
      } catch (e) {}
      return next;
    });
  };

  const handleUpdateCompetitor = (updatedComp: Competitor) => {
    setCompetitors((prev) => {
      const next = prev.map((c) => (c.id === updatedComp.id ? updatedComp : c));
      try {
        const overrides: Record<string, Record<string, any>> = {};
        next.forEach((c) => {
          overrides[c.id] = {};
          c.socialChannels.forEach((ch) => {
            overrides[c.id][ch.platform] = {
              followers: ch.followers,
              url: ch.url,
              handle: ch.handle,
              postsPerWeek: ch.postsPerWeek,
              avgViewsPerPost: ch.avgViewsPerPost,
              tone: ch.tone,
            };
          });
        });
        localStorage.setItem('alquimia_radar_metric_overrides_v2', JSON.stringify(overrides));
      } catch (e) {}
      return next;
    });
  };

  const handleDeleteCompetitor = (competitorId: string) => {
    setCompetitors((prev) => {
      const next = prev.filter((c) => c.id !== competitorId);
      try {
        const deletedIdsStr = localStorage.getItem('alquimia_radar_deleted_ids_v2');
        const deletedIds: string[] = deletedIdsStr ? JSON.parse(deletedIdsStr) : [];
        if (!deletedIds.includes(competitorId)) {
          deletedIds.push(competitorId);
          localStorage.setItem('alquimia_radar_deleted_ids_v2', JSON.stringify(deletedIds));
        }
        // Also clean customComps
        const customCompsStr = localStorage.getItem('alquimia_radar_custom_comps_v2');
        if (customCompsStr) {
          const custom = JSON.parse(customCompsStr);
          if (Array.isArray(custom)) {
            localStorage.setItem(
              'alquimia_radar_custom_comps_v2',
              JSON.stringify(custom.filter((c: any) => c.id !== competitorId))
            );
          }
        }
      } catch (e) {}
      return next;
    });
    if (selectedCompetitor?.id === competitorId) {
      setSelectedCompetitor(null);
    }
  };

  const handleResetToVerified = () => {
    try {
      localStorage.clear();
      localStorage.setItem('alquimia_app_version', 'v7_screenshots_verified_2026');
    } catch (e) {}
    setCompetitors(INITIAL_COMPETITORS);
  };

  const handleOpenAuditWithCompetitor = (comp: Competitor) => {
    setAuditTargetComp(comp);
    setIsAuditModalOpen(true);
  };

  const handleOpenCounterAd = (ad: AdCampaign) => {
    setCounterAdTarget(ad);
  };

  const allAds = competitors.flatMap((c) => c.adCampaigns);
  const activeAdsCount = allAds.filter((a) => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAuditModal={() => {
          setAuditTargetComp(null);
          setIsAuditModalOpen(true);
        }}
        onOpenAddCompetitorModal={() => setIsAddCompetitorModalOpen(true)}
        onOpenReliabilityModal={() => setIsReliabilityModalOpen(true)}
        onResetToVerified={handleResetToVerified}
        competitorsCount={competitors.length}
        totalActiveAds={activeAdsCount}
      />

      {/* Navigation Tab Bar */}
      <nav className="border-b border-slate-800 bg-slate-900/60 sticky top-[69px] z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 text-xs font-medium no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Panel General (Radar 360°)</span>
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'ads'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Radar de Pauta Publicitaria ({activeAdsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'social'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Monitoreo de Redes Sociales</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'media'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Seguimiento de Medios y Prensa</span>
            </button>

            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'strategy'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Matriz Estratégica & Counter-Playbook</span>
            </button>

            <button
              onClick={() => setIsReliabilityModalOpen(true)}
              className="ml-auto px-3 py-2 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Semáforo de Fiabilidad</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <DashboardOverview
            competitors={competitors}
            onSelectCompetitor={(comp) => setSelectedCompetitor(comp)}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenAuditModal={() => {
              setAuditTargetComp(null);
              setIsAuditModalOpen(true);
            }}
            onOpenCounterAdModal={handleOpenCounterAd}
            onRequestDelete={(comp) => setCompetitorToDelete(comp)}
          />
        )}

        {activeTab === 'ads' && (
          <AdsRadar
            competitors={competitors}
            onOpenCounterAdModal={handleOpenCounterAd}
            onOpenReliabilityModal={() => setIsReliabilityModalOpen(true)}
          />
        )}

        {activeTab === 'social' && (
          <SocialMonitor
            competitors={competitors}
            onOpenReliabilityModal={() => setIsReliabilityModalOpen(true)}
            onUpdateCompetitor={handleUpdateCompetitor}
            onRequestDelete={(comp) => setCompetitorToDelete(comp)}
            onSelectCompetitor={(comp) => setSelectedCompetitor(comp)}
          />
        )}

        {activeTab === 'media' && (
          <MediaTracker
            onOpenReliabilityModal={() => setIsReliabilityModalOpen(true)}
          />
        )}

        {activeTab === 'strategy' && (
          <StrategyMatrix
            competitors={competitors}
            onOpenAuditModal={() => {
              setAuditTargetComp(null);
              setIsAuditModalOpen(true);
            }}
            onOpenReliabilityModal={() => setIsReliabilityModalOpen(true)}
            onRequestDelete={(comp) => setCompetitorToDelete(comp)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Alquimia Radar</span>
            <span>•</span>
            <span>Inteligencia de Mercado B2B y Pauta Publicitaria Colombia</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsReliabilityModalOpen(true)}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Protocolo de Fiabilidad de Datos
            </button>
            <span>•</span>
            <button
              onClick={handleResetToVerified}
              title="Restaurar lista y métricas oficiales de fábrica"
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Restaurar Lista de Competidores
            </button>
            <span>•</span>
            <span>Alquimia LF © 2026</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ReliabilityModal
        isOpen={isReliabilityModalOpen}
        onClose={() => setIsReliabilityModalOpen(false)}
      />

      <ExecutiveReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        competitors={competitors}
      />

      <LiveAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        competitors={competitors}
        initialCompetitor={auditTargetComp}
      />

      <CounterAdModal
        isOpen={!!counterAdTarget}
        onClose={() => setCounterAdTarget(null)}
        selectedAd={counterAdTarget}
      />

      <AddCompetitorModal
        isOpen={isAddCompetitorModalOpen}
        onClose={() => setIsAddCompetitorModalOpen(false)}
        onAddCompetitor={handleAddCompetitor}
      />

      <CompetitorDetailModal
        competitor={selectedCompetitor}
        alquimia={competitors.find((c) => c.isAlquimia) || competitors[0]}
        onClose={() => setSelectedCompetitor(null)}
        onOpenAuditModalWithComp={handleOpenAuditWithCompetitor}
        onOpenCounterAdModal={handleOpenCounterAd}
        onRequestDelete={(comp) => {
          setSelectedCompetitor(null);
          setCompetitorToDelete(comp);
        }}
      />

      <DeleteCompetitorModal
        competitor={competitorToDelete}
        isOpen={!!competitorToDelete}
        onClose={() => setCompetitorToDelete(null)}
        onConfirmDelete={handleDeleteCompetitor}
      />
    </div>
  );
}
