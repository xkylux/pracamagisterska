import { Alert, Col, Container, Row, Form, ListGroup, Button } from "react-bootstrap"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "../cartItem"

const UserCartDetailsPageComp = ({ cartItems, itemsCount, cartSubtotal, addToCart, userInfo, getUser, removeFromCart, dispatch, createOrder }) => {

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [noAddress, setNoAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pp");
  const navigate = useNavigate();

  const changeCount = (porductId, count) => {
    dispatch(addToCart(porductId, count));
  }

  const removeCartItemHandler = (porductId, quantity, price) => {
    if (window.confirm("Na pewno chcesz usunąć?")) {
      dispatch(removeFromCart(porductId, quantity, price));
    }
  }

  useEffect(() => {
    getUser().then((data) => {
      if (!data.address || !data.city || !data.country || !data.zipCode || !data.state || !data.phoneNumber) {
        setButtonDisabled(true);
        setNoAddress("Brak danych do przesyłki. Uzupełnij profil!");
      } else {
        setUserAddress({ address: data.address, city: data.city, country: data.count, zipCode: data.zipCode, state: data.state, phoneNumber: data.phoneNumber })
        setNoAddress(false);
      }
    })
      .catch((error) => console.log(error.response.data.message ? error.response.data.message : error.response.data));
  }, [userInfo._id])

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map(item => {
        return {
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: { path: item.image ? (item.image.path ?? null) : null },
          quantity: item.quantity,
          count: item.count,

        }
      }),
      paymentMethod: paymentMethod
    }
    createOrder(orderData).then(data => {
      if (data) {
        navigate("/moje-konto/moje-zamowienia/szczegoly-zamowienia/" + data._id);
      }
    }).catch((error) => console.log(error));
  }

  const userPaymentMethod = (x) => {
    setPaymentMethod(x.target.value);
  }

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Szczegóły koszyka</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Adres wysyłki</h2>
              <b>Imię</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Adres</b>: {userAddress.address}, {userAddress.zipCode} {userAddress.city}, {userAddress.state} <br />
              <b>Telefon</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Sposób płatności</h2>
              <Form.Select onChange={userPaymentMethod}>
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
                <Alert className="mt-3" variant="danger">
                  Nie dostarczono. {noAddress}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Nie opłacono
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Zamównioe rzeczy</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <CartItem item={item} key={index} removeCartItemHandler={removeCartItemHandler} changeCount={changeCount} />
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
                <Button size="lg" onClick={orderHandler} variant="danger" type="button" disabled={buttonDisabled}>Zamawiam</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default UserCartDetailsPageComp;