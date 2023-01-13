import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"

// ### Application Context Variable for logged User ###
import { LoggedUserProvider } from './context/UserContext';
import { Provider } from 'react-redux';
import store from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoggedUserProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LoggedUserProvider>
  </React.StrictMode>
);
