import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user-reducer";
import productReducer from "./producd-reducer";
import cartReducer from "./cart-reducer";
import favoritesReducer from "./favories-reducer";
import addressReducer from "./address-reducer";
import orderReducer from "./order-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer","userReducer"],
};


const rootReducer = combineReducers({
  userReducer,
  productReducer,
  cartReducer,
  favoritesReducer,
  addressReducer,
  orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
