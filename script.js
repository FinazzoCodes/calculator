let firstOperand = "";
let secondOperand = "";
let operator = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberBtns = document.querySelectorAll(`[data-number]`);
const decimalBtn = document.getElementById("decimalBtn");
const operatorBtns = document.querySelectorAll(".btn-operator");
const clearBtn = document.getElementById("clearBtn");
const equalsBtn = document.getElementById("equalsBtn");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);

const appendNumber = (number) => {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  currentOperationScreen.textContent += number;
};

const resetScreen = () => {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
};

const clear = () => {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
};

const appendDecimal = () => {
  if (shouldResetScreen) resetScreen();
  if (currentOperationScreen.textContent === "") {
    currentOperationScreen.textContent = "0";
  }
  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
};

const setOperation = (operator) => {
  if (currentOperation !== null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
};

const evaluate = () => {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

const roundResult = (number) => {
  return Math.round(number * 1000) / 1000;
};

const handleKeyboardInput = (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
};

const convertOperator = (keyboardOperator) => {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) {
        return "Cannot divide by zero";
      }
      return divide(a, b);
    default:
      return "Invalid Operation";
  }
};

window.addEventListener("keydown", handleKeyboardInput);
equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
decimalBtn.addEventListener("click", appendDecimal);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});
