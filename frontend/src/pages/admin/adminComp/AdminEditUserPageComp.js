import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"


const AdminEditUserPageComp = ({ editUserByAdmin, getUserDataToEdit }) => {

  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateUserByAdmin, setUpdateUserByAdmin] = useState({ message: "", error: "" });


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const isAdmin = form.isAdmin.checked;
    if (event.currentTarget.checkValidity() === true) {
      editUserByAdmin(id, name, lastName, email, isAdmin).then(data => {
        if (data === "Profil użytkownika został zaaktualizowany!") {
          navigate("/admin-konto-urzytkownika");
        }
      })
        .catch(error => {
          setUpdateUserByAdmin({ error: error.response.data.message ? error.response.data.message : error.response.data });
        })
    }

    setValidated(true);
  };

  useEffect(() => {
    getUserDataToEdit(id)
      .then(data => {
        setUserData(data);
        setIsUserAdmin(data.isAdmin);
      })
      .catch((error) => console.log(error.response.data.message ? error.response.data.message : error.response.data));
  }, [id])

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin-konto-urzytkownika" className="btn btn-info my-3">
            Powrót
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edytuj profil użytkownika</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Imię</Form.Label>
              <Form.Control name="name" required type="text" defaultValue={userData.name} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicLastName"
            >
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                defaultValue={userData.lastName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control name="email" required type="email" defaultValue={userData.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fromBasicCheckbox">
              <Form.Check name="isAdmin" type="checkbox" label="Admin" checked={isUserAdmin} onChange={(e) => setIsUserAdmin(e.target.checked)} />
            </Form.Group>


            <Button variant="primary" type="submit">
              Zaaktualizuj
            </Button>
            {updateUserByAdmin.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminEditUserPageComp;