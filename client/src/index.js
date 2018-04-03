import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//ONLY FOR EMAIL TESTING PURPOSE: this allows to test email sending in the browser console:
//In the browser console type:
//const survey = {title: 'my title', subject: 'my subject', recipients: 'steveross1975@gmail.com', body: 'heres the body of the email'}

//and then
//axios.post('/api/surveys', survey);

import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  //Provider is a react-redux native component that allows each application component to interact with the app states
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
