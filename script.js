let firstOperand = "";
let operator = "";
let secondOperand = "";

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
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
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
