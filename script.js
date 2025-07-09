let currentNumber = "";
let firstNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn-container button");

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function div(num1, num2) {
  if (num2 === 0) {
    return "Error: Div by 0!";
  }
  return num1 / num2;
}

function operate(num1, num2, operator) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return sub(num1, num2);
    case "*":
      return mul(num1, num2);
    case "/":
      return div(num1, num2);
    default:
      return null;
  }
}

function appendNumber(number) {
  if (display.textContent === "Error: Div by 0!" || shouldResetDisplay) {
    display.textContent = "";
    shouldResetDisplay = false;
  }

  if (display.textContent === "0" && number === "0") return;
  if (display.textContent === "0" && number !== ".") {
    display.textContent = "";
  }

  display.textContent += number;
  currentNumber = display.textContent;
}

function appendDecimal() {
  if (shouldResetDisplay) {
    display.textContent = "0";
    shouldResetDisplay = false;
  }

  if (!display.textContent.includes(".")) {
    display.textContent += ".";
    currentNumber = display.textContent;
  }
}

function setOperator(operator) {
  if (currentOperator !== null && !shouldResetDisplay) {
    evaluate();
  }

  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  currentNumber = display.textContent;

  if (currentOperator === "/" && currentNumber === "0") {
    display.textContent = "Error: Div by 0!";
    resetCalculatorState();
    shouldResetDisplay = true;
    return;
  }

  let result = operate(firstNumber, currentNumber, currentOperator);

  if (typeof result === "number") {
    result = Math.round(result * 1000000000) / 1000000000;
  }

  display.textContent = result;
  firstNumber = result;
  currentOperator = null;
  shouldResetDisplay = true;
}

function deleteLastDigit() {
  if (display.textContent === "Error: Div by 0!") {
    clearCalculator();
    return;
  }

  display.textContent = display.textContent.slice(0, -1);

  if (display.textContent === "") {
    display.textContent = "0";
  }

  currentNumber = display.textContent;
}

function clearCalculator() {
  display.textContent = "0";
  resetCalculatorState();
}

function resetCalculatorState() {
  firstNumber = "";
  currentNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (button.classList.contains("number")) {
      appendNumber(buttonText);
    } else if (button.classList.contains("operator")) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      evaluate();
    } else if (buttonText === "DEL") {
      deleteLastDigit();
    } else if (buttonText === "AC" || buttonText === "C") {
      clearCalculator();
    } else if (buttonText === ".") {
      appendDecimal();
    }
  });
});

clearCalculator();
