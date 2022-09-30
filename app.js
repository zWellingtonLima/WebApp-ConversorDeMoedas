const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');

const url = 'https://v6.exchangerate-api.com/v6/1a12cce673f9a34231d428a3/latest/USD';

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(url)
    console.log(response);
    
  } catch (err) {

  }
}
fetchExchangeRate()

const option = `<option>oi</option>`;

currencyOneEl.innerHTML = option;
currencyTwoEl.innerHTML = option;

console.log(currencyOneEl, currencyTwoEl);

