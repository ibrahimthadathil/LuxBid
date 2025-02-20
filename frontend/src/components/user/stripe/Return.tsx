import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderStatus } from "@/service/Api/orderApi";
import { getSessionStatus } from "@/service/Api/userApi";
import { CheckCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const navigate = useNavigate()
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get('session_id');
  const AuctionId = urlParams.get('aid');
  const order = urlParams.get('order');

  

  useEffect(() => {
    if (!sessionId || !AuctionId) {
      navigate('/');
      return;
    }
  }, [sessionId,AuctionId,navigate])

  const fetchSessionStatus = useCallback(async () => {
    try {
      alert(order)
        if(order){
          const response = await getOrderStatus(sessionId as string,AuctionId as string)
          if (response.success) {
            setStatus(response.data.status);
            setCustomerEmail(response.data.customer_email);
            toast.success(response.message)
          } 
        }
        else if (sessionId && AuctionId&& !order) {
        const response = await getSessionStatus(sessionId, AuctionId);  
        if (response.success) {
          setStatus(response.data.status);
          setCustomerEmail(response.data.customer_email);
        }   
        }
    } catch (error) {
      console.error('Failed to fetch session status:', error);
    }
  }, []); 

  useEffect(() => {
    fetchSessionStatus();
  }, [fetchSessionStatus]);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <div className="flex items-center justify-center h-screen ">
      <Card className="w-full max-w-md h-auto mx-auto bg-neutral-900 text-white">
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold text-center ">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center ">
            Thank you for joining! A confirmation email will be sent to{' '}
            <span className="font-medium">{customerEmail}</span>.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" variant="outline" onClick={() => !order?navigate('/deals/auction/bids',{state:{AuctionId}}):navigate('/user/orders/winnings')}>
            Continue
          </Button>
          <p className="text-sm text-center text-gray-500">
            If you have any questions, please email{' '}
            <a
              href="mailto:orders@example.com"
              className="font-medium text-blue-600 hover:underline"
            >
              orders@example.com
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
    
    )
  }

  return null;
};

export default Return;