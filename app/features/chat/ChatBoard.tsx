import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ChatBoard.css';
import routes from '../../constants/routes.json';

export default function Test() {
  const [messages, addMessage] = useState<Array<string>>([
    'Welcome to the Chat',
  ]);
  const [text, updateText] = useState<string>();

  // eslint-disable-next-line
  const input: any = React.createRef();
  // eslint-disable-next-line
  let self: any = React.createRef();

  const ws = new WebSocket('ws://dirtdood.herokuapp.com:80');
  ws.addEventListener('message', (event) => {
    event.stopImmediatePropagation();
    const { data } = event;
    // const parsedData = JSON.parse(data);
    addMessage([...messages, data]);
  });

  const sendMessage = (event: React.FormEvent): void | boolean => {
    event.preventDefault();
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(input.current.value);
      return event.currentTarget.reset();
    }
    return false;
  };

  return (
    <>
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
      {messages.map((a, i) => (
        <p key={i || Math.random()}>{`Admin: ${a}`}</p>
      ))}
      <div className={styles.chatText}>
        <form onSubmit={(e: React.FormEvent) => sendMessage(e)}>
          <input id="chat-text" type="text" ref={input} />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}
