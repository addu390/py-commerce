import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import clsx from "clsx";
import { LocalOffer as Badge } from "@material-ui/icons";

const useStyle = makeStyles({
  rightContainer: {
    msOverflowY: "scroll",
  },

  smallText: {
    fontSize: 14,
    verticalAlign: "baseline",
    "& > *": {
      fontSize: 14,
      marginTop: 10,
    },
  },
  greyTextColor: {
    color: "#000",
    border: "none",
  },
  badge: {
    marginRight: 10,
    color: "#222",
    fontSize: 15,
  },
  wrapper: {
    display: "flex",
  },
  borderNone: {
    border: "none",
  },
});

const ProductDetail = ({ product }) => {
  const classes = useStyle();

  return (
    <Box className={classes.rightContainer}>
      <Typography>Available offers</Typography>
      <Box className={classes.smallText}>
        <Typography>
          <Badge className={classes.badge} />
          Bank Offer 5% Unlimited Cashback on PyCommerce Scatia Bank Credit Card
        </Typography>
        <Typography>
          <Badge className={classes.badge} />
          Bank Offer 10% Off on TD bank Mastercard debit card first time
          transaction, Terms and Condition apply
        </Typography>
        <Typography>
          <Badge className={classes.badge} />
          Offer of {product.price.discount}% off valid for the next 48 hours
        </Typography>
      </Box>
      <Table>
        <TableBody>
          <TableRow className={classes.smallText}>
            <TableCell className={classes.greyTextColor}>Seller</TableCell>
            <TableCell className={clsx(classes.smallText, classes.borderNone)}>
              <span style={{ color: "#222" }}>PyCommerce</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProductDetail;
