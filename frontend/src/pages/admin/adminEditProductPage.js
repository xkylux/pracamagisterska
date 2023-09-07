import { useSelector } from "react-redux"
import axios from "axios";
import { useDispatch } from "react-redux";
import AdminEditProductPageComp from "./adminComp/adminEditProductPageComp";
import { updateCategoryMongoDb } from "../../redux/actions/catAction";
import { uploadToCloudinary, uploadFileRequest } from "./settings/settings";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/produkty/get-one/${productId}`)
  return data;
}

const updateProductFromAdmin = async (productId, formInputs) => {
  const { data } = await axios.put(`/api/produkty/admin/${productId}`, { ...formInputs });
  return data;
}

const AdminEditProductPage = () => {

  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();

  const deleteProductFiles = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath)
    if (process.env.NODE_ENV !== "production") {
      // to do: change to !== EDYTOWAĆ
      await axios.delete(`/api/produkty/admin/img/${encoded}/${productId}`);
    } else {
      await axios.delete(`/api/produkty/admin/img/${encoded}/${productId}?cloudinary=true`);
    }
  }

  return <AdminEditProductPageComp categories={categories} fetchProduct={fetchProduct} updateProductFromAdmin={updateProductFromAdmin} dispatch={dispatch} updateCategoryMongoDb={updateCategoryMongoDb} deleteProductFiles={deleteProductFiles} uploadFileRequest={uploadFileRequest} uploadToCloudinary={uploadToCloudinary} />
};


export default AdminEditProductPage;