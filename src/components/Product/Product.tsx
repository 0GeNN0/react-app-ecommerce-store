// Libs
import { useContext, useState } from "react";

// Components
import { DataContext } from "../../contextApi/DataContextProvider";

// Types
import { ProductProps } from "./Product.types";

// Images
import emptyStar from "../../assests/images/empty-star.svg";
import filledStar from "../../assests/images/filled-star.svg";
import EmptyHeart from "../SVGs/EmptyHeart";
import FilledHeart from "../SVGs/FilledHeart";
import EmptyCart from "../SVGs/EmptyCart";
import FilledCart from "../SVGs/FilledCart";

// Styles
import "./product.scss";

function Product(props: ProductProps): JSX.Element {
  const {
    id,
    title,
    price,
    priceInDiscount,
    brand,
    category,
    rating,
    description,
    discountPercentage,
    thumbnail,
    stock,
    isFavorite,
    isInCart,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { dispatch, handleInCartProduct, removeProductFromCart } =
    useContext(DataContext);
  const roundedRating: number = Math.round(rating);
  const stars: any = {
    1: [filledStar, emptyStar, emptyStar, emptyStar, emptyStar],
    2: [filledStar, filledStar, emptyStar, emptyStar, emptyStar],
    3: [filledStar, filledStar, filledStar, emptyStar, emptyStar],
    4: [filledStar, filledStar, filledStar, filledStar, emptyStar],
    5: [filledStar, filledStar, filledStar, filledStar, filledStar],
  };

  function toggleDetails() {
    setIsOpen((prev) => !prev);
  }

  function cartOnClick() {
    // The click will change the status so the calls depends on the change not the current one
    if (isInCart) {
      removeProductFromCart(id);
    } else {
      const productCartObj = {
        id,
        title,
        priceInDiscount,
        thumbnail,
        amount: 1,
      };

      handleInCartProduct(productCartObj);
    }
  }

  return (
    <div className="grid-item">
      <div className="product-img">
        <img className="img" src={thumbnail} alt="Product Thumbnail" />
        <div onClick={() => dispatch({ type: "toggleFavorite", payload: id })}>
          {isFavorite ? <FilledHeart /> : <EmptyHeart />}
        </div>
        <div onClick={cartOnClick}>
          {isInCart ? <FilledCart /> : <EmptyCart />}
        </div>
      </div>
      <div className="info">
        <h3 className="main-title">
          <strong>Name: {title}</strong>
        </h3>
        <p className="brand">
          <b>Brand: </b> {brand}
        </p>
        <p className="rating-stars">
          {stars[roundedRating].map((imgSrc: string, i: number) => (
            <img key={i} src={imgSrc} alt="star" />
          ))}
        </p>
        <p className="price">
          Price: <del>{price}$</del> - {priceInDiscount}$
        </p>
      </div>
      <div className={`more-details ${isOpen ? "open" : ""}`}>
        <span className="toggle" onClick={toggleDetails}>
          {isOpen ? "Hide" : "Show"} Details
        </span>
        <p>
          <span>Category: </span>
          {category}
        </p>
        <p>
          <span>Discount Percentage: </span>
          {discountPercentage}%
        </p>
        <p>
          <span>Description: </span>
          {description}
        </p>
        <p>
          <span>Remaining Pieces: </span>
          {stock}
        </p>
      </div>
    </div>
  );
}

export default Product;
