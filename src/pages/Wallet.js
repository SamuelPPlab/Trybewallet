import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Wallet.css';
import logo from './logo.png';
import { createExpense, fetchObj, deleteObj } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.buttonAdd = this.buttonAdd.bind(this);
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
      display: false,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  async buttonAdd() {
    const { fieldSave } = this.props;
    const { expense } = this.state;
    const { value, description, method, currency, tag } = expense;
    if (
      value !== ''
      && description !== ''
      && method !== ''
      && currency !== ''
      && tag !== '') {
      await fieldSave(expense);
      this.setState({
        expense: {
          value: '',
          description: '',
          currency: '',
          method: '',
          tag: '',
        },
      });
    } else {
      this.setState({
        display: true,
      });
    }
  }

  changeHandler(event) {
    const { name, value } = event.target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
      display: false,
    });
  }

  render() {
    const { email, currencies, sum = '0', expenses, deleteExpense } = this.props;
    const { expense, display } = this.state;
    const { value, currency, method, tag, description } = expense;
    const tabela = ['Descrição',
      'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <div>
        <header className="header">
          <img src={ logo } height="25px" alt="logomarca" />
          <p>
            Usuário:
            <span className="bold" data-testid="email-field">{ email }</span>
          </p>
          <p>
            Despesa Total: R$
            <span data-testid="total-field">{ sum }</span>
            <span className="bold" data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <div className="form">
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            className="form-control form-control-sm"
            value={ value }
            onChange={ this.changeHandler }
          />
          Moeda:
          <select
            data-testid="currency-input"
            className="form-control form-control-sm"
            name="currency"
            value={ currency }
            onChange={ this.changeHandler }
          >
            <option>Escolha</option>
            { currencies.map((e) => (
              <option data-testid={ e } key={ e }>{ e }</option>
            )) }
          </select>
          Pagamento:
          <select
            name="method"
            data-testid="method-input"
            className="form-control form-control-sm"
            value={ method }
            onChange={ this.changeHandler }
          >
            <option>Escolha</option>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            className="form-control form-control-sm"
            value={ tag }
            onChange={ this.changeHandler }
          >
            <option>Escolha</option>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            className="form-control form-control-sm"
            value={ description }
            onChange={ this.changeHandler }
          />
          <button
            type="button"
            className="btn btn-primary text-nowrap"
            onClick={ this.buttonAdd }
          >
            Adicionar despesa
          </button>
        </div>
        <div
          className="alert"
          style={ { display: display ? 'block' : 'none' } }
        >
          Favor preencher todos os campos!
        </div>
        <table className="table table-dark">
          <thead>
            <tr>
              { tabela.map((campo) => (
                <th key={ campo } scope="col">{ campo }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            { expenses.map((exp) => (
              <tr key={ exp.id }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ exp.value }</td>
                <td>{ exp.exchangeRates[exp.currency].name }</td>
                <td>{ (parseFloat(exp.exchangeRates[exp.currency].ask)).toFixed(2) }</td>
                <td>{ (exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="btn-danger"
                    onClick={ () => deleteExpense(exp.id) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  sum: state.wallet.sum,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fieldSave: (expense) => dispatch(createExpense(expense)),
  getCurrencies: () => dispatch(fetchObj()),
  deleteExpense: (expense) => dispatch(deleteObj(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fieldSave: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  sum: PropTypes.string,
  deleteExpense: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  sum: '0',
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
