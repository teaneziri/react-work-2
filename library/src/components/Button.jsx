
import React from 'react';

const Button = ({ children, onClick, disabled, type = 'button', color = 'primary' }) => {
    let baseStyles = "px-3 py-1 text-sm rounded transition duration-150";
    let colorStyles;

    switch (color) {
        case 'primary':
            colorStyles = "bg-blue-600 text-white hover:bg-blue-700";
            break;
        case 'delete':
            colorStyles = "bg-red-600 text-white hover:bg-red-700";
            break;
        case 'sell':
            colorStyles = "bg-green-600 text-white hover:bg-green-700";
            break;
        case 'edit':
            colorStyles = "bg-yellow-500 text-white hover:bg-yellow-600";
            break;
        default:
            colorStyles = "bg-gray-300 text-gray-800 hover:bg-gray-400";
    }
    
    
    if (disabled) {
        colorStyles = "bg-gray-400 text-gray-200 cursor-not-allowed";
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${colorStyles}`}
        >
            {children}
        </button>
    );
};

export default Button;