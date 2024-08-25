import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button, Spinner, Alert } from "react-bootstrap";
import "./ItemDetail.css";

const ItemDetail = ({ item, contents }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      setLoading(false);
      dispatch({
        type: "ADD_ITEM",
        payload: { item, quantity },
      });
      setMessage(`${quantity} item(s) added to the cart successfully`);
    }, 2000);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="item-detail">
      <h3>Quantity</h3>
      <div className="quantity-control">
        <Button
          onClick={handleDecreaseQuantity}
          variant="outline-primary"
          disabled={loading}
        >
          -
        </Button>
        <input type="number" value={quantity} readOnly />
        <Button
          onClick={handleIncreaseQuantity}
          variant="outline-primary"
          disabled={loading}
        >
          +
        </Button>
      </div>

      {contents && contents.length > 0 && (
        <>
          <h3>Contents</h3>
          <ul>
            {contents.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ul>
        </>
      )}

      <div className="add-to-cart-section">
        <Button onClick={handleAddToCart} variant="success" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp; Adding...
            </>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>

      {message && (
        <Alert variant="success" className="mt-3">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default ItemDetail;
