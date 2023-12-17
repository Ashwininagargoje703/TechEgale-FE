import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlacedOrderSuccessful = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/home");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Order Placed Successfully!
      </Typography>
      <Box sx={{ width: 300, height: 300 }}>
        <img
          src="https://tpvenue.com/wp-content/uploads/2022/09/02-lottie-tick-01-instant-2.gif"
          alt="Success Animation"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinueShopping}
        style={{ marginTop: 20 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
};

export default PlacedOrderSuccessful;
