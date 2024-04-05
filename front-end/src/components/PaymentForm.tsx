import * as React from 'react';
import { Box, Typography, Modal, Input, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { ReactComponent as KeyIcon } from "../assets/images/🦆 icon _key_.svg"
import { ReactComponent as CloseIcon } from "../assets/images/🦆 icon _close circle_.svg"

// import * as elements from '@stripe/stripe-js/types/stripe-js/elements/';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


// let METHOD_PAYPAL = true;
// let METHOD_CARD = false;

const PaymentForm = () => {

//Variables
  const [openPayment, setOpenPaymet] = React.useState(true);
  const handleOpenPayment = () => setOpenPaymet(false);
  const handleClosePayment = () => setOpenPaymet(true);

  // const [payment, setPayment] = React.useState(METHOD_CARD);
  // const handleSetCardPayment = () => setPayment(METHOD_CARD);
  // const handleSetPaypalPayment = () => setPayment(METHOD_PAYPAL);

  const [cardNumber, setCardNumber] = React.useState("");
  
  const stripe = useStripe();
  const elements = useElements();

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 472,
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
    background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)",
    color: "white",
    border: "none"
  };


//    Functions
  const handlePayment = async () => {
    if(stripe && elements) {
      const cardElement = elements.getElement(CardElement);

      if(cardElement) {
        const { error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          alert('Error occured:' + error);
        } else {
          alert('Successed');
        }
      }
    }
  };
  
  return (
    <>
      <Button
          variant="contained"
          sx={{
              background: "#FFF",
              textTransform: "none",
              mt: 3,
              color: "black"
          }}
          startIcon={<KeyIcon />}
          onClick={handleOpenPayment}
      >
          Pay $0.99
      </Button>
      <Modal
        open={!openPayment}
        onClose={handleClosePayment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, textAlign: "center" }}>
          <Typography color="white" textAlign="center" sx={{ top: "20px", right: "20px", position: "absolute" }}><CloseIcon onClick={handleClosePayment} /></Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 3 }}>
              Payment method
          </Typography>
          <Input
            sx={{
              width: "100%",
              borderRadius: "10px",
              border: "1px solid rgba(115, 13, 195, 0.50)",
              background: "#11061D",
              mt: 3,
              p: 1,
              color: "white",
              fontSize: "16px",
              fontWeight: "400"
            }}
            id='inpCardNumber'
            autoFocus={true}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          <Button
              variant="contained"
              sx={{
                  background: "#FFF",
                  textTransform: "none",
                  mt: 3,
                  color: "black"
              }}
              startIcon={<KeyIcon />}
              onClick={handlePayment}
          >
            Confirm
          </Button>
          {/*
            <RadioGroup name="use-radio-group" defaultValue="first">
              <FormControlLabel value="first" label="First" control={<Radio />} />
              <div>SSS</div>
              <FormControlLabel value="second" label="Second" control={<Radio />} />
              <div>SSS</div>
            </RadioGroup>
            <Radio
              checked={payment === METHOD_CARD}
              onChange={handleSetCardPayment}
              inputProps={{ 'aria-label': 'CARD' }}
              value="card"
              name="card-buttons"
              sx={{ mt: 2 }}
            />
            <Radio
              checked={payment === METHOD_PAYPAL}
              onChange={handleSetPaypalPayment}
              inputProps={{ 'aria-label': 'PAYPAL' }}
              value="paypal"
              name="paypal-buttons"
              sx={{ mt: 2 }}
            />
          */}
        </Box>
      </Modal>
    </>
  );
};

export default PaymentForm;
