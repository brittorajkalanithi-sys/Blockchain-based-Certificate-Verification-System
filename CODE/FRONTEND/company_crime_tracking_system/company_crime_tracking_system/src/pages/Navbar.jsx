import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [adminModalIsOpen, setAdminModalIsOpen] = useState(false);
  const [orgModalIsOpen, setOrgModalIsOpen] = useState(false);
  const [empModalIsOpen, setEmpModalIsOpen] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [orgUsername, setOrgUsername] = useState('');
  const [orgPassword, setOrgPassword] = useState('');
  const [empId, setEmpId] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    setAdminModalIsOpen(true);
  };

  const handleOrgLoginClick = () => {
    setOrgModalIsOpen(true);
  };

  const handleEmpLoginClick = () => {
    setEmpModalIsOpen(true);
  };

  const handleCloseAdminModal = () => {
    setAdminModalIsOpen(false);
  };

  const handleCloseOrgModal = () => {
    setOrgModalIsOpen(false);
  };

  const handleCloseEmpModal = () => {
    setEmpModalIsOpen(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'admin') {
      console.log("Admin login successful! Navigate to admin page.");
      navigate('/admin');
    } else {
      alert('Invalid admin username or password');
    }
  };

  const handleOrgLogin = (e) => {
    e.preventDefault();
    if (orgUsername === 'organization' && orgPassword === 'organization') {
      console.log("Organization login successful! Navigate to organization page.");
      navigate('/organizehomepage');
    } else {
      alert('Invalid organization username or password');
    }
  };

  // Employee Login API
  const handleEmpLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:6900/api/employees/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: empId, password: empPassword }),
    });
  
    if (response.ok) {
      // Store employee ID in session storage
      sessionStorage.setItem('employeeId', empId);
      console.log("Employee login successful! Navigate to employee page.");
      navigate('/employeehomepage');
    } else {
      alert('Invalid employee ID or password');
    }
  };
  
  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.navbarLogo}>Nexa</div>
        <ul style={styles.navbarLinks}>
          <li style={{ position: 'relative' }}>
            <a href="#" onClick={handleEmpLoginClick} style={styles.link}>Employee login</a>
            <span style={styles.linkUnderline} />
          </li>
          <li style={{ position: 'relative' }}>
            <a href="#" onClick={handleAdminLoginClick} style={styles.link}>Admin login</a>
            <span style={styles.linkUnderline} />
          </li>
          <li style={{ position: 'relative' }}>
            <a href="#" onClick={handleOrgLoginClick} style={styles.link}>Organization login</a>
            <span style={styles.linkUnderline} />
          </li>
          <li style={{ position: 'relative' }}>
            <a href="#services" style={styles.link}>Our services</a>
            <span style={styles.linkUnderline} />
          </li>
          <li style={{ position: 'relative' }}>
            <a href="#contact" style={styles.link}>Contact</a>
            <span style={styles.linkUnderline} />
          </li>
        </ul>
      </nav>

      {/* Admin Login Modal */}
      <Modal
        isOpen={adminModalIsOpen}
        onRequestClose={handleCloseAdminModal}
        contentLabel="Admin Login"
        style={modalStyles}
      >
        <div style={styles.modalContent}>
          <form onSubmit={handleAdminLogin}>
            <h2 style={{ fontWeight: 'bold' }}>ADMIN LOGIN</h2>
            <label style={{ fontWeight: 'bold' }}>
              USERNAME
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <label style={{ fontWeight: 'bold' }}>
              PASSWORD
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <br />
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>Login</button>
              <button type="button" onClick={handleCloseAdminModal} style={styles.closeButton}>Close</button>
            </div>
          </form>
          <div style={styles.modalImage}>
            <img src="https://fanatic.co.uk/wp-content/uploads/2022/02/92812-business-presentation.gif" alt="Admin Login" style={styles.image} />
          </div>
        </div>
      </Modal>

      {/* Organization Login Modal */}
      <Modal
        isOpen={orgModalIsOpen}
        onRequestClose={handleCloseOrgModal}
        contentLabel="Organization Login"
        style={modalStyles}
      >
        <div style={styles.modalContent}>
          <form onSubmit={handleOrgLogin}>
            <h2 style={{ fontWeight: 'bold' }}>ORGANIZATION LOGIN</h2>
            <label style={{ fontWeight: 'bold' }}>
              USERNAME
              <input
                type="text"
                value={orgUsername}
                onChange={(e) => setOrgUsername(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <label style={{ fontWeight: 'bold' }}>
              PASSWORD
              <input
                type="password"
                value={orgPassword}
                onChange={(e) => setOrgPassword(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <br />
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>Login</button>
              <button type="button" onClick={handleCloseOrgModal} style={styles.closeButton}>Close</button>
            </div>
          </form>
          <div style={styles.modalImage}>
            <img src="https://cdn.vev.design/private/pK53XiUzGnRFw1uPeFta7gdedx22/image/uTvfG4TR8A.gif" alt="Organization Login" style={styles.image} />
          </div>
        </div>
      </Modal>

      {/* Employee Login Modal */}
      <Modal
        isOpen={empModalIsOpen}
        onRequestClose={handleCloseEmpModal}
        contentLabel="Employee Login"
        style={modalStyles}
      >
        <div style={styles.modalContent}>
          <form onSubmit={handleEmpLogin}>
            <h2 style={{ fontWeight: 'bold' }}>EMPLOYEE LOGIN</h2>
            <label style={{ fontWeight: 'bold' }}>
              EMPLOYEE ID
              <input
                type="text"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <label style={{ fontWeight: 'bold' }}>
              PASSWORD
              <input
                type="password"
                value={empPassword}
                onChange={(e) => setEmpPassword(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <br />
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>Login</button>
              <button type="button" onClick={handleCloseEmpModal} style={styles.closeButton}>Close</button>
            </div>
          </form>
          <div style={styles.modalImage}>
            <img src="https://devabit.com/uploads/16930-avenir1.gif" alt="Employee Login" style={styles.image} />
          </div>
        </div>
      </Modal>

      <style>
        {`
          .navbarLinks li:hover .linkUnderline {
            transform: scaleX(1); // Scale to full width on hover
          }
        `}
      </style>
    </>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    color: 'white',
  },
  navbarLogo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  navbarLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '60px',
    color: 'white',
  },
  link: {
    position: 'relative',
    color: 'whitesmoke',
    textDecoration: 'none',
    fontSize: '18px',
    paddingBottom: '5px',
  },
  linkUnderline: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '2px',
    width: '100%',
    backgroundColor: 'white',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  modalContent: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
  },
  modalImage: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '300px',
    height: 'auto',
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  closeButton: {
    padding: '10px 15px',
    backgroundColor: '#FF4136',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '30px',
  },
};

// Styles for the modal
const modalStyles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    width: '600px',
    margin: 'auto',
    height: '400px',
    borderRadius: '15px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export default Navbar;
