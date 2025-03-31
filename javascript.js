let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = String(number);
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? String(number) : displayValue + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}

function changeSign() {
    displayValue = String(-parseFloat(displayValue));
    updateDisplay();
}

function percentage() {
    displayValue = String(parseFloat(displayValue) / 100);
    updateDisplay();
}

function handleOperation(nextOperator) {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation();
        displayValue = String(result);
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function setOperation(op) {
    handleOperation(op);
}

function performCalculation() {
    const secondOperand = parseFloat(displayValue);
    
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        if (secondOperand === 0) {
            return 'Error';
        }
        return firstOperand / secondOperand;
    }
    
    return secondOperand;
}

function calculate() {
    if (!operator) return;
    
    const result = performCalculation();
    displayValue = String(result);
    firstOperand = result;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
}
updateDisplay();