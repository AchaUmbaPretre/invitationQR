import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './header.css';

function Header() {
  const [name, setName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/verifyQRCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, tableNumber, qrCodeData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('QR code verification result:', data);
      } else {
        console.error('QR code verification failed');
      }
    } catch (error) {
      console.error('Error verifying QR code:', error);
    }
  };

  return (
    <div className="container">
      <h1>Vérification du code QR des invités</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Nom de l'invité :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Numéro de table :
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Données du code QR :
          <input
            type="text"
            value={qrCodeData}
            onChange={(e) => setQrCodeData(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Vérifier le code QR</button>
      </form>
      <div className="qrcode-container">
        {qrCodeData && <QRCode value={qrCodeData} />}
      </div>
    </div>
  );
}

export default Header;