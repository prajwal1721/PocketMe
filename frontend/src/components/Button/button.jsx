import React from 'react';
import './button.scss';
export const Button = ({ title, r, g, b, clickAction }) => {
    return (
        <button className='button' style={{
            backgroundColor: `rgb(${r},${g},${b})`
        }} onClick={clickAction}> { title} </button >
    )
}