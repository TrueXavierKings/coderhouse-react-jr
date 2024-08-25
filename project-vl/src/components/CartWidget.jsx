import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./CartWidget.css";

const CartWidget = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/checkout");
  };

  const { cartState } = useCart();

  return (
    <div className="cart-icon nav-link" onClick={handleCartClick}>
      <FaShoppingCart size={39} />
      {cartState.cartItemsQuantity > 0 && (
        <span className="cart-badge">{cartState.cartItemsQuantity}</span>
      )}
    </div>
  );
};

export default CartWidget;
