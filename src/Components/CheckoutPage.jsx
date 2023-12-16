import { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Button,
  Container,
  DialogActions,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Cookies } from "react-cookie";

export default function CheckoutPage() {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("serviceToken");
  const location = useLocation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const cartIds = cookie.get("cartIds") || [];
      const cartQuantities = cookie.get("cartQuantities") || [];
      const cartPrices = cookie.get("cartPrices") || [];

      const formData = {
        address: {
          address: address || "",
          phoneNumber: phoneNumber || "",
          landmark: landmark || "",
          city: city || "",
          state: state || "",
          pincode: pincode || "",
        },
        products: cartIds.map((id, index) => ({
          _id: id,
          quantity: cartQuantities[index] || 0,
          price: cartPrices[index] || 0,
        })),
        paymentMode: "cod payment",
      };

      console.log("data", formData);
      const response = await axios.post(
        "https://techegle-production.up.railway.app//orders/createOrder",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order placed successfully:", response.data);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing the order:", error.message);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container
        sx={{
          minHeight: "100vh",
          padding: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ width: 600 }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              Cash On Delivery
            </Box>

            <Container>
              <ToastContainer />
              <form onSubmit={handleFormSubmit}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "center",
                    display: "grid",
                  }}
                >
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Enter landmark"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Enter state"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter pincode"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                      Place Order
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
