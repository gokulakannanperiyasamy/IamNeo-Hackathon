import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating'; // Import the new Rating component

const FeedbackForm = ({ addFeedback }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [date] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 5);
  };

  useEffect(() => {
    const updateTime = () => setTime(getCurrentTime());
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message || !locationInput) {
      setError("All fields are required!");
      return;
    }
    
    setLoading(true);
    const [startingPoint, destination] = locationInput.split(',').map(item => item.trim());
    const feedback = {
      name,
      message,
      rating,
      date,
      time,
      destination,
      startingPoint,
      currentLocation,
    };
    addFeedback(feedback);
    resetForm(); // Reset form fields after submission
    setLoading(false);
  };

  const handleSeeAnalysis = () => {
    navigate('/feedback'); // Adjust the path as necessary for your analysis page
  };

  const handleReviews = () => {
    navigate('/reviews'); // Adjust the path as necessary for your reviews page
  };

  const handleSetSchedule = () => {
    navigate('/set-schedule'); // Navigate to the Set Schedule page
  };

  const resetForm = () => {
    setName('');
    setMessage('');
    setRating(1);
    setLocationInput('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <input type="date" value={date} onChange={() => {}} required />
      <input type="time" value={time} onChange={() => {}} required />
      <input
        type="text"
        placeholder="Starting Point, Destination"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        required
      />
      <Rating rating={rating} setRating={setRating} />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
      <br />
      <br />
      <button type="button" onClick={handleSeeAnalysis} disabled={loading}>
        See Analysis
      </button>
      <br />
      <br />
      <button type="button" onClick={handleReviews} disabled={loading}>
        Reviews
      </button>
      <br />
      <br />
      <button type="button" onClick={handleSetSchedule} disabled={loading}>
        Set Schedule
      </button>
    </form>
  );
};

export default FeedbackForm;
