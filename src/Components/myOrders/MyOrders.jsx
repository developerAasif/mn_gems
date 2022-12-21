import "./table.scss";

import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader/Loader";
import { getOrders } from "../../redux/actions/cartActions";
import Session from "../../utils/session";
import { Box } from "@mui/system";
import MobileMyOrders from "./MobileMyOrders";


const MyOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(state => state.cart?.orders);
  const { loader } = useSelector(state => state?.loader);
  

  useEffect(() => {
    const user = Session.getSession('auth');
    if (user) {
      dispatch(getOrders(user.id))
    }
  }, [])





  return (
    <>
    <section className="tableClass">
      {loader === false ? (
        
        <MobileMyOrders products={orders} />
        
      ) : (
        <Loader />
      )}
    </section>


</>
  );
};

export default MyOrders;




{/* <main>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.map((item, i) => (
                  <>
                    {
                      item?.payment_status !== 'unpaid' &&
                      <tr key={i}>
                        <td>#{item.order_id}</td>
                        <td>  {moment(item?.created_at).format("LLL") || ""}</td>
                        <td>${item.total}</td>
                        <td>{item?.order_status}</td>
                        <td>{item?.payment_status}</td>
                        <td>
                          <Link to={`/order/details`} state={item}>
                            <AiOutlineEye />
                          </Link>
                        </td>
                      </tr>
                    }

                  </>
                ))}
            </tbody>
          </table>

          <Box>
            <MobileMyOrders products={orders} />
          </Box>
        </main> */}
