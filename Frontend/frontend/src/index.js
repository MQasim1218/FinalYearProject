import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"

// ### Application Context Variable for logged User ###
import { LoggedUserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoggedUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoggedUserProvider>
  </React.StrictMode>
);
