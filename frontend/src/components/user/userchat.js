import "../../chat.css"
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

const UserChat = () => {

  const [socket, setSocket] = useState(false);
  const [chat, setChat] = useState([]);
  const [messageNotification, setMessageNotification] = useState(false);
  const [chatStatus, setChatStatus] = useState(false);
  const [reconect, setReconect] = useState(false);

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      setReconect(false);
      var notificationSample = new Audio("/message-sound/notification.wav");
      const socket = socketIOClient();
      socket.on("no admin", (msg) => {
        setChat((chat) => {
          return [...chat, { admin: "Chwilowo brak obsługi klienta..." }];
        })
      })

      socket.on("server sendig admin message to client", (msg) => {
        setChat((chat) => {
          return [...chat, { admin: msg }];
        })
        setMessageNotification(true);
        notificationSample.play();
        const previousMessage = document.querySelector(".chat-history");
        previousMessage.scrollTop = previousMessage.scrollHeight;
      });
      setSocket(socket);
      socket.on("admin leave chat", () => {
        setChat([]);
        setChatStatus("Administrator opuścił chat. Napisz kolejną wiadomość by nawiązać połączenie.");
        setReconect(true);
      })
      return () => socket.disconnect();
    }
  }, [userInfo.isAdmin, reconect])

  const userIsSendingMessage = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    setChatStatus("");
    setMessageNotification(false);
    const msg = document.getElementById("userChatMessage");
    let x = msg.value.trim();
    if (x === "" || x === null || x === false || !x) {
      return;
    }
    socket.emit("user sending message", x);
    setChat((chat) => {
      return [...chat, { client: x }];
    });
    msg.focus();
    setTimeout(() => {
      msg.value = "";
      const previousMessage = document.querySelector(".chat-history");
      previousMessage.scrollTop = previousMessage.scrollHeight;
    }, 200)
  };

  return !userInfo.isAdmin ? (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots open"></i>
        {messageNotification && <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>}

        <i className="bi bi-x-circle close"></i>
      </label>

      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Skontaktuj się z nami!</h6>
        </div>


        <div className="chat-field">
          <div className="chat-history">
            <p>{chatStatus}</p>
            {chat.map((item, id) => (
              <div key={id}>
                {item.client && (
                  <p>
                    <b>Klient:</b> {item.client}
                  </p>
                )}
                {item.admin && (
                  <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>Admin:</b> {item.admin}
                  </p>
                )}

              </div>
            ))}



          </div>
          <textarea
            onKeyUp={(e) => userIsSendingMessage(e)}
            id="userChatMessage"
            className="chat-message"
            placeholder="Twoja wiadomość"
          ></textarea>
          <div><button onClick={(e) => userIsSendingMessage(e)} className="btn btn-success btn-block" >Wyslij</button></div>

        </div>
      </div>
    </>

  ) : null;
};

export default UserChat