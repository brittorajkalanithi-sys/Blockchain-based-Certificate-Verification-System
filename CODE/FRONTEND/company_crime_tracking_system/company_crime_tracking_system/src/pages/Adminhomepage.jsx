import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminHomepage() {
  const [employeeDetails, setEmployeeDetails] = useState({
    id: '',
    name: '',
    email: '',
    position: '',
    startDate: '',
    dob: '',
    image: null,
  });

  useEffect(() => {
    const id = generateEmployeeId();
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      id: id,
    }));
  }, []);

  const generateEmployeeId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setEmployeeDetails({ ...employeeDetails, image: e.target.files[0] });
    } else {
      setEmployeeDetails({ ...employeeDetails, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', employeeDetails.image);
    formData.append('name', employeeDetails.name);
    formData.append('email', employeeDetails.email);
    formData.append('position', employeeDetails.position);
    formData.append('startDate', employeeDetails.startDate);
    formData.append('dob', employeeDetails.dob);
    formData.append('status', 'Active'); // Default status, adjust as needed
    formData.append('password', 'defaultPassword'); // You may want to handle password input

    try {
      const response = await fetch('http://localhost:6900/api/employees/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Employee registration is successful!');
        // Clear the form after successful submission
        setEmployeeDetails({
          id: generateEmployeeId(),
          name: '',
          email: '',
          position: '',
          startDate: '',
          dob: '',
          image: null,
        });
      } else {
        toast.error('Employee registration failed!');
      }
    } catch (error) {
      console.error('Error during employee registration:', error);
      toast.error('An error occurred while registering the employee.');
    }
  };

  return (
    <div>
      <AdminNavbar />
      <ToastContainer />
      <div style={styles.adminHomepage}>
        <br/><br/><br/><br/>
        <div style={styles.employeeForm}>
          <h2 style={{fontWeight:'bold'}}>CREATE EMPLOYEE ACCOUNT SETUP</h2>
        <br/>
          <div style={styles.inputField}>
            <label style={{fontWeight:'bold'}}>EMPLOYEE ID:</label>
            <input
              type="text"
              name="id"
              value={employeeDetails.id}
              readOnly
              style={styles.input}
            />
          </div>

          <div style={styles.inputField}>
            <label style={{fontWeight:'bold'}}>FULL NAME</label>
            <input
              type="text"
              name="name"
              value={employeeDetails.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              style={styles.input}
            />
          </div>

          <div style={styles.inputField}>
            <label style={{fontWeight:'bold'}}>EMAIL ID</label>
            <input
              type="email"
              name="email"
              value={employeeDetails.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              style={styles.input}
            />
          </div>

          <div style={styles.inputField}>
            <label style={{fontWeight:'bold'}}>POSITION</label>
            <input
              type="text"
              name="position"
              value={employeeDetails.position}
              onChange={handleChange}
              placeholder="Enter employee position"
              style={styles.input}
            />
          </div>

          <div style={styles.inputField}>
            <label style={{fontWeight:'bold'}}>STARTING DATE</label>
            <input
              type="date"
              name="startDate"
              value={employeeDetails.startDate}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputField}>
            <label style={{fontWeight:'bold'}}>DATE OF BIRTH</label>
            <input
              type="date"
              name="dob"
              value={employeeDetails.dob}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputField}>
            <label style={{fontWeight:'bold'}}>UPLOAD IMAGES</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button style={styles.submitButton} onClick={handleSubmit}>
            <b>STORE EMPLOYEE DETAILS</b>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  adminHomepage: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  employeeForm: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  inputField: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default AdminHomepage;
