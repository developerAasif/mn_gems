import "./orderDetails.scss";

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";


import { Button, styled } from '@mui/material';

import Loader from "../Loader/Loader";
import Session from "../../utils/session";
import { LOADER } from "../../redux/constants/otherConstant";
import { orderPlace } from "../../redux/actions/cartActions";
import { toast } from "react-hot-toast";



const ViewAllButton = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  backgroundColor: '#2874f0',
  borderRadius: '2px',
  fontSize: '15px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
  }
}));


const OrderDetails = () => {
  const user = Session.getSession('auth');
  const params = useParams();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const { loader } = useSelector(state => state?.loader);

  const [iframeOpen, setIframeOpen] = useState(false)

  const location = useLocation();
  const dispatch = useDispatch();
  var data = location?.state;


  const trackOrder = (trak_link) =>{
    navigate('/order/track',{state:trak_link})
  }

  const payment = async (e) => {
    const orders = data?.products
    dispatch({ type: LOADER, payload: true });

    var payload = {
      "customer_id": '',
      "address": data?.address,
      "lat": data?.lat,
      "long": data?.long,
      "total": data?.total,
      "products": orders
    }

    const res = await dispatch(orderPlace(payload))
    console.log('ressss=>>>>', res)
    if (res.status == 200) {
      toast.success(res.message)
      window.open(res?.result?.paymentUrl, '_self')
      dispatch({ type: LOADER, payload: true });
    } else {
      console.log('else==>>>>', res?.message)
      toast.error(res.response.data.message)
    }
  }


  console.log('order details==>>>>>', data)



  return (
    <section className="orderDetails">
      {
        iframeOpen && <iframe src={data?.track_link} height='100vh' width='100%' />
      }
      {loader === false ? (
        <main>
        <>
          <div>
            <h1>Shipping</h1>
            <p>
              <b>Address</b>
              {`${data.address}`}
            </p>
          </div>
          <div>
            <h1>Contact</h1>
            <p>
              <b>Name</b>
              {user?.name}
            </p>
            <p>
              <b>Phone</b>
              {user?.mobile}
            </p>
          </div>

          <div>
            <h1>Status</h1>
            <p>
              <b>Order Status</b>
              {data?.order_status}
            </p>
            {
              data?.track_id && <p>
                <b>Track Id</b>
                {data?.track_id}
              </p>
            }
            {
              data?.track_link && <p>
                <b>Track Link</b>
                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={()=>trackOrder(data?.track_link)}> click here</span>
              </p>
            }
            <p>
              <b>Placed At</b>
              {data?.created_at.split("T")[0]}
            </p>
            <p>
              <b>Delivered At</b>
              {'Next 2 or 3 working days'}
            </p>
          </div>

          <div>
            <h1>Payment</h1>
            <p>
              <b>Payment Method</b>
              {data?.payment_method}
            </p>
            {/* <p>
              <b>Payment Reference</b>
              {data?.transaction_reference}
            </p> */}
            <p>
              <b>Payment Status</b>
              {data?.payment_status}
            </p>
            {
              data?.payment_status === 'unpaid' && <p>
                <ViewAllButton variant="contained" color="primary" onClick={payment}>Pay $25</ViewAllButton>
              </p>
            }

            {/* <p>
              <b>Paid At</b>
              {order.paymentMethod === "Online"
                ? order.paidAt.split("T")[0]
                : "NA"}
            </p> */}
          </div>

          <div>
            <h1>Amount</h1>
            {/* <p>
              <b>Items Total</b>₹{data?.total}
            </p>
            <p>
              <b>Shipping Charges</b>₹{order.shippingCharges}
            </p>
            <p>
              <b>Tax</b>₹{order.taxPrice}
            </p> */}
            <p>
              <b>Total Amount</b> <span style={{ color: 'green', fontSize: '20px' }} >${data?.total}</span>
            </p>
          </div>

          {/* <article>
            <h1>Ordered Items</h1>
            <div>
              <h4>Cheese Burger</h4>
              <div>
                <span>{data?.name}</span> x{" "}
                <span>{data.name}</span>
              </div>
            </div>
            <div>
              <h4>Veg Cheese Burger</h4>
              <div>
                <span>{data.dataItems.vegCheeseBurger.quantity}</span> x{" "}
                <span>{data.dataItems.vegCheeseBurger.price}</span>
              </div>
            </div>
            <div>
              <h4>Burger Fries</h4>
              <div>
                <span>{data.dataItems.burgerWithFries.quantity}</span> x{" "}
                <span>{data.dataItems.burgerWithFries.price}</span>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontWeight: 800,
                }}
              >
                Sub Total
              </h4>
              <div
                style={{
                  fontWeight: 800,
                }}
              >
                ₹{data.itemsPrice}
              </div>
            </div>

          </article> */}
          </>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default OrderDetails;
