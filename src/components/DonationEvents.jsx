// src/components/DonationEvents.jsx
import React from 'react';

const DonationEvents = () => {
  const events = ['Blood Drive at Location A', 'Community Donation Event'];

  return (
    <div>
      <h2>Donation Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default DonationEvents;
