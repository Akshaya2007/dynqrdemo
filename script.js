const generateQRCode = async () => {
  const amount = document.getElementById('amount').value;

  if (!amount) {
    alert('Please enter an amount');
    return;
  }

  // Call the backend to generate the QR code
  const response = await fetch('https://dynqrdemo.onrender.com/generateQR', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });

  const data = await response.json();

  console.log('QR Code URL:', data.qrUrl);  // Debugging line

  if (data.qrUrl) {
    // Display the QR Code on the page
    document.getElementById('qr-box').innerHTML = `<img src="${data.qrUrl}" alt="QR Code">`;
  } else {
    document.getElementById('qr-box').innerHTML = 'Failed to generate QR Code.';
  }
};
