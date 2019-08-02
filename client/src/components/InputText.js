import React from 'react';

const InputText = ({
  id,
  type,
  label,
  placeholder,
  setValueForm,
  validateForm,
  error,
  defaultValue = undefined
}) => (
  <div className={`form-group ${error ? 'has-error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <input 
      onChange={(e) => setValueForm(id, e.target.value)} 
      onBlur={() => validateForm(id)}
      type={type} 
      className="form-control" 
      id={id} 
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
    {error && (
      <small className="form-text text-danger">{error}</small>
    )}
  </div>
);

export default InputText;
