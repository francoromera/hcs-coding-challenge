import React from 'react';
import { dateToString } from '../helpers';
import Button from './Button';

const Task = ({ task, handleEdit, handleDelete }) => {
  const { _id, description, due } = task;
  return (
    <div className="card mb-2">
      <div className="card-header">
        <b>{_id}</b>
      </div>
      <div className="card-body">
        <p>Description: <b>{description}</b></p>
        <p>Due: <b>{dateToString(due)}</b></p>
        <Button
          text="Edit"
          variant="primary"
          onClick={() => handleEdit(_id)}
        />
        <Button
          text="Delete"
          variant="danger"
          onClick={() => handleDelete(_id)}
        />
      </div>
    </div>
  );
};

export default Task;
