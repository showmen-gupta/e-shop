import React from "react";
import { Switch, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ProductList} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/add-product" component={AddProduct} />
      <Route exact path="/products" component={ProductList} />
    </Switch>
  );
};

export default Routes;
