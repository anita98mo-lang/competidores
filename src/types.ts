export type ReliabilityLevel = 'verified' | 'estimated' | 'private_pending';

export interface SocialChannelData {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'youtube';
  handle: string;
  url: string;
  followers: number;
  followersReliability: ReliabilityLevel;
  postsPerWeek: number;
  cadenceReliability: ReliabilityLevel;
  avgViewsPerPost: number;
  viewsReliability: ReliabilityLevel;
  engagementRate: number; // percentage
  engagementReliability: ReliabilityLevel;
  primaryFormat: string;
  tone: 'Técnico-Ingeniería B2B' | 'DIY / Artesanal & Talleres' | 'Comercial Directo / Precios' | 'Institucional / Corporativo' | 'Mixto Técnico-Comercial' | string;
  topKeywords: string[];
  lastActive: string;
}

export interface AdCampaign {
  id: string;
  competitorId: string;
  competitorName: string;
  platform: 'meta' | 'google' | 'tiktok' | 'linkedin' | string;
  status: 'active' | 'paused' | 'seasonal';
  firstSeenDate: string;
  daysActive: number;
  daysReliability: ReliabilityLevel;
  format: string;
  headline: string;
  copy: string;
  targetProduct: string;
  category: string;
  callToAction: string;
  targetAudience: string;
  estimatedSpendRangeCOP: string;
  spendReliability: ReliabilityLevel;
  hookType: string;
  libraryQueryUrl: string; // Direct link to Meta Ad Library or Google Transparency
  screenshotPlaceholderText?: string;
  impactScore?: number; // 0-100
  impactLevel?: 'Crítico / Top 1' | 'Alto Impacto' | 'Medio';
  impactReason?: string;
  estimatedImpressions?: string;
}

export interface MediaMention {
  id: string;
  competitorId?: string;
  competitorName?: string;
  title: string;
  outlet: string;
  outletType: string;
  date: string;
  url?: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'challenging';
  relevance: 'high' | 'medium' | 'low';
  reliability: ReliabilityLevel;
  tags: string[];
}

export interface Competitor {
  id: string;
  name: string;
  city: string;
  country: string;
  website: string;
  coverage: string;
  logoInitial: string;
  color: string;
  isAlquimia?: boolean;
  businessModel: string;
  corePortfolio: string[];
  threatLevel: 'Alta' | 'Media' | 'Baja' | 'Referencia Propia' | string;
  shareOfVoicePercent: number; // Estimated
  estimatedMonthlyAdBudgetCOP: string;
  adBudgetReliability: ReliabilityLevel;
  communicationTone?: {
    primary: string;
    description: string;
    keyThemes: string[];
    psychologicalTrigger: string;
    alquimiaCounterAngle: string;
  };
  socialChannels: SocialChannelData[];
  adCampaigns: AdCampaign[];
  mediaMentions: MediaMention[];
  strengths: string[];
  weaknesses: string[];
  alquimiaCounterStrategy: string[];
  priceOrientation: string;
  technicalSupportLevel: 'Básico (sólo venta)' | 'Intermedio (fichas estándar)' | 'Avanzado (asesores químicos en planta)' | string;
  deliverySpeed: string;
  dataCompletenessScore: number; // 0 to 100
}

export interface ExecutiveReportData {
  reportTitle: string;
  generatedDate: string;
  executiveSummary: string;
  keyFindings: string[];
  shareOfVoiceRanking: {
    name: string;
    sovPercent: number;
    adStatus: string;
  }[];
  actionPlanForAlquimia: {
    priority: string;
    initiative: string;
    targetCompetitor: string;
    kpiTarget: string;
  }[];
  dataReliabilityDisclaimer: string;
}
