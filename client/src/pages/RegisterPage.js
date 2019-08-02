import React, { Component } from 'react';
import { register } from '../api';
import { withRouter } from "react-router-dom";
import routes from '../routes';
import InputText from '../components/InputText';
import { getFormError, isRequired, getErrorMessage } from '../helpers';
import Form from '../components/Form';
import Button from '../components/Button';

class RegisterPage extends Component {
  state = {
    form: {
      username: null,
      password: null,
      password2: null,
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
      },
      {
        id: 'password2',
        func: isRequired,
        message: 'Repeat Password is required'
      }
    ], prevError);
    if (form.password && form.password2 && form.password !== form.password2) {
      error.password2 = 'Passwords don\'t match';
    }
    this.setState({ error });
    return Object.keys(error).length === 0;
  }

  handleSubmit = async () => {
    const { form } = this.state;
    const valid = this.validateForm();
    if (valid) {
      try {
        const user = await register(form.username, form.password, form.password2);
        if (user) {
          this.props.history.push(routes.login);
        } else {
          this.setState({
            error: { username: 'Please try again' }
          });
        }
      } catch (error) {
        this.setState({
          error: { username: getErrorMessage(error, 'Please try again') }
        });
      }
    }
  }

  handleLogin = () => {
    this.props.history.push(routes.login);
  }
  
  render() {
    const { error } = this.state;
    return (
      <div className="login-page container">
        <div className="row justify-content-md-center">
          <div className="col-4">
            <h4>Register</h4>
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
              <InputText
                id="password2"
                type="password"
                label="Repeat Password"
                placeholder="Repeat password"
                setValueForm={this.setValueForm}
                validateForm={this.validateForm}
                error={error.password2}
              />
              <Button
                text="Register"
                type="submit"
                variant="primary"
                onClick={this.handleSubmit}
              />
              <Button
                text="Login"
                type="submit"
                variant="light"
                onClick={this.handleLogin}
              />
            </Form>              
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterPage);
