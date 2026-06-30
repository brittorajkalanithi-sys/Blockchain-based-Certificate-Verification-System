import React from 'react';

function AdminNavbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <h1 style={styles.logo}>Nexa</h1>
        <ul style={styles.navMenu}>
          <li style={styles.navItem}><a href="/admin" style={styles.navLink}>Create employee accounts</a></li>
          <li style={styles.navItem}><a href="/adminemployeedetails" style={styles.navLink}>Manage employee details</a></li>
          <li style={styles.navItem}><a href="/certificategenerate" style={styles.navLink}>Generate Certificates</a></li>
          <li style={styles.navItem}><a href="/admincertificatedetails" style={styles.navLink}>Certificate Details</a></li>
          <li style={styles.navItem}><a href="/" style={styles.navLink}>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    width: '100%',
    transition: 'transform 0.3s ease',
    zIndex: 1000,
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
  },
  logo: {
    fontSize: '1.5rem',
  },
  navMenu: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
  },
  navItem: {
    position: 'relative',
  },
  navLink: {
    textDecoration: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    transition: 'background-color 0.3s ease',
  },
  '@media (max-width: 768px)': {
    navMenu: {
      flexDirection: 'column',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: '#444',
      display: 'none', // Initially hidden
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    navItem: {
      textAlign: 'center',
      padding: '1rem 0',
      width: '100%',
    },
    navMenuHover: {
      display: 'flex', // Show menu on hover
    },
  },
};

export default AdminNavbar;
