//FeedbackPage.js
// FeedbackPage.js
import React from 'react';
import FeedbackList from './FeedbackList';

const FeedbackPage = ({ feedbacks = [] }) => { // Default to an empty array
  return (
    <div>
      <h1>Feedbacks</h1>
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
};

export default FeedbackPage;