import React, { useState } from 'react';
import Navbar from './Navbar';

function Home() {
  const styles = {
    home: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '80%',
      background: 'linear-gradient(207deg, rgba(36, 1, 0, 1) 0%, rgba(233, 114, 21, 1) 0%, rgba(184, 83, 11, 1) 16%, rgba(82, 27, 3, 1) 78%, rgba(83, 46, 33, 1) 100%)',
      clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
      zIndex: -1,
    },
    content: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 50px',
      color: 'white',
      textAlign: 'left',
      gap: '20px',
    },
    heading: {
      margin: 0,
      fontSize: '32px',
      marginTop: '-350px',
    },
    gifContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '45%',
      gap: '20px',
      marginTop: '-200px',
    },
    button: {
      backgroundColor: 'orangered',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      fontSize: '16px',
      color: 'white',
      marginRight: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: 'orange',
      transform: 'scale(1.05)',
    },
    section: {
      padding: '60px 50px',
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      marginTop: '-100px',
    },
    sectionHeading: {
      fontSize: '28px',
      marginBottom: '20px',
      color: '#333',
    },
    whyChooseUsCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      margin: '10px',
      transition: 'transform 0.3s ease',
      maxWidth: '300px',
      backgroundColor:'orangered',
      color:'white',
      cursor:'pointer'
    },
    whyChooseUsCardHover: {
      transform: 'translateY(-10px)', // 3D effect
    },
    serviceCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px',
      padding: '20px',
      background: '#E93927',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease',
      color:'white',
      cursor:'pointer'
    },
    serviceCardHover: {
      transform: 'translateY(-10px)', // 3D effect
    },
    contactSection: {
      padding: '60px 50px',
      backgroundColor: '#e9ecef',
      textAlign: 'center',
    },
    footer: {
      padding: '20px',
      textAlign: 'center',
      background: '#333',
      color: '#fff',
    },
    footerText: {
      margin: '10px 0',
    },
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredContact, setIsHoveredContact] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredWhyChoose, setHoveredWhyChoose] = useState(null);

  return (
    <div>
      <div style={styles.home}>
        <Navbar />
        <div style={styles.background} />
        <div style={styles.content}>
          <h2 style={styles.heading}>
            Company Crime Tracking System Using Blockchain
            <br />
            <span style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'justify' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur laboriosam optio voluptatum
              <br /> maxime ea recusandae expedita eius fugit, vitae iure sint rem omnis asperiores impedit autem.
              <br /> Reprehenderit corporis vitae earum.
            </span>
            <br />
            <span>
              <button
                style={{
                  ...styles.button,
                  ...(isHovered ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                
              >
                Get Started
              </button>
              <button
                style={{
                  ...styles.button,
                  ...(isHoveredContact ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setIsHoveredContact(true)}
                onMouseLeave={() => setIsHoveredContact(false)}
              >
                Contact Us
              </button>
            </span>
          </h2>
          <div style={styles.gifContainer}>
            <img
              src="https://inizsoft.com/wp-content/uploads/2021/02/wordpress-Development-Company-in-India1.gif"
              alt="Gif 1"
              style={{ width: '500px', height: '400px' }}
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div style={styles.section} id='chooseus'>
        <h2 style={styles.sectionHeading}>Why Choose Us?</h2>
        <p>
          We offer cutting-edge solutions tailored to your needs. Our commitment to quality and innovation sets us apart. 
          Here are a few reasons to choose us:
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'Expert Team: Our team consists of industry experts with years of experience.',
            'Tailored Solutions: We customize our services to fit your specific requirements.',
            'Proven Track Record: We have successfully implemented numerous projects.',
            'Customer Support: Our support team is available 24/7 to assist you.',
          ].map((reason, index) => (
            <div
              key={index}
              style={{
                ...styles.whyChooseUsCard,
                ...(hoveredWhyChoose === reason ? styles.whyChooseUsCardHover : {}),
              }}
              onMouseEnter={() => setHoveredWhyChoose(reason)}
              onMouseLeave={() => setHoveredWhyChoose(null)}
            >
              <p>{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div style={styles.section} id='services'>
        <h2 style={styles.sectionHeading}>Our Services</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Blockchain Development', 'IT Consulting', 'Verify Certificates', 'Secure Employee Details'].map(service => (
            <div
              key={service}
              style={{
                ...styles.serviceCard,
                ...(hoveredService === service ? styles.serviceCardHover : {}),
              }}
              onMouseEnter={() => setHoveredService(service)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <h3>{service}</h3>
              <p>High-quality service description for {service}.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information Section */}
      <div style={styles.contactSection} id='contact'>
        <h2 style={styles.sectionHeading}>Contact Us</h2>
        <p>If you have any questions, feel free to reach out!</p>
        <p>Email: support@yourcompany.com</p>
        <p>Phone: +123 456 7890</p>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <p style={styles.footerText}>Follow us on social media!</p>
      </footer>
    </div>
  );
}

export default Home;
