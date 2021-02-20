import React from 'react';
import './customInput.scss';
export const FormInput = ({ set, label, ...otherProps }) => {
    const handleChange = (e) => {
        set(e.target.value);
        if (e.target.value.length > 0) {
            e.target.previousSibling.className += ' show';
        } else {
            e.target.previousSibling.className = 'fade form-label';
        }
    }

    return (
        <div className="form-group custom-form">
            <label htmlFor={label.toLowerCase().split()[0]} className="fade form-label">{label}</label>
            <input id={label.toLowerCase().split()[0]} className={`form-control`} placeholder={label} onChange={handleChange} {...otherProps}>
            </input>
        </div>
    )
};

export default FormInput; 