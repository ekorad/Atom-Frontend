import { Review } from './review';
export interface Product {
  id: number;
  productName: string;
  description: string;
  oldPrice: number | null;
  newPrice: number;
  image: any;
  reviews: Review[];
  cpu: string;
  motherboard: string;
  ram: string;
  gpu: string;
}
