import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Card, CardContent, Grid, Box } from "@mui/material";
import { Cookies } from "react-cookie";
import { api_url } from "../api";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const cookie = new Cookies();
  const token = cookie.get("serviceToken");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${api_url}/orders/getOrderDetails/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(response.data.data);
        console.log("data", response.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box sx={{ m: 10 }}>
        <Typography variant="h4" mb={2}>
          Order Details
        </Typography>

        {orderDetails.map((data, index) => (
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 5,
            }}
          >
            <Box>
              <Typography fontSize={18} fontWeight={600}>
                Shipping Address
              </Typography>

              <Typography>
                <strong>Name :</strong>
                {data.name}
              </Typography>

              <Typography>
                <strong>Phone :</strong>
                {data.address.phoneNumber}
              </Typography>

              <Typography>{data.address.address}</Typography>

              <Typography>
                {data.address.city}, {data.address.landmark}
              </Typography>
              <Typography>
                {data.address.state}, {data.address.pincode}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={18} fontWeight={600}>
                Additional Info
              </Typography>
              {data.products.map((product, index) => (
                <div key={index}>
                  <p>{product.title}</p>
                  <p>
                    Rs
                    {data.totalMrp}
                  </p>
                </div>
              ))}
            </Box>

            <Box>
              <Typography fontSize={18} fontWeight={600}>
                Pyment mode
              </Typography>
              <Typography>Cash On Delivery</Typography>
              <Typography>
                <strong>Product Amount:</strong> Rs
                {data.totalMrp}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default OrderDetails;
