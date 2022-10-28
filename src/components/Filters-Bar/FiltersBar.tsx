// Components
import CategoryFilter from "../Category-Filter/CategoryFilter";
import PriceFilter from "../Price-Filter/PriceFilter";

// Styles
import "./filters-bar.scss";

function FiltersBar({ isTabletOrMobile }: { isTabletOrMobile: boolean }) {
  return (
    <div className="filters-bar">
      <PriceFilter isTabletOrMobile={isTabletOrMobile} />
      <CategoryFilter />
    </div>
  );
}

export default FiltersBar;
