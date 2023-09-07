import { Fragment, useState, useEffect } from "react";
import { Toast, ToastBody, ToastHeader, Form, Button } from "react-bootstrap";
import { adminMessageNotification } from "../../redux/actions/chatActions";
import { useDispatch } from "react-redux";

const AdminHeadsBubbles = ({ headsBubbles, socket, bubbleIndex, socketUser }) => {

  const dispatch = useDispatch();

  [window["bubble" + bubbleIndex], window["closeBubble" + bubbleIndex]] = useState(true);
  const [refresHtml, setRefresHtml] = useState(false);

  const closeBubble = (socketId) => {
    window["closeBubble" + bubbleIndex](false);
    socket.emit("admin leave chat", socketId);
  }

  const adminIsSendingMessage = (x, xelement) => {
    x.preventDefault();
    if (x.keyCode && x.keyCode !== 13) {
      return;
    }
    const msg = document.getElementById(xelement);
    let y = msg.value.trim();
    if (y === "" || y === null || y === false || !y) {
      return;
    }
    headsBubbles[1].push({ admin: msg.value });
    socket.emit("admin sending message", {
      user: socketUser,
      message: y,
    })
    setRefresHtml(!refresHtml);
    msg.focus();
    dispatch(adminMessageNotification(false));
    setTimeout(() => {
      msg.value = "";
      const previousMessage = document.querySelector(`.userChatMessage${socketUser}`);
      if (previousMessage) previousMessage.scrollTop = previousMessage.scrollHeight;
    }, 200)
  }

  useEffect(() => {
    const userChatMessages = document.querySelector(`.userChatMessage${socketUser}`);
    if (userChatMessages) userChatMessages.scrollTop = userChatMessages.scrollHeight;
  })


  return (
    <>
    {/* show={"bubble" + bubbleIndex} */}
      <Toast show={window["bubble" + bubbleIndex]} onClose={() => closeBubble(headsBubbles[0])} className="ms-4 mb-5">
        <ToastHeader>
          <strong className="me-auto">
            Chat z Użytkownik
          </strong>
        </ToastHeader>
        <ToastBody>

          <div className={`userChatMessage${socketUser}`} style={{ maxHeight: "500px", overflow: "auto" }}>
            {headsBubbles[1].map((msg, index) => (
              <Fragment key={index}>
                {msg.client && (
                  <p key={index} className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>Klient:</b> {msg.client}
                  </p>
                )}

                {msg.admin && (
                  <p key={index}>
                    <b>Admin:</b> {msg.admin}
                  </p>
                )}


              </Fragment>
            ))}
          </div>

          <Form>
            <Form.Group
              className="mb-3"
              controlId={`adminChatMessage${bubbleIndex}`}
            >
              <Form.Label>Napisz wiadomość</Form.Label>
              <Form.Control onKeyUp={(x) => adminIsSendingMessage(x, `adminChatMessage${bubbleIndex}`)} as="textarea" rows={2} />
            </Form.Group>
            <Button onClick={(x) => adminIsSendingMessage(x, `adminChatMessage${bubbleIndex}`)} variant="success" type="submit">
              Wyślij
            </Button>
          </Form>

        </ToastBody>
      </Toast>
    </>
  )
};

export default AdminHeadsBubbles