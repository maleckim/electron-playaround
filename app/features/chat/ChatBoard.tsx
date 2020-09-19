import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import TestChat from './TestChat';
import Login from './Login';
import { Link } from 'react-router-dom';
import styles from './ChatBoard.css';
import routes from '../../constants/routes.json';

const configuration = {
  iceServers: [{ url: 'stun:stun.1.google.com:19302' }],
};

export default function Test() {
  const [messages, addMessage] = useState<Array<string>>([]);
  const [offers, recentOffer] = useState([]);
  const [current, changeCurrent] = useState();
  const [user, currentUser] = useState();
  // eslint-disable-next-line

  const webSocket = useRef(null);
  // const ws = new WebSocket('ws://dirtdood.herokuapp.com:80');
  // {"type":"login","name","fartbutt"}
  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:9000');
    webSocket.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      addMessage((prev) => [...prev, data.message]);
      recentOffer((prev) => [...prev, data.offer]);
    };
    webSocket.current.onclose = () => {
      webSocket.current.close();
    };
  }, []);

  const sendMessage = (message) => {
    recentOffer((prev) => [...prev, message]);
    webSocket.current.send(message);
  };

  const attemptLogin = (data) => {
    currentUser(data);
    webSocket.current.send(JSON.stringify({ type: 'login', name: `${data}` }));
  };
  return (
    <>
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
      <Login login={attemptLogin} />
      <div className="text-box">
        <TestChat messages={offers} />
      </div>
      <div className={styles.chatText}>
        <form onSubmit={() => sendMessage(`${user}: ${current}`)}>
          <input
            id="chat-text"
            type="text"
            onChange={(e) => changeCurrent(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}
