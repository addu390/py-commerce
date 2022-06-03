import React from "react";
import { Switch, Route } from "react-router-dom";
import { isDesktop} from 'react-device-detect';
import Header from "./components/header/header";

import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import AuthPage from "./pages/auth-page";
import CartPage from "./pages/cart-page";
import ProductPage from "./pages/product-details-page";
import MyAccountsPage from "./pages/accounts-page";
import OrdersPage from "./pages/orders-page";
import CheckoutPage from "./pages/checkout-page";
import OrderFailedPage from "./pages/order-failure-page";
import OrderSuccessPage from "./pages/order-success-page";

import "./app.css";

function App() {
  return (
    <div className="app">
      {isDesktop ? (
        <>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <AuthPage />
            </Route>
            <Route exact path="/cart">
              <CartPage />
            </Route>
            <Route exact path="/account">
              <MyAccountsPage />
            </Route>
            <Route exact path="/favorites">
              <MyAccountsPage />
            </Route>
            <Route exact path="/account/addresses">
              <MyAccountsPage />
            </Route>
            <Route exact path="/orders">
              <OrdersPage />
            </Route>
            <Route exact path="/checkout">
              <CheckoutPage />
            </Route>
            <Route exact path="/product/:id">
              <ProductPage />
            </Route>
            <Route exact path="/order-failed">
              <OrderFailedPage />
            </Route>
            <Route exact path="/order-success">
              <OrderSuccessPage />
            </Route>
            <Route component={ErrorPage} />
          </Switch>
        </>
      ) : (
        <div className="container">
          <div className="text-container">
            <h2 className="heading">Please use a Laptop/desktop 💻</h2>
            <p className="para">
              Mobile screens are not supported yet!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
