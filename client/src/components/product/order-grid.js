import React from "react";
import { Box, makeStyles, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Shorten } from "../../utils/string-util";

const useStyle = makeStyles((theme) => ({
  itemRow: {
    padding: "25px 35px",
    margin: "16px 0",
    background: "#fff",
    borderTop: "1px solid #fff",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      padding: "25px 30px",
    },
  },
  image: {
    width: "60%",
    maxHeight: 150,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      margin: "15px 0",
      width: "100%",
    },
  },
  price: {
    fontSize: 20,
    fontWeight: 600,
  },
  text: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
    marginTop: 5,
  },
  centerItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  itemTitle: {
    color: "#000",
    fontSize: 14,
    "&:hover": {
      cursor: "pointer",
      color: "#222",
    },
  },
  paymentDetails: {
    paddingLeft: "2%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingLeft: 0,
    },
  }
}));

function OrderRow({ order }) {
  const classes = useStyle();
  const address = order.addressDetails;
  const orderDate = new Date(order.orderDate);

  return (
    <>
      {order?.items?.map((item, index) => (
        <Box className={classes.itemRow}>
          <Grid container>
            <Grid item lg={2} md={2} sm={3} xs={12}>
              <Box>
                <img
                  src={order.productDetails[index].url}
                  className={classes.image}
                  alt={order.productDetails[index].title.shortTitle}
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={8}>
              <Link to={`/product/${order.productDetails[index]._id}`}>
                <Typography className={classes.itemTitle} >
                  {Shorten(order.productDetails[index].title.longTitle)}
                </Typography>
              </Link>
            </Grid>
            <Grid item lg={2} md={2} sm={3} xs={4} className={classes.centerItems}>
              <Box>
                <Typography className={classes.text}>
                  <span className={classes.price}>${item.price * item.qty}</span>
                </Typography>
                <Typography className={classes.text}>
                  ${item.price} x {item.qty}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={2} md={2} sm={3} xs={12} className={classes.paymentDetails}>
              <Typography className={classes.text}>
                {orderDate.toLocaleDateString()}
              </Typography>
              <Typography className={classes.text}>
                {order.paymentMode === "online" ? "Online" : "Cash on Delivery"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Box>
                <Typography className={classes.text}>
                  {address.name}

                  <span style={{ marginLeft: 10 }}>{address.number}</span>
                </Typography>
                <Typography className={classes.text}>
                  {address.houseAddress}, {address.locality}, {address.city},{" "}
                  {address.state} -
                  <span> {address.pincode}</span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}

export default OrderRow;
