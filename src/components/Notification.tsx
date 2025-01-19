import React from "react";

interface NotificationProps {
  message: string; // Message to display
  onClose: () => void; // Function to call when closing the notification
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  // Don't render if there's no message
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "#4caf50", // Green background for success message
        color: "white", // White text color
        padding: "10px", // Padding around the message
        marginBottom: "10px", // Margin below the notification
        cursor: "pointer", // Pointer cursor on hover
        borderRadius: "5px", // Rounded corners for better UI
        display: "flex", // Use flexbox to arrange the content
        justifyContent: "space-between", // Space between text and close button
        alignItems: "center", // Vertically align items
      }}
      onClick={onClose} // Close the notification on click
    >
      <span>{message}</span> {/* Display the message */}
      <button
        onClick={(e) => { 
          e.stopPropagation(); // Prevent the parent div from closing on button click
          onClose(); // Trigger the onClose function
        }}
        style={{
          backgroundColor: "transparent", // Transparent background for the button
          border: "none", // No border for the button
          color: "white", // White color for the button
          cursor: "pointer", // Pointer cursor for button
          fontSize: "16px", // Font size for button text
        }}
      >
        × {/* Close icon */}
      </button>
    </div>
  );
};

export default Notification;
