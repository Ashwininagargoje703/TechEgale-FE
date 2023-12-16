import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const CustomerDashboard = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {}, []);

  const addToCart = (itemId) => {
    // Implement logic to add item to cart
    console.log(`Added item ${itemId} to cart`);
  };

  const updateQuantity = (itemId, newQuantity) => {
    // Implement logic to update item quantity
    console.log(`Updated quantity of item ${itemId} to ${newQuantity}`);
  };

  const placeOrder = () => {
    // Implement logic to place order
    console.log("Placed order");
  };

  const viewAllOrders = () => {
    // Implement logic to view all orders with status
    console.log("View all orders");
  };

  const viewCurrentOrder = () => {
    // Implement logic to view current order and its status
    console.log("View current order");
  };

  return (
    <div>
      {inventoryItems.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <img src={item.image} alt={item.description} />
            <Typography variant="h6">{item.description}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            <Typography>Weight: {item.weight}</Typography>
            <Typography>Price: {item.price}</Typography>
            <Button onClick={() => addToCart(item.id)}>Add to Cart</Button>
            <input
              type="number"
              defaultValue={1}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <Button onClick={placeOrder}>Place Order</Button>
      <Button onClick={viewAllOrders}>View All Orders</Button>
      <Button onClick={viewCurrentOrder}>View Current Order</Button>
    </div>
  );
};

export default CustomerDashboard;
