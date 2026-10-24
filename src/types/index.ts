export type FragranceFamily = 'Floral' | 'Woody' | 'Fresh' | 'Oriental' | 'Gourmand' | 'Citrus';
export type Concentration = 'Parfum' | 'Eau de Parfum' | 'Extrait de Parfum' | 'Eau de Toilette' | 'Eau de Cologne';
export type GenderCategory = 'women' | 'men' | 'unisex';

export interface ProductSize {
  size: string; // '30 ml' | '50 ml' | '100 ml'
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  collection: string;
  concentration: Concentration;
  gender: GenderCategory;
  family: FragranceFamily;
  price: number;
  originalPrice?: number;
  sizes: ProductSize[];
  defaultSize: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  description: string;
  story: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string; // '8-12 hours'
  sillage: string; // 'Intense & enveloping'
  season: string;
  mood: string;
  image: string;
  secondaryImage?: string;
  recommendedWith: string[]; // product IDs
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface CollectionItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  categoryFilter: string;
  itemCount: number;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    deliveryMethod: string;
    paymentMethod: string;
  };
}
