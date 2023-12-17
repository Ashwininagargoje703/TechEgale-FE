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
import { api_url } from "../Api/api";

export default function CheckoutPage() {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("serviceToken");
  const navigate = useNavigate();

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
        `${api_url}/orders/createOrder`,
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
      navigate("/order-place");
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
          padding: 4,
          display: "flex",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <img
            src="https://www.marketing91.com/wp-content/uploads/2022/03/How-does-Cash-on-Delivery-Work.jpg"
            alt="Cash On Delivery"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Paper elevation={3} sx={{ width: "50%", padding: 4 }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
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
