import { ReactNode } from "react";

export type CategoryType = {
  id: string;
  name: string;
  isChecked: boolean;
};

export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  priceInDiscount: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
  isInCart: boolean;
  isFavorite: boolean;
};

export type DataContextValueType = {
  loading: boolean;
  error: string;
  categories: CategoryType[];
  handleCategoryCheckbox(id: string): void;
  getActiveCategories: CategoryType[];
  displayFilteredProducts: ProductType[];
  handlePricingState(min: number, max: number): void;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  priceRange: { min: number; max: number };
  dispatch: React.Dispatch<ActionType>;
  inCart: ProductInCart[];
  handleInCartProduct(productInCart: ProductInCart): void;
  removeProductFromCart(id: string): void;
  emptyCart(): void;
  handleAmount(id: string, operator: -1 | 1): void;
};

export type initStateType = {
  loading: boolean;
  data: ProductType[];
  error: string;
};

export type SuccessAction = {
  type: "success";
  payload: ProductType[];
};

export type FailedAction = {
  type: "failed" | "emptyCart";
};

export type UpdateAction = {
  type: "toggleFavorite" | "toggleInCart";
  payload: string;
};

export type StockAction = {
  type: "updateStock";
  payload: { id: string; itemN: number };
};

export type ActionType =
  | SuccessAction
  | FailedAction
  | UpdateAction
  | StockAction;

export type ProductInCart = {
  id: string;
  title: string;
  priceInDiscount: number;
  thumbnail: string;
  amount: number;
};

export type DataContextProviderTypes = {
  children: ReactNode;
};
