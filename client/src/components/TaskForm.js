import React, {Component} from 'react';
import { addTask, editTask } from '../api';
import InputText from './InputText';
import { getFormError, isRequired, getErrorMessage, dateToString } from '../helpers';
import Form from './Form';
import Button from './Button';

class TaskForm extends Component {
  state = {
    form: this.props.task,
    error: {}
  }

  setValueForm = (field, value) => {
    this.setState(prevState => ({
      form: { ...prevState.form, [field]: value }
    }));
  }

  validateForm = field => {
    const { form, error: prevError } = this.state;
    const error = getFormError(form, field, [
      {
        id: 'description',
        func: isRequired,
        message: 'Description is required'
      },
      {
        id: 'due',
        func: isRequired,
        message: 'Due date is required'
      }
    ], prevError);
    this.setState({ error });
    return Object.keys(error).length === 0;
  }

  handleSubmit = async () => {
    const { form } = this.state;
    const valid = this.validateForm();
    if (valid) {
      try {
        const task = !form._id ? await addTask(form) : await editTask(form);
        if (task) {
          this.props.saveTask(task);
        } else {
          this.setState({
            error: { description: 'ERROR' }
          });
        }
      } catch (error) {
        this.setState({
          error: { description: getErrorMessage(error, 'Please try again') }
        });
      }
    }
  }

  render() {
    const { task } = this.props;
    const { error } = this.state;
    return (
      <Form>
        <InputText
          id="description"
          type="text"
          label="Description"
          placeholder="Enter description"
          setValueForm={this.setValueForm}
          validateForm={this.validateForm}
          error={error.description}
          defaultValue={task.description}
        />
        <InputText
          id="due"
          type="date"
          label="Due"
          placeholder="Enter due date"
          setValueForm={this.setValueForm}
          validateForm={this.validateForm}
          error={error.due}
          defaultValue={dateToString(task.due)}
        />
        <Button
          text="Save"
          variant="primary"
          type="submit"
          onClick={this.handleSubmit}
        />
        <Button
          text="Cancel"
          variant="light"
          type="submit"
          onClick={() => this.props.cancel(task._id)}
        />
      </Form>
    );
  }
}

export default TaskForm;
