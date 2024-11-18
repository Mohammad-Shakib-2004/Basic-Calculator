// Select the display elements
const mainDisplay = document.querySelector('.main-display');
const secondaryDisplay = document.querySelector('.secondary-display');

// Variables for calculator state
let currentInput = '';
let previousInput = '';
let operation = '';
let isResultDisplayed = false;

// Add event listeners to all buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', () => handleButtonClick(button.textContent));
});

// Handle button clicks
function handleButtonClick(value) {
  if (isResultDisplayed && !isNaN(value)) {
    clearAll();
  }

  switch (value) {
    case 'AC':
      clearAll();
      break;
    case 'Del':
      deleteLastCharacter();
      break;
    case '=':
      calculateResult();
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handleOperation(value);
      break;
    case 'Ans':
      usePreviousAnswer();
      break;
    case 'Shift':
    case 'Alpha':
    case 'Mode':
    case 'Setup':
      alert('Feature not implemented in this version!');
      break;
    default:
      appendToCurrentInput(value);
      break;
  }

  updateDisplay();
}

// Append input to the current number
function appendToCurrentInput(value) {
  if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
  currentInput += value;
}

// Handle operations
function handleOperation(operator) {
  if (currentInput === '' && operator !== '=') return;

  if (previousInput && currentInput) {
    calculateResult(); // Perform the existing operation first
  }

  operation = operator;
  previousInput = currentInput;
  currentInput = '';
}

// Calculate the result
function calculateResult() {
  if (!previousInput || !currentInput || !operation) return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  let result;

  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '−':
      result = num1 - num2;
      break;
    case '×':
      result = num1 * num2;
      break;
    case '÷':
      result = num2 === 0 ? 'Error' : num1 / num2;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = '';
  operation = '';
  isResultDisplayed = true;
}

// Delete the last character
function deleteLastCharacter() {
  currentInput = currentInput.slice(0, -1);
}

// Clear all inputs
function clearAll() {
  currentInput = '';
  previousInput = '';
  operation = '';
  isResultDisplayed = false;
}

// Use the previous answer
function usePreviousAnswer() {
  currentInput = mainDisplay.textContent;
}

// Update the display
function updateDisplay() {
  mainDisplay.textContent = currentInput || '0';
  secondaryDisplay.textContent = previousInput
    ? `${previousInput} ${operation}`
    : '';
}
