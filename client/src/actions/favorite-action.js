import * as actionType from "../action-type/favorites-action-type";
import axios from "axios";

export const addToFavorites = (item) => async (dispatch, getState) => {
  const { isAuthenticate, user } = getState().userReducer;
  if (isAuthenticate) {
    try {
      await axios.post("/favorites/add-item", {
        userId: user._id,
        productId: item._id,
      });
    } catch (error) { }
  }
  dispatch({
    type: actionType.ADD_TO_FAVORITES,
    payload: {
      item,
    },
  });
};

export const removeFromFavorites = (id) => async (dispatch, getState) => {
  const { isAuthenticate, user } = getState().userReducer;
  if (isAuthenticate) {
    try {
      await axios.delete("/favorites/remove-item", {
        data: {
          userId: user._id,
          productId: id,
        },
      });
    } catch (error) { }
  }
  dispatch({
    type: actionType.REMOVE_FROM_FAVORITES,
    payload: {
      id: id,
    },
  });
};

export const getFavoritesItems = () => async (dispatch, getState) => {
  const { isAuthenticate, user } = getState().userReducer;
  if (isAuthenticate) {
    try {
      const { data } = await axios.get(`/favorites/get-items/${user._id}`);
      const favoritesItems = [];

      data?.map((value) => {
        favoritesItems.push(value.productDetails[0]);
      });
      dispatch({
        type: actionType.SET_FAVORITES,
        payload: {
          favoritesItems: favoritesItems,
        },
      });
    } catch (error) { }
  }
};
