import React, { Component } from "react";
import { Link } from "react-router-dom";
import withContext from "../withContext";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  render() {
    return (
      <nav
        className="navbar container"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="/">
            <b className="navbar-item is-size-4">E-shop</b>
          </a>
          <label
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ showMenu: !this.state.showMenu });
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </label>
          <div
            className={`navbar-menu ${this.state.showMenu ? "is-active" : ""}`}
          >
            <Link to="/products" className="navbar-item">
              Products
            </Link>
            {this.props.context.user &&
              this.props.context.user.accessLevel < 1 && (
                <Link to="/add-product" className="navbar-item">
                  Add Product
                </Link>
              )}
            <Link to="/cart" className="navbar-item">
              Cart
              <span className="tag is-primary" style={{ marginLeft: "5px" }}>
                {Object.keys(this.props.context.cart).length}
              </span>
            </Link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="/">
                Categories
              </a>
              <div class="navbar-dropdown">
                <a class="navbar-item" href="/">
                  All Products
                </a>
                <a class="navbar-item" href="/">
                  Man
                </a>
                <a class="navbar-item" href="/">
                  Women
                </a>
                <a class="navbar-item" href="/">
                  Kids
                </a>
              </div>
            </div>
          </div>
          <div className="navbar-item">
            <input class="input is-rounded" type="text" placeholder="Search" />
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              {!this.props.context.user && (
                <a class="button is-light" href="/">
                  <strong>Sign up</strong>
                </a>
              )}

              {!this.props.context.user ? (
                <Link to="/login" className="button is-primary">
                  Login
                </Link>
              ) : (
                <Link
                  to="/"
                  onClick={this.props.context.logout}
                  className="button is-light"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withContext(Header);
