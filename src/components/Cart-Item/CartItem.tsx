// Libraries Tools
import { useContext } from "react";

// Types
import { ProductInCart } from "../../contextApi/context.types";

// Components
import { DataContext } from "../../contextApi/DataContextProvider";

// Images
import removeIcon from "../../assests/images/trash.svg";
import minus from "../../assests/images/icon-minus.svg";
import plus from "../../assests/images/icon-plus.svg";

// Styles
import "./cart-item.scss";

function CartItem({
  id,
  title,
  priceInDiscount,
  thumbnail,
  amount,
}: ProductInCart) {
  const { removeProductFromCart, handleAmount } = useContext(DataContext);

  function handleItemsAmount(
    e: React.MouseEvent<HTMLSpanElement | HTMLImageElement, MouseEvent>
  ) {
    const element = e.target as HTMLElement;

    const operator = element.className === "plus" ? 1 : -1;

    if (operator === -1 && amount === 1) return;

    handleAmount(id, operator);
  }

  return (
    <div className="cart-item">
      <img
        src={removeIcon}
        alt="Remove Icon"
        className="remove"
        onClick={() => removeProductFromCart(id)}
      />
      <img
        src={thumbnail}
        alt="Product"
        className="product-img"
        title={title}
      />
      <div className="price-actions">
        <span className="price">
          <small>
            {priceInDiscount} X {amount}
          </small>
          <b>${priceInDiscount * amount}</b>
        </span>
        <div className="btns">
          <span className="minus" onClick={handleItemsAmount}>
            <img src={minus} alt="Minus Icon" className="minus" />
          </span>
          <span className="num">{amount}</span>
          <span className="plus" onClick={handleItemsAmount}>
            <img src={plus} alt="Plus Icon" className="plus" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
