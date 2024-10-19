import React, { useState } from 'react';

const Reviews = () => {
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    if (destination) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
      window.open(url, '_blank'); // Open Google Maps in a new tab
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Directions</h2>
      <input
        type="text"
        placeholder="Enter Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
        style={{ width: '300px', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
        Search Directions
      </button>
    </div>
  );
};

export default Reviews;
