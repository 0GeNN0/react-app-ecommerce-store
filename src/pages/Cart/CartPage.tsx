// Libraries
import { useContext, useState } from "react";

// Components
import CartItem from "../../components/Cart-Item/CartItem";
import { DataContext } from "../../contextApi/DataContextProvider";
import Popup from "../../components/Popup/Popup";

// Styles
import "./cart-page.scss";

function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const { inCart, emptyCart, dispatch } = useContext(DataContext);

  const total = inCart.reduce((total, item) => {
    return (total += item.amount * item.priceInDiscount);
  }, 0);

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  function onClick() {
    toggleModal();

    setTimeout(() => {
      setIsSpinning(false);
      emptyCart();
      inCart.forEach((item) =>
        dispatch({
          type: "updateStock",
          payload: { id: item.id, itemN: item.amount },
        })
      );
    }, 3000);
  }

  return (
    <main className="cart">
      <div className="cart-container">
        <h1>Check Out</h1>
        {inCart.length > 0 ? (
          <>
            <section className="items">
              {inCart.map((product) => (
                <CartItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  priceInDiscount={product.priceInDiscount}
                  thumbnail={product.thumbnail}
                  amount={product.amount}
                />
              ))}
            </section>
            <div className="total-price">
              <h3>Total: ${total}</h3>
            </div>
            <div className="order-btn">
              <button className="order" onClick={onClick}>
                Order
              </button>
            </div>
          </>
        ) : (
          <h3 className="no-items">No Items In The Cart</h3>
        )}
        <Popup
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          isSpinning={isSpinning}
        />
      </div>
    </main>
  );
}

export default CartPage;
