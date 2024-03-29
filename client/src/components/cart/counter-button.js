import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";
import { updateQuantity } from "../../actions/cart-action";
import toastMessage from "../../utils/toast-message";
const useStyle = makeStyles({
  component: {
    marginTop: 30
  },
  button: {
    borderRadius: "50%"
  }
});

const GroupedButton = ({
  product
}) => {
  const classes = useStyle();
  const [counter, setCounter] = useState(product.qty);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (counter + 1 <= 5) {
      setCounter(counter => counter + 1);
      dispatch(updateQuantity(product._id, counter + 1));
      toastMessage(`You've changed ${product.title.longTitle} quantity to ${counter + 1}`, "success");
    } else {
      toastMessage("We're sorry! Only 5 unit(s) allowed in each order", "error");
    }
  };

  const handleDecrement = () => {
    setCounter(counter => counter - 1);
    dispatch(updateQuantity(product._id, counter - 1));
    toastMessage(`You've changed ${product.title.longTitle} quantity to ${counter - 1}`, "success");
  };

  return <>
      <ButtonGroup className={classes.component}>
        <Button className={classes.button} onClick={() => handleDecrement()} disabled={counter == 1}>
          -
        </Button>
        <Button disabled style={{color: "#000"}}>{counter}</Button>
        <Button className={classes.button} onClick={() => handleIncrement()}>
          +
        </Button>
      </ButtonGroup>
    </>;
};

export default GroupedButton;