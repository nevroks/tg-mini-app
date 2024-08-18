import React from 'react';
import classes from "./style.module.css";
import cn from "classnames"

const Button = ({children, className, ...props}) => {
    return (
        <button className={cn(classes["button"], `${className}`)} {...props}>
            {children}
        </button>
    );
};

export default Button;