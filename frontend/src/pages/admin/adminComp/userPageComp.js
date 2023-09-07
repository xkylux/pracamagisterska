import { Row, Col, Button } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
//import { Link } from "react-router-dom";
import AdminLinks from "../../../components/admin/adminLinks";
import { LinkContainer } from "react-router-bootstrap";

import { useState, useEffect } from "react";

import { logOut } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const UserPageComp = ({ getUsers, deleteUser }) => {

  const [users, setUsers] = useState([]);
  const [userDel, setUserDel] = useState(false);

  const dispatch = useDispatch();

  const deleteHandler = async (userId) => {
    if (window.confirm("Jesteś pewny?")) {
      const data = await deleteUser(userId);
      if (data === 'Profil użytkownika został usunięty!') {
        setUserDel(!userDel)
      }
    };
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    getUsers(abortCtrl).then(res => setUsers(res))
      // .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data));
      .catch((er) => dispatch(logOut()));
    return () => abortCtrl.abort();
  }, [userDel])

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>Użytkownicy</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>E-mail</th>
              <th>Admin</th>
              <th>Edytuj/Usuń</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                </td>
                <td>
                  <LinkContainer to={`/admin-konto-urzytkownika-edytuj/${user._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default UserPageComp