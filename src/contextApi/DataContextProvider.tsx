// Libs
import { useEffect, useState, useMemo, useReducer, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

// Reducer Function
import { initState, dataReducer } from "./reducer";

// Types
import {
  CategoryType,
  ProductType,
  DataContextValueType,
  ProductInCart,
  DataContextProviderTypes,
  initStateType,
} from "./context.types";

export const DataContext = createContext({} as DataContextValueType);

function DataContextProvider({ children }: DataContextProviderTypes) {
  const [state, dispatch] = useReducer(
    dataReducer,
    JSON.parse(
      localStorage.getItem("state") || JSON.stringify(initState)
    ) as initStateType
  );
  const [inCart, setInCart] = useState(
    JSON.parse(
      localStorage.getItem("inCart") || JSON.stringify([])
    ) as ProductInCart[]
  );
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 3000,
  });

  // Fetch Data From The API
  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    const filterData: ProductType[] = data.products.reduce(function (
      arr: ProductType[],
      product: ProductType,
      i: number
    ) {
      if (
        !product.category.includes("womens") &&
        product.category !== "tops" &&
        i !== 51 &&
        i !== 58
      ) {
        const priceInDiscount =
          product.price -
          Math.floor((product.price * product.discountPercentage) / 100);
        arr = arr.concat({
          ...product,
          id: uuidv4(),
          priceInDiscount,
          isInCart: false,
          isFavorite: false,
        });
        return arr;
      } else {
        return arr;
      }
    },
    []);

    createCategoriesList(filterData);

    dispatch({ type: "success", payload: filterData });
  };

  useEffect(() => {
    if (state.data.length === 0) {
      try {
        fetchData();
      } catch (e) {
        dispatch({ type: "failed" });
      }
    } else {
      createCategoriesList(state.data);
    }
  }, []);

  useEffect(() => {
    const convertDataToString: string = JSON.stringify(state);
    localStorage.setItem("state", convertDataToString);

    const convertCartDataToString: string = JSON.stringify(inCart);
    localStorage.setItem("inCart", convertCartDataToString);
  }, [state, inCart]);

  // Categories
  function createCategoriesList(data: ProductType[]) {
    const uniqeCatg: string[] = [];
    const categoriesList: CategoryType[] = data.reduce(
      (list: CategoryType[], item: ProductType) => {
        if (!uniqeCatg.includes(item.category)) {
          uniqeCatg.push(item.category);
          return list.concat({
            id: uuidv4(),
            name: item.category,
            isChecked: false,
          });
        } else {
          return list;
        }
      },
      []
    );
    setCategories(categoriesList);
  }

  // Handle Categories Filter
  function handleCategoryCheckbox(id: string): void {
    setCategories((prev) =>
      prev.map((catg) =>
        catg.id === id ? { ...catg, isChecked: !catg.isChecked } : catg
      )
    );
  }

  // Get the selected categories to render in UI
  const getActiveCategories = useMemo<CategoryType[]>(() => {
    return categories.filter((catg) => catg.isChecked);
  }, [categories]);

  // Handle Products Display
  const displayFilteredProducts = useMemo<ProductType[]>(
    function () {
      const min = priceRange.min;
      const max = priceRange.max;

      if (getActiveCategories.length === 0) {
        if (min !== 0 || max !== 3000 || searchText) {
          return state.data.filter(
            (product) =>
              product.priceInDiscount > priceRange.min &&
              product.priceInDiscount < priceRange.max &&
              product.title.toLowerCase().includes(searchText.toLowerCase())
          );
        } else {
          return state.data;
        }
      } else {
        return getActiveCategories.reduce(
          (matchedProducts: ProductType[], catg) => {
            const wideFilter = state.data.filter(
              (product) =>
                product.category === catg.name &&
                product.priceInDiscount > priceRange.min &&
                product.priceInDiscount < priceRange.max &&
                product.title.toLowerCase().includes(searchText.toLowerCase())
            );

            return matchedProducts.concat(wideFilter);
          },
          []
        );
      }
    },
    // Dependencies
    [
      getActiveCategories,
      state.data,
      priceRange.min,
      priceRange.max,
      searchText,
    ]
  );

  // Handle Pricing State
  function handlePricingState(min: number, max: number): void {
    setPriceRange((prev) => ({ min, max }));
  }

  // Handle The Cart And Heart Icon Display
  function handleInCartProduct(productInCart: ProductInCart) {
    setInCart((prev: ProductInCart[]) => [...prev, productInCart]);
    dispatch({ type: "toggleInCart", payload: productInCart.id });
  }

  // Remove An Items From The Cart
  function removeProductFromCart(id: string): void {
    setInCart((prev: ProductInCart[]) => prev.filter((prod) => prod.id !== id));
    dispatch({ type: "toggleInCart", payload: id });
  }

  // Empty The Cart
  function emptyCart() {
    setInCart([]);
    dispatch({ type: "emptyCart" });
  }

  // Hanlde The Amount Of Items In The Cart
  function handleAmount(id: string, operator: -1 | 1): void {
    setInCart((prev: ProductInCart[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: item.amount + operator } : item
      )
    );
  }

  return (
    <DataContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        categories,
        handleCategoryCheckbox,
        getActiveCategories,
        displayFilteredProducts,
        handlePricingState,
        searchText,
        setSearchText,
        priceRange,
        dispatch,
        inCart,
        handleInCartProduct,
        removeProductFromCart,
        handleAmount,
        emptyCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
