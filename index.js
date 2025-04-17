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

  console.log('Fonepay Response:', data); // Add this line to debug

  // Send the generated QR URL back to the frontend
  res.json({ qrUrl: data.qrUrl });
});
