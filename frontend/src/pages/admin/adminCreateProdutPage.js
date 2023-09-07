import AdminCreateProdutPageComp from "./adminComp/adminCreateProdutPageComp";
import axios from "axios";
import { uploadToCloudinary, uploadFileRequest } from "./settings/settings";
import { useSelector } from "react-redux";
import { newCategory, removeCategory, updateCategoryMongoDb } from "../../redux/actions/catAction";
import { useDispatch } from "react-redux";

const createNewProductRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/produkty/admin`, { ...formInputs });
  return data;
}

const AdminCreateProdutPage = () => {

  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();

  return <AdminCreateProdutPageComp createNewProductRequest={createNewProductRequest} uploadFileRequest={uploadFileRequest} uploadToCloudinary={uploadToCloudinary} categories={categories} dispatch={dispatch} newCategory={newCategory} removeCategory={removeCategory} updateCategoryMongoDb={updateCategoryMongoDb} />;
};

export default AdminCreateProdutPage;