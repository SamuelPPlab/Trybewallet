import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    // this.validateEmail = this.validateEmail.bind(this);
    // this.validatePassword = this.validatePassword.bind(this);
  }

  /* O regex usado nesta função foi retirado do site:
  https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail */

  validateEmail(email) {
    const inputEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return inputEmail.test(email);
  }

  validatePassword(password) {
    const PASSWORD_MIN_SIZE = 6;
    return password.length >= PASSWORD_MIN_SIZE;
  }

  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }

  handleLogin() {
    // const { login } = this.props;
    const { email } = this.state;
    login({ email });
  }

  render() {
    const { email, password } = this.state;
    const activeButton = this.validateEmail(email) && this.validatePassword(password);
    return (
      <div>
        <input
          type="text"
          data-testid="email-input"
          placeholder="digite seu email"
          onChange={ (event) => this.handleChange(event, 'email') }
          value={ email }
        />
        <input
          type="text"
          data-testid="password-input"
          placeholder="digite sua senha"
          onChange={ (event) => this.handleChange(event, 'password') }
          value={ password }
        />
        <Link to="/carteira">
          <input
            type="button"
            id="button-login"
            value="Entrar"
            disabled={ !activeButton }
            onClick={ () => this.handleLogin() }
          />
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e)),
  // fetchCurrencies: () => dispatch(fetchCurrencies()),
  // fetchCurrencies: () => dispatch(fetchCurrencies()),
});

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
// };

export default connect(null, mapDispatchToProps)(Login);
