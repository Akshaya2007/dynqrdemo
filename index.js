const express = require('express');
const fetch = require('node-fetch');  // Import node-fetch for making API requests

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Endpoint to generate QR
app.post('/generateQR', async (req, res) => {
  const { amount } = req.body;

  // Make a request to Fonepay API to generate the QR
  const response = await fetch('https://fonepay.com/api/generateQR', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      merchantId: 'YOUR_MERCHANT_ID',
      amount,
      transactionRemark: 'Shop Payment'
    })
  });

  const data = await response.json();

  // Send the generated QR URL back to the frontend
  res.json({ qrUrl: data.qrUrl });
});

// Endpoint to verify payment (optional)
app.post('/verifyPayment', async (req, res) => {
  const { transactionId } = req.body;

  // Verify payment status with Fonepay API
  const response = await fetch('https://fonepay.com/api/verifyPayment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      transactionId
    })
  });

  const result = await response.json();
  
  res.json(result);  // Send back payment verification result
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
