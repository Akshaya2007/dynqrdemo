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
  
  // Display the QR Code on the page
  document.getElementById('qr-box').innerHTML = `<img src="${data.qrUrl}" alt="QR Code">`;
  
  // Optionally, implement payment verification
  document.getElementById('payment-status').innerHTML = 'Payment in progress...';
  setTimeout(() => {
    verifyPayment('transactionId');  // Replace with actual transaction ID
  }, 10000); // 10 seconds delay before verifying
};

// Function to verify payment status
const verifyPayment = async (transactionId) => {
  const response = await fetch('https://dynqrdemo.onrender.com/verifyPayment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionId })
  });

  const result = await response.json();

  if (result.status === 'SUCCESS') {
    document.getElementById('payment-status').innerHTML = 'Payment Successful';
  } else {
    document.getElementById('payment-status').innerHTML = 'Payment Failed';
  }
};
