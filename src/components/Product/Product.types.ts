export type ProductProps = {
  id: string;
  title: string;
  price: number;
  priceInDiscount: number;
  brand: string;
  category: string;
  rating: number;
  description: string;
  discountPercentage: number;
  thumbnail: string;
  stock: number;
  isInCart: boolean;
  isFavorite: boolean;
};
