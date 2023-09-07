//import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";

//import ComputerCanvas from "../../src/pages/user/computers";
import ProductDetailsPageComp from "../components/product/productDetailsPageComp";
import axios from "axios";

// const mystyle = {
//   padding: "0px",
//   height: "600px",
//   width: "800px"
// };

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/produkty/get-one/${id}`);
  return data;
}

const sendReviewRequest = async (productId, formInputs) => {
  const { data } = await axios.post(`/api/uzytkownicy/recenzja/${productId}`, { ...formInputs });
  return data;
}


const ProductDetailsPage = () => {

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  return <ProductDetailsPageComp addToCartReduxAction={addToCart} dispatch={dispatch} getProductDetails={getProductDetails} userInfo={userInfo} sendReviewRequest={sendReviewRequest} />
}

export default ProductDetailsPage