
import React from 'react';

const Input = ({ 
    label, 
    name, 
    value, 
    onChange, 
    type = 'text', 
    error,
    isTextarea = false, 
    min 
}) => {
    
    
    const inputClasses = `border w-full p-2 rounded focus:ring focus:ring-blue-200 ${error ? 'border-red-500' : 'border-gray-300'}`;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {isTextarea ? (
               
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows="3"
                    className={`${inputClasses} resize-none`}
                />
            ) : (
                
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={inputClasses}
                    min={min}
                    
                    onBlur={(e) => {
                        if (type === 'number' && e.target.value === '') {
                            onChange({ target: { name: name, value: 0, type: 'number' } });
                        }
                    }}
                />
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;