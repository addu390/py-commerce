import axios from "axios";
import * as actionType from "../action-type/address-action-type";

export const updateAddressState = (newState) => ({
  type: actionType.UPDATE_ADDRESS,
  payload: {
    newState,
  },
});

export const addNewAddress = (address) => ({
  type: actionType.ADD_ADDRESS,
  payload: {
    address,
  },
});

export const getAddresses = () => async (dispatch, getState) => {
  const { isAuthenticate, user } = getState().userReducer;
  if (isAuthenticate) {
    try {
      const { data } = await axios.get(`/address/get-addresses/${user._id}`);
      dispatch({
        type: actionType.SET_ADDRESS,
        payload: {
          addresses: data,
        },
      });
    } catch (error) { }
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  try {
    await axios.delete("/address/delete-address", {
      data: {
        addressId: id,
      },
    });
  } catch (error) { }
  dispatch({
    type: actionType.REMOVE_ADDRESS,
    payload: {
      addressId: id,
    },
  });
};
