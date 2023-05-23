import { useState, useEffect } from "react";
import "./app.css";


import { useAuthContext } from '../../hooks/useAuthContext'
// This is the donor donation page.
// Lets  figure its stuff out!

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

const ProductDisplay = ({ donorId }) => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action={`${process.env.REACT_APP_BACKEND_BASE_ROUTE}/donorDonations/donate/${donorId}`} method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
)

const Donate = () => {


  const { user } = useAuthContext()
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);



    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay donorId={user?.user?._id} />
  );
}


export default Donate





