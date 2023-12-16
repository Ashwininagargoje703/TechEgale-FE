import * as React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MultiActionAreaCard() {
  const [data, setData] = React.useState([]);
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const token = cookie.get("serviceToken");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://techegle-production.up.railway.app/products/getAllItems",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async (itemId) => {
    try {
      await axios.get(
        `https://techegle-production.up.railway.app/products/addItemToCart?productId=${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbarMessage("Successfully Added to cart");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {!userId ? (
        navigate("/login")
      ) : (
        <Grid
          container
          spacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ p: 10 }}
        >
          {data.map((e) => (
            <Grid item xs={6} sm={4} md={3} key={e._id}>
              <Card sx={{ height: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240" // Set the fixed height for the image
                    image={e.imageUrl}
                    maxHeight="100%"
                    alt="Product Image"
                  />

                  <CardContent>
                    <Typography gutterBottom fontWeight={600} fontSize={16}>
                      {e.title?.substring(0, 25)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rs. {e.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Weight: {e.weight} kg
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      border: "2px solid teal",
                      color: "teal",
                      fontWeight: 600,
                      ":hover": {
                        backgroundColor: "white",
                        border: "2px solid teal",
                        color: "teal",
                      },
                    }}
                    onClick={() => addToCart(e._id)}
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "green", color: "white" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
