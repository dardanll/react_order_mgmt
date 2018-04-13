import React from 'react';

export default ({ input, children, meta: {touched, error } }) => {
    return (<div>
      <select {...input}> {children} </select>
      {touched && error && <span style={{color: 'red'}}>{error}</span>}
    </div>)
  }