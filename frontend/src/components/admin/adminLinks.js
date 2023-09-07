import { Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import { logOut } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const AdminLinks = () => {

  const dispatch = useDispatch();

  return (
    <Navbar bg="light" variant="light">
      <Nav className="flex-column">

        <LinkContainer to="/admin-zamowienia">
          <Nav.Link>
            Zamównienia
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin-produkty">
          <Nav.Link>
            Produkty
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin-konto-urzytkownika">
          <Nav.Link>
            Użytkownicy
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin-chat">
          <Nav.Link>
            Czat
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin-statystyki">
          <Nav.Link>
            Statystki
          </Nav.Link>
        </LinkContainer>

          <Nav.Link onClick={() => dispatch(logOut())}>
            Wyloguj
          </Nav.Link>


      </Nav>
    </Navbar>

  )
}

export default AdminLinks