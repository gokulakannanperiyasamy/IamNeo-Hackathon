// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import FeedbackPage from './components/FeedbackPage'; 
import AnalyticsDashboard from './components/AnalyticsDashboard';
import JourneyMap from './components/JourneyMap';
import Reviews from './components/Reviews';
import SetSchedule from './components/SetSchedule'; 
import JourneyList from './components/JourneyList'; 
import './App.css';

const App = () => {
  const [feedbacks, setFeedbacks] = useState([]); // State to hold feedbacks
  const [schedules, setSchedules] = useState([]); // State to hold schedules

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup setFeedbacks={setFeedbacks} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/journey-map" element={<JourneyMap />} />
          <Route path="/feedback" element={<FeedbackPage feedbacks={feedbacks} />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/set-schedule" element={<SetSchedule setSchedules={setSchedules} />} /> {/* Pass setSchedules */}
          <Route path="/journeys" element={<JourneyList schedule={schedules} onDelete={handleDeleteSchedule} />} /> {/* Pass schedules and delete handler */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
