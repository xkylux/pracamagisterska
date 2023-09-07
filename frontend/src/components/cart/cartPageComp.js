import { Alert, Button, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import CartItem from "../cartItem"

const CartPageComp = ({ addToCart, removeFromCart, cartItems, cartSubtotal, dispatch }) => {

  const changeCount = (productId, count) => {
    dispatch(addToCart(productId, count));
  };

  const removeCartItemHandler = (productId, quantity, price) => {
    if (window.confirm("Na pewno chcesz usunąć?")) {
      dispatch(removeFromCart(productId, quantity, price));
    }
  }

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Koszyk</h1>
          {cartItems.length === 0 ? (
            <Alert variant="info">Twój koszyk jest pusty!</Alert>
          ) : (
            <ListGroup variant="flush">

              {cartItems.map((item, index) => (
                <CartItem item={item} key={index} changeCount={changeCount} removeCartItemHandler={removeCartItemHandler} />
              ))}

            </ListGroup>
          )}


        </Col>
        <Col md={4}>

          <ListGroup>
            <ListGroupItem>
              <h3>Podsumowanie ({cartItems.length} {cartItems.length === 1 ? "produkt" : "pordukty"})</h3>
            </ListGroupItem>
            <ListGroupItem>
              Cena <span className="fw-bold">{cartSubtotal} zł</span>
            </ListGroupItem>
            <ListGroupItem>
              <LinkContainer to="/moje-konto/szczogoly-koszyka">
                <Button disabled={cartSubtotal === 0} type="button">Zatwierdź</Button>
              </LinkContainer>

            </ListGroupItem>
          </ListGroup>

        </Col>
      </Row>
    </Container>

  )
}

export default CartPageComp