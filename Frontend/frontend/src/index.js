import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom"

// ### Application Context Variable for logged User ###
import { LoggedUserProvider } from './context/UserContext';
import { Provider } from 'react-redux';
import store from './app/store'
import { LoggedUserTypeProvider } from './accountTypeContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoggedUserProvider>
      <LoggedUserTypeProvider>
        <Provider store={store}>
          <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
            </Elements>
          </BrowserRouter>
        </Provider>
      </LoggedUserTypeProvider>
    </LoggedUserProvider>
  </React.StrictMode>
);
