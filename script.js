//variable assigned to document method set to return selected element
const resultDiv = document.getElementById('result');
const length = document.getElementById('length');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const number = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generate = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};
clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultDiv.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied');
});

generate.addEventListener('click', () => {
  const hasLength = +length.value;
  const hasLower = lowerCase.checked;
  const hasUpper = upperCase.checked;
  const hasNumber = number.checked;
  const hasSymbol = symbols.checked;

resultDiv.innerText = generatePassword(
    hasLength,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let randomPassword = ' ';
  const typeCount = lower + upper + number + symbol;

  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );
  if (typeCount === 0) {
    return '';
  }
  for (let i = 0; i <= length; i += typeCount) {
    typeArr.forEach(type => {
      const funcName = Object.keys(type)[0];

      randomPassword += randomFunc[funcName]();
    });
  }
  const generateSolution = randomPassword.slice(0, length);
  return generateSolution;
}

//Random function creation
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
console.log(getRandomLower);

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
console.log(getRandomUpper);

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
console.log(getRandomNumber);

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
console.log(getRandomSymbol);
