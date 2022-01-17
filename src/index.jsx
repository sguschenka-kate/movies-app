import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import { App } from './App.jsx';
import './index.scss';

const store = createStore(reducer)

ReactDOM.render(
  <React>
    <Provider store={store}>
      <App />
    </Provider>
  </React>,
  document.getElementById('root')
);
