// FeedbackList.js
import React from 'react';

const FeedbackList = ({ feedbacks }) => {
  if (!feedbacks.length) {
    return <p>No feedback available.</p>; // Message for no feedback
  }

  const sortedFeedbacks = feedbacks.sort((a, b) => {
    const aDate = new Date(`${a.date}T${a.time}`);
    const bDate = new Date(`${b.date}T${b.time}`);
    return bDate - aDate;
  });

  return (
    <div>
      <ul>
        {sortedFeedbacks.map((feedback, index) => (
          <li key={index}>
            <strong>{feedback.name}</strong>
            <span style={{ float: 'right', fontSize: '0.9em', color: '#666' }}>
              {feedback.date} {feedback.time}
            </span>
            <p>{feedback.message}</p>
            <p>Destination: {feedback.destination}</p>
            <p>Starting Point: {feedback.startingPoint}</p>
            <p>
              Current Place: {feedback.currentLocation ? `Lat: ${feedback.currentLocation.latitude}, Lon: ${feedback.currentLocation.longitude}` : 'Unknown'}
            </p>
            <p>Rating: {feedback.rating} star{feedback.rating > 1 ? 's' : ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
