import { Col, Row } from "react-bootstrap"
import AdminLinks from "../../components/admin/adminLinks"
import AdminHeadsBubbles from "../../components/admin/adminHeadsBubbles"
import { useSelector } from "react-redux"

const AdminChatPage = () => {

  const { headsBubbles, socket } = useSelector((state) => state.chat);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <Row>
          {Object.entries(headsBubbles).map((headsBubbles, index) => (
            <AdminHeadsBubbles key={index} socket={socket} headsBubbles={headsBubbles} bubbleIndex={index + 1} socketUser={headsBubbles[0]} />
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default AdminChatPage