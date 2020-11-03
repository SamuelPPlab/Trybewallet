/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import login from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  renderInputEmail() {
    const { email } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            type="text"
            className="validate"
            value={ email }
            onChange={ this.handleInput }
          />
          <br />
        </label>
      </div>
    );
  }

  renderInputPassword() {
    return (
      <div>
        <label htmlFor="password">
          senha
          <input
            data-testid="password-input"
            type="password"
            className="validate"
            value={ password }
            onSubmit={ this.handleInput }
          />
        </label>
      </div>
    );
  }

  renderButtonEntrar() {
    return (
      <div>
        <button type="submit">
          onclick=
          {this.handleSubmit}
          Entrar
        </button>
        <Link to="/wallet">Logging</Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <form>
          { this.renderInputEmail() }
          { this.renderInputPassword() }
          { this.renderButtonEntrar() }
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  Login: state.email,
});

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}.isRequired;

export default connect(
  null, mapDispatchToProps,
)(login);

// login autentucar usuario, login logaut

/* ### Página de Login
1. Crie uma página inicial de login com os seguintes campos e características:

  * A rota para esta página deve ser ‘/’.
  * Você deve criar um local para que a pessoa usuária insira seu email e senha. Utilize o atributo `data-testid="email-input"` para o email e `data-testid="password-input"` para a senha.
  * Crie um botão com o texto ‘Entrar’.
  * Realize as seguintes verificações nos campos de email e senha, de modo que caso sejam falsas o botão fique desabilitado:
    * O email está no formato válido, como 'alguem@alguem.com'.
    * A senha possui 6 ou mais caracteres.
  * Salve o email no estado da aplicação, com a chave ***email***, assim que a pessoa usuária logar.
  * A rota deve ser mudada para '/carteira' após o clique no botão '**Entrar**'. */
