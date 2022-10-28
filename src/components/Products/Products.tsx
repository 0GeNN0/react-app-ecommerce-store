// Lib
import { useContext } from "react";

// Components
import { DataContext } from "../../contextApi/DataContextProvider";
import SelectedCategory from "../Selected-Category/SelectedCategory";
import Product from "../Product/Product";
import FiltersBar from "../Filters-Bar/FiltersBar";

// Images
import filterIcon from "../../assests/images/filter.svg";

// Styles
import "./products.scss";
import "./products-media.scss";

type ProductsType = {
  toggleSidebar(): void;
  isTabletOrMobile: boolean;
};

function Products({ toggleSidebar, isTabletOrMobile }: ProductsType) {
  const {
    getActiveCategories,
    displayFilteredProducts,
    searchText,
    setSearchText,
    loading,
    error,
  } = useContext(DataContext);

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchText(e.target.value);
  }

  return (
    <section className={`products`}>
      {!isTabletOrMobile && (
        <img
          src={filterIcon}
          alt="filter-icon"
          className="filter-icon"
          onClick={toggleSidebar}
        />
      )}
      <div className="search">
        <input
          type="text"
          placeholder="Search Product By Name"
          value={searchText}
          onChange={onChange}
        />
      </div>
      {isTabletOrMobile && <FiltersBar isTabletOrMobile={isTabletOrMobile} />}
      <div className="selected-categories">
        {getActiveCategories.map((catg) => (
          <SelectedCategory key={catg.id} catg={catg.name} id={catg.id} />
        ))}
      </div>
      <div className="products-grid">
        {loading ? (
          <h1>
            Loading Products <br /> 😐
          </h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : displayFilteredProducts.length > 0 ? (
          displayFilteredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              priceInDiscount={product.priceInDiscount}
              brand={product.brand}
              category={product.category}
              rating={product.rating}
              description={product.description}
              discountPercentage={product.discountPercentage}
              thumbnail={product.thumbnail}
              stock={product.stock}
              isInCart={product.isInCart}
              isFavorite={product.isFavorite}
            />
          ))
        ) : (
          <h1>
            Product Not Found <br /> 😢
          </h1>
        )}
      </div>
    </section>
  );
}

export default Products;
