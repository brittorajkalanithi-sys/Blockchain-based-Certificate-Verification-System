import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Adminhomepage from './pages/Adminhomepage';
import AdminEmployeeDetails from './pages/Adminemployeedetails';
import AdminGenerateCertification from './pages/AdmnGenerateCertification';
import Organizationhomepage from './pages/Organizationhomepage';
import AdminCertificateDetails from './pages/AdminCertificateDetails';
import VerifyDocument from './pages/VerifyDocument';
import EmployeeHomepage from './pages/Employeehomepage';

function App() {
  return (
   <div>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/admin" element={<Adminhomepage/>} />
       <Route path="/adminemployeedetails" element={<AdminEmployeeDetails/>} />
       <Route path="/certificategenerate" element={<AdminGenerateCertification/>} />
       <Route path="/organizehomepage" element={<Organizationhomepage/>} />
       <Route path="/admincertificatedetails" element={<AdminCertificateDetails/>} />
       <Route path="/verifydocument" element={<VerifyDocument/>} />
       <Route path="/employeehomepage" element={<EmployeeHomepage/>} />
       </Routes>
   </div>
  );
}

export default App;
