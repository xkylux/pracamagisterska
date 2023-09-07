import { Row, Col, Button } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import { LinkContainer } from "react-router-bootstrap";
import AdminLinks from "../../../components/admin/adminLinks";

import { useState, useEffect } from "react";

import { logOut } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";



const ProductPageComp = ({ getProducts, deleteProduct }) => {

  const [products, setProducts] = useState([]);
  const [productDel, setProductDel] = useState(false);

  const dispatch = useDispatch();

  const deleteHandler = async (productId) => {
    if (window.confirm("Jesteś pewny?")) {
      const data = await deleteProduct(productId)
      if (data.message === "Produkt usunięty") {
        setProductDel(!productDel);
      }
    }
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    getProducts(abortCtrl)
      .then((res) => setProducts(res))
      // .catch((er) =>
      //   setProducts([
      //     { name: er.response.data.message ? er.response.data.message : er.response.data }
      //   ])
      .catch((er) => dispatch(logOut())
      );
    return () => abortCtrl.abort();
  }, [productDel]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>
          Lista produktów{" "}
          <LinkContainer to="/admin-utworz-produkt">
            <Button variant="primary" size="lg">
              Utwórz nowy produkt
            </Button>
          </LinkContainer>

        </h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nazwa produktu</th>
              <th>Cena</th>
              <th>Kategoria</th>
              <th>Edytuj/Usuń</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <LinkContainer to={`/admin-edycja-produktu/${item._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(item._id)}>
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default ProductPageComp