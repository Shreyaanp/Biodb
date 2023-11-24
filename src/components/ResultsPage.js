// components/ResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import SearchBar from './SearchBar';
const ResultsPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search');

  const navigate = useNavigate();

  const handleResultClick = (row) => {
    // Navigate to the detail view with the plant name or other identifier
    navigate(`/detail/${row['PLANT']}`, { state: { data: row } });
  };

  useEffect(() => {
    const fetchData = () => {
      Papa.parse('/data.csv', {
        download: true,
        header: true,
        complete: (results) => {
          preprocessData(results.data);
        }
      });
    };

    fetchData();
  }, []);

  // Preprocess data to fill in plant names
  const preprocessData = (rawData) => {
    let lastPlantName = '';
    const processedData = rawData.map(row => {
      if (row['PLANT']) {
        lastPlantName = row['PLANT'];
      } else {
        row['PLANT'] = lastPlantName;
      }
      return row;
    });
    setData(processedData);
  };

  useEffect(() => {
    const filterData = () => {
      if (searchTerm) {
        const filtered = data.filter(row =>
          Object.values(row).some(
            value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [data, searchTerm]);

  return (
    <div style={styles.resultsContainer}>
      <SearchBar />
      <h1>Search Results</h1>
      {filteredData.length > 0 ? (
        filteredData.map((row, index) => (
          <div key={index} style={styles.resultItem} onClick={() => handleResultClick(row)}>
          <p style={styles.resultText}>{`Plant: ${row['PLANT']}`}</p>
          <p style={styles.resultText}>{`Sanskrit/Ayurvedic Name: ${row['Sanskrit/Ayurvedic Names'] || 'N/A'}`}</p>
          <p style={styles.resultText}>{`Plant Part: ${row['plant part'] || 'N/A'}`}</p>
          <p style={styles.resultText}>{`Compound: ${row['COMPOUND']}`}</p>
          <p style={styles.resultText}>{`Molecule: ${row['Molecule'] || 'N/A'}`}</p>
          <p style={styles.resultText}>{`Formula: ${row['Formula'] || 'N/A'}`}</p>
          <p style={styles.resultText}>{`Cancer Type: ${row['cancer type'] || 'N/A'}`}</p>
          <p style={styles.resultText}>{`Toxicity (LD50) mg/kg: ${row['Toxicity (LD50)mg/kg'] ? row['Toxicity (LD50)mg/kg'] + ' mg/kg' : 'N/A'}`}</p>
        </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default ResultsPage;

// Styles
const styles = {
  resultsContainer: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  resultItem: {
    border: '1px solid #ddd',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  resultText: {
    fontSize: '14px',
    lineHeight: '1.6',
  }
};
