import React from 'react';

const Button = ({ variant, text, submit, className, onClick, ...props }) => (
  <button
    type={submit ? 'submit' : 'button'}
    className={`btn btn-${variant} ${className} mr-2`}
    onClick={e => {
      onClick(e);
      e.preventDefault();
    }}
    {...props}
  >
    {text}
  </button>
);

export default Button;
