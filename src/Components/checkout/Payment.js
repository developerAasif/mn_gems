import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Iframe from 'react-iframe'

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { orderPlace } from "../../redux/actions/cartActions";
import { LOADER } from "../../redux/constants/otherConstant";
import Loader from '../Loader/Loader';
import { GiSeaTurtle } from "react-icons/gi";
import toast, { Toaster } from 'react-hot-toast';
// import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = ({ history }) => {

  const { loader } = useSelector(state => state?.loader);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [url, setUrl] = useState(false)
  console.log('order infoo==>>>>>', orderInfo)

  const dispatch = useDispatch();

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;




  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const orderItems = async () => {
    const orderItem = await cartItems?.carts?.map((item) => {
      return {
        "id": item?.product_id,
        "price": item?.current_price,
        "qty": item?.qty
      }
    })
    return orderItem;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const orders = await orderItems()
    dispatch({ type: LOADER, payload: true });

    var payload = {
      "customer_id": '',
      "address": address,
      "lat": "0.0",
      "long": "0.0",
      "total": orderInfo?.totalPrice,
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

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      {
        loader ? (<Loader />) : (
          <div className="paymentContainer">

            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Payment</Typography>

              <Typography style={{ fontSize: '16px' }}> Subtotal: <span style={{ color: 'green', fontSize: '20px' }}>${orderInfo?.subtotal}</span></Typography>
              <Typography style={{ fontSize: '16px' }}> Shipping Charges: <span style={{ color: 'green', fontSize: '20px' }}>${orderInfo?.shippingCharges}</span></Typography>

              <Typography>
                <span style={{ fontSize: '16px' }}>Pay -</span>
                <span style={{ color: 'green' }}>{` $${orderInfo && orderInfo.totalPrice}`}</span>
              </Typography>
              <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                // ref={payBtn}
                className="paymentFormBtn"
              />

            </form>

            <span style={{ color: 'gray' }}>clicl here to pay for your order</span>
          </div>
        )
      }
    </Fragment>
  );
};

export default Payment;
