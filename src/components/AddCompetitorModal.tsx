import React, { useState } from 'react';
import { X, PlusCircle, Building2, Globe, MapPin, DollarSign, Target } from 'lucide-react';
import { Competitor } from '../types';

interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCompetitor: (competitor: Competitor) => void;
}

export const AddCompetitorModal: React.FC<AddCompetitorModalProps> = ({
  isOpen,
  onClose,
  onAddCompetitor,
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Bogotá');
  const [website, setWebsite] = useState('');
  const [businessModel, setBusinessModel] = useState<'Distribuidor B2B' | 'Fabricante / Formulador' | 'Tienda Retail & Mayoreo' | 'Distribuidor Petroquímico'>('Distribuidor B2B');
  const [corePortfolio, setCorePortfolio] = useState('Resinas Epóxicas, Desmoldantes, Siliconas');
  const [threatLevel, setThreatLevel] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [adBudget, setAdBudget] = useState('$1.500.000 - $2.500.000 COP');
  const [deliverySpeed, setDeliverySpeed] = useState('24h Bogotá / 48-72h Nacional');
  const [technicalSupport, setTechnicalSupport] = useState<'Básico (sólo venta)' | 'Intermedio (fichas estándar)' | 'Avanzado (asesores químicos en planta)'>('Intermedio (fichas estándar)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('');

    const newComp: Competitor = {
      id: `custom-comp-${Date.now()}`,
      name: name.trim(),
      city: city.trim() || 'Colombia',
      country: 'Colombia',
      website: website.trim() || 'empresaquimica.com',
      coverage: `${city} y despachos nacionales`,
      logoInitial: initials || 'QU',
      color: '#6366f1', // Indigo
      businessModel,
      corePortfolio: corePortfolio.split(',').map((p) => p.trim()),
      threatLevel,
      shareOfVoicePercent: 6,
      estimatedMonthlyAdBudgetCOP: adBudget,
      adBudgetReliability: 'estimated',
      dataCompletenessScore: 70,
      priceOrientation: 'Medio / Competitivo',
      technicalSupportLevel: technicalSupport,
      deliverySpeed,
      socialChannels: [
        {
          platform: 'instagram',
          handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
          url: `https://instagram.com`,
          followers: 3500,
          followersReliability: 'estimated',
          postsPerWeek: 2,
          cadenceReliability: 'estimated',
          avgViewsPerPost: 950,
          viewsReliability: 'estimated',
          engagementRate: 2.1,
          engagementReliability: 'estimated',
          primaryFormat: 'Fotos de producto',
          tone: 'Mixto Técnico-Comercial',
          topKeywords: ['quimicos colombia', 'resinas'],
          lastActive: 'Hace 3 días',
        },
      ],
      adCampaigns: [
        {
          id: `ad-custom-${Date.now()}`,
          competitorId: `custom-comp-${Date.now()}`,
          competitorName: name.trim(),
          platform: 'meta',
          status: 'active',
          firstSeenDate: '2026-09-01',
          daysActive: 28,
          daysReliability: 'estimated',
          format: 'Imagen de Producto con Precio',
          headline: `Insumos Químicos y Resinas | ${name}`,
          copy: 'Venta de resinas y químicos industriales con despachos directos. Pide catálogo a WhatsApp.',
          targetProduct: corePortfolio.split(',')[0] || 'Resinas Epóxicas',
          category: 'Resinas Epóxicas',
          callToAction: 'Enviar mensaje a WhatsApp',
          targetAudience: 'Talleres e industria B2B',
          estimatedSpendRangeCOP: '$800.000 - $1.400.000 COP/mes',
          spendReliability: 'estimated',
          hookType: 'Oferta de precio por mayoreo',
          libraryQueryUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=${encodeURIComponent(
            name
          )}`,
        },
      ],
      mediaMentions: [],
      strengths: ['Presencia en mercado local', 'Precios competitivos'],
      weaknesses: ['Menor respaldo técnico que Alquimia LF', 'Catálogo limitado'],
      alquimiaCounterStrategy: [
        'Ofrecer asesoría técnica directa con ingenieros químicos de Alquimia LF',
        'Garantizar despacho en 24h y certificado de calidad por lote',
      ],
    };

    onAddCompetitor(newComp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Registrar Nuevo Competidor en Radar</h2>
            <p className="text-xs text-slate-400">
              Agrega una empresa química o distribuidor en Colombia para seguimiento
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Nombre de la Empresa *</label>
            <input
              type="text"
              required
              placeholder="Ej: Distribuidora Química Antioquia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Ciudad Principal</label>
              <input
                type="text"
                placeholder="Ej: Medellín / Barranquilla"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Sitio Web / Enlace</label>
              <input
                type="text"
                placeholder="Ej: quimicosantioquia.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Modelo de Negocio</label>
              <select
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
              >
                <option value="Distribuidor B2B">Distribuidor B2B</option>
                <option value="Fabricante / Formulador">Fabricante / Formulador</option>
                <option value="Tienda Retail & Mayoreo">Tienda Retail & Mayoreo</option>
                <option value="Distribuidor Petroquímico">Distribuidor Petroquímico</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Nivel de Amenaza Estimado</label>
              <select
                value={threatLevel}
                onChange={(e) => setThreatLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
              >
                <option value="Alta">Alta (Coincidencia directa en resinas/desmoldantes)</option>
                <option value="Media">Media (Coincidencia parcial o regional)</option>
                <option value="Baja">Baja (Productos adyacentes o catálogo estático)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Portafolio Clave (separado por comas)
            </label>
            <input
              type="text"
              placeholder="Resinas Epóxicas, Silicona RTV, Fibra de Vidrio, Solventes"
              value={corePortfolio}
              onChange={(e) => setCorePortfolio(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Presupuesto Pauta Estimado</label>
              <input
                type="text"
                value={adBudget}
                onChange={(e) => setAdBudget(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Nivel de Soporte Técnico</label>
              <select
                value={technicalSupport}
                onChange={(e) => setTechnicalSupport(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
              >
                <option value="Básico (sólo venta)">Básico (sólo venta)</option>
                <option value="Intermedio (fichas estándar)">Intermedio (fichas estándar)</option>
                <option value="Avanzado (asesores químicos en planta)">Avanzado (asesores en planta)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold transition cursor-pointer"
            >
              Guardar en Radar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
