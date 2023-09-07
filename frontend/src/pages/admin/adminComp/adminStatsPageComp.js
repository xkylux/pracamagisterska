import { Col, Row, Form } from "react-bootstrap"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import AdminLinks from "../../../components/admin/adminLinks";
import { useState, useEffect } from "react";


const AdminStatsPageComp = ({ getSecoundDataForStatistics, getFirstDataForStatistics, socketIOClient }) => {

  const [firstDateForStatistics, setFirstDateForStatistics] = useState(new Date().toISOString().substring(0, 10));
  var previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const [secondDateForStatistics, setSecondDateForStatistics] = useState(new Date(previousDay).toISOString().substring(0, 10));

  const [preparedDataFromFirstDay, setPreparedDataFromFirstDay] = useState([]);
  const [preparedDataFromSecoundDay, setPreparedDataFromSecoundDay] = useState([]);

  useEffect(() => {
    const socket = socketIOClient();
    let presentDay = new Date().toDateString();
    const operate = (newOrder) => {
      var orderDate = new Date(newOrder.createdAt).toLocaleString("pl-PL", { hour: "numeric", hour12: true, timeZone: "UTC" });
      if (new Date(newOrder.createdAt).toDateString() === presentDay) {
        if (presentDay === new Date(firstDateForStatistics).toDateString()) {
          setPreparedDataFromFirstDay((prev) => {
            if (prev.length === 0) {
              return [{ name: orderDate, [firstDateForStatistics]: newOrder.orderTotal.cartSubtotal }];
            }
            const length = prev.length;
            if (prev[length - 1].name === orderDate) {
              prev[length - 1][firstDateForStatistics] += newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              var lastElem = { name: orderDate, [firstDateForStatistics]: prev[length - 1][firstDateForStatistics] + newOrder.orderTotal.cartSubtotal };
              return [...prev, lastElem];
            }
          })
        } else if (presentDay === new Date(secondDateForStatistics).toDateString()) {
          setPreparedDataFromSecoundDay((prev) => {
            if (prev.length === 0) {
              return [{ name: orderDate, [secondDateForStatistics]: newOrder.orderTotal.cartSubtotal }];
            }
            const length = prev.length;
            if (prev[length - 1].name === orderDate) {
              prev[length - 1][secondDateForStatistics] += newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              var lastElem = { name: orderDate, [secondDateForStatistics]: prev[length - 1][secondDateForStatistics] + newOrder.orderTotal.cartSubtotal };
              return [...prev, lastElem];
            }
          })
        }
      }
    }
    socket.on("newOrder", operate);
    return () => socket.off("newOrder", operate)
  }, [setPreparedDataFromFirstDay, setPreparedDataFromSecoundDay, firstDateForStatistics, secondDateForStatistics])

  useEffect(() => {
    const abctrl = new AbortController();
    getFirstDataForStatistics(abctrl, firstDateForStatistics)
      .then((data) => {
        let sumOfTheOrdersFromParticularDay = 0;
        const orders = data.map((order) => {
          sumOfTheOrdersFromParticularDay += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("pl-PL", { hour: "numeric", hour12: true, timeZone: "UTC" });
          return { name: date, [firstDateForStatistics]: sumOfTheOrdersFromParticularDay };
        })
        setPreparedDataFromFirstDay(orders);
      })
      .catch((error) => console.log(error.response.data.message ? error.response.data.message : error.response.data));

    getSecoundDataForStatistics(abctrl, secondDateForStatistics)
      .then((data) => {
        let sumOfTheOrdersFromParticularDay = 0;
        const orders = data.map((order) => {
          sumOfTheOrdersFromParticularDay += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("pl-PL", { hour: "numeric", hour12: true, timeZone: "UTC" });
          return { name: date, [secondDateForStatistics]: sumOfTheOrdersFromParticularDay };
        })
        setPreparedDataFromSecoundDay(orders);
      })
      .catch((error) => console.log(error.response.data.message ? error.response.data.message : error.response.data));
    return () => abctrl.abort();
  }, [firstDateForStatistics, secondDateForStatistics])

  const firstDateSetter = (e) => {
    setFirstDateForStatistics(e.target.value);
  }

  const secondDateSetter = (e) => {
    setSecondDateForStatistics(e.target.value);
  }

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>Podsumowanie sprzedażowe {firstDateForStatistics} - {secondDateForStatistics}</h1>
        <Form.Group controlId="firstDateForStatistics">
          <Form.Label>Wprowadź pierwszą datę</Form.Label>
          <Form.Control
            onChange={firstDateSetter}
            type="date"
            name="dateFromToSet"
            placeholder="Data od"
            defaultValue={firstDateForStatistics}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateForStatistics">
          <Form.Label>Wprowadź drugą datę</Form.Label>
          <Form.Control
            onChange={secondDateSetter}
            type="date"
            name="dateToToSet"
            placeholder="Data do"
            defaultValue={secondDateForStatistics}
          />
        </Form.Group>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Czas", offset: 50, position: "insideBottomRight", }} allowDuplicatedCategory={false} />
            <YAxis label={{ value: "Przychód zł", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {preparedDataFromFirstDay.length > preparedDataFromSecoundDay.length ? (
              <>
                <Line
                  data={preparedDataFromFirstDay}
                  type="monotone"
                  dataKey={firstDateForStatistics}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line data={preparedDataFromSecoundDay} type="monotone" dataKey={secondDateForStatistics} stroke="#82ca9d" strokeWidth={4} />
              </>
            ) : (
              <>
                <Line
                  data={preparedDataFromSecoundDay}
                  type="monotone"
                  dataKey={secondDateForStatistics}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line data={preparedDataFromFirstDay} type="monotone" dataKey={firstDateForStatistics} stroke="#82ca9d" strokeWidth={4} />
              </>
            )}

          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default AdminStatsPageComp;