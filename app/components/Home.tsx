import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Electron/Websocket Playaround</h2>
      <Link to={routes.TEST}>woo</Link>
    </div>
  );
}
