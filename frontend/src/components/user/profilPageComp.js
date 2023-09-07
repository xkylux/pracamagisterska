import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap"

import { useState, useEffect } from "react";

const ProfilPageComp = ({ userUpdateRequest, getUser, userInfo, setReduxUserState, dispatch, localStorage, sessionStorage }) => {
  const [validated, setValidated] = useState(false);
  const [userUpdateState, setUserUpdateState] = useState({ success: "", error: "" });
  const [samePassword, setSamePassword] = useState(true);
  const [user, setUser] = useState({})



  useEffect(() => {
    getUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id])

  const onChange = () => {
    const password = document.querySelector("input[name=password]")
    const confirmPassword = document.querySelector("input[name=confirmPassword]")
    if (confirmPassword.value === password.value) {
      setSamePassword(true);
    } else {
      setSamePassword(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const name = form.name.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;


    if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value) {
      userUpdateRequest(name, lastName, phoneNumber, address, country, zipCode, city, state, password).then(data => {
        setUserUpdateState({ success: data.success, error: "" });
        dispatch(setReduxUserState({ doNotLogout: userInfo.doNotLogout, ...data.userUpdated }));
        if (userInfo.doNotLogout) localStorage.setItem("userInfo", JSON.stringify({ doNotLogout: true, ...data.userUpdated }));
        else sessionStorage.setItem("userInfo", JSON.stringify({ doNotLogout: false, ...data.userUpdated }));
      })
        .catch((err) => setUserUpdateState({ error: err.response.data.message ? err.response.data.message : err.response.data }))
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Dane konta</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Imię</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.name}
                name="name"
              />
              <Form.Control.Feedback type="invalid">Wprowadź imię!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.lastName}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">Wprowadź nazwisko!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                disabled
                value={user.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationPhon">
              <Form.Label>Numer telefonu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numer telefonu"
                defaultValue={user.phoneNumber}
                name="phoneNumber"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationAdress">
              <Form.Label>Ulica i numer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adres zamieszkania"
                defaultValue={user.address}
                name="address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCountry">
              <Form.Label>Kraj</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kraj"
                defaultValue={user.country}
                name="country"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCode">
              <Form.Label>Kod pocztowy</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kod pocztowy"
                defaultValue={user.zipCode}
                name="zipCode"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCity">
              <Form.Label>Miasto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Miasto"
                defaultValue={user.city}
                name="city"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationState">
              <Form.Label>Województwo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Województwo"
                defaultValue={user.state}
                name="state"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom04">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Hasło"
                minLength={6}
                onChange={onChange}
                isInvalid={!samePassword}
              />
              <Form.Control.Feedback type="invalid">
                Wprowadź poprawne hasło!
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Hasło musi mieć conajmniej 6 znaków
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom05">
              <Form.Label>Powtórz hasło</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Powtórz hasło"
                minLength={6}
                onChange={onChange}
                isInvalid={!samePassword}
              />
              <Form.Control.Feedback type="invalid">
                Hasła muszą być takie same!
              </Form.Control.Feedback>
            </Form.Group>


            <Button variant="primary" type="submit">
              Zmień dane
            </Button>

            <Alert show={userUpdateState && userUpdateState.error !== ""} variant="danger">
              Użytkownik o takim adressie e-mail posiada już konto.
            </Alert>

            <Alert show={userUpdateState && userUpdateState.success === "user updated"} variant="info">
              Dane zostały zaaktualizowane.
            </Alert>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilPageComp