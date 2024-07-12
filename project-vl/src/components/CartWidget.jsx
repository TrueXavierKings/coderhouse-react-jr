import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./CartWidget.css";

const CartWidget = () => {
  return (
    <div className="cart-icon nav-link">
      <FaShoppingCart size={39} />
      <span className="cart-badge">13</span>
    </div>
  );
};

export default CartWidget;
