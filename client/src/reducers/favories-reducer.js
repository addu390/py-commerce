import * as actionType from "../action-type/favorites-action-type";

const initialState = {
  favoritesItems: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_FAVORITES:
      const item = action.payload.item;
      const isExist = state.favoritesItems.find(
        (product) => product._id === item._id
      );

      if (isExist) {
        return state;
      } else {
        return { ...state, favoritesItems: [...state.favoritesItems, item] };
      }

    case actionType.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoritesItems: state.favoritesItems.filter(
          (product) => product._id !== action.payload.id
        ),
      };

    case actionType.SET_FAVORITES:
      return {
        ...state,
        favoritesItems: action.payload.favoritesItems,
      };
    default:
      return state;
  }
};

export default favoritesReducer;
