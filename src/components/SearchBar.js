// components/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/results?search=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <input
        type="text"
        placeholder="Search for plants, compounds, etc."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Search</button>
    </form>
  );
}

export default SearchBar;

// Styles
const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px 0 0 4px',
    outline: 'none',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '16px',
    outline: 'none',
  }
};
