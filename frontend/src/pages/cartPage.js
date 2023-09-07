import CartItemComp from "../components/cart/cartPageComp"
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";

const CartPage = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const dispatch = useDispatch();

  return <CartItemComp addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} cartSubtotal={cartSubtotal} dispatch={dispatch} />
}

export default CartPage