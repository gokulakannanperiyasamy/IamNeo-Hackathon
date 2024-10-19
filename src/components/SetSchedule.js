import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetSchedule = ({ setSchedules }) => {
  const [formData, setFormData] = useState({
    startingPoint: '',
    destination: '',
    date: '',
    time: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that starting point and destination are not the same
    if (formData.startingPoint === formData.destination) {
      setError("Starting point and destination cannot be the same.");
      return;
    }

    // Clear error if validation passes
    setError('');

    const newEntry = {
      id: Date.now(), // Use timestamp for a unique ID
      ...formData,
    };
    setSchedules((prevSchedules) => [...prevSchedules, newEntry]);
    setFormData({ startingPoint: '', destination: '', date: '', time: '' }); // Reset form
    navigate('/journeys'); // Navigate to the JourneyList page
  };

  const goToOverview = () => {
    navigate('/journeys'); // Redirect to JourneyList
  };

  // Get current date and time for validation
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  const currentTimeString = currentDate.toTimeString().split(' ')[0].slice(0, 5); // HH:MM format

  return (
    <div>
      <h1>Schedule a Journey</h1>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="startingPoint"
          value={formData.startingPoint}
          onChange={handleChange}
          placeholder="Starting Point"
          required
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={currentDateString} // Disable past dates
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          min={currentTimeString} // Disable past times
          required
        />
        <button type="submit">Add Journey</button>
      </form>
      <button onClick={goToOverview} style={{ marginBottom: '20px' }}>
        Schedule Overview
      </button>
    </div>
  );
};

export default SetSchedule;
