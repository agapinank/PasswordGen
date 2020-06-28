//variable assigned to document method set to return selected element ID
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRamdonUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};
//on click clipboard btn
clipboard.addEventListener('click', () => {
  const textarea = document.getElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Pass copied to clipboard');
});

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolEl.checked;

  resultsEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = ' ';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  //does not have a selected type
  if (typesCount === 0) {
    return ' ';
  }
  // will loop thru the length of typesArr and increase equal to typesCount
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
}
