import React, { useState } from 'react';
import './Donate.css';  // Import the CSS file

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    if (!formData.name || !formData.email || !formData.phone || !formData.bloodType) {
      setError('Please fill out all the required fields.');
      return;
    }

    // Reset error and set submission success
    setError('');
    setIsSubmitted(true);

    console.log('Form submitted:', formData);

    // Here you can add logic to send the form data to the backend

    // After submitting, clear the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      bloodType: '',
      message: '',
    });
  };

  return (
    <div className="donate-container">
      <div className="form-container">
        <h2>Schedule Appointment</h2>

        {isSubmitted && (
          <p className="success-message">Thank you for your submission!</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="donate-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bloodType">Blood Type:</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
            >
              <option value="">Select your blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (optional):</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
