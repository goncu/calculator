//variables to use
let numberValue = [],
  firstValue = 0,
  secondValue = 0,
  finalValue = 0,
  displayedValue = 0,
  operatorEntered = false,
  operator = ``;
//function for resetting and initializing
const clearAll = function () {
  numberValue = [];
  firstValue = 0;
  secondValue = 0;
  finalValue = 0;
  displayedValue = 0;
  operatorEntered = false;
  operator = ``;
};
//functions for element selection
const classSelect = (a) => document.querySelector(`.${a}`);
const idSelect = (a) => document.getElementById(`${a}`);
//functions for math operations
const add = function (a, b) {
  return a + b;
};
const subtract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  return a * b;
};
const divide = function (a, b) {
  return a / b;
};
const operate = function (a, b, operator) {
  switch (operator) {
    case `+`:
      return add(a, b);
      break;
    case `-`:
      return subtract(a, b);
      break;
    case `*`:
      return multiply(a, b);
      break;
    case `/`:
      return divide(a, b);
      break;
    default:
      break;
  }
};
//function for registering the operator entered
const operatorInput = function (op) {
  if (!operatorEntered) {
    operatorEntered = true;
    if (!firstValue) firstValue = Number(numberValue.join(``));
    operator = op;
    numberValue = [];
    displayedValue += op;
    truncateAndDisplay();
  } else {
    operationResult();
    operatorEntered = true;
    operator = op;
    numberValue = [];
    displayedValue += op;
    truncateAndDisplay();
  }
};
//function for registering the number entered
const enterNumber = function (num) {
  if (displayedValue === 0) {
    displayedValue = `${num}`;
  } else {
    displayedValue += `${num}`;
  }
  truncateAndDisplay();
  numberValue.push(num);
};
//function for registering the decimal point entered
const enterDecimal = function () {
  if (!numberValue.includes(`.`)) {
    displayedValue += `.`;
    numberValue.push(`.`);
  }
};
//function for calculating the operation
const operationResult = function () {
  if (operatorEntered) {
    secondValue = Number(numberValue.join(``));
    if (secondValue === 0 && operator === `/`) {
      classSelect(`to-display`).textContent = `ERR`;
      clearAll();
    } else {
      finalValue = parseFloat(
        operate(firstValue, secondValue, operator).toFixed(2)
      );
      displayedValue = finalValue;
      numberValue = [];
      firstValue = finalValue;
      secondValue = 0;
      finalValue = 0;
      operatorEntered = false;
      truncateAndDisplay();
    }
  }
};
//function for displaying the current value, and also truncating in case of overflow
const truncateAndDisplay = function () {
  if (displayedValue.length > 10) displayedValue = displayedValue.substring(1);
  classSelect(`to-display`).textContent = displayedValue;
};
//function for deleting last entered number
const deleteF = function () {
  if (
    displayedValue[displayedValue.length - 1] >= 0 &&
    displayedValue[displayedValue.length - 1] <= 9
  ) {
    numberValue.pop();
    displayedValue = displayedValue.substring(0, displayedValue.length - 1);
    truncateAndDisplay();
  }
};
//event listeners for clicks
for (let i = 0; i < 10; i++) {
  idSelect(`btn-${i}`).addEventListener(`click`, () => {
    enterNumber(i);
  });
}
idSelect(`btn-add`).addEventListener(`click`, function () {
  operatorInput(`+`);
});
idSelect(`btn-subtract`).addEventListener(`click`, function () {
  operatorInput(`-`);
});
idSelect(`btn-multiply`).addEventListener(`click`, function () {
  operatorInput(`*`);
});
idSelect(`btn-divide`).addEventListener(`click`, function () {
  operatorInput(`/`);
});
idSelect(`btn-equal`).addEventListener(`click`, operationResult);
idSelect(`btn-point`).addEventListener(`click`, enterDecimal);
idSelect(`btn-delete`).addEventListener(`click`, deleteF);
idSelect(`btn-clear`).addEventListener(`click`, () => {
  clearAll();
  truncateAndDisplay();
});
//event listeners for keypresses
document.addEventListener(`keydown`, function (el) {
  const numbers = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`];
  const operators = [`+`, `-`, `*`, `/`];
  console.log(el);
  if (numbers.includes(el.key)) enterNumber(el.key);
  if (operators.includes(el.key)) operatorInput(el.key);
  if (el.code === `NumpadEnter`) operationResult();
  if (el.code === `Enter`) operationResult();
  if (el.key === `=`) operationResult();
  if (el.key === `Backspace`) deleteF();
  if (el.key === `.`) enterDecimal();
  if (el.key === `Escape`) {
    clearAll();
    truncateAndDisplay();
  }
});
