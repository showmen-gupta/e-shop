import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div className="hero is-small is-primary is-bold">
        <div className="hero-body container">
          <span className="title">My Cart</span>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column is-multiline">
            {cartKeys.map((key) => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning"
                >
                  Clear cart
                </button>{" "}
                <button
                  className="button is-success"
                  onClick={props.context.checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);
