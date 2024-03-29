import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";

import axios from "axios";
import { clearCart, getCartItems } from "../actions/cart-action";
import { getAddresses } from "../actions/address-action";
import { setOrderItems } from "../actions/order-action";
import useQuery from "../hooks/query";

import TotalView from "../components/cart/total-checkout";
import AddressCard from "../components/address/address-form";
import LoaderSpinner from "../components/load-spinner";
import ToastMessageContainer from "../components/toast";

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 135px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 0",
    },
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 15,
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
  loginComponent: {
    backgroundColor: "#fff",
    padding: "15px",
    display: "flex",
  },
  addressComponent: {
    backgroundColor: "#fff",
    paddingBottom: 15,
    margin: "20px 0px",
  },
  activeComponent: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#222",
    padding: "15px 10px",
    fontWeight: 600,
    fontSize: 18,
  },
  para: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.29,
    display: "block",
    marginLeft: 0,
    color: "#000",
  },
  stepCount: {
    fontSize: 12,
    color: "#222",
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    padding: "3px 7px",
    verticalAlign: "baseline",
    marginRight: 17,
  },
  grayText: {
    color: "#000",
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "6px",
    textTransform: "uppercase",
  },
  loginText: {
    color: "#212121",
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 37,
    marginTop: 7,
  },
  actionBtn: {
    display: "block",
    background: "#222",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 2,
    height: 40,
    width: 170,
    marginTop: 5,
  },
  changeBtn: {
    padding: "0 32px",
    height: "40px",
    borderRadius: "2px",
    border: "1px solid #e0e0e0",
    color: "#222",
    fontSize: "14px",
    fontWeight: 500,
    background: "#fff",
    marginLeft: "auto",
    cursor: "pointer",
    textTransform: "uppercase",
  },
  addBtn: {
    display: "flex",
    color: "#222",
    fontWeight: 500,
    padding: "16px 16px",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
  },
  addressText: {
    fontSize: 14,
    textTransform: "none",
    padding: "10px 10px 0 37px",
    color: "#212121",
  },
}));

const CheckoutPage = () => {
  const [activeComponent, setActiveComponent] = useState({
    address: true,
    payment: false,
  });
  const [selectedAddr, setSelectedAddr] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyle();

  const { cartItems } = useSelector((state) => state.cartReducer);
  const { isAuthenticate, user } = useSelector((state) => state.userReducer);
  const { addresses } = useSelector((state) => state.addressReducer);
  const { orderItems, totalAmount } = useSelector(
    (state) => state.orderReducer
  );
  const dispatch = useDispatch();

  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    if (query.get("init") != "true") {
      history.replace("/cart");
    }

    if (isAuthenticate) {
      dispatch(getCartItems());
      dispatch(getAddresses());
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      history.replace("/login?ref=checkout?init=true");
    }
  }, [isAuthenticate]);

  useEffect(() => {
    dispatch(setOrderItems(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (cartItems == "") {
      window.location.replace("/");
    }
  }, []);

  const handleChange = () => {
    setActiveComponent({
      address: true,
      payment: false,
    });
  };

  const deliverHere = (address) => {
    setActiveComponent({
      address: false,
      payment: true,
    });
    setSelectedAddr(address);
  };

  const changePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };

  const confirmOrder = async () => {
    if (paymentMode == "cash") {
      try {
        await axios.post("/orders/complete-order", {
          items: orderItems,
          userId: user._id,
          addressId: selectedAddr._id,
          totalAmount: totalAmount,
          paymentMode: paymentMode,
          paymentStatus: "Completed",
        });
        await dispatch(clearCart());
        window.location.replace("order-success");
      } catch (error) {
        console.log(error);
        window.location.replace("order-failed");
      }
    } else if (paymentMode == "online") {
      try {
        console.log("not supported")
      } catch (error) {
        console.log(error);
        window.location.replace("order-failed");
      }
    }
  };

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <>
      {cartItems.length ? (
        <Grid container className={classes.component}>
          <Grid
            item
            lg={8}
            md={8}
            sm={12}
            xs={12}
            className={classes.leftComponent}
          >
            <Box className={classes.loginComponent}>
              <Box>
                <span className={classes.stepCount}>1</span>
                <span className={classes.grayText}>
                  LOGIN{" "}
                  <svg
                    height="16"
                    width="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      stroke="#2974f0"
                    ></path>
                  </svg>
                </span>
                <Typography className={classes.loginText}>
                  {`${user.fname}  ${user.lname}`}
                  <span style={{ fontWeight: 500, marginLeft: 10 }}>
                    {`${user.phone} `}
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box className={classes.addressComponent}>
              {activeComponent.address ? (<>
                <Box className={classes.activeComponent}>
                  <span
                    className={classes.stepCount}
                    style={{ backgroundColor: "#fff" }}>
                    2
                  </span>
                  DELIVERY ADDRESS
                </Box>
                <Box
                  style={{
                    padding: "0px 10px",
                    maxHeight: "460px",
                    overflowY: "auto",
                  }}>
                  <RadioGroup aria-label="type" name="address">
                    {addresses.length > 0 &&
                      addresses.map((address, index) => (
                        <Box style={{ display: "flex" }}>
                          <FormControlLabel
                            key={index}
                            value={address._id}
                            control={<Radio style={{ color: "#222" }} />}
                          />
                          <div>
                            <AddressCard
                              address={address}
                              isCheckout={true}
                            />
                            <Button
                              variant="contained"
                              className={classes.actionBtn}
                              onClick={() => deliverHere(address)}
                              style={{ backgroundColor: "#222" }}
                            >
                              Deliver Here
                            </Button>
                          </div>
                        </Box>
                      ))}
                  </RadioGroup>
                </Box>
              </>
              ) : (
                <Box style={{ display: "flex", alignItems: "start" }}>
                  <Box
                    style={{ padding: "20px 15px 5px 15px" }}
                    className={classes.grayText}>
                    <span className={classes.stepCount}>2</span>
                    DELIVERY ADDRESS{" "}
                    <svg
                      height="16"
                      width="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                        stroke="#2974f0"
                      ></path>
                    </svg>
                    <Typography className={classes.addressText}>
                      <b>
                        {selectedAddr?.name}
                        {"   "}
                      </b>{" "}
                      {" - "}
                      {selectedAddr?.houseAddress}, {selectedAddr?.locality},{" "}
                      {selectedAddr?.city}, {selectedAddr?.state},{" "}
                      {selectedAddr?.pincode}
                    </Typography>
                  </Box>
                  <button
                    style={{ marginTop: 15, marginRight: 15 }}
                    onClick={handleChange}
                    className={classes.changeBtn}>
                    CHANGE
                  </button>
                </Box>
              )}
            </Box>
            {activeComponent.address && (
              <Box
                className={clsx(classes.addressComponent, classes.addBtn)}
                onClick={() =>
                  history.replace("/account/addresses?ref=checkout?init=true")
                }
              >
                <AddIcon style={{ marginRight: 10 }} />
                <Typography style={{ fontSize: 16 }}>
                  Add a new address
                </Typography>
              </Box>
            )}
            <Box className={clsx(classes.addressComponent)}>
              {activeComponent.payment ? (
                <>
                  <Box className={classes.activeComponent}>
                    <span
                      className={classes.stepCount}
                      style={{ backgroundColor: "#fff" }}
                    >
                      3
                    </span>
                    PAYMENT OPTIONS
                  </Box>
                  <Box style={{ padding: "0px 20px" }}>
                    <RadioGroup
                      name="payment"
                      value={paymentMode}
                      onChange={changePaymentMode}>
                      <Box style={{ display: "flex" }}>
                        <FormControlLabel
                          disabled
                          value="online"
                          control={<Radio style={{ color: "#222" }} />}
                          label="Online (Currently Unavailable)"
                        />
                      </Box>
                      <FormControlLabel
                        value="cash"
                        control={<Radio style={{ color: "#222" }} />}
                        label="Cash on Delivery"
                      />
                    </RadioGroup>
                    {paymentMode && (
                      <Button
                        variant="contained"
                        className={classes.actionBtn}
                        style={{
                          backgroundColor: "#222",
                          marginLeft: "auto",
                        }}
                        onClick={confirmOrder}>
                        {paymentMode === "cash" ? " CONFIRM ORDER" : "CONTINUE"}
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <Box
                  style={{ padding: "20px 15px 5px 15px" }}
                  className={classes.grayText}
                >
                  <span className={classes.stepCount}>3</span>
                  PAYMENT OPTIONS
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TotalView page="checkout" />
            <Box style={{ marginTop: 20, display: "flex", padding: "10px 20px" }}>
              <span className={classes.para}>
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </span>
            </Box>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      <ToastMessageContainer />
    </>
  );
};

export default CheckoutPage;
