/*
É um objeto com a propriedade TYPE obrigatória
e os parametros desejados para serem usadas
pelos DISPATCHS (mapDispatchToProps)
Boa pratica é criar uma função que retorna a action(objeto)!

payload é convenção. está email como no Readme.
*/
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVE_EXPENCES = 'SAVE_EXPENCES';

export const actionLogin = (email) => ({
  type: LOGIN,
  email,
});

function getCurrencies(json) {
  return { type: GET_CURRENCIES, currency: json };
}

function requestCurrencies() {
  return { type: REQUEST_CURRENCIES };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, currency: error };
}

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const r = await fetch('https://economia.awesomeapi.com.br/json/all');
    return r.json()
      .then(
        (json) => dispatch(getCurrencies(json)),
        (error) => dispatch(failedRequest(error)),
      );
  };
}

export const actionExpenses = (expenses) => ({
  type: SAVE_EXPENCES,
  expenses,
});
