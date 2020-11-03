import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.props;
    return (
      <div>
        <div>
          <label>
            Email:
            <input
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email"
              data-testid="email-input"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              data-testid="password-input"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </label>
        </div>
        <button
          type="submit"
        >Entrar</button>
      </div>
    );
  }
}

export default Login;
