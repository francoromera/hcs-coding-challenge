import React from 'react';

const Form = ({ children }) => (
  <div className="card mb-2">
    <div className="card-body">
      <form>
        {children}
      </form>
    </div>
  </div>
);

export default Form;
