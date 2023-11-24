import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailView = () => {
  const location = useLocation();
  const data = location.state?.data;

  const analyzeToxicity = (toxicityLevel) => {
    if (!toxicityLevel) return 'No data';
    const level = parseFloat(toxicityLevel);
    if (isNaN(level)) return 'Invalid data';

    if (level > 1000) return 'High Toxicity';
    if (level > 500) return 'Moderate Toxicity';
    return 'Low Toxicity';
  };

  // Hypothetical data representation for visual demonstration
  const cellLineImpactData = {
    labels: ['LNCaP', 'C4-2b', 'PC3', 'DU-145'],
    datasets: [
      {
        label: 'Cell Viability Reduction (%)',
        data: [20, 15, 30, 10], // Hypothetical data
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Migration Inhibition (%)',
        data: [25, 10, 35, 5], // Hypothetical data
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={styles.container}>
      <h1>Detail View</h1>
      {data ? (
        <div>
          <table style={styles.table}>
            <tbody>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td style={styles.tableCell}><strong>{key}</strong></td>
                  <td style={styles.tableCell}>
                    {key === 'Toxicity (LD50)mg/kg' ? analyzeToxicity(value) : (value || 'N/A')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.chartContainer}>
            <h2>Impact of AG on Cell Lines</h2>
            <Bar data={cellLineImpactData} options={chartOptions} />
          </div>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default DetailView;

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  table: {
    width: '100%',
    marginBottom: '20px',
    borderCollapse: 'collapse',
  },
  tableCell: {
    padding: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  chartContainer: {
    marginTop: '20px',
    maxWidth: '600px',
    margin: '0 auto'
  }
};

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Cell Line Impact Analysis',
    },
  },
};
