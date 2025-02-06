import  { useCallback, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { joinPayment } from "@/service/Api/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "@/components/global/Loader"; // Import your loader component

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
const location = useLocation()
const navigate = useNavigate()
const {price,title,img,id} = location.state 

      if(!location.state){
        navigate('/')
        return 
      }

const fetchClientSecret = useCallback(async() => await joinPayment({price,title,img,id}), []);
const options = {fetchClientSecret};

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