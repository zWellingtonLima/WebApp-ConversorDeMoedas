const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]');

const url = 'https://v6.exchangerate-api.com/v6/1a12cce673f9a34231d428a3/latest/USD';

const getErrorMessage = errorType => ({
  'unsupported-code': 'A moeda não existe em nosso banco de dados.',
  'base-code-only-on-pro': 'Informações de moedas que não sejam USD ou EUR só podem ser acessadas com o plano Pro.',
  'malformed-request': 'O endpoint do seu request precisa seguir a estrutura a seguir: https://v6.exchangerate-api.com/v6/1a12cce673f9a34231d428a3/latest/USD',
  'invalid-key': 'A chave da API não é válida.',
  'quota-reached':'Sua conta infelizmente já alcançou o limite de requisições permitidas no plano grátis.',
  'not-available-on-plan':'O plano atual não permite esse tipo de requisição.'
})[errorType] || 'Não foi possível obter as informaçõs.'  //Com essa sintaxe [errorType] o objeto vai ser criado e é encadeado a propriedade que o errorType recebeu, portanto, o que essa função retorna é o resultado de obj[errorType].Se o errorType receber qualquer coisa que não seja o especificado dentro do corpo da função o valor dela resultará em falsy e será invocada como alert um valor undefined e apresentará no browser uma string vazia, no entanto, usando o || se o valor de toda a expressão a esquerda for false o valor padrão será o que está na string a direita do || prevenindo que resulte em valor undefined. 

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok){ // A ! (negação é usada pois o response.ok caso tenha dado um erro no carregamento resultará em um boolean false, logo, o if não executará o código, portanto, o ! tornará truthy o valor false caso tenha dado erro.)
      throw new Error('Sua conexão falhou. Não foi possível obter as informações.')
    }

    const exchangeRateData = await response.json();
    
    if (exchangeRateData.result === 'error'){
      throw new Error(getErrorMessage(exchangeRateData['error-type']))
    }

    return exchangeRateData;
  } catch (err) {
    alert(err.message);
    const div = document.createElement('div');
    const button = document.createElement('button');

    div.textContent = err.message;
    div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
    div.setAttribute('role', 'alert');
    button.classList.add('btn-close');
    button.setAttribute('type', 'button');
    button.setAttribute('Aria-label', 'Close');

    button.addEventListener('click', () => {
      div.remove()
    })

    div.appendChild(button);
    currenciesEl.insertAdjacentElement('afterend', div)
  }
}

const init = async () => {
  const exchangeRateData = await fetchExchangeRate()
  
  const options = Object.keys(exchangeRateData.conversion_rates)
    .map(currency => `<option>${currency}</option>`)
    .join('');
  
  currencyOneEl.innerHTML = options;
  currencyTwoEl.innerHTML = options;
}

init();
