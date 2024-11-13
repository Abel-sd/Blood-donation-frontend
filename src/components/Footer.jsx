// src/components/Footer.js
import React from 'react';

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px 0',
  position: 'relative',
  bottom: '0',
  width: '100%',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Blood Donation System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
