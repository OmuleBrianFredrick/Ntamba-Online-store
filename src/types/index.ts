export type ProductCategory = 'ground-coffee' | 'roasted-beans' | 'honey' | 'chewable' | 'dried-fruits';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  weight: string;
  weightGrams: number;
  gtin: string;
  unitPriceUGX: number;
  cartonPriceUGX: number;
  cartonQty: number; // default 12
  origin: string;
  estate: string;
  roastLevel?: string;
  grindForm?: string;
  productType: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  cuppingScore?: number;
  altitudeMeters?: number;
  tastingNotes?: string[];
  packagingType: 'matte-pouch' | 'jar' | 'gold-foil' | 'mini-sachet';
  accentColor: string;
  badge?: string;
  imageUrl?: string;
  galleryImages?: string[];
  nutritionPer100g?: {
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
    fiber?: string;
    caffeine?: string;
  };
}

export type Currency = 'UGX' | 'USD' | 'EUR' | 'GBP';

export interface CartItem {
  product: Product;
  quantity: number;
  isCarton: boolean; // whether purchasing a carton of 12 or single unit
}

export interface RFQFormState {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  buyerType: 'roastery' | 'importer' | 'retail_chain' | 'distributor' | 'institution';
  requestType: 'cupping_sample' | 'commercial_order' | 'contract_sourcing';
  targetVolume: string;
  selectedSKUs: string[];
  incoterms: 'FOB_MOMBASA' | 'CIF_HAMBURG' | 'CIF_ROTTERDAM' | 'DDP' | 'EXW';
  shippingTimeline: string;
  notes: string;
}

export interface AnalyticsData {
  todayRevenueUGX: number;
  conversionRate: number;
  averageOrderValueUGX: number;
  mobileTrafficPercent: number;
  cartAbandonmentRate: number;
  totalOrdersToday: number;
  activeWholesaleRFQs: number;
  cuppingSamplesDispatched: number;
}
