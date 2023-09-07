import ProductCarousel from "../components/productCarousel"
import CategoryCard from "../components/categoryCard"
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";

const HomePageComp = ({ categories, findBestSellers }) => {

  const [mainCategories, setMainCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    findBestSellers()
        .then((data) => {
          setBestSellers(data);
        })
        .catch((error) => console.log(error.response.data.message ? error.response.data.message : error.response.data));
    setMainCategories((cat) => categories.filter((item) => !item.name.includes("/")));
  }, [categories])

  return (
    <>
      <ProductCarousel bestSellers={bestSellers} />
      <Container>
        <Row xs={1} md={2} className="g-1 mt-5 ms-5">
          {
            mainCategories.map((category, index) => <CategoryCard key={index} category={category} index={index} />)
          }
        </Row>
      </Container>
    </>

  )
}

export default HomePageComp;