import React from 'react';
import styles from '../styles/form';

export default ({ input, disabled, label, type, meta: { touched, error } }) => (
  <div> 
    <div>
      <input {...input} type={type} placeholder={label} disabled={disabled} />
      {touched && error && <span style={styles.errors}>{error}</span>}
    </div>
  </div>
)