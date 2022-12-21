import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "./MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems: { carts, count, total } } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);

  const subtotal = carts.reduce(
    (acc, item) => acc + item.qty * item.current_price,
    0
  );



  let delevery_charge = 0;
  carts?.map(item => {
    delevery_charge += Number(item?.product_detail?.delivery_charge)
  })


  const shippingCharges = subtotal > 1000 ? 0 : delevery_charge;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges;
// console.log('addresss==>>>>>',shippingInfo)

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // history.push("/process/payment");
    navigate("/process/payment");
  };



  // console.log('cart itemsss=>>>>>>>>', carts)

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              {/* <div>
                <p>Name:</p>
                <span>{'test'}</span>
              </div> */}
              <div>
                <p>Name:</p>
                <span>{shippingInfo?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {carts &&
                carts.map((item, i) => (
                  <div key={i}>
                    <img src={item?.product_detail?.product_images[0]?.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item?.product_detail?.name}
                    </Link>{" "}
                    <span>
                      {item?.qty} X ₹{item?.current_price} ={" "}
                      <b>₹{item?.current_price * item?.qty}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              {/* <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div> */}
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
