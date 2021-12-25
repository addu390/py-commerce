import { Card, makeStyles, Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Shorten } from "../../utils/string-util";
import GroupButton from "./counter-button";
import AlertDialogBox from "../alert-box";
import { useState } from "react";
const useStyle = makeStyles({
  component: {
    borderTop: "1px solid #f0f0f0",
    borderRadius: 0,
    display: "flex",
    "&:hover": {
      cursor: "pointer",
      "& $itemTitle": {
        color: "#222"
      }
    }
  },
  leftComponent: {
    margin: 20,
    display: "flex",
    flexDirection: "column"
  },
  itemTitle: {
    color: "#000"
  },
  image: {
    height: 110,
    width: 110,
    objectFit: "contain"
  },
  mid: {
    margin: 20
  },
  greyTextColor: {
    color: "#000"
  },
  smallText: {
    fontSize: 14
  },
  price: {
    fontSize: 18,
    fontWeight: 600
  },
  remove: {
    marginTop: 12,
    fontSize: 16
  }
});

const CartItems = ({
  item
}) => {
  const classes = useStyle();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const dialogClose = () => {
    setIsOpenDialog(false);
  };

  const dialogOpen = () => {
    setIsOpenDialog(true);
  };

  return <>
    <Card className={classes.component}>
      <Box className={classes.leftComponent}>
        <img src={item.url} className={classes.image} />
        <GroupButton product={item} />
      </Box>
      <Box className={classes.mid}>
        <Link to={`/product/${item._id}`}>
          <Typography className={classes.itemTitle}>
            {item.title.longTitle && Shorten(item.title.longTitle)}
          </Typography>
          <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{
            marginTop: 10
          }}>
            Seller: PyCommerce
          </Typography>
          <Typography style={{
            margin: "20px 0",
            color: "#000"
          }}>
            <span className={classes.price}>${item.price.cost}</span>
            &nbsp;&nbsp;&nbsp;
            <span className={classes.greyTextColor}>
              <strike>${item.price.mrp}</strike>
            </span>
            &nbsp;&nbsp;&nbsp;
            <span style={{
              color: "#222"
            }}>
              {item.price.discount}% off
            </span>
          </Typography>
        </Link>
        <Button className={classes.remove} onClick={dialogOpen}>
          Remove
        </Button>
      </Box>
    </Card>
    <AlertDialogBox isOpenDialog={isOpenDialog} handleClose={dialogClose} itemId={item._id} type="cart" />
  </>;
};

export default CartItems;