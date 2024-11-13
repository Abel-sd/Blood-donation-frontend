// src/components/DonorList.jsx
import React, { useState } from 'react';

const DonorList = () => {
  // Sample donor data
  const donors = [
    { id: 1, name: 'John Doe', bloodType: 'O+', sensitiveInfo: '123-456-7890' },
    { id: 2, name: 'Jane Smith', bloodType: 'A-', sensitiveInfo: '987-654-3210' },
    { id: 3, name: 'Alice Johnson', bloodType: 'B+', sensitiveInfo: '456-123-7890' },
    { id: 4, name: 'Robert Brown', bloodType: 'AB+', sensitiveInfo: '321-654-9870' },
    { id: 5, name: 'Emily Davis', bloodType: 'O-', sensitiveInfo: '654-987-3210' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userRole] = useState('user'); // For restricted access demo

  // Filter donors based on the search term
  const filteredDonors = donors.filter((donor) =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (donor) => {
    setSelectedDonor(donor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDonor(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Donor List</h2>

      {/* Search input and button */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a donor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>Search</button>
      </div>

      {/* Display filtered donor list */}
      <ul style={styles.list}>
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <li key={donor.id} style={styles.listItem}>
              {donor.name} ({donor.bloodType})
              <button style={styles.viewButton} onClick={() => handleViewDetails(donor)}>
                View Details
              </button>
            </li>
          ))
        ) : (
          <li style={styles.noResults}>No donors found</li>
        )}
      </ul>

      {/* Donor details modal */}
      {showModal && selectedDonor && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{selectedDonor.name}'s Details</h3>
            <p><strong>Blood Type:</strong> {selectedDonor.bloodType}</p>

            {/* Conditionally render sensitive info based on user role */}
            {userRole === 'admin' ? (
              <p><strong>Contact Info:</strong> {selectedDonor.sensitiveInfo}</p>
            ) : (
              <p><em>Contact information is restricted for privacy.</em></p>
            )}

            <button style={styles.closeButton} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.8rem',
    color: '#d9534f',
    textAlign: 'center',
    marginBottom: '15px',
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '15px',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ddd',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '10px',
    fontSize: '1rem',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
  },
  viewButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '20px',
    padding: '8px 16px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noResults: {
    padding: '10px',
    fontSize: '1rem',
    color: '#666',
    textAlign: 'center',
  },
};

// Media queries for responsive design
const mediaQueries = `
@media (max-width: 600px) {
  ${styles.title} {
    font-size: 1.5rem;
  }
  ${styles.searchInput} {
    font-size: 0.9rem;
    padding: 8px;
  }
  ${styles.searchButton} {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
  ${styles.listItem} {
    font-size: 0.9rem;
    padding: 8px;
  }
}
`;

// Inject media queries into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaQueries;
document.head.appendChild(styleSheet);

export default DonorList;
