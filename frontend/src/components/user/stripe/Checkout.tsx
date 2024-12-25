import  { useCallback } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { joinPayment } from "@/service/Api/userApi";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
const location = useLocation()
const {price,title,img,id} = location.state 

const fetchClientSecret = useCallback(async() => await joinPayment({price,title,img,id}), []);


const options = {fetchClientSecret};
console.log(     'sdfsdf:-',options  )

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default Checkout

