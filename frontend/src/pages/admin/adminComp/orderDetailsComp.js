import { Alert, Col, Container, Row, Form, ListGroup, Button } from "react-bootstrap"

import CartItem from "../../../components/cartItem"

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { logOut } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const OrderDetailsComp = ({ getOrder, markAsDelivered }) => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState('Oznacz dostarczono!');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getOrder(id)
      .then((order) => {
        setUserInfo(order.user);
        setPaymentMethod(order.paymentMethod);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isDelivered ? setIsDelivered(order.deliveredAt) : setIsDelivered(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isDelivered) {
          setOrderButtonMessage("Zamówienie wykonane!");
          setButtonDisabled(true);
        }
        setCartItems(order.cartItems);
      })
      // .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data))
      .catch((er) => dispatch(logOut()));
  }, [isDelivered, id])

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Szczegóły zamówienia</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Adres wysyłki</h2>
              <b>Imię</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Adres</b>: {userInfo.address} {userInfo.city} {userInfo.state} {userInfo.zipCode} <br />
              <b>Telefon</b>: {userInfo.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Telefon</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">Blik</option>
                <option value="cod">
                  Za pobraniem
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                  {isDelivered ? <>Dostarczono {isDelivered}</> : <>Nie dostaroczono</>}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Opłacono {isPaid}</> : <>Jeszcze nie opłacono</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Zamówione rzeczy</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItem key={idx} item={item} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Podsumowanie zamówienia</h3>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              Cena: <span className="fw-bold">{cartSubtotal} zł</span>
            </ListGroup.Item> */}
            <ListGroup.Item>
              Wysyłka: <span className="fw-bold"> za darmo</span>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              Podatek <span className="fw-bold">: wliczony</span>
            </ListGroup.Item> */}
            <ListGroup.Item className="text-danger">
              Cena całkowita: <span className="fw-bold">{cartSubtotal} zł</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button size="lg" onClick={() =>
                  markAsDelivered(id)
                    .then((res) => {
                      if (res) {
                        setIsDelivered(true);
                      }
                    })
                    .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data))
                }
                  disabled={buttonDisabled} variant="danger" type="button">
                  {orderButtonMessage}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsComp;

