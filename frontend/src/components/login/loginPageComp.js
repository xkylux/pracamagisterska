import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { useState } from "react";

const LoginPageComp = ({ userLoginRequest, reduxDispatch, setReduxUserState }) => {

  const [validated, setValidated] = useState(false);
  const [userLoginState, setUserLoginState] = useState({ success: "", error: "", loading: false });

  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setUserLoginState({ loading: true });
      userLoginRequest(email, password, doNotLogout)
        .then((res) => {
          setUserLoginState({ success: res.success, loading: false, error: "" });

          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
          }

          if (res.success === "Użytkownik zalogowany" && !res.userLoggedIn.isAdmin) window.location.href = '/moje-konto'
          else window.location.href = '/admin-zamowienia'

        })
        .catch((err) => setUserLoginState({ error: err.response.data.message ? err.response.data.message : err.response.data }));
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Zaloguj się</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="validationCustom06">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="e-mail"
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom07">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Hasło"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom08">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Nie wylogowywuj"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Nie masz jeszcze konta?
                <Link to="/rejestracja">  Zarejestruj</Link>
              </Col>

            </Row>

            <Button variant="primary" type="submit">
              {userLoginState && userLoginState.loading === true ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : ("")}

              Zaloguj
            </Button>

            <Alert show={userLoginState && userLoginState.error === "Błędne dane!"} variant="danger">
              Błędny e-mail lub hasło!
            </Alert>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPageComp