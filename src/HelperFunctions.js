export const randomNumber = (min, max) => {
  min = Number(min);
  max = Number(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const solve = (operand1, operand2, operation) => {
  switch (operation) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    default:
      break;
  }
};

export const pickAnOperator = (arrayOfOperators) => {
  return arrayOfOperators[randomNumber(0, arrayOfOperators.length - 1)];
};

export const randomNumberAvoidingZero = (minimumLimit, maximumLimit) => {
  let num = randomNumber(minimumLimit, maximumLimit);
  while (num === 0) {
    num = randomNumber(minimumLimit, maximumLimit);
  }
  return num;
};

export const pickAnOperatorAvoidingDivision = (arrayOfOperators) => {
  let dummyArray = arrayOfOperators.filter((item) => {
    return item !== "/";
  });
  return dummyArray[randomNumber(0, dummyArray.length - 1)];
};
