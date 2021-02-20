import React from 'react';
export const Button = ({ title, r, g, b,clickAction }) => {
    return (
        <button className='button' style={{
            backgroundColor: `rgb(${r},${g},${b})`
        }} onClick={clickAction}> { title} </button >
    )
}