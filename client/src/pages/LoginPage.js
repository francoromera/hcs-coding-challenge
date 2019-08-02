import React, { Component } from 'react';
import { login } from '../api';
import { withRouter } from "react-router-dom";
import routes from '../routes';
import InputText from '../components/InputText';
import { getFormError, isRequired, getErrorMessage } from '../helpers';
import Form from '../components/Form';
import Button from '../components/Button';

class LoginPage extends Component {
  state = {
    form: {
      username: null,
      password: null,
    },
    error: {}
  }

  setValueForm = (field, value) => {
    this.setState((prevState) => ({
      form: { ...prevState.form, [field]: value }
    }));
  }

  validateForm = field => {
    const { form, error: prevError } = this.state;
    const error = getFormError(form, field, [
      {
        id: 'username',
        func: isRequired,
        message: 'Username is required'
      },
      {
        id: 'password',
        func: isRequired,
        message: 'Password is required'
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
        const user = await login(form.username, form.password);
        if (user) {
          this.props.history.push(routes.main);
        } else {
          this.setState({
            error: { username: 'Username or password is wrong' }
          });
        }
      } catch (error) {
        this.setState({
          error: { username: getErrorMessage(error, 'Please try again') }
        });
      }
    }
  }

  handleRegister = () => {
    this.props.history.push(routes.register);
  }

  render() {
    const { error } = this.state;
    return (
      <div className="login-page container">
        <div className="row justify-content-md-center">
          <div className="col-4">
            <h4>Login</h4>
            <Form>
              <InputText
                id="username"
                type="text"
                label="Username"
                placeholder="Enter username"
                setValueForm={this.setValueForm}
                validateForm={this.validateForm}
                error={error.username}
              />
              <InputText
                id="password"
                type="password"
                label="Password"
                placeholder="Enter password"
                setValueForm={this.setValueForm}
                validateForm={this.validateForm}
                error={error.password}
              />
              <Button
                onClick={this.handleSubmit}
                type="submit"
                variant="primary"
                text="Login"
              />
              <Button
                onClick={this.handleRegister}
                type="button"
                variant="light"
                text="Register"
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
