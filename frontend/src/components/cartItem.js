import { Col, ListGroup, Row, Image, Form } from "react-bootstrap"
import RemoveCartItemComp from "../components/cart/removeCartItemandler";


const CartItem = ({ item, removeCartItemHandler = false, orderCreated = false, changeCount = false }) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              src={item.image ? (item.image.path ?? null) : null}
              fluid
            />
          </Col>
          <Col md={2}>
            {item.name}
          </Col>
          <Col md={2}>
            <b>{item.price} zł</b>
          </Col>
          <Col md={3}>
            <Form.Select onChange={changeCount ? (e) => changeCount(item.productId, e.target.value) : undefined} disabled={orderCreated} value={item.quantity}>
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <RemoveCartItemComp orderCreated={orderCreated} productId={item.productId} quantity={item.quantity} price={item.price} removeCartItemHandler={removeCartItemHandler ? removeCartItemHandler : undefined} />
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  )
}

export default CartItem;