import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrganizationNavbar from './OrganizationNavbar';

function Organizationhomepage() {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:6900/api/employees'); // Adjust URL as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Call fetchEmployees on mount
  }, []);

  const handleClose = () => {
    setShow(false);
    setNewStatus(''); // Clear the status input when closing
  };

  const handleShow = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShow(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(`http://localhost:6900/api/employees/update-status/${selectedEmployeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Send status as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Re-fetch the employee data after updating
      fetchEmployees(); 
      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div style={{backgroundColor:'#D3E1F5',height:'100%'}}>
      <OrganizationNavbar />
      <Container >
        <br /><br /><br />
        <h2 className="mt-4" style={{ fontWeight: 'bold' }}>EMPLOYEE DETAILS</h2>
        <Table striped bordered hover className="animated-table">
          <thead>
            <tr>
              <th style={{backgroundColor:'orange',color:'white'}}>ID</th>
              <th style={{backgroundColor:'orange',color:'white'}}>EMPLOYEE ID</th>
              <th style={{backgroundColor:'orange',color:'white'}}>NAME</th>
              <th style={{backgroundColor:'orange',color:'white'}}>EMAIL ID</th>
              <th style={{backgroundColor:'orange',color:'white'}}>POSITION</th>
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
                <td>{employee.startDate}</td>
                <td>{employee.dob}</td>
                <td>{employee.status}</td>
                <td>
                  {employee.status === 'waiting' && (
                    <Button variant="primary" onClick={() => handleShow(employee.id)}>
                      Update Status
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for updating status */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Employee Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicStatus">
                <Form.Label>New Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateStatus}>
              Update Status
            </Button>
          </Modal.Footer>
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
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default Organizationhomepage;
