import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography, Button, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../actions/cart-action";
import CartItem from "../components/cart/cart-items";
import TotalView from "../components/cart/total-checkout";
import EmptyCart from "../components/cart/cart-empty";
import LoaderSpinner from "../components/load-spinner";
import Footer from "../components/footer/footer";
import ToastMessageContainer from "../components/toast";

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.between(0, 960)]: {
      paddingRight: 0,
      marginBottom: 20,
    },
  },
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  bottom: {
    padding: "16px 22px",
    background: "#fff",
    borderTop: "1px solid #f0f0f0",
  },
  placeOrder: {
    display: "flex",
    marginLeft: "auto",
    background: "#222",
    color: "#fff",
    borderRadius: 2,
    width: 250,
    height: 51,
  },
}));

const Cart = () => {
  const classes = useStyle();

  const { cartItems } = useSelector((state) => state.cartReducer);
  const { isAuthenticate } = useSelector((state) => state.userReducer);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (isAuthenticate) {
      dispatch(getCartItems());
    }
  }, [isAuthenticate]);


  const placeOrder = () => {
    window.location.replace("/checkout?init=true");
  };

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <>
      {cartItems.length ? (
        <Grid container className={classes.component}>
          <Grid
            item
            lg={9}
            md={9}
            sm={12}
            xs={12}
            className={classes.leftComponent}>
            <Box className={classes.header}>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                My Cart ({cartItems?.length})
              </Typography>
            </Box>
            {cartItems.map((item) => (
              <CartItem item={item} />
            ))}
            <Box className={classes.bottom}>
              <Button
                onClick={placeOrder}
                variant="contained"
                className={classes.placeOrder}
                style={{ backgroundColor: "#222" }}>
                Place Order
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView />
          </Grid>
        </Grid>
      ) : (
        <>
          <EmptyCart />
          <Footer />
        </>
      )}
      <ToastMessageContainer />
    </>
  );
};

export default Cart;
