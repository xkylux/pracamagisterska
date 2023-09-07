import ProductPageComp from "./adminComp/productPageComp"

import axios from "axios";

const getProducts = async (abortCtrl) => {
  const { data } = await axios.get("/api/produkty/admin", {
    signal: abortCtrl.signal,
  })
  return data;
}

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/produkty/admin/${productId}`);
  return data
}

const AdminProductsPage = () => {
  return <ProductPageComp getProducts={getProducts} deleteProduct={deleteProduct} />
}

export default AdminProductsPage