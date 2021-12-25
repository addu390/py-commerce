import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";

import { getFavoritesItems } from "../../actions/favorite-action";
import { emptyFavorites } from "../../constants/data";

import FavoritesItem from "./favorites-list";
import LoaderSpinner from "../load-spinner";

const useStyles = makeStyles({
  container: {},
  header: {
    padding: "20px 40px",
    fontSize: 18,
    fontWeight: 500,
    borderBottom: "1px solid #e0e0e0",
  },
  emptyContainer: {
    height:500,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign: "center",
  },
  heading: {
    fontWeight: 600,
    fontSize: 18,
    marginTop: 35,
    marginBottom: 10,
  },
  para: {
    fontSize: 14,
  },
});

function Favorites() {
  const { favoritesItems } = useSelector((state) => state.favoritesReducer);
  const { isAuthenticate } = useSelector((state) => state.userReducer);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticate) {
      dispatch(getFavoritesItems());
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, []);

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <Box className={classes.container}>
      {favoritesItems.length > 0 ? (
        <>
          <Typography className={classes.header}>
            My Favorites ({favoritesItems.length})
          </Typography>
          {favoritesItems.map((item) => (
            <FavoritesItem item={item} />
          ))}
        </>
      ) : (
        <Box className={classes.emptyContainer}>
          <img src={emptyFavorites} alt="Empty" />
          <Typography className={classes.heading}>Empty Favorites</Typography>
          <Typography className={classes.para}>
            You have no items in your favorites. Start adding!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Favorites;
