// components/HomePage.js
import React from 'react';
import SearchBar from './SearchBar';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Ayurvedic Plant Database</h1>
      <SearchBar />
      {/* Add other components for highlighted information */}
    </div>
  );
}

export default HomePage;
