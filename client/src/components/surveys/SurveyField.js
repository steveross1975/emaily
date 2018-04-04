import React from 'react';
//import { reduxForm, Field } from 'redux-form'; //is an helper function that is able to communicate with the redux-store

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div
        className="red-text"
        style={{ fontStyle: 'italic', fontWeight: 200, marginBottom: '20px' }}
      >
        {touched && error}
      </div>
    </div>
  );
};
