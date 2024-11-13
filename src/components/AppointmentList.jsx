// src/components/AppointmentList.jsx
import React from 'react';

const AppointmentList = () => {
  const appointments = ['Appointment 1', 'Appointment 2', 'Appointment 3'];

  return (
    <div>
      <h2>Appointment List</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>{appointment}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
