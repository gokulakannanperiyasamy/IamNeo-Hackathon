import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';

const Signup = ({ setFeedbacks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]); // State to hold all feedbacks
  const navigate = useNavigate();

  useEffect(() => {
    // Load feedbacks from local storage on component mount
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setAllFeedbacks(storedFeedbacks);
  }, []);

  const addFeedback = (feedback) => {
    setFeedbacks((prevFeedbacks) => {
      const newFeedbacks = [...prevFeedbacks, feedback];
      localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks)); // Save to local storage
      return newFeedbacks;
    });
    navigate('/feedback');
  };

  const handleSearch = () => {
    // Filter feedbacks based on search term (case insensitive)
    const results = allFeedbacks.filter(feedback =>
      feedback.destination.toLowerCase() === searchTerm.toLowerCase()
    );
    setFilteredFeedbacks(results);
  };

  return (
    <div className="container">
      <h1>Traveler Feedback Dashboard</h1>
      <div className="feedback-section">
        <FeedbackForm addFeedback={addFeedback} />
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by destination"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Search Results */}
      <div className="search-results">
        {filteredFeedbacks.length > 0 ? (
          <FeedbackList feedbacks={filteredFeedbacks} />
        ) : (
          <p>No feedbacks found for this destination.</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
