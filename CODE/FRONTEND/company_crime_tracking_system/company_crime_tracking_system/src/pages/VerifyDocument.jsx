import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrganizationNavbar from './OrganizationNavbar'

function VerifyDocument() {
  const [employeeId, setEmployeeId] = useState('');
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId || !file) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('employeeId', employeeId);
    formData.append('file', file);

    setShowModal(true);
    setLoading(true);
    setVerificationResult(null);

    try {
      const response = await axios.post('http://localhost:6900/api/certifications/verify', formData);

      setTimeout(() => {
        setLoading(false);
        setVerificationResult(response.data === "Certificate is valid." ? "valid" : "invalid");
      }, 6000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setVerificationResult("invalid");
      }, 6000);
    }
  };

  const getGifUrl = () => {
    if (loading) {
      return "https://media.tenor.com/HHpbtRSSJBoAAAAj/no-yes.gif";
    }
    return verificationResult === "valid"
      ? "https://media.tenor.com/w0hKGlvuWJkAAAAM/niice.gif"
      : "https://cdn3d.iconscout.com/3d/premium/thumb/not-approved-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--remove-cancel-canceled-accepted-reject-verified-pack-sign-symbols-illustrations-4409991.png?f=webp";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLoading(false);
    setVerificationResult(null);
  };

  return (
    <div>
        <OrganizationNavbar/>
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}><b>VERIFY DOCUMENT</b></h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="employeeId" className="form-label"><b>EMPLOYEE ID</b></label>
            <input
              type="text"
              id="employeeId"
              className="form-control"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label"><b>UPLOAD DOCUMENT</b></label>
            <input
              type="file"
              id="file"
              className="form-control"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary"><b>VERIFY</b></button>
        </form>

        <Modal show={showModal} centered onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title><b>VERIFICATION STATUS</b></Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img src={getGifUrl()} alt="Verification Status" style={{ width: '100%', height: 'auto' }} />
            {loading && <p>Verifying...</p>}
          </Modal.Body>
        </Modal>

        <ToastContainer />
      </div>
    </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'transform 0.3s',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
};

export default VerifyDocument;
