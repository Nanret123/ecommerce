export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  rating: number;
  author?: string;
}

export interface Filters {
  categories: string[]; // Multiple categories
  colors: string[];     // Multiple colors
  priceRange: { label: string; min: number; max: number }[]; // Array of price ranges
}

export interface SelectedFilters {
  category: string;
  color: string;
  priceRange: { min: number; max: number };
}