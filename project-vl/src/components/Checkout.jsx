import React from "react";
import { Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useCart } from "./CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cartState, dispatch } = useCart();
  const { items, itemsTotalPrice, tax, cartTotalPrice } = cartState;

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleClearCart = () => {
    dispatch({ type: "RESET_CART" });
  };

  return (
    <div className="full-width-space">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-1 side-area"></div>
          <div className="col-10 content-area">
            <div className="checkout-page">
              <h1>Checkout</h1>
              <span
                className="clear-cart-link"
                onClick={handleClearCart}
                style={{ fontSize: "12px", cursor: "pointer", color: "blue" }}
              >
                [clear cart]
              </span>

              {items.length > 0 ? (
                <>
                  {items.map((item, index) => (
                    <Card key={index} className="checkout-item-card mb-3">
                      <div className="checkout-card-content d-flex">
                        <div className="checkout-card-image">
                          <Card.Img src={item.imagePath} alt={item.title} />
                        </div>
                        <div className="checkout-card-info flex-grow-1">
                          <Card.Body>
                            <Card.Text>Category: {item.category}</Card.Text>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.subtitle}</Card.Text>
                          </Card.Body>
                        </div>
                        <div className="checkout-card-price d-flex align-items-center">
                          <Card.Text>
                            Unit Price: ${item.price.toFixed(2)}
                          </Card.Text>
                        </div>
                        <div className="checkout-card-price d-flex align-items-center">
                          <Card.Text>Qty: {item.quantity}</Card.Text>
                        </div>
                        <div className="checkout-card-price d-flex align-items-center">
                          <Card.Text>
                            Price: ${item.totalPrice.toFixed(2)}
                          </Card.Text>
                        </div>
                        <div className="checkout-card-price d-flex align-items-top">
                          <FaTrash
                            className="trash-icon"
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}

                  <div className="checkout-summary">
                    <h5>
                      Cart Total (Before Tax): ${itemsTotalPrice.toFixed(2)}
                    </h5>
                    <h5>Tax: ${tax.toFixed(2)}</h5>
                    <h5>Total (With Tax): ${cartTotalPrice.toFixed(2)}</h5>
                  </div>
                </>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
          <div className="col-1 side-area"></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
