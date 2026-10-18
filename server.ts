import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// 1. Live Competitor & Market Analysis via Gemini
app.post('/api/gemini/analyze-competitor', async (req, res) => {
  try {
    const { competitorName, website, focusArea, currentData } = req.body;

    const prompt = `Actúa como un Director Senior de Inteligencia de Mercado B2B y Estrategia Digital especializado en el sector químico e industrial en Colombia (resinas epóxicas, poliéster, fibra de vidrio, desmoldantes, solventes y recubrimientos).
Estamos analizando a la empresa competidora: "${competitorName}" (Web: ${website || 'N/A'}).
Contexto de Alquimia LF: Alquimia LF es un distribuidor y fabricante especializado en Colombia que ofrece resinas de ingeniería, siliconas, fibra de vidrio y soluciones químicas con alto soporte técnico y agilidad de entrega.

Área de enfoque solicitada: "${focusArea || 'Auditoría integral 360'}".
Datos observados preliminares: ${JSON.stringify(currentData || {})}.

Por favor genera un análisis exhaustivo y estructurado en formato JSON con la siguiente estructura exacta:
{
  "summary": "Resumen ejecutivo conciso de su huella digital y posicionamiento comercial en Colombia",
  "digitalFootprint": {
    "primaryChannels": ["Instagram", "Facebook", "TikTok", "LinkedIn", "Google Ads"],
    "toneAnalysis": "Descripción detallada del tono (ej. Técnico formal, DIY artesanal, precio/descuento, etc.)",
    "targetAudience": "A quién le hablan principalmente (artesanos, contratistas de pisos, astilleros, industria metalmecánica, público general)",
    "estimatedMonthlyAdSpendRangeCOP": "Rango estimado en millones de COP (ej. $1.5M - $3.8M)",
    "postingFrequency": "Frecuencia observable (ej. 4-6 posts/semana)"
  },
  "observedStrengths": [
    "Fortaleza 1",
    "Fortaleza 2",
    "Fortaleza 3"
  ],
  "observedWeaknesses": [
    "Vulnerabilidad o brecha 1 (ej. falta de fichas técnicas en pauta)",
    "Vulnerabilidad 2 (ej. poca presencia en TikTok/LinkedIn B2B)",
    "Vulnerabilidad 3"
  ],
  "creativeAdAngle": {
    "topAngle": "El ángulo publicitario más explotado por ellos",
    "hookHeadline": "Ejemplo de titular de anuncio típico",
    "cta": "Llamado a la acción predominante (ej. WhatsApp directo, catálogo PDF, compra web)"
  },
  "alquimiaOpportunities": [
    {
      "opportunity": "Oportunidad táctica clara para Alquimia LF",
      "action": "Acción inmediata recomendada (ej. pautar con comparativa de resistencia térmica)",
      "expectedImpact": "Alto / Medio"
    },
    {
      "opportunity": "Segunda oportunidad",
      "action": "Acción recomendada",
      "expectedImpact": "Alto / Medio"
    }
  ],
  "dataConfidenceLevel": "high" // or "medium"
}

Responde ÚNICAMENTE con el bloque JSON válido, sin delimitadores adicionales innecesarios ni texto explicativo antes o después.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in analyze-competitor:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error al procesar el análisis de competencia',
    });
  }
});

// 2. Media & PR Scanner
app.post('/api/gemini/scan-media', async (req, res) => {
  try {
    const { sector = 'Sector químico y resinas industriales en Colombia', entities = [] } = req.body;

    const prompt = `Actúa como un Analista de Prensa y RRPP Industrial en Colombia.
Analiza el ecosistema de medios, prensa de negocios (Portafolio, La República, Dinero), revistas especializadas (Revista Acoplásticos, Revista IAlimentos, Metalmecánica, El Químico) y portales gremiales (ANDI, Fenalco) en relación con las siguientes empresas:
${entities.join(', ')} y el sector general de resinas epóxicas, materiales compuestos y solventes.

Genera una lista de 4 a 6 menciones y noticias relevantes observadas o tendencias de relaciones públicas industriales en formato JSON:
{
  "industryPulse": "Breve párrafo sobre el clima mediático y regulatorio (ej. materias primas, aranceles, sostenibilidad, certificaciones RETIE/FDA en resinas)",
  "articles": [
    {
      "id": "med-1",
      "title": "Titular de la noticia o mención",
      "outlet": "Medio (ej. La República, Revista Acoplásticos, Portafolio, Portal B2B)",
      "date": "Fecha reciente (ej. Feb 2025 o 2026)",
      "snippet": "Resumen corto de 2 líneas sobre qué trata la mención y a qué competidor o mercado impacta",
      "relevance": "Alta / Media",
      "sentiment": "Positivo / Neutral / Desafío",
      "verifiedStatus": "verificado" // "verificado" o "estimado"
    }
  ]
}

Responde ÚNICAMENTE con el bloque JSON válido.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in scan-media:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error al escanear noticias de prensa',
    });
  }
});

// 3. Automated Executive Intelligence Report for Alquimia LF
app.post('/api/gemini/generate-report', async (req, res) => {
  try {
    const { competitorsSummary, dateRange = 'Últimos 30 días' } = req.body;

    const prompt = `Genera un INFORME EJECUTIVO DE INTELIGENCIA COMPETITIVA Y PAUTA PUBLICITARIA para el Comité Directivo de Alquimia Chemicals LF (Bogotá, Colombia - Sede Barrio 7 de Agosto).
Periodo analizado: ${dateRange}.
Competidores reales en radar: SC Químicos S.A.S. (Calle 13), Químicos El Alquimista (San Victorino), Tienda Químicos LTDA, Espacio 4D Colombia (Chapinero), Comercial Colombia 360 (Av. Américas), Sumiglas S.A.S. (Samper Mendoza).
Datos consolidados: ${JSON.stringify(competitorsSummary || {})}.

El informe debe ser de calibre C-Level (Gerencia General, Dirección Comercial y Marketing) y estructurado en JSON con las siguientes claves:
{
  "reportTitle": "Informe de Inteligencia Competitiva Digital & Pauta - Alquimia Chemicals LF",
  "generatedDate": "14 de Octubre de 2026",
  "executiveSummary": "Visión global estratégica de 3-4 párrafos que destaque la presión publicitaria en Meta/Google, la batalla de tiendas de materias primas en San Victorino vs Barrio 7 de Agosto, el éxito viral de Alquimia en TikTok y cómo Alquimia LF debe activar pauta en Instagram/Facebook para dominar el mercado.",
  "keyFindings": [
    "Hallazgo clave sobre pauta en Meta y Google Ads de SC Químicos y Químicos El Alquimista",
    "Hallazgo clave sobre la viralidad de Alquimia en TikTok (565k vistas en percarbonato) vs Instagram en crecimiento",
    "Hallazgo clave sobre insumos para velas y moldes de silicona",
    "Hallazgo clave sobre ventaja de ubicación física en el 7 de Agosto vs Centro"
  ],
  "shareOfVoiceRanking": [
    {"name": "SC Químicos S.A.S.", "sovPercent": 24, "adStatus": "Alta intensidad en Meta Ads (velas y resina)"},
    {"name": "Químicos El Alquimista", "sovPercent": 21, "adStatus": "Líder en San Victorino con catálogo de 600 insumos"},
    {"name": "Tienda Químicos LTDA", "sovPercent": 20, "adStatus": "Líder en volumen de resina epóxica (TikTok y Meta)"},
    {"name": "Alquimia Chemicals LF (Nuestra Empresa)", "sovPercent": 17, "adStatus": "Líder viral en TikTok (@alquimialf) / Tienda física 7 de Agosto"},
    {"name": "Espacio 4D Colombia", "sovPercent": 12, "adStatus": "Fuerte en Chapinero/Galerías con resinas y cursos"},
    {"name": "Comercial Colombia 360", "sovPercent": 9, "adStatus": "Especialistas en ceras y moldes en Av. Américas"},
    {"name": "Sumiglas S.A.S.", "sovPercent": 7, "adStatus": "Tradición en cauchos de silicona en Samper Mendoza"}
  ],
  "actionPlanForAlquimia": [
    {
      "priority": "P1 - Inmediato",
      "initiative": "Lanzamiento de campaña en Meta Ads con videos de TikTok de Percarbonato y Moldes de Silicona al WhatsApp 311 666 9223",
      "targetCompetitor": "SC Químicos & Químicos El Alquimista",
      "kpiTarget": "CPL < $8.500 COP a WhatsApp"
    },
    {
      "priority": "P2 - Corto Plazo",
      "initiative": "Captura de palabras clave de alta intención en Google Search ('resina epóxica por mayor Bogotá', 'resina poliéster Barranquilla')",
      "targetCompetitor": "SMC Colombia & INSAPOL",
      "kpiTarget": "Tasa de conversión web a cotización > 8.5%"
    },
    {
      "priority": "P3 - Mediano Plazo",
      "initiative": "Serie de micro-videos técnicos en TikTok y Reels 'Errores comunes al catalizar resinas' demostrando superioridad técnica",
      "targetCompetitor": "Todos",
      "kpiTarget": "150.000 reproducciones orgánicas + retargeting a instaladores"
    }
  ],
  "dataReliabilityDisclaimer": "Clasificación de confiabilidad: Métricas de seguidores y biblioteca de anuncios son 100% Verificadas. Inversión publicitaria e impresiones son Estimaciones con modelo de atribución B2B Colombia."
}

Responde ÚNICAMENTE con el bloque JSON válido.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in generate-report:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error al generar el informe ejecutivo',
    });
  }
});

// 4. Tactical Counter-Ad Generator
app.post('/api/gemini/counter-ad', async (req, res) => {
  try {
    const { competitorAd, competitorName, productCategory } = req.body;

    const prompt = `Como estratega de Paid Media B2B para Alquimia LF en Colombia, diseña 2 contra-propuestas publicitarias para neutralizar el siguiente anuncio observado de la competencia:
Competidor: ${competitorName}
Producto: ${productCategory}
Anuncio de la competencia observado: "${competitorAd?.headline || ''} - ${competitorAd?.copy || ''}"

Genera una contra-estrategia en JSON:
{
  "competitorFlaw": "Qué debilidad o punto ciego tiene el anuncio de la competencia",
  "alquimiaValueProposition": "Qué ventaja real puede ofrecer Alquimia LF (ej. asesoría de químico en planta, lote certificado, precio directo, despacho 24h)",
  "counterAds": [
    {
      "format": "Reel / Video corto 15s",
      "headline": "Titular de alto impacto",
      "primaryText": "Texto persuasivo para el copy de pauta en Meta/TikTok",
      "visualConcept": "Guión visual o mockup recomendado",
      "callToAction": "Contactar por WhatsApp / Descargar Ficha Técnica",
      "projectedAngle": "Educativo / Calidad industrial"
    },
    {
      "format": "Carrusel técnico o Google Search Ad",
      "headline": "Titular alternativo",
      "primaryText": "Texto persuasivo alternativo",
      "visualConcept": "Concepto visual",
      "callToAction": "Cotizar con Asesor Químico",
      "projectedAngle": "Garantía y entrega rápida"
    }
  ]
}

Responde ÚNICAMENTE con el bloque JSON válido.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in counter-ad:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error al generar contra-campaña',
    });
  }
});

// Vite middleware in dev or static files in prod
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(import.meta.dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(import.meta.dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (isProd: ${isProd})`);
  });
}

startServer();
