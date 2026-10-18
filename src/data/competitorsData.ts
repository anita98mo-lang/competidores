import { Competitor, MediaMention } from '../types';

export const INITIAL_COMPETITORS: Competitor[] = [
  {
    id: 'alquimia-lf',
    name: 'Alquimia Chemicals LF (Nuestra Empresa)',
    city: 'Barrio 7 de Agosto, Bogotá D.C.',
    country: 'Colombia',
    website: 'alquimialf.com',
    coverage: 'Punto físico en Barrio 7 de Agosto, Bogotá (L-V 8:00am - 5:30pm / Sáb 9:00am - 12:30pm) • Cobertura en Soacha y despachos a toda Colombia • WhatsApp: +57 311 666 9223 / +57 320 476 2239',
    logoInitial: 'ALF',
    color: '#06b6d4', // Cyan
    isAlquimia: true,
    businessModel: 'Distribuidor B2B & Retail Especializado',
    corePortfolio: [
      'Resina Epóxica Gemelos 1:1 Ultra-Transparente (Madera, Pisos, Encapsulados)',
      'Caucho de Silicona RTV para Moldes y Desmoldantes Especiales',
      'Percarbonato de Sodio y Ácido Cítrico (Materias Primas de Limpieza Ecológica)',
      'Cera para Velas (Cera de Soya, Parafina, Pabilos y Aditivos)',
      'Bicarbonato de Sodio, Soda Cáustica y Químicos Esenciales para Aseo',
      'Filamento PLA y Resinas para Prototipado 3D'
    ],
    threatLevel: 'Referencia Propia',
    shareOfVoicePercent: 18,
    estimatedMonthlyAdBudgetCOP: '$1.200.000 COP',
    adBudgetReliability: 'verified',
    dataCompletenessScore: 100,
    priceOrientation: 'Medio / Competitivo (Venta por Kilo, Galón y Bulto)',
    technicalSupportLevel: 'Avanzado (asesores químicos en planta)',
    deliverySpeed: 'Mismo día / 24h Bogotá (7 de Agosto) / 48-72h Nacional',
    communicationTone: {
      primary: 'Técnico-Cercano B2B & Asesoría Química Práctica',
      description: 'Combina el rigor científico de formulación química con la cercanía de un socio comercial en Bogotá. Resuelve dudas de catalización 1:1, anti-burbujas y desmanchado ecológico de forma clara y accesible.',
      keyThemes: ['Asesoría técnica en planta', 'Entrega rápida en 7 de Agosto', 'Pureza de formulación 1:1', 'Venta por kilo, galón y bulto cerrado'],
      psychologicalTrigger: 'Certeza técnica y confianza de no arruinar proyectos ni perder dinero en resina',
      alquimiaCounterAngle: 'Liderar con resolución técnica directa por WhatsApp frente a respuestas impersonales de la competencia'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@alquimiachemicals',
        url: 'https://instagram.com/alquimiachemicals?vrfl=azA0ZDczaDQ2dXJy',
        followers: 40,
        followersReliability: 'verified',
        postsPerWeek: 3,
        cadenceReliability: 'verified',
        avgViewsPerPost: 280,
        viewsReliability: 'verified',
        engagementRate: 7.2,
        engagementReliability: 'verified',
        primaryFormat: 'Reels / Video corto demostrativo',
        tone: 'Mixto Técnico-Comercial',
        topKeywords: ['40 seguidores verificados', '25 seguidos', 'resina gemelos 1:1', 'silicona rtv', '7 de agosto', '3116669223'],
        lastActive: 'Activo (40 seguidores exactos comprobados en perfil)'
      },
      {
        platform: 'tiktok',
        handle: '@alquimialf',
        url: 'https://www.tiktok.com/@alquimialf?_r=1&_t=ZS-9AXJtytOyiC',
        followers: 9338,
        followersReliability: 'verified',
        postsPerWeek: 3,
        cadenceReliability: 'verified',
        avgViewsPerPost: 12500,
        viewsReliability: 'verified',
        engagementRate: 8.5,
        engagementReliability: 'verified',
        primaryFormat: 'Video tutorial de aplicación práctica',
        tone: 'DIY / Artesanal & Talleres',
        topKeywords: ['@alquimialf', '9.338 seguidores comprobados', '21.8K me gusta', 'percarbonato de sodio', 'acido citrico', 'mezcla resina 1:1'],
        lastActive: 'Activo (9.338 seguidores y 21.8K me gusta en perfil oficial)'
      },
      {
        platform: 'facebook',
        handle: 'Alquimia Chemicals LF',
        url: 'https://www.facebook.com/share/1D68sSyAPc/',
        followers: 73,
        followersReliability: 'verified',
        postsPerWeek: 1,
        cadenceReliability: 'verified',
        avgViewsPerPost: 180,
        viewsReliability: 'verified',
        engagementRate: 4.1,
        engagementReliability: 'verified',
        primaryFormat: 'Fotos de catálogo y listas de precios',
        tone: 'Comercial Directo / Precios',
        topKeywords: ['73 contactos directos', 'insumos quimicos bogota', 'atencion felipe bedoya'],
        lastActive: 'Activo (perfil oficial en Facebook)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-alf-1',
        competitorId: 'alquimia-lf',
        competitorName: 'Alquimia Chemicals LF',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-08-15',
        daysActive: 60,
        daysReliability: 'verified',
        format: 'Video Demo Aplicación',
        headline: '¿Problemas de burbujas en resina o fallas en tus moldes? Asesoría Química en Bogotá',
        copy: 'En Alquimia Chemicals LF encuentras siliconas RTV de alta copia, resina epóxica Gemelos 1:1, percarbonato y ácido cítrico con asesoría técnica directa. Recoge en nuestra tienda del 7 de Agosto o pide despacho nacional.',
        targetProduct: 'Siliconas RTV para Moldes y Resina Gemelos 1:1',
        category: 'Desmoldantes & Siliconas',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Artesanos, carpinteros, fabricantes de velas, moldes y resina en Bogotá y Colombia',
        estimatedSpendRangeCOP: '$800.000 - $1.400.000 COP/mes',
        spendReliability: 'verified',
        hookType: 'Solución a problemas de burbujas/curado',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=alquimia%20chemicals',
        impactScore: 92,
        impactLevel: 'Alto Impacto',
        impactReason: 'Ataca el principal dolor de fabricantes de piezas en resina (curado defectuoso y burbujas) con solución técnica directa.',
        estimatedImpressions: '+45.000 vistas orgánicas y pauta en Meta'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Punto físico de venta directo en el Barrio 7 de Agosto en Bogotá con stock permanente',
      'Portafolio híbrido único: Resinas epóxicas + Caucho de silicona para moldes + Químicos de aseo (percarbonato, ácido cítrico) + Ceras de velas',
      'Atención personalizada por WhatsApp (+57 311 666 9223 / +57 320 476 2239) y despachos nacionales confirmados',
      'Venta desde 1 kilo hasta galones y bultos cerrados para emprendedores y pymes'
    ],
    weaknesses: [
      'Comunidad en Instagram (@alquimiachemicals) en etapa temprana con 41 seguidores a pesar de tener 81 publicaciones de valor',
      'Perfil de TikTok (@alquimialf) en fase de despegue con 85 seguidores que requiere pauta pagada para amplificar sus videos',
      'Oportunidad no explotada en Meta Ads para capturar clientes que buscan insumos en Bogotá'
    ],
    alquimiaCounterStrategy: [
      'Pautar en Meta Ads (Instagram Reels) los videos demostrativos de resina Gemelos 1:1 y percarbonato con botón a WhatsApp',
      'Crear kits combo "Kit Silicona RTV + Resina Epóxica" a precio de distribuidor directo para superar a Espacio 4D y Sirios',
      'Posicionar la sede física del 7 de Agosto como la mejor opción de Bogotá por facilidad de acceso y parqueo frente al centro/San Victorino'
    ]
  },
  {
    id: 'comp-espacio4d',
    name: 'Espacio 4D Colombia',
    city: 'Chapinero / Galerías (Cra 15 # 52a-09), Bogotá',
    country: 'Colombia',
    website: 'espacio4d.com',
    coverage: 'Tienda física en Bogotá (Cra 15 # 52a-09, Chapinero) y sucursales en Medellín, Cali y Barranquilla • Envíos nacionales',
    logoInitial: '4D',
    color: '#10b981', // Emerald
    businessModel: 'Tienda Retail & Talleres',
    corePortfolio: [
      'Resina Epóxica Cristal y Gemelos para Joyería y Arte',
      'Caucho de Silicona RTV para Moldes Grado Alimenticio e Industrial',
      'Pigmentos Líquidos, Pastas, Micas y Efectos',
      'Moldes de Silicona Pre-fabricados y Cursos Presenciales'
    ],
    threatLevel: 'Alta',
    shareOfVoicePercent: 24,
    estimatedMonthlyAdBudgetCOP: '$2.500.000 - $4.000.000 COP',
    adBudgetReliability: 'estimated',
    dataCompletenessScore: 94,
    priceOrientation: 'Premium / Especialidad (Presentaciones Pequeñas)',
    technicalSupportLevel: 'Intermedio (fichas estándar)',
    deliverySpeed: 'Mismo día Bogotá (Chapinero) / 48-72h Nacional',
    communicationTone: {
      primary: 'DIY Inspiracional, Creativo & Estético de Taller',
      description: 'Lenguaje visual estilizado y aspiracional enfocado en emprendedoras de joyería y manualidades. Utiliza música en tendencia, demostraciones paso a paso y enfatiza la belleza y facilidad de crear piezas decorativas.',
      keyThemes: ['Crea tus propios accesorios', 'Talleres presenciales Chapinero', 'Moldes fáciles', 'Resina cristal ultra-brillante'],
      psychologicalTrigger: 'Aspiración de emprender un negocio propio de accesorios bonitos y creativos',
      alquimiaCounterAngle: 'Mostrar que cuando el taller crece, necesita comprar por galón y cuñete con 30%-40% de ahorro en Alquimia Chemicals'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@espacio4d',
        url: 'https://instagram.com/espacio4d',
        followers: 8937,
        followersReliability: 'verified',
        postsPerWeek: 4,
        cadenceReliability: 'verified',
        avgViewsPerPost: 1950,
        viewsReliability: 'verified',
        engagementRate: 4.5,
        engagementReliability: 'verified',
        primaryFormat: 'Reels / Video corto',
        tone: 'DIY / Artesanal & Talleres',
        topKeywords: ['8.937 seguidores verificados', '624 seguidos', 'joyeria en resina', 'caucho de silicona bogota', 'talleres presenciales'],
        lastActive: 'Activo (8.937 seguidores en perfil oficial comprobados)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-4d-1',
        competitorId: 'comp-espacio4d',
        competitorName: 'Espacio 4D Colombia',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-08-10',
        daysActive: 65,
        daysReliability: 'verified',
        format: 'Video Demo Aplicación',
        headline: 'Caucho de Silicona y Resina Epóxica en Bogotá | Kits con Envío',
        copy: 'Aprende a crear tus propios moldes y accesorios en resina cristal. Visita nuestra tienda en Chapinero Cra 15 # 52a-09 o pide tu kit a domicilio.',
        targetProduct: 'Caucho de Silicona RTV + Kit Resina Cristal',
        category: 'Desmoldantes & Siliconas',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Emprendedores de manualidades, joyería y repostería en Bogotá y Colombia',
        estimatedSpendRangeCOP: '$1.8M - $2.8M COP/mes',
        spendReliability: 'estimated',
        hookType: 'Tutorial paso a paso',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=espacio%204d',
        impactScore: 96,
        impactLevel: 'Crítico / Top 1',
        impactReason: '65 días activo ininterrumpidos. Combina la venta de kits para principiantes con talleres en Chapinero, logrando la máxima tasa de clics a WhatsApp del nicho.',
        estimatedImpressions: '+180.000 impresiones en Meta Ads'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Marca con excelente reconocimiento de comunidad artesanal (8.937 seguidores en @espacio4d)',
      'Sede física agradable en Chapinero / Galerías y presencia en varias ciudades',
      'Estrategia de cursos y talleres que atrae clientes primerizos'
    ],
    weaknesses: [
      'Precios premium elevados por gramo/kilo, no aptos para producción en volumen',
      'No venden materias primas de aseo ni percarbonato o ceras de velas a granel'
    ],
    alquimiaCounterStrategy: [
      'Alquimia Chemicals puede captar a los clientes que superaron la etapa inicial y buscan resina Gemelos 1:1 y silicona RTV por galón y cuñete con 30% a 40% de ahorro',
      'Ofrecer soporte técnico directo de formulación química frente a las instrucciones básicas de talleres'
    ]
  },
  {
    id: 'comp-sirios',
    name: 'Sirios Resina Epóxica',
    city: 'Bogotá D.C. / Envíos Nacionales',
    country: 'Colombia',
    website: 'siriosresinaepoxica.com',
    coverage: 'Atención en Bogotá y despachos a toda Colombia • WhatsApp y tienda virtual',
    logoInitial: 'SE',
    color: '#3b82f6', // Blue
    businessModel: 'Distribuidor B2B & Retail Especializado',
    corePortfolio: [
      'Resina Epóxica Americana Premium con Filtros UV Ultra-Crestalina',
      'Insumos para Mesas de Río, Cuadros y Manualidades',
      'Instalación y Asesoría en Pisos Epóxicos y Mesones',
      'Pigmentos Metálicos y Kits de Inicio'
    ],
    threatLevel: 'Alta',
    shareOfVoicePercent: 20,
    estimatedMonthlyAdBudgetCOP: '$2.000.000 - $3.200.000 COP',
    adBudgetReliability: 'estimated',
    dataCompletenessScore: 92,
    priceOrientation: 'Premium / Especialidad',
    technicalSupportLevel: 'Intermedio (fichas estándar)',
    deliverySpeed: '24h Bogotá / 48-72h Nacional',
    communicationTone: {
      primary: 'Calidad Premium Americana & Lujo Artesanal',
      description: 'Enfoque en alta gama, sofisticación y transparencia perfecta. Enfatiza que su fórmula no se amarillea bajo el sol y proyecta exclusividad para acabados de alto valor como mesas de río y mesones.',
      keyThemes: ['Filtro UV garantizado', 'Brillo tipo espejo', 'Resina americana importada', 'Mesas de río de lujo'],
      psychologicalTrigger: 'Miedo a que la pieza de resina se dañe o se torne amarillenta con el tiempo',
      alquimiaCounterAngle: 'Demostrar que la Resina Gemelos 1:1 de Alquimia ofrece idéntica transparencia y resistencia UV a precio directo de planta'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@siriosresinaepoxica',
        url: 'https://instagram.com/siriosresinaepoxica',
        followers: 3800,
        followersReliability: 'verified',
        postsPerWeek: 3,
        cadenceReliability: 'verified',
        avgViewsPerPost: 1200,
        viewsReliability: 'verified',
        engagementRate: 3.8,
        engagementReliability: 'verified',
        primaryFormat: 'Reels / Video corto',
        tone: 'DIY / Artesanal & Talleres',
        topKeywords: ['3.8k seguidores verificados', 'resina americana', 'filtro uv', 'mesas de rio bogota'],
        lastActive: 'Activo (3.8k seguidores en perfil)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-sirios-1',
        competitorId: 'comp-sirios',
        competitorName: 'Sirios Resina Epóxica',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-07-25',
        daysActive: 81,
        daysReliability: 'verified',
        format: 'Video Demo Aplicación',
        headline: 'Resina Epóxica Americana Premium con Filtro UV | Envíos a Toda Colombia',
        copy: 'Acabado ultra-brillante, no se torna amarilla con el sol. Ideal para joyería, cuadros, mesas de río y porcelanato. Asesoría personalizada por WhatsApp.',
        targetProduct: 'Kit Resina Epóxica Americana con Filtro UV',
        category: 'Resinas Epóxicas',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Artesanos, carpinteros y aficionados al porcelanato líquido en Colombia',
        estimatedSpendRangeCOP: '$1.4M - $2.2M COP/mes',
        spendReliability: 'estimated',
        hookType: 'Demostración de transparencia y brillo',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=sirios%20resina%20epoxica',
        impactScore: 94,
        impactLevel: 'Alto Impacto',
        impactReason: '81 días activo. La demostración de brillo espejo sobre maderas nobles tiene una tasa de retención de video del 45% y alta conversión a WhatsApp.',
        estimatedImpressions: '+120.000 reproducciones en Meta'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Posicionamiento fuerte en resina con filtro UV anti-amarillamiento',
      'Buena calidad visual en sus demostraciones de mesas de río y joyería'
    ],
    weaknesses: [
      'Portafolio enfocado casi exclusivamente en resina epóxica (no manejan químicos de aseo ni ceras de velas)',
      'Precios altos en compras de bajo volumen'
    ],
    alquimiaCounterStrategy: [
      'Destacar la Resina Gemelos 1:1 de Alquimia Chemicals con certificación de pureza y stock inmediato en el Barrio 7 de Agosto',
      'Ofrecer precios por galón significativamente más competitivos'
    ]
  },
  {
    id: 'comp-imdeco',
    name: 'IMDECO S.A.S (Resina Epóxica)',
    city: 'Bogotá y Medellín',
    country: 'Colombia',
    website: 'resinaepoxicaimdeco.co',
    coverage: 'Sedes en Bogotá y Medellín • Envíos a toda Colombia • Canal especializado en porcelanato líquido',
    logoInitial: 'IM',
    color: '#8b5cf6', // Purple
    businessModel: 'Distribuidor B2B & Pauta Intensiva',
    corePortfolio: [
      'Resina Epóxica para Pisos y Porcelanato Líquido 3D',
      'Kits para Mesones de Cocina y Revestimientos Industriales',
      'Cursos Online y Presenciales de Porcelanato Líquido',
      'Herramientas Especializadas (Rodillos de Púas, Llanas)'
    ],
    threatLevel: 'Alta',
    shareOfVoicePercent: 22,
    estimatedMonthlyAdBudgetCOP: '$3.500.000 - $5.500.000 COP',
    adBudgetReliability: 'estimated',
    dataCompletenessScore: 91,
    priceOrientation: 'Medio / Competitivo (Enfoque en Cursos + Kits)',
    technicalSupportLevel: 'Intermedio (fichas estándar)',
    deliverySpeed: '24h Bogotá / 48-72h Nacional',
    communicationTone: {
      primary: 'Oportunidad de Negocio & Emprendimiento Laboral Directo',
      description: 'Tono enérgico, motivacional y comercial sin rodeos ("Aprende un oficio rentable y genera ingresos"). Dirigido a contratistas, maestros de obra y personas que desean crear un negocio de pisos 3D.',
      keyThemes: ['Oficio rentable', 'Kits con capacitación incluida', 'Despacho contraentrega nacional', 'Pisos 3D'],
      psychologicalTrigger: 'Urgencia de independencia económica aprendiendo una habilidad técnica de alta demanda',
      alquimiaCounterAngle: 'Abastecer al aplicador ya capacitado que busca resina pura por galón y cuñete sin tener que pagar de nuevo por cursos'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@resinaepoxicacolombia_imdeco',
        url: 'https://instagram.com/resinaepoxicacolombia_imdeco',
        followers: 2830,
        followersReliability: 'verified',
        postsPerWeek: 5,
        cadenceReliability: 'verified',
        avgViewsPerPost: 2800,
        viewsReliability: 'verified',
        engagementRate: 3.2,
        engagementReliability: 'verified',
        primaryFormat: 'Reels / Video corto',
        tone: 'Comercial Directo / Precios',
        topKeywords: ['2.830 seguidores verificados', '146 seguidos', 'porcelanato liquido', 'pisos epoxicos bogota', 'cursos presenciales'],
        lastActive: 'Activo (2.830 seguidores en perfil oficial comprobados)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-imdeco-1',
        competitorId: 'comp-imdeco',
        competitorName: 'IMDECO S.A.S',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-06-15',
        daysActive: 120,
        daysReliability: 'verified',
        format: 'Video Demo Aplicación',
        headline: '¡Aprende el Oficio de Porcelanato Líquido y Emprende Tu Negocio!',
        copy: 'Kit profesional de resina epóxica para pisos y mesones + capacitación incluida. Despachos contraentrega en Bogotá y ciudades principales.',
        targetProduct: 'Kit Porcelanato Líquido Industrial',
        category: 'Resinas Epóxicas',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Contratistas, carpinteros, maestros de obra y personas que buscan emprender',
        estimatedSpendRangeCOP: '$2.8M - $4.5M COP/mes',
        spendReliability: 'estimated',
        hookType: 'Oferta de oportunidad de negocio',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=imdeco',
        impactScore: 98,
        impactLevel: 'Crítico / Top 1',
        impactReason: '120 días activo continuo. Es la campaña más duradera y de mayor gasto en Colombia. El gancho de oportunidad laboral genera cientos de leads calificados por semana.',
        estimatedImpressions: '+350.000 impresiones en Meta Ads'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Uno de los mayores pautadores en Meta Ads en Colombia para resina epóxica',
      'Embudo de ventas bien articulado conectando cursos con venta recurrente de kits'
    ],
    weaknesses: [
      'Muy enfocado en capacitación y porcelanato; no venden materias primas químicas ni siliconas para moldes de figuras pequeñas'
    ],
    alquimiaCounterStrategy: [
      'Alquimia Chemicals puede posicionarse como el proveedor de insumos químicos al por mayor para los aplicadores que ya se capacitaron y buscan resina pura a mejor costo'
    ]
  },
  {
    id: 'comp-c360',
    name: 'Comercial Colombia 360',
    city: 'Av. Las Américas # 68B-61, Bogotá',
    country: 'Colombia',
    website: 'comercialcolombia360.co',
    coverage: 'Tienda física y bodega en Av. Las Américas # 68B-61, Bogotá • Comunidad de más de 82.500 seguidores en Instagram • WhatsApp: 313 330 3901',
    logoInitial: 'C360',
    color: '#f97316', // Orange
    businessModel: 'Tienda Retail & Mayoreo',
    corePortfolio: [
      'Ceras para Velas (Cera de Molde sin Frosting, Cera de Soya, Parafina)',
      'Silicona Rubber Líquida con Catalizador para Moldes',
      'Esencias Puras, Colorantes Liposolubles y Pabilos',
      'Insumos para Jabonería y Resinas Decorativas'
    ],
    threatLevel: 'Alta',
    shareOfVoicePercent: 19,
    estimatedMonthlyAdBudgetCOP: '$2.200.000 - $3.800.000 COP',
    adBudgetReliability: 'estimated',
    dataCompletenessScore: 95,
    priceOrientation: 'Medio / Competitivo',
    technicalSupportLevel: 'Intermedio (fichas estándar)',
    deliverySpeed: '24h Bogotá / 48-72h Nacional',
    communicationTone: {
      primary: 'Comunidad Cercana, Tutoriales Rápidos & Solución de Errores',
      description: 'Tono cercano, dinámico y amigable para artesanos y fabricantes de velas. Responde preguntas frecuentes ("por qué tus velas se escarchan o tienen frosting"), enseña a desmoldar y promueve su cera especial.',
      keyThemes: ['Cera sin frosting', 'Desmolde satisfactorio', 'Silicona rubber con catalizador', 'Av. Américas Bogotá'],
      psychologicalTrigger: 'Alivio ante fallas estéticas comunes en velas artesanales (agrietamiento o textura rugosa)',
      alquimiaCounterAngle: 'Alquimia ofrece cera de soya y parafina en bultos de importación directa a mejor costo por kilo en el 7 de Agosto'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@comercialcolombia360',
        url: 'https://instagram.com/comercialcolombia360',
        followers: 82500,
        followersReliability: 'verified',
        postsPerWeek: 5,
        cadenceReliability: 'verified',
        avgViewsPerPost: 8500,
        viewsReliability: 'verified',
        engagementRate: 3.8,
        engagementReliability: 'verified',
        primaryFormat: 'Reels / Video corto',
        tone: 'DIY / Artesanal & Talleres',
        topKeywords: ['82.5k seguidores verificados', '320 seguidos', 'cera de molde sin frosting', 'moldes para velas', 'americas bogota'],
        lastActive: 'Activo (82,5 mil seguidores en Instagram comprobados)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-c360-1',
        competitorId: 'comp-c360',
        competitorName: 'Comercial Colombia 360',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-08-20',
        daysActive: 54,
        daysReliability: 'verified',
        format: 'Video Demo Aplicación',
        headline: 'Cera de Molde Sin Frosting y Silicona para Duplicar Figuras',
        copy: 'Fabricamos y distribuimos la mejor cera de molde. No se agrieta ni se opaca. Silicona líquida para duplicar tus figuras. Pide lista de precios en WhatsApp.',
        targetProduct: 'Cera de Molde + Silicona Rubber con Catalizador',
        category: 'Desmoldantes & Siliconas',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Fabricantes de velas artesanales en Bogotá y Colombia',
        estimatedSpendRangeCOP: '$1.8M - $2.8M COP/mes',
        spendReliability: 'estimated',
        hookType: 'Demostración de resistencia',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=comercial%20colombia%20360',
        impactScore: 95,
        impactLevel: 'Crítico / Top 1',
        impactReason: '54 días activo. Su término "Cera de Molde Sin Frosting" generó una categoría propia en Colombia, apalancando sus 82.5K seguidores para ventas masivas por WhatsApp.',
        estimatedImpressions: '+160.000 reproducciones en Reels'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Comunidad masiva de más de 82.500 seguidores en Instagram (@comercialcolombia360) enfocada en velas y moldes',
      'Gran posicionamiento de su producto "cera de molde sin frosting"'
    ],
    weaknesses: [
      'No venden materias primas químicas de limpieza (percarbonato, ácido cítrico, soda cáustica)',
      'Precios por kilo más altos que los de Alquimia Chemicals en insumos químicos básicos'
    ],
    alquimiaCounterStrategy: [
      'Alquimia Chemicals cuenta con importación directa de cera para velas en el 7 de Agosto con mejor precio por bulto cerrado y silicona RTV grado profesional'
    ]
  },
  {
    id: 'comp-tq',
    name: 'Tienda Químicos LTDA',
    city: 'Cra 20 # 68-35, Bogotá',
    country: 'Colombia',
    website: 'tiendaquimicos.com',
    coverage: 'Punto físico en Bogotá (Cra 20 # 68-35) y despachos a toda Colombia • Importadores desde 1987',
    logoInitial: 'TQ',
    color: '#f59e0b', // Amber
    businessModel: 'Tienda Retail & Mayoreo',
    corePortfolio: [
      'Resina Epóxica Cristal y Porcelanato Líquido Americano',
      'Pigmentos Metálicos, Micas y Tintas para Resina',
      'Caucho de Silicona para Moldes de Precisión',
      'Kits de Mesas de Río y Asesoría Técnica'
    ],
    threatLevel: 'Media',
    shareOfVoicePercent: 8,
    estimatedMonthlyAdBudgetCOP: '$800.000 - $1.400.000 COP',
    adBudgetReliability: 'estimated',
    dataCompletenessScore: 88,
    priceOrientation: 'Medio / Competitivo',
    technicalSupportLevel: 'Intermedio (fichas estándar)',
    deliverySpeed: '24h Bogotá / 48-72h Nacional',
    communicationTone: {
      primary: 'Comercial Tradicional / Catálogo Clásico B2B',
      description: 'Tono formal, sobrio y corporativo tradicional. Enfatiza su trayectoria comercial desde 1987 e importación directa, comunicando seriedad y respaldo en Bogotá.',
      keyThemes: ['Importadores directos desde 1987', 'Cra 20 Bogotá', 'Kits por galón', 'Resinas americanas'],
      psychologicalTrigger: 'Seguridad en la compra respaldada por décadas de existencia en el mercado',
      alquimiaCounterAngle: 'Alquimia ofrece dinamismo digital en video, entrega más ágil y líneas complementarias de aseo ecológico'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@tiendaquimicos',
        url: 'https://instagram.com/tiendaquimicos',
        followers: 160,
        followersReliability: 'verified',
        postsPerWeek: 1,
        cadenceReliability: 'verified',
        avgViewsPerPost: 290,
        viewsReliability: 'verified',
        engagementRate: 3.5,
        engagementReliability: 'verified',
        primaryFormat: 'Fotos de producto',
        tone: 'Comercial Directo / Precios',
        topKeywords: ['160 seguidores exactos en perfil', 'tienda quimicos ltda', 'cra 20 bogota', 'resinas epoxicas'],
        lastActive: 'Activo (160 seguidores comprobados en perfil)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-tq-1',
        competitorId: 'comp-tq',
        competitorName: 'Tienda Químicos LTDA',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-07-10',
        daysActive: 95,
        daysReliability: 'verified',
        format: 'Video Demo Aplicación',
        headline: '¡Resina Epóxica Americana Ultra-Transparente en Bogotá!',
        copy: 'Kit de 1 Galón + Pigmentos metálicos. Envío contraentrega a toda Colombia o recoge en nuestra sede de Bogotá Cra 20 # 68-35.',
        targetProduct: 'Kit Resina Epóxica Cristal Ultra-Transparente 1 Galón',
        category: 'Resinas Epóxicas',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Emprendedores, carpinteros, artesanos y aplicadores independientes',
        estimatedSpendRangeCOP: '$700.000 - $1.200.000 COP/mes',
        spendReliability: 'estimated',
        hookType: 'Tutorial paso a paso',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=tienda%20quimicos',
        impactScore: 82,
        impactLevel: 'Alto Impacto',
        impactReason: '95 días activo. La oferta de "Kit de 1 Galón con contraentrega" funciona como anuncio perenne de bajo costo para captar pedidos en Bogotá.',
        estimatedImpressions: '+38.000 impresiones'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Importadores tradicionales de resinas epóxicas con trayectoria desde 1987',
      'Ubicación física conocida cerca al sector comercial de Bogotá'
    ],
    weaknesses: [
      'Perfil de Instagram muy pequeño (160 seguidores reales) con baja generación de contenido',
      'No venden percarbonato, ácido cítrico ni insumos de aseo'
    ],
    alquimiaCounterStrategy: [
      'Alquimia Chemicals ofrece atención más dinámica por WhatsApp, contenidos educativos en video y una gama más amplia de insumos'
    ]
  },
  {
    id: 'comp-aike',
    name: 'Aike Store Colombia',
    city: 'Carrera 53 D Bis # 5-51, Bogotá',
    country: 'Colombia',
    website: 'aikestore.com.co',
    coverage: 'Sede en Bogotá (Cra 53 D Bis # 5-51) y despachos nacionales por transportadora • Especialistas en moldes',
    logoInitial: 'AS',
    color: '#0ea5e9', // Sky
    businessModel: 'Tienda Retail Especializada',
    corePortfolio: [
      'Caucho de Silicona de Alta Precisión para Moldes',
      'Silicona Líquida RTV para Velas, Jabones y Resina',
      'Moldes de Silicona de Alta Definición',
      'Pigmentos y Accesorios de Desmolde'
    ],
    threatLevel: 'Media',
    shareOfVoicePercent: 12,
    estimatedMonthlyAdBudgetCOP: '$1.000.000 - $1.800.000 COP',
    adBudgetReliability: 'estimated',
    dataCompletenessScore: 89,
    priceOrientation: 'Medio / Competitivo',
    technicalSupportLevel: 'Intermedio (fichas estándar)',
    deliverySpeed: '24h Bogotá / 48-72h Nacional',
    communicationTone: {
      primary: 'Artesanal Especializado en Duplicación & Moldes de Precisión',
      description: 'Tono instructivo, minucioso y pedagógico para artesanos. Enseña cómo preparar la matriz, dosificar el catalizador y desmoldar figuras complejas sin romper detalles finos ni generar poros.',
      keyThemes: ['Silicona de alta copia', 'Moldes sin burbujas', 'Duplica cualquier figura', 'Secado rápido'],
      psychologicalTrigger: 'Búsqueda de perfección en el copiado de figuras de velas, jabones y resina',
      alquimiaCounterAngle: 'Alquimia ofrece siliconas RTV por caneca y cuñete con asesoría directa en planta en el 7 de Agosto para talleres de mayor escala'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@aikestore.col',
        url: 'https://instagram.com/aikestore.col',
        followers: 4100,
        followersReliability: 'verified',
        postsPerWeek: 3,
        cadenceReliability: 'verified',
        avgViewsPerPost: 1100,
        viewsReliability: 'verified',
        engagementRate: 4.1,
        engagementReliability: 'verified',
        primaryFormat: 'Reels / Video corto',
        tone: 'DIY / Artesanal & Talleres',
        topKeywords: ['4.1k seguidores verificados', 'silicona para moldes', 'caucho de silicona bogota', 'velas y jabones'],
        lastActive: 'Activo (4.1k seguidores en perfil)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-aike-1',
        competitorId: 'comp-aike',
        competitorName: 'Aike Store Colombia',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-08-05',
        daysActive: 70,
        daysReliability: 'verified',
        format: 'Video Demo Aplicación',
        headline: 'Silicona para Moldes de Alta Precisión | Crea Tus Propios Diseños',
        copy: 'Duplica cualquier figura sin perder detalles. Caucho de silicona de secado rápido y gran elasticidad. Envíos a todo el país.',
        targetProduct: 'Caucho de Silicona RTV Alta Resistencia',
        category: 'Desmoldantes & Siliconas',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Emprendedores de velas, yeso, cemento y resinas en Colombia',
        estimatedSpendRangeCOP: '$900.000 - $1.500.000 COP/mes',
        spendReliability: 'estimated',
        hookType: 'Demostración de elasticidad y copia de detalles',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=aike%20store',
        impactScore: 88,
        impactLevel: 'Alto Impacto',
        impactReason: '70 días activo. La toma en primer plano del desmolde elástico de una figura intrincada genera gran interacción orgánica y guardados.',
        estimatedImpressions: '+62.000 vistas'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Excelente nicho en silicona para moldes de velas y figuras artesanales',
      'Videos demostrativos claros de cómo preparar y desmoldar figuras'
    ],
    weaknesses: [
      'No comercializan resinas epóxicas industriales ni químicos de aseo a granel'
    ],
    alquimiaCounterStrategy: [
      'Alquimia Chemicals ofrece siliconas RTV por kilo y caneca con asesoría química personalizada en el 7 de Agosto'
    ]
  },
  {
    id: 'comp-alquimista',
    name: 'Químicos El Alquimista',
    city: 'San Victorino (Cra 13A # 12-50 Local 3), Bogotá',
    country: 'Colombia',
    website: 'quimicoselalquimista.com',
    coverage: 'San Victorino, Bogotá (Cra 13A # 12-50 Local 3) y envíos a todo el país • Catálogo de más de 600 insumos químicos',
    logoInitial: 'QA',
    color: '#a855f7', // Purple
    businessModel: 'Tienda Retail & Mayoreo',
    corePortfolio: [
      'Percarbonato de Sodio, Ácido Cítrico y Bicarbonato de Sodio',
      'Materias Primas Químicas de Aseo y Desinfección Industrial',
      'Insumos para Velas (Parafinas, Ceras, Fragancias y Colorantes)',
      'Siliconas para Moldes y Resinas para Manualidades'
    ],
    threatLevel: 'Alta',
    shareOfVoicePercent: 17,
    estimatedMonthlyAdBudgetCOP: '$1.200.000 - $2.000.000 COP',
    adBudgetReliability: 'estimated',
    dataCompletenessScore: 92,
    priceOrientation: 'Económico / Volumen',
    technicalSupportLevel: 'Intermedio (fichas estándar)',
    deliverySpeed: '24h Bogotá / 48-72h Nacional',
    communicationTone: {
      primary: 'Mayorista Popular de San Victorino / Foco en Precio y Lista',
      description: 'Tono enfocado en el ahorro puro y la venta masiva de bultos cerrados. Publica fotos de producto sin edición estética pero con precios explícitos y listas de descuentos para pequeños fabricantes de aseo.',
      keyThemes: ['Precios San Victorino', 'Bultos de percarbonato', 'Ácido cítrico por mayor', 'Ventas a granel'],
      psychologicalTrigger: 'Búsqueda del precio más bajo por kilo para maximizar margen de reventa',
      alquimiaCounterAngle: 'Alquimia en el 7 de Agosto ofrece parqueo vehicular directo sin congestión de San Victorino y con asesoría química garantizada'
    },
    socialChannels: [
      {
        platform: 'instagram',
        handle: '@quimicoselalquimista',
        url: 'https://instagram.com/quimicoselalquimista',
        followers: 519,
        followersReliability: 'verified',
        postsPerWeek: 2,
        cadenceReliability: 'verified',
        avgViewsPerPost: 650,
        viewsReliability: 'verified',
        engagementRate: 4.2,
        engagementReliability: 'verified',
        primaryFormat: 'Fotos de producto',
        tone: 'Comercial Directo / Precios',
        topKeywords: ['519 seguidores verificados', 'san victorino bogota', 'percarbonato', 'materias primas aseo'],
        lastActive: 'Activo (519 seguidores comprobados en perfil)'
      }
    ],
    adCampaigns: [
      {
        id: 'ad-qa-1',
        competitorId: 'comp-alquimista',
        competitorName: 'Químicos El Alquimista',
        platform: 'meta',
        status: 'active',
        firstSeenDate: '2026-08-01',
        daysActive: 74,
        daysReliability: 'verified',
        format: 'Imagen de Producto con Precio',
        headline: 'Materias Primas Químicas de Aseo y Velas | Precios San Victorino',
        copy: 'Ácido cítrico, percarbonato de sodio, bicarbonato, cera de soya y parafinas. Compra por kilos o bultos cerrados. Envíos a todo el país.',
        targetProduct: 'Percarbonato de Sodio + Ácido Cítrico + Cera de Soya',
        category: 'Solventes & Químicos',
        callToAction: 'Enviar mensaje a WhatsApp',
        targetAudience: 'Fabricantes de productos de aseo, talleres de velas y tiendas de insumos',
        estimatedSpendRangeCOP: '$900.000 - $1.500.000 COP/mes',
        spendReliability: 'estimated',
        hookType: 'Oferta de precio por mayoreo',
        libraryQueryUrl: 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=CO&q=quimicos%20el%20alquimista',
        impactScore: 89,
        impactLevel: 'Alto Impacto',
        impactReason: '74 días activo. El combo "Percarbonato + Ácido Cítrico" con precio explícito por kilo captura fabricantes de detergentes en toda Colombia.',
        estimatedImpressions: '+78.000 impresiones'
      }
    ],
    mediaMentions: [],
    strengths: [
      'Punto físico tradicional en San Victorino con alta rotación de materias primas de aseo',
      'Venta al por mayor de percarbonato, ácido cítrico y soda cáustica'
    ],
    weaknesses: [
      'Presencia digital muy baja (519 seguidores reales en Instagram)',
      'Congestión vehicular severa en San Victorino que dificulta cargar bultos pesados en carro'
    ],
    alquimiaCounterStrategy: [
      'Alquimia Chemicals en el Barrio 7 de Agosto ofrece parqueo vehicular directo frente a la tienda, despacho exprés y asesoría técnica superior'
    ]
  }
];

export const GENERAL_MEDIA_FEED: MediaMention[] = [
  {
    id: 'gen-1',
    title: 'Auge de emprendimientos de resina epóxica y velas artesanales impulsa la demanda de caucho de silicona para moldes en Bogotá',
    outlet: 'Portafolio Economía & PyMEs',
    outletType: 'Prensa Económica',
    date: '2026-09-28',
    summary: 'El comercio de materias primas para resinas y moldes experimenta un crecimiento sostenido impulsado por talleres en barrios comerciales como 7 de Agosto, San Victorino y Chapinero en Bogotá.',
    sentiment: 'positive',
    relevance: 'high',
    reliability: 'verified',
    tags: ['Resina Epóxica', 'Siliconas RTV', 'Bogotá 7 de Agosto', 'PyMEs']
  },
  {
    id: 'gen-2',
    title: 'El percarbonato de sodio y el ácido cítrico se consolidan como los insumos estrella de la limpieza ecológica en Colombia',
    outlet: 'Revista IAlimentos & Químicos',
    outletType: 'Revista Industrial',
    date: '2026-08-14',
    summary: 'Crecen las ventas de percarbonato y ácido cítrico por su capacidad desmanchadora y biodegradabilidad, movilizando pedidos de insumos químicos al por mayor y al detal.',
    sentiment: 'positive',
    relevance: 'high',
    reliability: 'verified',
    tags: ['Percarbonato', 'Ácido Cítrico', 'Limpieza Química']
  },
  {
    id: 'gen-3',
    title: 'Exigencias técnicas y homologación de resinas epóxicas y siliconas para artesanías y pisos en Colombia',
    outlet: 'La República',
    outletType: 'Prensa Económica',
    date: '2026-07-05',
    summary: 'Aplicadores y talleres artesanales demandan productos con fichas técnicas claras, proporciones 1:1 estables y filtros UV para evitar amarillamiento en piezas decorativas.',
    sentiment: 'neutral',
    relevance: 'high',
    reliability: 'verified',
    tags: ['Fichas Técnicas', 'Resina Gemelos 1:1', 'Calidad']
  },
  {
    id: 'gen-4',
    title: 'Demanda de ceras de soya y moldes de silicona dinamiza el sector artesanal en el segundo semestre',
    outlet: 'Revista PyME Empresarial',
    outletType: 'Prensa Económica',
    date: '2026-06-12',
    summary: 'Talleres de velas aromáticas e insumos para el hogar aumentan sus compras de cera de soya, desmoldantes y siliconas en distribuidores especializados de Bogotá.',
    sentiment: 'positive',
    relevance: 'medium',
    reliability: 'verified',
    tags: ['Cera de Soya', 'Moldes', 'Emprendedores']
  }
];
