import React from 'react';
import classes from './Input.module.css';

const Input = ({name, label, type, value, ...rest}) => {
    return (
        <div className={classes.formGroup}>
            <label htmlFor={name}>{label}</label>
            <input {...rest} value={value} id={name} type={type} name={name}/>
        </div>
    );
};

export default Input;