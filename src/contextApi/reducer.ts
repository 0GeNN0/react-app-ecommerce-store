import { initStateType, ActionType } from "./context.types";

export const initState: initStateType = {
  loading: true,
  data: [],
  error: "",
};

export const dataReducer = (state: initStateType, action: ActionType) => {
  switch (action.type) {
    case "success":
      return { loading: false, data: action.payload, error: "" };
    case "failed":
      return {
        loading: false,
        data: [],
        error: `The Site Is Repairing Some Issues Please Come Back Later`,
      };
    case "toggleFavorite":
      return {
        ...state,
        data: state.data.map((product) => {
          return product.id === action.payload
            ? { ...product, isFavorite: !product.isFavorite }
            : product;
        }),
      };
    case "toggleInCart":
      return {
        ...state,
        data: state.data.map((product) => {
          return product.id === action.payload
            ? { ...product, isInCart: !product.isInCart }
            : product;
        }),
      };
    case "emptyCart":
      return {
        ...state,
        data: state.data.map((product) => ({ ...product, isInCart: false })),
      };
    case "updateStock":
      return {
        ...state,
        data: state.data.map((product) => {
          return product.id === action.payload.id
            ? { ...product, stock: product.stock - action.payload.itemN }
            : product;
        }),
      };
  }
};
