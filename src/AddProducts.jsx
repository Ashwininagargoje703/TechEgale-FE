import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Cookies } from "react-cookie";
import { api_url } from "./Api/api";

const AddItemForm = () => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const token = cookie.get("serviceToken");

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title,
        imageUrl,
        productDescription,
        weight,
        quantity,
        price,
      };
      await axios.post(`${api_url}/products/addItem`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOpenSnackbar(true);
      clearFields();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const clearFields = () => {
    setTitle("");
    setImageUrl("");
    setProductDescription("");
    setWeight("");
    setQuantity("");
    setPrice("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value);
    setWeightError(isNaN(value));
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    setQuantityError(isNaN(value));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add New Item
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Product Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <TextField
          label="Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <TextField
          label="Weight"
          type="number"
          value={weight}
          onChange={handleWeightChange}
          error={weightError}
          helperText={weightError ? "Please enter a number" : ""}
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          error={quantityError}
          helperText={quantityError ? "Please enter a number" : ""}
          required
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Item added successfully!"
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", backgroundColor: "green", color: "white" }}
        >
          Item added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddItemForm;
