import React from 'react';
import './customInput.scss';
export const SelectInput = ({set,value, label,optionItems,...otherProps }) => {
    const handleChange=(e)=>{
        console.log(e.target.value);
        set(e.target.value)
    }
    return(
   <div className="form-group option-items">
        <label className="label">{label}</label>
        <select defaultValue={'DEFAULT'} onChange={handleChange}{...otherProps}>
        <option value="DEFAULT"  disabled hidden>Select Here</option>
            {optionItems.map(item=>
            <option value={item.value} key={item.id}>{item.value}</option>)}
        </select>
    </div>
)};