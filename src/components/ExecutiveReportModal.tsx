import React, { useState } from 'react';
import {
  X,
  FileText,
  Printer,
  Sparkles,
  RefreshCw,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { Competitor, ExecutiveReportData } from '../types';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitors: Competitor[];
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen,
  onClose,
  competitors,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<ExecutiveReportData>({
    reportTitle: 'Informe Ejecutivo de Inteligencia Competitiva Digital & Pauta - Alquimia LF',
    generatedDate: 'Octubre 2026',
    executiveSummary:
      'El mercado de insumos químicos para moldes, resina epóxica, ceras para velas y materias primas de limpieza en Bogotá y Colombia muestra una competencia concentrada en competidores directos de nicho: Chapinero y Galerías (Espacio 4D en resina artística y moldes con 8.937 seguidores), el Centro / San Victorino (Químicos El Alquimista en materias primas de aseo a granel), Av. Américas (Comercial Colombia 360 en ceras de molde con 82.500 seguidores), y tiendas especializadas como Sirios Resina Epóxica, IMDECO (2.830 seguidores) y Aike Store. Alquimia Chemicals LF cuenta con su punto físico estratégico en el Barrio 7 de Agosto, Bogotá (con parqueo y despacho exprés de bultos y galones), catálogo híbrido (resinas gemelos 1:1, caucho de silicona RTV, percarbonato de sodio, ácido cítrico y ceras) y cuentas oficiales activas (@alquimiachemicals en IG con 40 seguidores, @alquimialf en TikTok con 9.338 seguidores y 21.8K me gusta, y Facebook). El desafío estratégico inmediato de Alquimia LF es activar pauta pagada en Meta Ads (Instagram Reels y Facebook) con botón directo a WhatsApp 311 666 9223 para captar la alta demanda que hoy absorben competidores como Espacio 4D e IMDECO.',
    keyFindings: [
      'Espacio 4D e IMDECO lideran la cuota de atención pagada en Meta Ads para kits de resina epóxica y cursos en Bogotá, con presupuestos mensuales estimados entre $2.5M y $5.5M COP.',
      'Alquimia Chemicals LF tiene una ventaja territorial decisiva en el Barrio 7 de Agosto: facilidad de acceso, parqueo frente al local y entrega inmediata de cuñetes y bultos, evitando la congestión de San Victorino.',
      'Sirios Resina Epóxica y Tienda Químicos compiten en resinas epóxicas con filtro UV y pigmentos, nicho donde Alquimia puede competir con su Resina Gemelos 1:1 a precio directo de distribuidor.',
      'Comercial Colombia 360 domina la categoría de ceras de velas en redes sociales (82,5 mil seguidores en IG), categoría donde Alquimia Chemicals ofrece importación directa de cera de soya y parafina al por mayor.',
      'El percarbonato de sodio y el ácido cítrico son insumos con alto interés comercial y bajo costo por lead en Colombia, ideales para pauta de entrada.'
    ],
    shareOfVoiceRanking: [
      { name: 'Espacio 4D Colombia', sovPercent: 24, adStatus: 'Líder en Instagram (8.9k seg) y pauta activa en kits de moldes y resina' },
      { name: 'IMDECO S.A.S', sovPercent: 22, adStatus: 'Alta intensidad en Meta Ads (2.8k seg en IG, porcelanato líquido y cursos)' },
      { name: 'Sirios Resina Epóxica', sovPercent: 20, adStatus: 'Fuerte pauta en resina americana con filtro UV' },
      { name: 'Comercial Colombia 360', sovPercent: 19, adStatus: 'Comunidad líder en velas y ceras de molde (82.5k seg en IG)' },
      { name: 'Alquimia Chemicals LF (Nuestra Empresa)', sovPercent: 18, adStatus: 'Punto físico 7 de Agosto / Insumos de resina, siliconas RTV y aseo' },
      { name: 'Químicos El Alquimista', sovPercent: 17, adStatus: 'San Victorino / Percarbonato, ácido cítrico y materias primas' },
      { name: 'Aike Store Colombia', sovPercent: 12, adStatus: 'Especialistas en silicona para moldes RTV (4.1k seg)' },
      { name: 'Tienda Químicos LTDA', sovPercent: 8, adStatus: 'Importadores desde 1987 / Resinas epóxicas (160 seg en IG)' }
    ],
    actionPlanForAlquimia: [
      {
        priority: 'P1 - Inmediato (15 días)',
        initiative: 'Activar campañas en Meta Ads con videos demostrativos: "Resina Gemelos 1:1 Sin Amarilleo" y "Silicona RTV para Moldes de Alta Precisión" con botón a WhatsApp 311 666 9223',
        targetCompetitor: 'Espacio 4D & Sirios Resina Epóxica',
        kpiTarget: 'CPL < $8.000 COP / Generar más de 70 conversaciones comerciales semanales'
      },
      {
        priority: 'P2 - Corto Plazo (30 días)',
        initiative: 'Campaña geolocalizada en Bogotá: "Compra tus químicos de aseo (percarbonato, ácido cítrico) y resinas en el Barrio 7 de Agosto con parqueo y entrega en 24h"',
        targetCompetitor: 'Químicos El Alquimista (San Victorino)',
        kpiTarget: 'Aumentar visitas a tienda física del 7 de Agosto en 40%'
      },
      {
        priority: 'P3 - Mediano Plazo (60 días)',
        initiative: 'Lanzamiento de kit combinado "Resina Gemelos 1:1 + Caucho de Silicona RTV" por galón para talleres con asesoría técnica directa',
        targetCompetitor: 'Espacio 4D & IMDECO',
        kpiTarget: 'Capturar el 20% del volumen de talleres de joyería, artesanías y moldes'
      }
    ],
    dataReliabilityDisclaimer:
      'Clasificación de fiabilidad: Métricas de seguidores de Instagram (@alquimiachemicals: 40), TikTok (@alquimialf: 9.338 con 21.8K likes) y Facebook (73) son 100% Verificadas según capturas oficiales. Inversión estimada en Meta Ads modelada según CPM promedio Colombia ($8.500 COP).'
  });

  if (!isOpen) return null;

  const handleRegenerateWithAI = async () => {
    setIsGenerating(true);
    try {
      const summaryPayload = competitors.map((c) => ({
        name: c.name,
        city: c.city,
        sov: c.shareOfVoicePercent,
        threat: c.threatLevel,
        activeAds: c.adCampaigns.length,
        followers: c.socialChannels.reduce((sum, ch) => sum + ch.followers, 0),
        weaknesses: c.weaknesses,
      }));

      const res = await fetch('/api/gemini/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorsSummary: summaryPayload,
          dateRange: 'Últimos 30 días - Mercado Químico Colombia',
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setReport(data.data);
      }
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        {/* Top Control Bar (hidden when printing) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Generador de Informe Ejecutivo C-Level</h2>
              <span className="text-xs text-slate-400">Para Dirección General y Comercial de Alquimia LF</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerateWithAI}
              disabled={isGenerating}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-60 cursor-pointer"
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>{isGenerating ? 'Generando con IA...' : 'Actualizar con IA'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Exportar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6 print:space-y-4">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b-2 border-slate-700 print:border-black">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 print:text-blue-700 font-bold">
                Documento de Inteligencia Competitiva B2B
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white print:text-black tracking-tight mt-1">
                {report.reportTitle}
              </h1>
              <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                Alquimia LF • Análisis de Insumos Químicos, Resinas y Pauta en Colombia
              </p>
            </div>
            <div className="text-right text-xs font-mono text-slate-400 print:text-gray-600 shrink-0">
              <div>Fecha: <strong className="text-white print:text-black">{report.generatedDate}</strong></div>
              <div>Confidencialidad: <strong className="text-amber-400 print:text-black">Uso Interno Directivo</strong></div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 font-bold mb-2">
              1. Resumen Ejecutivo de Mercado
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/60 print:bg-gray-50 border border-slate-800 print:border-gray-300 text-xs text-slate-200 print:text-gray-800 leading-relaxed font-sans">
              {report.executiveSummary}
            </div>
          </div>

          {/* Section 2: Key Findings */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 font-bold mb-2">
              2. Hallazgos Críticos de Pauta y Redes Observados
            </h3>
            <div className="space-y-2 text-xs">
              {report.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-850/70 print:bg-white border border-slate-800 print:border-gray-200 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 print:text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 print:text-gray-800 leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Share of Voice Breakdown */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 font-bold mb-2">
              3. Ranking y Gráfica de Cuota de Voz Digital (Share of Voice Colombia)
            </h3>

            {/* Visual comparison bars */}
            <div className="space-y-2 mb-4 p-3.5 rounded-xl bg-slate-950/70 print:bg-gray-50 border border-slate-800 print:border-gray-300">
              {report.shareOfVoiceRanking.map((row, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={row.name.includes('Alquimia') ? 'text-cyan-300 print:text-blue-800 font-bold' : 'text-slate-300 print:text-gray-800'}>
                      {row.name}
                    </span>
                    <span className="font-mono font-bold text-white print:text-black">{row.sovPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 print:bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        row.name.includes('Alquimia')
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-cyan-400/50'
                          : 'bg-slate-600 print:bg-gray-500'
                      }`}
                      style={{ width: `${(row.sovPercent / 24) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 print:border-gray-300">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 print:bg-gray-100 text-slate-400 print:text-gray-700 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Empresa</th>
                    <th className="py-2.5 px-3">Cuota de Voz Est.</th>
                    <th className="py-2.5 px-3">Estrategia de Pauta Observada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-200">
                  {report.shareOfVoiceRanking.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        row.name.includes('Alquimia')
                          ? 'bg-cyan-950/30 print:bg-blue-50 font-semibold'
                          : ''
                      }
                    >
                      <td className="py-2.5 px-3 text-white print:text-black font-medium">
                        {row.name}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-cyan-400 print:text-blue-700 font-bold">
                        {row.sovPercent}%
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 print:text-gray-700">
                        {row.adStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Action Plan for Alquimia LF */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 font-bold mb-2">
              4. Plan de Acción Táctico Inmediato para Alquimia LF
            </h3>
            <div className="space-y-3">
              {report.actionPlanForAlquimia.map((plan, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-amber-400 print:text-amber-700 font-bold text-[11px]">
                      {plan.priority}
                    </span>
                    <span className="text-[11px] text-slate-400 print:text-gray-600">
                      Rival Objetivo: <strong>{plan.targetCompetitor}</strong>
                    </span>
                  </div>
                  <h4 className="font-bold text-white print:text-black text-sm">
                    {plan.initiative}
                  </h4>
                  <div className="pt-1 text-emerald-400 print:text-emerald-800 font-mono text-[11px]">
                    🎯 Meta / KPI: {plan.kpiTarget}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer / Data quality stamp */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 print:border-gray-300 text-[11px] text-slate-400 print:text-gray-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>{report.dataReliabilityDisclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
