import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './AdminNavbar';

function AdminCertificateDetails() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:6900/api/certifications/all');
        setCertificates(response.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  // Function to format the file path
  const formatFilePath = (filePath) => {
    return filePath.replace("uploads/certificates/", ""); // Adjust the path as needed
  };

  const tableStyles = {
    marginTop: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const rowStyles = {
    transition: 'transform 0.2s',
  };

  const hoverStyles = {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
  };

  return (
    <div>
        <AdminNavbar/>
        <br/><br/><br/><br/>
    <Container>
      <h1 className="text-center mb-4" style={{marginLeft:'-700px',fontWeight:'bold'}}>EMPLOYEE CERTIFICATE DETAILS</h1>
      <Table striped bordered hover style={tableStyles}>
        <thead>
          <tr>
            <th style={{backgroundColor:'orange',color:'white'}}>ID</th>
            <th style={{backgroundColor:'orange',color:'white'}}>EMPLOYEE ID</th>
            <th style={{backgroundColor:'orange',color:'white'}}>FILE DETAILS</th>
            <th style={{backgroundColor:'orange',color:'white'}}>BLOCK HASH</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map(certificate => (
            <tr
              key={certificate.id}
              style={rowStyles}
              onMouseEnter={e => { e.currentTarget.style.transform = hoverStyles.transform; e.currentTarget.style.backgroundColor = hoverStyles.backgroundColor; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
            >
              <td>{certificate.id}</td>
              <td>{certificate.employeeId}</td>
              <td>{formatFilePath(certificate.filePath)}</td> {/* Format the file path here */}
              <td>{certificate.hash}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  );
}

export default AdminCertificateDetails;
