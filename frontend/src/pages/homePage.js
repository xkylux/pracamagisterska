import HomePageComp from "../components/homePageComp";
import { useSelector } from "react-redux";
import axios from "axios";

const findBestSellers = async () => {
  const { data } = await axios.get("/api/produkty/bestsellers");
  return data;
}

const HomePage = () => {

  const { categories } = useSelector((state) => state.getCategories);

  return <HomePageComp categories={categories} findBestSellers={findBestSellers} />

}

export default HomePage