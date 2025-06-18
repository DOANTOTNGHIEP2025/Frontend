import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";
import './CustomToast.scss'; // Đảm bảo file SCSS đã đúng

const CustomToast = ({ message, type = "success" }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="toast-icon success" />;
      case "error":
        return <FaTimesCircle className="toast-icon error" />;
      case "warning":
        return <FaExclamationCircle className="toast-icon warning" />;
      default:
        return null;
    }
  };

  return (
    <div className="custom-toast new-layout">
      {getIcon()}
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default CustomToast;
