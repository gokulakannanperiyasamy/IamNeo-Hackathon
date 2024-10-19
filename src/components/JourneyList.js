// JourneyList.js
import React from 'react';

const JourneyList = ({ schedule, onDelete }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Scheduled Journeys</h1>
      {schedule.length === 0 ? (
        <p>No scheduled journeys available.</p>
      ) : (
        <ul>
          {schedule.map((item) => (
            <li key={item.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <strong>Destination:</strong> {item.destination} <br />
              <strong>Starting Point:</strong> {item.startingPoint} <br />
              <strong>Date:</strong> {item.date} <br />
              <strong>Time:</strong> {item.time} <br />
              <button onClick={() => onDelete(item.id)} style={{ marginTop: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JourneyList;
