import React from 'react';

const Alert = ({ message, type, onClose }) => {
  let alertClass = '';

  switch (type) {
    case 'success':
      alertClass = 'bg-green-500 text-white';
      break;
    case 'error':
      alertClass = 'bg-red-500 text-white';
      break;
    case 'info':
      alertClass = 'bg-blue-500 text-white';
      break;
    case 'warning':
      alertClass = 'bg-yellow-500 text-white';
      break;
    default:
      alertClass = 'bg-gray-500 text-white';
  }

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${alertClass}`} role="alert">
      <div className="flex items-center">
        <span className="mr-2">{message}</span>
        <button
          className="ml-auto bg-transparent border-none text-white hover:text-gray-300"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
