import React from 'react';
import './customInput.scss';
export const FormInput = ({ set, label, ...otherProps }) => {
    const handleChange = (e) => {
        set(e.target.value);
    }
    return (
        <div className="input-container">
            <label htmlFor={label} className="input-label">{label}</label>
            <input name={label} className="input-input" placeholder={label} onChange={handleChange} {...otherProps}>
            </input>
        </div >
    )
};

export default FormInput;