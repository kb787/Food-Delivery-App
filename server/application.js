const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require('body-parser');
const server = http.createServer(app);
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const express_port_no = process.env.express_server_port_no;
const databaseConnection = require("./dbConfiguration");
const base_api_endpoint = process.env.base_api_endpoint;
const { signinRouter, signupRouter } = require("./auth-controllers");
const {
  otpSendingRouter,
  passwordChangingRouter,
} = require("./verification-controllers");
const {
  generalRouter,
  categoryRouter,
} = require("./products-display-Controller");

const react_native_server = process.env.native_server_link;
const corsOptions = {
  origin: react_native_server,
};

const stripe = require('stripe')('sk_test_51P4kp7SFBQGHHDjpMEODbIwOZnhYg9CqFiXOwn6Y2A15zJqoyOzUKoTEVSNgnf93crfgeFLODapXZQ1abR3GtbD500LKTwZcRt');

app.use(bodyParser.json());

// Mock database or data storage
let orders = [];

// Endpoint to handle checkout requests
let totalPriceForPaymentSheet=0; // Declare totalPrice variable outside the endpoint handler

app.post('/api/checkout', (req, res) => {
  const { cart, totalPrice } = req.body;

  // Process the checkout logic here, such as storing the order in a database
  // For demonstration, we'll just log the received data
  console.log('Received cart:', cart);
  console.log('Total Price:', totalPrice);

  // Store totalPrice in the scoped variable
  totalPriceForPaymentSheet = totalPrice;

  // Mock response for demonstration
  orders.push({ cart, totalPrice });
  
  // Send the total price in the response
  res.status(200).json({ message: 'Checkout successful!', totalPrice });
});

app.post('/payment-sheet', async (req, res) => {
  try {
    // Use totalPriceForPaymentSheet from the scoped variable
    const totalPrice = totalPriceForPaymentSheet;

    // Check if totalPrice is a valid number, parse it if necessary
    totalPrice = parseFloat(totalPrice);

    if (isNaN(totalPrice) || totalPrice <= 0) {
      throw new Error('Invalid total price. Please provide a valid positive number.');
    }

    // Use the total price in your Stripe payment logic
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-04-10' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // Convert total price to cents
      currency: 'inr',
      customer: customer.id,
      description: 'Test payment for developer',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Send the payment details in the response
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51P4kp7SFBQGHHDjpGBS7WDXJBjHJemvx3KBrMwHoU8oZ1gehjcaSo4kzYyljMSEgwtRtWomWgZcWnDRyvTrBeejo00zLeCloYG',
    });
  } catch (error) {
    console.error('Error during payment:', error);
    res.status(400).json({ error: error.message });
  }
});

databaseConnection();

app.use(express.json());
app.use(cors(corsOptions));
app.use(base_api_endpoint, signupRouter);
app.use(base_api_endpoint, signinRouter);
app.use(base_api_endpoint, otpSendingRouter);
app.use(base_api_endpoint, passwordChangingRouter);
app.use(base_api_endpoint, generalRouter);
app.use(base_api_endpoint, categoryRouter);
app.get("/", (req, res) => {
  res.json({ message: `Application launched successfully` });
});

server.listen(express_port_no, () => {
  console.log(`Application running successfully on port no ${express_port_no}`);
});
