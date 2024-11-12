import React, { Component } from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loader}>
        <Oval color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}

export default Loader;
