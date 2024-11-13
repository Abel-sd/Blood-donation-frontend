// src/components/ScheduleAppointment.jsx
import React, { useState } from 'react';

const ScheduleAppointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scheduling appointment for:', { date, time });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Schedule Appointment</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Schedule</button>
    </form>
  );
};

export default ScheduleAppointment;
