import React from 'react';
//import { reduxForm, Field } from 'redux-form'; //is an helper function that is able to communicate with the redux-store

export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
