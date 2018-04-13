import React from 'react';
import styles from '../styles/form';

export default ({ input, children, meta: {touched, error } }) => {
    return (<div>
      <select {...input}> {children} </select>
      {touched && error && <span style={styles.errors}>{error}</span>}
    </div>)
  }