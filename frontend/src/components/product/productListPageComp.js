import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
//import {RatingView} from 'react-simple-star-rating';

import SortOptions from '../../components/sortOptions';
import PriceFilter from '../../components/filtersQuery/priceFilter';
import RatingFilter from '../../components/filtersQuery/ratingFilter';
import CategoryFilter from '../../components/filtersQuery/categoryFilter';
import AttributesFilter from '../../components/filtersQuery/attributesFilter';
import ProductList from '../../components/productsList';
import Paginationn from '../../components/paginationn';

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from 'react';


const ProductListPageComp = ({ getProducts, categories }) => {

  const [products, setProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState(true);
  const [catchError, setCatchError] = useState(false);
  const [attributeFilter, setAttributeFilter] = useState([]);
  const [fetchAttributes, setFetchAttributes] = useState([]);
  const [resetFiltersByButton, setResetFiltersByButton] = useState(false);

  //stany dla filtórów
  const [filters, setFilters] = useState({});
  const [priceFilter, setPriceFilter] = useState(500);
  const [ratinFilter, setRatinFilter] = useState({});
  const [categoryFilter, setCategoryFilter] = useState({});
  const [sortProducts, setSortProducts] = useState("");
  const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
  const [pageNum, setPageNum] = useState(null);


  const { categoryName } = useParams() || "";
  const { pageNumParam } = useParams() || 1;
  const { searchQuery } = useParams() || "";
  const userLocation = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find((item) => item.name === categoryName.replace(/,/g, "/"));
      if (categoryAllData) {
        let mainCategory = categoryAllData.name.split("/")[0];
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttributeFilter(categories[index].attributes);
      }
    } else {
      setAttributeFilter([]);
    }
  }, [categoryName, categories])

  useEffect(() => {
    if (Object.entries(categoryFilter).length > 0) {
      setAttributeFilter([]);
      var catego = [];
      var count;
      Object.entries(categoryFilter).forEach(([category, checked]) => {
        if (checked) {
          var name = category.split("/")[0];
          catego.push(name);
          count = catego.filter((x) => x === name).length;
          if (count === 1) {
            var index = categories.findIndex((item) => item.name === name);
            setAttributeFilter((attributes) => [...attributes, ...categories[index].attributes]);
          }
        }
      })
    }
  }, [categoryFilter, categories])

  useEffect(() => {
    getProducts(categoryName, pageNumParam, searchQuery, filters, sortProducts).then(products => {
      setProducts(products.products);
      setPaginationLinksNumber(products.paginationLinksNumber);
      setPageNum(products.pageNum);
      setLoadProducts(false);
    }).catch((err) => {
      console.log(err)
      setCatchError(true);
    });
  }, [categoryName, pageNumParam, searchQuery, filters, sortProducts]);

  const enforceFilter = () => {
    navigate(location.pathname.replace(/\/[0-9]+$/, ""));
    setResetFiltersByButton(true);
    setFilters({
      price: priceFilter,
      rating: ratinFilter,
      category: categoryFilter,
      attributes: fetchAttributes,
    })
  }

  const hideResetButton = () => {
    setResetFiltersByButton(false);
    setFilters({});
    window.location.href = "/lista-porduktow"
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className='mb-3 mt-3'><SortOptions setSortProducts={setSortProducts} /></ListGroup.Item>
            FILTER: <br />
            <ListGroup.Item><PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter} /></ListGroup.Item>
            <ListGroup.Item><RatingFilter setRatinFilter={setRatinFilter} /></ListGroup.Item>
            {!userLocation.pathname.match(/\/kategoria/) && (
              <ListGroup.Item><CategoryFilter setCategoryFilter={setCategoryFilter} /></ListGroup.Item>
            )}
            <ListGroup.Item>
              <AttributesFilter attributeFilter={attributeFilter} setFetchAttributes={setFetchAttributes} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" onClick={enforceFilter}>Filtruj</Button>{" "}
              {resetFiltersByButton && (
                <Button variant="danger" onClick={hideResetButton}>Resetuj</Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {loadProducts ? (
            <h1>Ładowanie produktów  .......</h1>
          ) : catchError ? (
            <h1>Błąd podczas ładowania. Spróbuj ponownie!</h1>
          ) : (
            products.map((product) => (
              <ProductList key={product._id}
                images={product.images}
                name={product.name}
                description={product.description}
                price={product.price}
                rating={product.rating}
                reviewsNumber={product.reviewsNumber}
                productId={product._id}
              />
            ))
          )}
          {paginationLinksNumber > 1 ? (
            <Paginationn
              categoryName={categoryName}
              searchQuery={searchQuery}
              paginationLinksNumber={paginationLinksNumber}
              pageNum={pageNum}
            />
          ) : null}

        </Col>
      </Row>
    </Container>
  );
}

export default ProductListPageComp