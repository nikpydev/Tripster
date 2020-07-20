import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllOrders } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const preload = () => {
    getAllOrders(userId, token).then((data) => {
      if (data) {
        if (data.error) {
          console.log("getAllOrders ERROR: ", data.error);
        } else {
          setOrders(data);
        }
      }
    });
  };

  useEffect(() => {
    preload();
  });

  return (
    <Base
      title="View All Orders"
      description="The Admin can view all the orders placed on the app."
    >
      <hr />
      {orders.map((order, index) => {
        const { status, _id, createdAt, updatedAt } = order;
        return (
          <div className="text-center" key={index}>
            <p>Order's ID: {_id}</p>
            <p>Order Status: {status}</p>
            <p>Created At: {createdAt}</p>
            <p>Updated At: {updatedAt}</p>
            <hr />
          </div>
        );
      })}
    </Base>
  );
};

export default ViewAllOrders;
