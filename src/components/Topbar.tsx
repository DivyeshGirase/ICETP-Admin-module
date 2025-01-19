// components/Topbar.tsx

'use client'; // Ensure this is a client-side component

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

// Define types for your component
const Topbar: React.FC = () => {
  const router = useRouter(); // Use Next.js router for navigation

  const handleLogout = (): void => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    router.push("/login"); // Navigate to the login page
  };

  const styles = {
    topbar: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      backgroundColor: "#f5f5f5",
    },
    logoutButton: {
      backgroundColor: "#163a24", // Dark background for logout
      color: "white", // White text color
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "16px",
    },
    logoutButtonHover: {
      backgroundColor: "#115c3d", // Darker background on hover
    },
  };

  return (
    <div style={styles.topbar}>
       <img
          src="/image/logo.jpg"
          alt="Logo"
          style={{
            width: "30px",
            height: "30px",
            marginRight: "10px",
          }}
        />
      <h2>ICETP Admin</h2>
      <button
        onClick={handleLogout}
        style={styles.logoutButton}
        onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = styles.logoutButtonHover.backgroundColor}
        onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = styles.logoutButton.backgroundColor}
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
