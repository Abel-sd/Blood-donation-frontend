// src/pages/LandingPage.jsx
import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Blood Donation System</h1>
        <p style={styles.subtitle}>Join us in saving lives, one donation at a time.</p>
      </header>

      <section style={styles.missionSection}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.missionText}>
          Our mission is to connect donors with those in need, ensuring a reliable blood supply and making it easy for people to contribute to a life-saving cause.
        </p>
      </section>

      <footer style={styles.footer}>
        <p>&copy; 2024 Blood Donation System. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Basic styling for responsiveness
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    color: '#333',
  },
  header: {
    textAlign: 'center',
    margin: '20px 0',
  },
  title: {
    fontSize: '2.5rem',
    color: '#d9534f',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
  },
  missionSection: {
    maxWidth: '800px',
    textAlign: 'center',
    margin: '40px 0',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#d9534f',
    marginBottom: '1rem',
  },
  missionText: {
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  footer: {
    textAlign: 'center',
    marginTop: 'auto',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    width: '100%',
  },
};

// Media queries for mobile responsiveness
const mediaQueries = `
@media (max-width: 600px) {
  ${styles.title} {
    font-size: 1.8rem;
  }
  ${styles.subtitle} {
    font-size: 1rem;
  }
  ${styles.sectionTitle} {
    font-size: 1.5rem;
  }
  ${styles.missionText} {
    font-size: 0.9rem;
  }
}
`;

// Inject the media queries into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaQueries;
document.head.appendChild(styleSheet);

export default Home;
