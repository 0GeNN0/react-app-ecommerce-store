// Types
import { CategoryProps } from "./category.types";

// Styles
import "./category.scss";

function Category({
  id,
  name,
  isChecked,
  handleCategoryCheckbox,
}: CategoryProps) {
  // Handle onChange
  function onChange() {
    handleCategoryCheckbox(id);
  }

  return (
    <div className="category-item">
      <input type="checkbox" checked={isChecked} onChange={onChange} id={id} />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}

export default Category;
