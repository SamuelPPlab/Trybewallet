import { SAVE_CURRENCIES, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return { ...state, currencies: action.payload };
  case SAVE_EXPENSE:
    return ({
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
        }],
    });
  default:
    return state;
  }
}

export default wallet;
