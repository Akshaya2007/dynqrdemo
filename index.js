const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/generateQR', (req, res) => {
  const { amount } = req.body;

  // Simulated Fonepay QR payload
  const qrText = `FONEPAY://MERCHANT=DEMO_SHOP&AMOUNT=${amount}&REMARKS=Shop QR`;

  const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrText)}&size=300`;

  res.json({ qrUrl });
});

app.listen(PORT, () => {
  console.log(`QR backend running on port ${PORT}`);
});
