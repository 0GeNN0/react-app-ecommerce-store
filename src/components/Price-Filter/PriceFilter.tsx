// Libs
import { useContext, useState } from "react";

// Components
import { DataContext } from "../../contextApi/DataContextProvider";

// Images
import arrow from "../../assests/images/up-arrow.svg";

// Styles
import "./price-filter.scss";

function PriceFilter({ isTabletOrMobile }: { isTabletOrMobile?: boolean }) {
  const { handlePricingState, priceRange } = useContext(DataContext);
  const [minMax, setMinMax] = useState({
    min: 0,
    max: 800,
  });

  // Handle Open Price Filters List In Small Screen
  const [openPricing, setOpenPricing] = useState(false);

  const toggleClass = openPricing ? "open" : "";
  const rotateImgClass = openPricing ? "rotate" : "";

  function handleSubmit(e: any) {
    e.preventDefault();
    handlePricingState(minMax.min, minMax.max);
  }

  function handleReset() {
    handlePricingState(0, 3000);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setMinMax((prev) => ({ ...prev, [name]: +value }));
  }

  function toggleOpenPricing() {
    setOpenPricing((prev) => !prev);
  }

  return (
    <section className="filter-section price">
      <div className="heading">
        <h2>Price</h2>
        {isTabletOrMobile && (
          <img
            onClick={toggleOpenPricing}
            className={`arrow ${rotateImgClass}`}
            src={arrow}
            alt="Arrow"
          />
        )}
      </div>
      <form
        className={`control-price-inputs ${toggleClass}`}
        onSubmit={handleSubmit}
      >
        <label>
          Min:{" "}
          <input
            type="number"
            name="min"
            value={minMax.min}
            onChange={onChange}
            min={0}
            max={700}
          />
        </label>
        <input
          type="range"
          name="min"
          min={0}
          max={700}
          step={20}
          value={minMax.min}
          onChange={onChange}
        />
        <label>
          Max:{" "}
          <input
            type="number"
            name="max"
            value={minMax.max}
            onChange={onChange}
            min={800}
            max={1560}
          />
        </label>
        <input
          type="range"
          name="max"
          min={800}
          max={1560}
          step={20}
          value={minMax.max}
          onChange={onChange}
        />
        <div className="actions-btns">
          {(priceRange.min || priceRange.max < 3000) && (
            <button className="btn reset" onClick={handleReset}>
              Reset Filters
            </button>
          )}
          <button className="btn on-submit">Apply Filters</button>
        </div>
      </form>
    </section>
  );
}

export default PriceFilter;
// Lowest Price is 11 | Highest Price is 1556
