import { Row, Col } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const UserOrderPageComp = ({ getOrders }) => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then(orders => setOrders(orders))
      .catch((err) => console.log(err));
  }, [])

  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>Twoje zamówienia</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Użytkownik</th>
              <th>Data</th>
              <th>Cena</th>
              <th>Dostarczono</th>
              <th>Szczegóły</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Praca Magisterska</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDelivered ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                </td>
                <td>
                  <Link to={`/moje-konto/moje-zamowienia/szczegoly-zamowienia/${order._id}`}>zobacz zamówienie</Link>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default UserOrderPageComp;