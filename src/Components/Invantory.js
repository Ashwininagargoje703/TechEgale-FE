import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import { api_url } from "../Api/api";
import EditIcon from "@mui/icons-material/Edit";
import AddItemForm from "../AddProducts";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editItemQuantity, setEditItemQuantity] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const cookie = new Cookies();
  const userType = cookie.get("userType");
  const token = cookie.get("serviceToken");
  console.log("usertype", userType);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${api_url}/products/getAllItems`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditQuantity = (itemId, itemQuantity) => {
    setSelectedItemId(itemId);
    setEditItemQuantity(itemQuantity);
    setOpenDialog(true);
  };
  const handleSaveQuantity = async () => {
    try {
      const updatedProduct = {
        _id: selectedItemId,
        quantity: Number(editItemQuantity),
      };

      console.log("Updated Product:", updatedProduct);

      const response = await axios.post(
        `${api_url}/products/updateInventory`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Quantity updated successfully!");
        handleCloseDialog();
        getData(); // Refresh data after successful update
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItemId(null);
    setEditItemQuantity(0);
  };

  return (
    <div className="table-container">
      {userType === "manager" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            float: "right",
            mb: 2,
          }}
        >
          <AddItemForm />
        </Box>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            {userType === "manager" && <TableCell>Acti</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>Rs {item.price.toFixed(2)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              {userType === "manager" && (
                <TableCell>
                  <Button
                    onClick={() => handleEditQuantity(item._id, item.quantity)}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    <EditIcon />
                    Update Invantory
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Quantity</DialogTitle>
        <DialogContent>
          <TextField
            label="Quantity"
            type="number"
            value={editItemQuantity}
            onChange={(e) => setEditItemQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveQuantity} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
