import { Row, Col } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import AdminLinks from "../../../components/admin/adminLinks";

import { useState, useEffect } from "react";

import { logOut } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const OrderPageComp = ({ getOrders }) => {

  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getOrders().then((orders) => setOrders(orders))
      // .catch(er => console.log(er.response.data.message ? er.response.data.message : er.response.data))
      .catch((er) => dispatch(logOut()));
  }, [])

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>Zamówienia</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Użytkownik</th>
              <th>Data</th>
              <th>Cena</th>
              <th>Dostarczono</th>
              <th>Metoda płatności</th>
              <th>Szczegóły</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {order.user !== null ? (<>
                    {order.user.name} {order.user.lastName}
                  </>) : null}

                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDelivered ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link to={`/admin/zamowienia-szczegoly/${order._id}`}>zobacz zamówienie</Link>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default OrderPageComp