import React, { useState } from 'react';
import styles from './ChatBoard.css';

export default function Login(props) {
  const [status, changeLoginStatus] = useState(true);
  const [user, updateInfo] = useState('');

  return (
    <div className="login">
      <button
        type="button"
        onFocus={() => changeLoginStatus(!status)}
        onClick={() => changeLoginStatus(!status)}
      >
        login
      </button>
      <input
        className={status === true ? styles.closed : styles.open}
        onChange={(e) => updateInfo(e.target.value)}
        type="text"
      />
      <button
        type="button"
        onClick={() => props.login(user)}
        className={status === true ? styles.closed : styles.open}
      >
        enter
      </button>
    </div>
  );
}
