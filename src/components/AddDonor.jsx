// src/components/AddDonor.jsx
import React, { useState } from 'react';

const AddDonor = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Adding donor:', { name });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Add Donor</h2>
      <input
        type="text"
        placeholder="Donor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Donor</button>
    </form>
  );
};

export default AddDonor;
