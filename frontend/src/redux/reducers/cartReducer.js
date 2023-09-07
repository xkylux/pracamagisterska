import * as actionType from "../const/cartConst";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
}

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:

      const addProductToCart = action.payload;

      const isProductInState = state.cartItems.find((x) => x.productId === addProductToCart.productId);

      const currentState = { ...state };

      if (isProductInState) {
        currentState.itemsCount = 0;
        currentState.cartSubtotal = 0;
        currentState.cartItems = state.cartItems.map((x) => {
          if (x.productId === isProductInState.productId) {
            currentState.itemsCount += Number(addProductToCart.quantity);
            const sum = Number(addProductToCart.quantity) * Number(addProductToCart.price);
            currentState.cartSubtotal += sum;
          } else {
            currentState.itemsCount += Number(x.quantity);
            const sum = Number(x.quantity) * Number(x.price);
            currentState.cartSubtotal += sum;
          }
          return x.productId === isProductInState.productId ? addProductToCart : x;
        });
      } else {
        currentState.itemsCount += Number(addProductToCart.quantity);
        const sum = Number(addProductToCart.quantity) * Number(addProductToCart.price);
        currentState.cartSubtotal += sum;
        currentState.cartItems = [...state.cartItems, addProductToCart];
      }

      return currentState
      case actionType.REMOVE_FROM_CART:
        return{
          ...state, 
          cartItems: state.cartItems.filter((x) => x.productId !== action.payload.productId),
          itemsCount: state.itemsCount - action.payload.quantity,
          cartSubtotal: state.cartSubtotal - action.payload.price * action.payload.quantity,
        }
    default:
      return state
  }
}