import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Context from "./Context";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Routes from "./routes";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
    const products = await axios.get("http://localhost:3001/products");
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ user, products: products.data, cart });
  }

  login = async (email, password) => {
    const res = await axios
      .post("http://localhost:3001/login", { email, password })
      .catch((e) => {
        return { status: 401, message: "unauthorized" };
      });

    if (res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken);
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === "admin@example.com" ? 0 : 1,
      };
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  logout = (e) => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    //if cart exists increase the product amount
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      // add a new item
      cart[cartItem.id] = cartItem;
    }
    // if amount exceeds stock limit the amount
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
    }

    const cart = this.state.cart;

    const products = this.state.products.map((p) => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;

        axios.put(`http://localhost:3001/products/${p.id}`, { ...p });
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          logout: this.logout,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <Header />
            <Routes />
            <Footer />
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
