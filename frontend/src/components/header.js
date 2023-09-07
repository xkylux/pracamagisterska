import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCategories } from '../redux/actions/catAction';
import { setHeadsBubbles, setAdminSocket, adminMessageNotification, deleteInactiveHeadsBubbles } from '../redux/actions/chatActions';
import socketIOClient from "socket.io-client";


const Header = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const numberOfItems = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);
  const { adminMsgNotification } = useSelector((state) => state.chat);

  const [headerCategoryName, setHeaderCategoryName] = useState("Wszystkie kategorie");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])

  const searchProducts = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (headerCategoryName === "Wszystkie kategorie") {
        navigate(`/lista-porduktow/szukaj/${searchQuery}`);
      } else {
        navigate(`/lista-porduktow/kategoria/${headerCategoryName.replace(/\//g, ",")}/szukaj/${searchQuery}`);
      }
    } else if (headerCategoryName !== "Wszystkie kategorie") {
      navigate(`/lista-porduktow/kategoria/${headerCategoryName.replace(/\//g, ",")}`);
    } else {
      navigate("/lista-porduktow");
    }
  }

  useEffect(() => {
    if (userInfo.isAdmin) {
      var notificationSample = new Audio("/message-sound/admin_notification.wav");
      const socket = socketIOClient();
      socket.emit("admin connected with server", "Admin" + Math.floor(Math.random() * 1000000000000));
      socket.on("server sendig client message to admin", ({ user, message }) => {
        dispatch(setAdminSocket(socket));
        dispatch(setHeadsBubbles(user, message));
        dispatch(adminMessageNotification(true));
        notificationSample.play();
      })
      socket.on("disconnected", ({ reason, socketId }) => {
        // console.log(socketId, reason)
        dispatch(deleteInactiveHeadsBubbles(socketId));
      })
      return () => socket.disconnect();
    }
  }, [userInfo.isAdmin])

  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">VarietyWebMart</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title={headerCategoryName}>
                <Dropdown.Item onClick={() => setHeaderCategoryName("Wszystkie kategorie")}>Wszystkie kategorie</Dropdown.Item>
                {categories.map((category, id) => (
                  <Dropdown.Item key={id} onClick={() => setHeaderCategoryName(category.name)}>{category.name}</Dropdown.Item>
                ))}
              </DropdownButton>
              <Form.Control onKeyUp={searchProducts} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="czego szukasz?" />
              <Button onClick={searchProducts} variant="warning">
                <i className="bi bi-search text-dark"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo.isAdmin ? (
              <LinkContainer to="/admin-zamowienia">
                <Nav.Link>Admin
                  {adminMsgNotification && <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>}

                </Nav.Link>
              </LinkContainer>
            ) : userInfo.name && !userInfo.isAdmin ? (
              <NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey="/moje-konto/moje-zamowienia" as={Link} to="/moje-konto/moje-zamowienia">Moje zamówienia</NavDropdown.Item>
                <NavDropdown.Item eventKey="/moje-konto" as={Link} to="/moje-konto">Moje konto</NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logOut())}>Wyloguj</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/logowanie">
                  <Nav.Link>Zaloguj
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/rejestracja">
                  <Nav.Link>Zarejestruj
                  </Nav.Link>
                </LinkContainer>
              </>
            )}


            {/* <Nav.Link href="#pricing">
              <Badge pill bg="danger">
                2
              </Badge>
              Koszyk</Nav.Link> */}



            <LinkContainer to="/koszyk">
              <Nav.Link>

                <Badge pill bg="danger">
                  {numberOfItems === 0 ? "" : numberOfItems}
                </Badge>
                <i className="bi bi-basket3"></i>
                <span className="ms-1">Koszyk</span>

              </Nav.Link>
            </LinkContainer>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header;