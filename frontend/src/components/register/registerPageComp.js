import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { useState } from "react";

const RegisterPageComp = ({ registerUserRequest, reduxDispatch, setReduxUserState }) => {
  const [validated, setValidated] = useState(false);
  const [registerState, setRegisterState] = useState({ success: "", error: "", loading: false });
  const [samePassword, setSamePassword] = useState(true);

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
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    if (event.currentTarget.checkValidity() === true && email && password && name && lastName && form.password.value === form.confirmPassword.value) {
      setRegisterState({ loading: true });
      registerUserRequest(name, lastName, email, password)
        .then((data) => {
          setRegisterState({ success: data.success, loading: false });
          reduxDispatch(setReduxUserState(data.userCreated));
        }).catch((error) => setRegisterState({ error: error.response.data.message ? error.response.data.message : error.response.data }));
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Rejestarcja</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Imię</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Imię"
                name="name"
              />
              <Form.Control.Feedback type="invalid">Wprowadź imię!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nazwisko"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">Wprowadź nazwisko!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="e-mail"
                name="email"
              />
              <Form.Control.Feedback type="invalid">Wprowadź e-mail!</Form.Control.Feedback>
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

            <Row className="pb-2">
              <Col>
                Masz już konto?
                <Link to="/logowanie">  Zaloguj</Link>
              </Col>

            </Row>

            <Button type="submit">
              {registerState && registerState.loading === true ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : ("")}

              Zarejestruj
            </Button>

            <Alert show={registerState && registerState.error === "Użytkownik o takim e-mailu już istnieje!"} variant="danger">
              Użytkownik o takim e-mailu już istnieje.
            </Alert>

            <Alert show={registerState && registerState.success === "Konto zostało utworzone!"} variant="info">
              Konto zostało utworzone.
            </Alert>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPageComp