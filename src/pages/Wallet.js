import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinData, newExpenses, editExpense } from '../actions';
import Table from './Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
      },
      isEditing: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    currencyFetch();
  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  handleClickExpense(item) {
    console.log('edit expense', item);
    const teste = item.id;
    this.setState({
      isEditing: true,
      expense: {
        value: item.value,
        description: item.description,
        currency: item.currency,
        method: item.method,
        tag: item.tag,
      },
    }, (expense) => console.log({ ...expense, teste }));
  }

  async handleClick(e) {
    e.preventDefault();
    const { expense } = this.state;
    const { newExpencesWallet } = this.props;
    if (expense.value && expense.description && expense.tag !== 0) {
      await newExpencesWallet(expense);
      this.setState({
        expense: {
          value: '',
          description: '',
          currency: 'USD',
          method: '',
          tag: '',
        },
        isEditing: false,
      });
    }
  }

  render() {
    const { expense, isEditing } = this.state;
    const { value, description, currency, method, tag } = expense;
    const { email, currencies, totalField, expenses } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ totalField || '0' }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <hr />
        <form>
          <label htmlFor="email">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <span>
            Moeda:
          </span>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((moeda) => (
              <option
                data-testid={ moeda }
                value={ moeda }
                key={ moeda }
              >
                { moeda}
              </option>
            ))}
          </select>
          <span>
            Método de pagamento:
          </span>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <span>
            Tag:
          </span>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="initial">Escolha</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="button" onClick={ this.handleClick }>{isEditing ? 'Editar Despesa' : 'Adicionar despesa'}</button>
        </form>
        <Table editExpense={ this.handleClickExpense.bind(this) } />
      </div>
    );
  }
}
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.number.isRequired,
  // map: PropTypes.func.isRequired,
  currencyFetch: PropTypes.func.isRequired,
  // newAction: PropTypes.func.isRequired,
  newExpencesWallet: PropTypes.func.isRequired,
  totalField: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  totalField: state.wallet.totalField,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  // currencyFetch: () => dispatch(fetchCoinDataThunk()),
  newExpencesWallet: (expense) => dispatch(newExpenses(expense)),
  currencyFetch: () => dispatch(fetchCoinData()),
  dispatchExpense: (expense) => dispatch(editExpense(expense)),
  // getcurrencies: () => dispatch(getCurrencyAPI());
  // newAction: (expense) => dispatch(saveExpenses(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
