import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { cartReducer } from './reducers/cartReducer';
import { userRegisterLoginReducer } from './reducers/userReducer';
import { getCategoriesReducer } from './reducers/catReducer';
import { chatReducer } from './reducers/chatReducer';

const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
  getCategories: getCategoriesReducer,
  chat: chatReducer
})

const localStorageItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

const userLocalStorageInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}

const INITIAL_STATE = {
  cart: {
    cartItems: localStorageItems,
    itemsCount: localStorageItems ? localStorageItems.reduce((quantity, item) => Number(item.quantity) + quantity, 0) : 0,
    cartSubtotal: localStorageItems ? localStorageItems.reduce((price, item) => price + item.price * item.quantity, 0) : 0
  },
  userRegisterLogin: {
    userInfo: userLocalStorageInfo
  }
}

const middleware = [thunk];
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)))

export default store;