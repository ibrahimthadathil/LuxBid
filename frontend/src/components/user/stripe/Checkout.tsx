import  { useCallback } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { joinPayment } from "@/service/Api/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import { orderPlacePayment } from "@/service/Api/orderApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
const location = useLocation()
const navigate = useNavigate()
const {price,title,img,id,placeOrder,address} = location.state 

      if(!location.state){
        navigate('/')
        return 
      }

const fetchClientSecret = useCallback(async() => {
  if(placeOrder)return await orderPlacePayment({ price, title, img, id, address })
    else return await joinPayment({ price, title, img, id })
  }, []);
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