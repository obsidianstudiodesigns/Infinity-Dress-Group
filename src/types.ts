export type Currency = 'ZAR' | 'USD' | 'GBP' | 'EUR' | 'AUD';

export interface CurrencyRate {
  symbol: string;
  rate: number; // relative to ZAR
  format: (amount: number) => string;
}

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  category: 'Classic' | 'Pastel & Floral' | 'Jewel & Earth' | 'Bold & Bright';
  inStock: boolean;
}

export type DressLength = 'cocktail' | 'midi' | 'maxi' | 'train';

export interface LengthOption {
  id: DressLength;
  name: string;
  description: string;
  lengthCm: number;
  priceModifierZar: number;
}

export type DressSize = 'XS (28-30)' | 'S (32-34)' | 'M (36-38)' | 'L (40-42)' | 'XL (44-46)' | '2XL (48-50)' | '3XL+ (52-54)' | 'Custom Measurements';

export interface ProductAddOn {
  id: string;
  name: string;
  description: string;
  priceZar: number;
  selected?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  basePriceZar: number;
  originalPriceZar: number;
  rating: number;
  reviewCount: number;
  category: 'Lace' | 'Mesh' | 'Flare' | 'Wrap' | 'Signature';
  images: {
    front: string;
    back?: string;
    alt: string;
  };
  description: string;
  features: string[];
  fabricSpecs: string;
  availableColors: string[]; // ColorSwatch IDs
  lengths: DressLength[];
  badge?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  color: ColorSwatch;
  size: DressSize;
  length: LengthOption;
  customMeasurements?: {
    bust?: string;
    underbust?: string;
    waist?: string;
    waistToFloor?: string;
    notes?: string;
  };
  bridesmaidName?: string;
  addOns: ProductAddOn[];
  quantity: number;
  unitPriceZar: number;
  totalPriceZar: number;
}

export interface BridalPartyMember {
  id: string;
  name: string;
  role: string;
  productId: string;
  colorId: string;
  size: DressSize;
  length: DressLength;
  includeBandeau: boolean;
  notes: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  deliveryMethod: 'courier_sa' | 'postnet' | 'factory_collection' | 'dhl_international';
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  eventDate?: string;
  specialInstructions?: string;
}

export interface StyleTutorial {
  id: string;
  name: string;
  category: 'Classic' | 'Bra-Friendly' | 'Backless' | 'One-Shoulder' | 'Sleeved';
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  steps: string[];
  tips: string;
  braFriendly: boolean;
  plusSizeFriendly: boolean;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  dressBought: string;
  color: string;
  title: string;
  comment: string;
  verifiedBride: boolean;
}
