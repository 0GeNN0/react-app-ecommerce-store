// Libs
import { useContext } from "react";

// Components
import { DataContext } from "../../contextApi/DataContextProvider";

// Images
import close from "../../assests/images/x.svg";

// Types
import { SelectedCategoryType } from "./selected-category.types";

// Styles
import "./selected-category.scss";

function SelectedCategory({ catg, id }: SelectedCategoryType) {
  const { handleCategoryCheckbox } = useContext(DataContext);

  function removeFilterFromUI() {
    handleCategoryCheckbox(id);
  }

  return (
    <div className="selected-category">
      <p>{catg}</p>
      <div className="img">
        <img src={close} alt="close" onClick={removeFilterFromUI} />
      </div>
    </div>
  );
}

export default SelectedCategory;
