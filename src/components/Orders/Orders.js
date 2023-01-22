import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { userContext } from "../../App";
import Order from "../Order/Order";
import SpinnerDiv from "../SpinnerDiv/SpinnerDiv";
import "./Orders.css";

const Orders = ({ allOrders }) => {
  const [loggedInUser] = useContext(userContext);

  const [orders, setOrders] = useState([]);

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const url = allOrders
      ? "https://one-click-shopping-server.vercel.app/allOrders"
      : `https://one-click-shopping-server.vercel.app/orders?email=${loggedInUser.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const sortData = sortArr(data);
        setOrders(sortData);
        setShowSpinner(false);
      });
  }, [loggedInUser.email, allOrders]);

  const sortArr = (arr) => {
    const innerArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      innerArr.push(arr[i]);
    }
    return innerArr;
  };

  return (
    <Container className={allOrders || "mt-5"}>
      <h1 className="mb-3">{allOrders ? "All" : "Your"} Orders</h1>
      {orders.length > 0 ? (
        <div className="orders p-2">
          <Row className="mb-3 pb-2 pt-3 orders-headers border-bottom">
            <h6 className="col-5 text-muted">name</h6>
            <h6 className="col-2 text-muted text-center">weight</h6>
            <h6 className="col-2 text-muted text-center">price</h6>
            <h6 className="col-3 text-muted text-right">Order Date</h6>
          </Row>
          {orders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
        </div>
      ) : showSpinner ? (
        <SpinnerDiv />
      ) : (
        <h3 className="text-center text-muted mt-5">You Have No orders..</h3>
      )}
    </Container>
  );
};

export default Orders;
