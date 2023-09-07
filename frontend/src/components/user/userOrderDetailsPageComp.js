import { Alert, Col, Container, Row, Form, ListGroup, Button } from "react-bootstrap"
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom";

import CartItem from "../../components/cartItem"

const UserOrderDetailsPageComp = ({ userInfo, getUser, getOrder, payPalScript }) => {

  const [userAddress, setUserAddress] = useState({});
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const paypalContainer = useRef();
  // console.log(paypalContainer);

  useEffect(() => {
    getUser()
      .then(data => {
        setUserAddress({ address: data.address, city: data.city, country: data.country, zipCode: data.zipCode, state: data.state, phoneNumber: data.phoneNumber });
      })
      .catch((error) => console.log(error));
  }, [])

  useEffect(() => {
    getOrder(id)
      .then(data => {
        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered ? setIsDelivered(data.deliveredAt) : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Zakończono");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "pp") {
            setOrderButtonMessage("Zapłać");
          } else if (data.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMessage("Opłacone. W trakcie dostawy.");
          }
        }

      })
      .catch((err) => console.log(err));
  }, [])

  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "pp") {
      setOrderButtonMessage("By zapłaić wybierz poniżej");
      if (!isPaid) {
        payPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
      }
    } else {
      setOrderButtonMessage("Zamówienie złożone.");
    }
  }

  const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Opłacone");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    paypalContainer.current.style = "display: none";
  }

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Szczegóły zamówienia</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Adres wysyłki</h2>
              <b>Imię</b>: {userInfo.name} {userInfo.lastName}<br />
              <b>Adres</b>: {userAddress.address}, {userAddress.zipCode} {userAddress.city}, {userAddress.state} <br />
              <b>Telefon</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Sposób płatności</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">
                  PayPal
                </option>
                <option value="cod">
                  Za pobraniem
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                  {isDelivered ? <>Dostarczono {isDelivered}</> : <>Nie dostarczono</>}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Opłacono {isPaid}</> : <>Nie opłacono</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Zamównioe rzeczy</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <CartItem item={item} key={index} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Podsumowanie zamówienia</h3>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <h3>Cena: <span className="fw-bold">{cartSubtotal}zł</span></h3>
            </ListGroup.Item> */}
            <ListGroup.Item>
              <h3>Wysyłka: <span className="fw-bold">za darmo</span></h3>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <h3>Podatek <span className="fw-bold">1999zł</span></h3>
            </ListGroup.Item> */}
            <ListGroup.Item className="text-danger">
              <h3>Cena całkowita: <span className="fw-bold">{cartSubtotal}zł</span></h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button size="lg" onClick={orderHandler} variant="danger" type="button" disabled={buttonDisabled}>{orderButtonMessage}</Button>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default UserOrderDetailsPageComp;