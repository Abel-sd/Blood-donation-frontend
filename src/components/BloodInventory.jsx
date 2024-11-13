// src/components/BloodInventory.jsx
import React from 'react';

const BloodInventory = () => {
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div>
      <h2>Blood Inventory</h2>
      <ul>
        {bloodTypes.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default BloodInventory;
