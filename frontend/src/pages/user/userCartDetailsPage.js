import UserCartDetailsPageComp from "../../components/user/userCartDetailsPageComp"
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartAction";
import axios from "axios";

const UserCartDetailsPage = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const dispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get("/api/uzytkownicy/profil/" + userInfo._id);
    return data
  }

  const createOrder = async (orderData) => {
    const { data } = await axios.post("/api/zamowienia", { ...orderData });
    return data;
  }

  return <UserCartDetailsPageComp cartItems={cartItems} itemsCount={itemsCount} cartSubtotal={cartSubtotal} userInfo={userInfo} getUser={getUser} addToCart={addToCart} removeFromCart={removeFromCart} dispatch={dispatch} createOrder={createOrder} />
}

export default UserCartDetailsPage