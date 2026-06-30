import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from './AdminNavbar';

function AdmnGenerateCertification() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [endDate, setEndDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch employee data
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:6900/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setErrorMessage('Failed to fetch employee data.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle end date submission
  const handleEndDateSubmit = async () => {
    try {
      const response = await fetch('http://localhost:6900/api/employees/set-end-date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId: selectedEmployeeId, endDate }),
      });

      const message = await response.text();
      console.log(message);
      setSuccessMessage('End date set successfully.');
      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error setting end date:', error);
      setErrorMessage('Failed to set end date.');
    }
  };

  const generateExperienceCertificate = async (employee) => {
    const doc = new jsPDF();
    const logoUrl = `${process.env.PUBLIC_URL}/company_logo.jpg`;

    const img = new Image();
    img.src = logoUrl;

    img.onload = async () => {
      const logoWidth = 30;
      const logoHeight = (logoWidth * img.height) / img.width;

      // Add logo
      doc.addImage(img, 'JPEG', 10, 10, logoWidth, logoHeight);

      // Draw horizontal line below title
      doc.setDrawColor(0); // Set color to black
      doc.setLineWidth(1);
      doc.line(10, 35, doc.internal.pageSize.width - 10, 35); // Draw line (moved down)

      // Title setup
      doc.setFontSize(16);
      doc.setFont('Helvetica', 'bold');
      const title = 'Certificate of Employment';
      const titleWidth = doc.getTextWidth(title);
      const titleX = (doc.internal.pageSize.width - titleWidth) / 2; // Centering title
      doc.text(title, titleX, 50); // Position the title

      // Body text setup
      doc.setFont('Helvetica', 'normal'); // Set to normal font for body text
      const textLines = [
        `Date: ${new Date().toLocaleDateString()}`,
        '',
        `We certify that ${employee.name}, Employee ID: ${employee.employeeId},`,
        `was employed at Nexa Technologies Private Limited`,
        `from ${employee.startDate} to ${employee.endDate || 'Present'}.`,
        `Last position held: ${employee.position}.`,
        'We thank them for their service and wish them well.',
        '',
        'Sincerely,',
        'Nexa Technologies',
        'HR Department',
      ];

      const startY = 60; // Adjust start Y position after the title
      const lineHeight = 10;
      textLines.forEach((line, index) => {
        doc.text(line, 10, startY + (index * lineHeight));
      });

      // Footer setup
      const footerY = doc.internal.pageSize.height - 25; // Position for footer
      const footerHeight = 30;

      // Draw footer background
      doc.setFillColor(50, 50, 50); // Light black color
      doc.rect(0, footerY, doc.internal.pageSize.width, footerHeight, 'F');

      // Company information
      doc.setTextColor(255, 255, 255); // White text
      doc.setFontSize(10);
      doc.text('Nexa Technologies Private Limited', 10, footerY + 10);
      doc.text('Your Partner in Success', 10, footerY + 20);

      // Contact details - Adjusted x positions for more right alignment
      const contactX = doc.internal.pageSize.width - 10; // Adjust this value for right alignment
      doc.text('Email: contact@nexatech.com', contactX, footerY + 10, { align: 'right' });
      doc.text('Phone: (123) 456-7890', contactX, footerY + 20, { align: 'right' });

      // Prepare PDF for upload
      const pdfBlob = doc.output('blob');
      const formData = new FormData();
      formData.append('file', pdfBlob, `${employee.employeeId}_Experience_Certificate.pdf`);
      formData.append('employeeId', employee.employeeId);

      try {
        const response = await fetch('http://localhost:6900/api/certifications/upload', {
          method: 'POST',
          body: formData,
        });

        const textResponse = await response.text();

        if (!response.ok) {
          throw new Error(textResponse);
        }

        let result;
        try {
          result = JSON.parse(textResponse);
        } catch (e) {
          console.warn('Response is not JSON:', textResponse);
          toast.success('Certificate uploaded');
          return;
        }

        console.log(result);
        toast.success('Certificate uploaded successfully.');
      } catch (error) {
        console.error('Error uploading certificate:', error);
        toast.error('Failed to upload the certificate: ' + error.message);
      }
    };

    img.onerror = () => {
      console.error('Error loading the logo image.');
      setErrorMessage('Failed to load logo image.');
    };
  };

  return (
    <div>
      <AdminNavbar />
      <Container>
        <br/><br/><br/><br/>
        <h2 className="mt-4" style={{ fontWeight: 'bold' }}>CERTIFICATE GENERATION</h2>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{backgroundColor:'orange',color:'white'}}>ID</th>
              <th style={{backgroundColor:'orange',color:'white'}}>EMPLOYEE ID</th>
              <th style={{backgroundColor:'orange',color:'white'}}>FULL NAME</th>
              <th style={{backgroundColor:'orange',color:'white'}}>EMAIL ID</th>
              <th style={{backgroundColor:'orange',color:'white'}}>POSITION</th>
              <th style={{backgroundColor:'orange',color:'white'}}>START DATE</th>
              <th style={{backgroundColor:'orange',color:'white'}}>END DATE</th>
              <th style={{backgroundColor:'orange',color:'white'}}>DATE OF BIRTH</th>
              <th style={{backgroundColor:'orange',color:'white'}}>ACTIONS</th>
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
                <td>{employee.endDate || 'N/A'}</td>
                <td>{employee.dob}</td>
                <td>
                  {!employee.endDate && 
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        setSelectedEmployeeId(employee.employeeId);
                        setShowModal(true);
                      }}
                    >
                      Set End Date
                    </Button>}
                  {employee.endDate && 
                    <Button 
                      variant="success" 
                      onClick={() => generateExperienceCertificate(employee)}
                    >
                      Generate Experience Certificate
                    </Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for End Date Input */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Set End Date</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                />
              </Form.Group>
              <Button variant="primary" onClick={handleEndDateSubmit}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      
      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
}

export default AdmnGenerateCertification;
