import { Row, Col, Container, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";
import AddToCart from "../user/addToCart";
import ImageZoom from "js-image-zoom";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import ComputerCanvas from "../../pages/user/computers";

const mystyle = {
  padding: "0px",
  height: "600px",
  width: "800px"
};


const ProductDetailsPageComp = ({ addToCartReduxAction, dispatch, getProductDetails, userInfo, sendReviewRequest }) => {


  const { id } = useParams()
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loadProductDetails, setLoadProductDetails] = useState(true);
  const [catchError, setCatchError] = useState(false);
  const [userReview, setUserReview] = useState(false);

  const scroolAfterAdd = useRef(null);

  const addToCartHandler = () => {
    dispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  }

  var options = {
    scale: 1.5,
    offset: { vertical: 0, horizontal: 0 }
  }

  useEffect(() => {
    if (userReview) {
      setTimeout(() => {
        scroolAfterAdd.current.scrollIntoView({ behavior: "smooth" });
      }, 200)
    }
  }, [userReview])

  useEffect(() => {
    new ImageZoom(document.getElementById("first"), options)
    new ImageZoom(document.getElementById("secound"), options)
    new ImageZoom(document.getElementById("third"), options)
    new ImageZoom(document.getElementById("fourth"), options)
  })

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoadProductDetails(false);
      })
      .catch((error) =>
        setCatchError(
          error.response.data.message ? error.response.data.message : error.response.data
        )
      );
  }, [id, userReview]);

  const sendTheReview = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    }
    if (e.currentTarget.checkValidity() === true) {
      sendReviewRequest(product._id, formInputs).then(data => {
        if (data === "Przesłano recenzję") {
          setUserReview("Dodałeś opinię.");
        }
      }).catch((error) => setUserReview(error.response.data.message ? error.response.data.message : error.response.data));
    }
  }

  return (
    <Container>
      <AddToCart showCartMessage={showCartMessage} setShowCartMessage={setShowCartMessage} />
      <Row className="mt-5">
        {loadProductDetails ? (
          <h2>Ładowanie produktu</h2>
        ) : catchError ? (<h2>{Error}</h2>) : (
          <Col md={20}>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>
                      {product.name}
                    </h1>
                  </ListGroup.Item>
                  <div style={mystyle} id="zero">
                    <ComputerCanvas />
                  </div>
                  {/* <LinkContainer to="/podglad-poduktow">
                    <Button variant="secondary">Szczegółowy podgląd modelu</Button>
                  </LinkContainer> */}
                  <LinkContainer to="/modyfikuj-produkt">
                    <Button variant="secondary">Modyfikuj produkt</Button>
                  </LinkContainer>
                  <ListGroup.Item>
                    <Rating readonly size={20} initialValue={product.rating} /> ({product.reviewsNumber})
                  </ListGroup.Item>
                  <ListGroup.Item>Cena
                    <span className="fw-bold"> {product.price} zł</span>
                  </ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup>
                  <ListGroup.Item>Dostępność:<p>{product.count > 0 ? "W magazynach" : "BRAK"}</p></ListGroup.Item>
                  <ListGroup.Item>Cena:
                    <span className="fw-bold"> {product.price} zł</span></ListGroup.Item>
                  <ListGroup.Item>
                    Ilość:
                    <Form.Select value={quantity} onChange={e => setQuantity(e.target.value)} size="lg" aria-label="Default select example">
                      {[...Array(product.count).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button onClick={addToCartHandler} variant="danger">Kup teraz</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col className="mt-5">
                <h5>Opinie</h5>
                <ListGroup variant="flush">
                  {product.reviews && product.reviews.map((review, index) => (
                    <ListGroup.Item key={index}>
                      {review.user.name} <br />
                      <Rating readonly size={20} initialValue={review.rating} /> <br />
                      {review.createdAt.substring(0, 10)} <br />
                      {review.comment}
                    </ListGroup.Item>
                  ))}
                  <div ref={scroolAfterAdd} />
                </ListGroup>
              </Col>
            </Row>
            <hr />
            {!userInfo.name && <Alert variant="danger">Tylko zalogowani użytkownicy mogą dodac komentarz</Alert>}

            <Form onSubmit={sendTheReview}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            > */}
                <Form.Label>Recenzja produktu</Form.Label>
                <Form.Control name="comment" required as="textarea" disabled={!userInfo.name} rows={3} />
              </Form.Group>
              <Form.Select name="rating" disabled={!userInfo.name} aria-label="Default select example">
                <option value="">Twoja ocena</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Select>
              <Button disabled={!userInfo.name} type="submit" className="mt-3" variant="primary">Wyślij</Button>
              {userReview}
            </Form>
          </Col>
        )}
        {/* <Col style={{ zIndex: 1 }} md={4}>
          <div id="first">
            <Image crossOrigin="anonymous" fluid src="/img/games-category.png" />
          </div>
          <br />
          <div id="secound">
            <Image fluid src="/img/monitors-category.png" />
          </div>
          <br />
          <div id="third">
            <Image fluid src="/img/tablets-category.png" />
          </div>
          <br />
          <div id="fourth">
            <Image fluid src="/img/games-category.png" />
          </div>
          <br />
          <div id="zero">
            <ComputerCanvas />
          </div>

        </Col> */}

      </Row>
    </Container>

  )
}

export default ProductDetailsPageComp