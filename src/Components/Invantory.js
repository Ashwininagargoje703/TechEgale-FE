import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import axios from "axios";
import { api_url } from "../api";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editItemQuantity, setEditItemQuantity] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const token = cookie.get("serviceToken");
  const navigate = useNavigate();

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
    const data = {
      products: [
        {
          _id: selectedItemId,
          quantity: editItemQuantity,
        },
      ],
    };
    console.log("edit", data);
    try {
      const response = await axios.post(
        `${api_url}/products/updateInventroy`,
        data,
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
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
    getData();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItemId(null);
    setEditItemQuantity(0);
  };

  return (
    <div className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>Rs {item.price.toFixed(2)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditQuantity(item._id, item.quantity)}
                >
                  Edit Quantity
                </Button>
              </TableCell>
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
