import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { api_url } from "../Api/api";

const Cart = () => {
  const [data, setData] = useState([]);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const token = cookie.get("serviceToken");

  const getTotalPrice = () => {
    return data.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleIncrement = (index) => {
    const updatedData = [...data];
    updatedData[index].quantity += 1;
    setData(updatedData);
  };

  const handleDecrement = (index) => {
    const updatedData = [...data];
    if (updatedData[index].quantity > 1) {
      updatedData[index].quantity -= 1;
      setData(updatedData);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${api_url}/products/getUserCart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.get(`${api_url}/products/removeCart?productId=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      getData(); // Refresh cart items after removal
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const Checkout = () => {
    const formattedProducts = data.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
    }));
    const ids = data.map((item) => item._id);
    const quantities = data.map((item) => item.quantity);
    const prices = data.map((item) => item.price);
    cookie.set("cartIds", ids);
    cookie.set("cartQuantities", quantities);
    cookie.set("cartPrices", prices);
    navigate("/checkout");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        {/* Left Side: Cart Items */}
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
          {data.length === 0 ? (
            <Box>
              <Typography variant="subtitle1">Your cart is empty.</Typography>
              <img
                src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif"
                alt="Empty Cart"
                style={{ width: "100%", height: "70vh" }}
              />
            </Box>
          ) : (
            data.map((item, index) => (
              <Card
                sx={{
                  display: "flex",
                  marginBottom: "20px", // Add margin bottom to create gap
                  width: "100%",
                }}
                key={item._id}
              >
                <Box sx={{ width: 200, height: 100 }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: 200,
                      height: 200,
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.title.substring(0, 25)}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Rs. {item.price.toFixed(2)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      height: 30,
                    }}
                  >
                    <Button
                      onClick={() => handleDecrement(index)}
                      sx={{
                        borderRadius: "0",
                        width: 10,
                      }}
                    >
                      -
                    </Button>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <Button
                      onClick={() => handleIncrement(index)}
                      sx={{
                        borderRadius: "0",
                        width: 10,
                      }}
                    >
                      +
                    </Button>
                  </Box>
                  <Button
                    onClick={() => removeFromCart(item._id)}
                    sx={{ height: 25 }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Card>
            ))
          )}
        </Grid>
        {data.length === 0 ? (
          <Grid item xs={4}>
            <Card
              sx={{
                p: 4,
                justifyContent: "center",
                display: "grid",
                mt: 7,
              }}
            >
              <img
                src="https://coralwebconcept.com/wp-content/uploads/2021/11/cart-abandonment.jpg"
                alt="img"
                style={{
                  width: "80%",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px", height: 50 }}
                onClick={() => navigate("/home")}
              >
                Continue Shopping
              </Button>
            </Card>
          </Grid>
        ) : (
          <Grid item xs={4}>
            <Card
              sx={{
                p: 4,
                justifyContent: "center",
                display: "grid",
                mt: 7,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Quantity: Rs {getTotalPrice().toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={Checkout}
              >
                checkout
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Cart;
