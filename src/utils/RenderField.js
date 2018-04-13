import React from 'react';

export default ({ input, disabled, label, type, meta: { touched, error } }) => (
  <div> 
    <div>
      <input {...input} type={type} placeholder={label} disabled={disabled} />
      {touched && error && <span style={{color: 'red'}}>{error}</span>}
    </div>
  </div>
)