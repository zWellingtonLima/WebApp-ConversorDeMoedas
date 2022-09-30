const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');

const url = 'https://v6.exchangerate-api.com/v6/1a12cce673f9a34231d428a3/latest/USD';

const getErrorMessage = errorType => ({
  'unsupported-code': 'A moeda não existe em nosso banco de dados.',
  'base-code-only-on-pro': 'Informações de moedas que não sejam USD ou EUR só podem ser acessadas com o plano Pro.'
})[errorType] //Com essa sintaxe o objeto vai ser criado e é encadeado a propriedade que o errorType recebeu, portanto, o que essa função retorna é o resultado de obj[errorType]

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(url);
    const exchangeRateData = await response.json();
    
    if (exchangeRateData.result === 'error'){
      throw new Error(getErrorMessage(exchangeRateData['error-type']))
    }
  } catch (err) {
    alert(err.message)
  }
}
fetchExchangeRate()

const option = `<option>oi</option>`;

currencyOneEl.innerHTML = option;
currencyTwoEl.innerHTML = option;

console.log(currencyOneEl, currencyTwoEl);

