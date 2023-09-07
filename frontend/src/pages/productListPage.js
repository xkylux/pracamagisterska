import ProductListPageComp from "../components/product/productListPageComp";
import axios from "axios";
import { useSelector } from "react-redux";

let urlDetails = "";
const filterProducts = (filters) => {
  urlDetails = "";
  Object.keys(filters).map((key, index) => {
    if (key === "price") urlDetails += `&price=${filters[key]}`;
    else if (key === "rating") {
      let rate = "";
      Object.keys(filters[key]).map((key2, index2) => {
        if (filters[key][key2]) rate += `${key2},`;
        return "";
      })
      urlDetails += "&rating=" + rate;
    } else if (key === "category") {
      let cat = "";
      Object.keys(filters[key]).map((key3, index3) => {
        if (filters[key][key3]) cat += `${key3},`;
        return "";
      })
      urlDetails += "&category=" + cat;
    } else if (key === "attributes") {
      if (filters[key].length > 0) {
        let val = filters[key].reduce((acc, item) => {
          let key = item.key;
          let val = item.values.join("-");
          return acc + key + "-" + val + ",";
        }, "")
        urlDetails += "&attributes=" + val;
      }
    }
    return "";
  })
  return urlDetails;
}

const getProducts = async (categoryName = "", pageNumParam = null, searchQuery = "", filters = {}, sortOption = "") => {
  urlDetails = filterProducts(filters)
  const search = searchQuery ? `szukaj/${searchQuery}/` : "";
  const category = categoryName ? `kategoria/${categoryName}/` : "";
  const url = `/api/produkty/${category}${search}?pageNum=${pageNumParam}${urlDetails}&sort=${sortOption}`;
  const { data } = await axios.get(url);
  return data;
}

const ProductListPage = () => {

  const { categories } = useSelector((state) => state.getCategories);

  return <ProductListPageComp getProducts={getProducts} categories={categories} />
}

export default ProductListPage