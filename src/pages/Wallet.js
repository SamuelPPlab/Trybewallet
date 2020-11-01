import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiMoney, { expenses } from '../actions';
/* import Tabela from './Tabela' */

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { myMoney } = this.props;
    myMoney();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { myExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    myExpenses({ value, description, currency, method, tag });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    //totalValue feito com a ajuda do colega William pelo SLACK
    const totalValue = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value * cur.exchangeRates[cur.currency]
      .ask, 0) * 100) / 100 : 0;
    return (
      <div>
        <header>
          <p data-testid="email-field">Email: { email }</p>
          <p data-testid="total-field">Despesas totais: { totalValue }</p>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </header>
        <form>
          <label>
            Valor:
            <input type="number" name="value" onChange={ this.handleChange } data-testid="value-input" />
          </label>
          <label>
            Descrição:
            <input type="text" name="description" onChange={ this.handleChange } data-testid="description-input" />
          </label>
          <label>
            Moeda:{' '}
            {/* buscar atraves da api, Remova das informações trazidas pela API a opção 'USDT' (Dólar Turismo).  */}
            <select data-testid="currency-input" name="currency" onChange={ this.handleChange }>
              <option value="" selected>Selecione</option>
              { currencies.map((moeda) => (
                <option value={ moeda } data-testid={ moeda }>
                  { moeda }
                </option>
              ))}
            </select>
          </label>
          <label>
            Método de Pagamento:
            <select data-testid="method-input" name="method" onChange={ this.handleChange }>
              <option value="" selected>Selecione</option>
              { pagamento.map((pagamento) => (
                <option value={ pagamento }>{ pagamento }</option>
              ))}
            </select>
          </label>
          <label>
            Tag:    
            <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
              <option value="" selected>Selecione</option>
              { tag.map((tag) => (
                <option value={ tag }>{ tag }</option>
              ))}
            </select>
          </label>
          {/* Ao ser clicado, o botão deve fazer uma requisição à API para trazer o câmbio mais atualizado possível. */}
          <button type="submit" onClick={ this.onSubmit }>Adicionar despesa</button>
        </form>
        {/* {Tabela} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  myMoney: (cotacaoMoeda) => dispatch(apiMoney(cotacaoMoeda)),
  myExpenses: (payload) => dispatch(expenses(payload)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  myMoney: PropTypes.func.isRequired,
  myExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
