// Libs
import { useContext } from "react";
import { Link } from "react-router-dom";

// Components
import { DataContext } from "../../contextApi/DataContextProvider";

// Images
import logo from "../../assests/images/logo.svg";
import emptyCart from "../../assests/images/empty-cart.svg";
import filledCart from "../../assests/images/filled-cart.svg";

// Styles
import "./header.scss";

function Header() {
  const { inCart } = useContext(DataContext);

  const imgSrc = inCart.length > 0 ? filledCart : emptyCart;

  return (
    <header>
      <nav>
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="logo" className="nav-logo-img" />
          </Link>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <div className="cart">
            <Link to="cart">
              <img src={imgSrc} alt="cart" />
            </Link>
            {inCart.length > 0 && (
              <span className="items-number">{inCart.length}</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
