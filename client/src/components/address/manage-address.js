import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Box, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { getAddresses, updateAddressState } from "../../actions/address-action";

import AddressCard from "./address-form";
import AddAddress from "./add-address";
import useQuery from "../../hooks/query";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 0 40px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    paddingRight: "24px",
    display: "inline-block",
  },
  card: {
    color: "#222",
    padding: "16px",
    border: "1px solid #e0e0e0",
    background: "#fff",
    borderRadius: "2px",
    margin: "30px 0",
  },
  addAddress: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
}));

function ManageAddresses() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const { openAddAddress, addresses } = useSelector(
    (state) => state.addressReducer
  );
  useEffect(() => {
    dispatch(getAddresses());
    if (query.get("ref")) {
      dispatch(updateAddressState(true));
    }
  }, [dispatch]);
  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Manage Addresses</Typography>
        {openAddAddress ? (
          <Box
            style={{ backgroundColor: "#F0F0F0", cursor: "default" }}
            className={clsx(classes.card, classes.addAddress)}
          >
            <AddAddress />
          </Box>
        ) : (
          <Box
            className={clsx(classes.card, classes.addAddress)}
            onClick={() => dispatch(updateAddressState(true))}
          >
            <AddIcon style={{ marginRight: 10 }} />
            <Typography style={{ fontSize: 14, fontWeight: 600 }}>
              ADD A NEW ADDRESS
            </Typography>
          </Box>
        )}
        {addresses.length > 0 &&
          addresses.map((address, index) => (
            <AddressCard address={address} key={index} />
          ))}
      </Box>
    </>
  );
}

export default ManageAddresses;
