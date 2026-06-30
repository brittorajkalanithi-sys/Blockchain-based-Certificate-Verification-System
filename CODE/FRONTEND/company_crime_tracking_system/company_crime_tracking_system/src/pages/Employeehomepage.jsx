import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeHomepage() {
  const [employeeId, setEmployeeId] = useState('');
  const [certificateId, setCertificateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadReady, setDownloadReady] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem('employeeId');
    if (id) {
      setEmployeeId(id);
      fetchCertificate(id);
    } else {
      console.log('No employee ID found. Redirecting to login...');
      // Redirect to login logic could be added here
    }
  }, []);

  const fetchCertificate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:6900/api/certifications/${id}`);
      setCertificateId(response.data.id);
    } catch (err) {
      setError('Failed to fetch certificates.');
    }
  };

  const downloadCertificate = async () => {
    if (!certificateId) return;

    setLoading(true);
    setDownloadReady(false);

    setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:6900/api/certifications/download/${certificateId}`, {
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `experience_certificate_${certificateId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        setDownloadReady(true);
      } catch (err) {
        console.error('Error downloading certificate:', err.response?.data || err.message);
        setError('Failed to download certificate.');
      } finally {
        setLoading(false);
      }
    }, 3000); // 3 seconds delay
  };

  const handleLogout = () => {
    sessionStorage.removeItem('employeeId');
    window.location.href = '/'; // Adjust based on your routing setup
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2>Nexa</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h1>Welcome to the Employee Homepage</h1>
          {employeeId && <p style={styles.employeeId}>Your Employee ID: {employeeId}</p>}
          {error && <p style={styles.errorMessage}>{error}</p>}
          
          <button style={styles.downloadButton} onClick={downloadCertificate} disabled={loading}>
            {loading ? 'Downloading...' : 'Download Experience Certificate'}
          </button>
          
          {downloadReady && <p style={styles.successMessage}>Download started!</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: '15px 20px',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '600px',
    margin: '20px',
  },
  employeeId: {
    marginTop: '10px',
    fontStyle: 'italic',
  },
  downloadButton: {
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
};

export default EmployeeHomepage;
