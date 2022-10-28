// Libs
import { useState, useContext } from "react";

// Components
import { DataContext } from "../../contextApi/DataContextProvider";
import Category from "../Category/Category";

// Images
import arrow from "../../assests/images/up-arrow.svg";

// Styles
import "./category-filter.scss";

function CategoryFilter() {
  const { categories, handleCategoryCheckbox } = useContext(DataContext);
  const [isCategoryShown, setIsCategoryShown] = useState(false);

  function handleCategoriesRender() {
    setIsCategoryShown((prev) => !prev);
  }

  const categoriesListToggleClass = isCategoryShown ? "open" : "";
  const rotateImgClass = isCategoryShown ? "rotate" : "";

  return (
    <section className="filter-section categories">
      <div className="heading" onClick={handleCategoriesRender}>
        <h2>Categories</h2>
        <img src={arrow} alt="arrow" className={`arrow ${rotateImgClass}`} />
      </div>
      <div className={`categories-list ${categoriesListToggleClass}`}>
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            isChecked={category.isChecked}
            handleCategoryCheckbox={handleCategoryCheckbox}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;
