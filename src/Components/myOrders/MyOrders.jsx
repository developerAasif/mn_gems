import "./table.scss";

import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader/Loader";


const MyOrders = () => {
  const dispatch = useDispatch();

  const { count, carts, total } = useSelector(state => state.cart?.cartItems);
  const { loader } = useSelector(state => state?.loader);





  return (
    <section className="tableClass">
      {loader === false ? (
        <main>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Name</th>
                <th>Item Qty</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {carts &&
                carts.map((i) => (
                  <tr key={i.id}>
                    <td>#{i.id}</td>
                    <td>{i.product_detail?.name}</td>
                    <td> {i.qty} </td>
                    <td>{i.current_price}</td>
                    <td>ONLINE</td>
                    <td>
                      <Link to={`/order/${i.id}`}>
                        <AiOutlineEye />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default MyOrders;
