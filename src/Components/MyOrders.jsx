import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const token = cookie.get("serviceToken");
  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://techegle-production.up.railway.app//orders/getMyOrders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setOrders(response.data.data);
      }
      console.log("data my data", response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleRowClick = (orderId) => {
    navigate(`/OrderDetails/${orderId}`);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "Placed";
      case 2:
        return "On Way";
      case 3:
        return "Pending";
      case 4:
        return "Dispatched";
      default:
        return "Unknown Status";
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment Mode</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.id}
                onClick={() => handleRowClick(order._id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{order?.paymentMode}</TableCell>
                <TableCell>
                  {new Date(order?.createdAt).toLocaleString("en-US")}
                </TableCell>
                <TableCell>Rs.{order?.totalMrp}</TableCell>
                <TableCell>{getStatusLabel(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrders;
