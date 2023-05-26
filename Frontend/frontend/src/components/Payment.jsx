import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log(submitError);
    }
    const pay = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/donordonation`,

      },
    });

    console.log('pay in testcontract', pay);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <PaymentElement />
      {error && <div>{error}</div>}
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="2rem">
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '40%' }}
        >
          Pay
        </Button>
      </Box>
    </form>
  );
};

const Payment = ( {amount} ) => {
  const [clientSecret, setClientSecret] = useState(null);
  const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

  const stripe = useStripe();

  useEffect(() => {
    const fetchClientSecret = async () => {
      console.log("in payment", amount)
      const int = parseInt(amount)
      console.log("in payment", int)
      try {
        // const { data } = await axios.post(
        //   'http://localhost:9002/contract/payment/645faafa644cb019176b97ff',

        //   { headers: { 'x-auth-token': token } },
        // );
        const { data } = await axios.post(
          `http://localhost:5000/donorDonations/makePayment/`, int,
        );
        console.log('data', data);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientSecret();
  }, []);

  const appearance = {
    theme: 'night',
  };
  const options = {
    clientSecret: `${clientSecret}`,
    appearance,

  };
  return (
    <Box>
      {/* <h1>Test Contract</h1>
      <Button onClick={() => console.log(clientSecret)}>Log client secret</Button> */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      )}
    </Box>
  );
};

export default Payment;
