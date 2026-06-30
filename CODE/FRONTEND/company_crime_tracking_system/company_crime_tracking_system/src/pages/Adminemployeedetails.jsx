import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './AdminNavbar';

function AdminEmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [password, setPassword] = useState('');

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:6900/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Call fetchEmployees on component mount
  }, []);

  const handleShow = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      try {
        await fetch(`http://localhost:6900/api/employees/set-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: selectedEmployee.employeeId,
            password,
          }),
        });
        handleClose(); // Close modal after submission
        await fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error('Error setting password:', error);
      }
    }
  };

  const downloadPassword = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:6900/api/employees/password/${employeeId}`);
      const password = await response.text();
      
      // Create a blob for the password and trigger download
      const blob = new Blob([password], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${employeeId}_password.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading password:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container>
        <br /><br /><br />
        <h2 className="mt-4" style={{ fontWeight: 'bold' }}>EMPLOYEE DETAILS</h2>
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <Table striped bordered hover className="animated-table" style={{ minWidth: '1600px' }}> 
            <thead>
              <tr>
                <th style={{backgroundColor:'orange',color:'white'}}>ID</th>
                <th style={{backgroundColor:'orange',color:'white'}}>EMPLOYEE ID</th>
                <th style={{backgroundColor:'orange',color:'white'}}>NAME</th>
                <th style={{backgroundColor:'orange',color:'white'}}>EMAIL ID</th>
                <th style={{backgroundColor:'orange',color:'white'}}>POSITION</th>
                <th style={{backgroundColor:'orange',color:'white'}}>PASSWORD</th>
                <th style={{backgroundColor:'orange',color:'white'}}>START DATE</th>
                <th style={{backgroundColor:'orange',color:'white'}}>DATE OF BIRTH</th>
                <th style={{backgroundColor:'orange',color:'white'}}>STATUS</th>
                <th style={{backgroundColor:'orange',color:'white'}}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.password}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.status}</td>
                  <td>
                    {employee.status === 'accepted' && (
                      <>
                        <Button variant="primary" onClick={() => handleShow(employee)}>
                          <b>ADD PASSWORD</b>
                        </Button>
                        <Button variant="success" onClick={() => downloadPassword(employee.employeeId)} style={{ marginLeft: '10px' }}>
                          <b>SHOW PASSWORD</b>
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Set Password for {selectedEmployee?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <style jsx>{`
          .animated-table {
            transition: transform 0.3s ease;
          }

          .animated-table tr {
            transition: transform 0.3s ease;
          }

          .animated-table tr:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </Container>
    </div>
  );
}

export default AdminEmployeeDetails;
