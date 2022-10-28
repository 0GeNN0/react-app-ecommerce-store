// Components
import CategoryFilter from "../Category-Filter/CategoryFilter";
import PriceFilter from "../Price-Filter/PriceFilter";

// Styles
import "./aside.scss";

type SidebarType = {
  isShown?: boolean;
  mobile?: string;
};

function SideBar({ isShown, mobile }: SidebarType): JSX.Element {
  const toggleClass = isShown ? "" : "closed";

  return (
    <aside className={`sidebar ${toggleClass} ${mobile}`}>
      <PriceFilter />
      <CategoryFilter />
    </aside>
  );
}

export default SideBar;
