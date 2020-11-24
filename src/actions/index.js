export const LOGIN = 'LOGIN';
export const SELECTCURRENCY = 'SELECTCURRENCY';
export const ADDEXPENSE = 'ADDEXPENSE';
export const ADDTOTAL = 'ADDTOTAL';
export const DELETEEXPENSE = 'DELETEEXPENSE';
export const REFACTORETOTAL = 'REFACTORETOTAL';

export function login(email) {
  return {
    type: LOGIN,
    email,
  };
}

export function actionSelectCurrency(currency) {
  return {
    type: SELECTCURRENCY,
    currency,
  };
}

export function addExpense(expense) {
  return {
    type: ADDEXPENSE,
    expense,
  };
}

export function deleteExpense(expense) {
  // const newExpenses = expense.filter((expense) => expense ==! expense.id);
  // objeto nao funciona filter;
  return {
    type: DELETEEXPENSE,
    expense,
  };
}

export function addTotal(newTotal) {
  console.log(newTotal);
  return {
    type: ADDTOTAL,
    newTotal,
  };
}

// export function refactoreTotal(newTotal) {
//   return {
//     type: REFACTORETOTAL,
//     newTotal,
//   };
// }

export function fetchCurrency() {
  return async (dispatch) => {
    const infoAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const infoJSON = await infoAPI.json();
    dispatch(actionSelectCurrency(infoJSON));
  };
}
