async function generateQR() {
  const amount = document.getElementById('amount').value;

  if (!amount || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  const response = await fetch('https://dynqrdemo.onrender.com/generateQR', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });

  const data = await response.json();
  document.getElementById('qr-box').innerHTML = `<img src="${data.qrUrl}" alt="QR Code">`;
}
