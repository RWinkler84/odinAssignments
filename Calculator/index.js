const displayContent = document.querySelector('#displayContent');

let numberA = null;
let numberB = null;
let operator = null;
let result;

const awaitingInput = '0';


//calculations
function calcAdd() {
    return Number(numberA) + Number(numberB);
}

function calcSubtract() {
    return Number(numberA) - Number(numberB);
}

function calcMultiply() {
    return Number(numberA) * Number(numberB);
}

function calcDivide() {
    return Number(numberA) / Number(numberB);
}

function runCalculation() {
    switch (operator) {
        case '+':
            result = calcAdd();
            displayResult(result);
            clearCurrentCalculation();
            break;

        case '-':
            result = calcSubtract();
            displayResult(result);
            clearCurrentCalculation();
            break;

        case '*':
            result = calcMultiply();
            displayResult(result);
            clearCurrentCalculation();
            break;

        case '/':
            result = calcDivide();
            displayResult(result);
            clearCurrentCalculation();
            break;
    }
}

//other operations

function runEquals() {
    if (!numberA && numberB && operator) result ? numberA = result : numberA = 0;

    if (numberA && numberB && operator) {
        runCalculation();
        clearCurrentCalculation();
    }
}

function truncateFloats(number) {

    return number.toPrecision(9).replace(/0+$/, '');
}

function displayResult(result) {
    result = truncateFloats(result);
    displayContent.textContent = result;
}

//calculator memory functions
function deleteLastEnteredDigit() {
    let displayedNumber = displayContent.textContent;
    let shortened = displayedNumber.slice(0, -1);

    if (shortened.length == 0) shortened = 0;

    if (numberA == displayedNumber) {
        numberA = Number(shortened);
        displayContent.textContent = shortened;

    }

    if (numberB == displayedNumber) {
        numberB = Number(shortened);
        displayContent.textContent = shortened;
    }

}

function clearCurrentNumber() {
    operator ? numberB = null : numberA = null;
}

function clearCurrentCalculation() {
    numberA = null;
    numberB = null;
    operator = null;
}

function clearFullMemory() {
    numberA = null;
    numberB = null;
    operator = null;
    result = null;
}

//input event handlers
function handleNumberInput(event) {
    if (!event.target.classList.contains('button')) return;
    if (event.target.id == 'backspaceButton') {
        deleteLastEnteredDigit();
        return;
    }

    let numberPressed = event.target.textContent;

    if (!operator) {
        if (numberPressed == '.' && !allowPointInput()) return;

        numberA = !numberA ? numberPressed : numberA + numberPressed;
        if (Number(numberA) == 0) numberA = '0';
        displayContent.textContent = Number(numberA);
    }

    if (operator) {
        if (numberPressed == '.' && !allowPointInput()) return;

        numberB = !numberB ? numberPressed : numberB + numberPressed;
        if (Number(numberB) == 0) numberB = '0';
        displayContent.textContent = Number(numberB);
    }
}

function allowPointInput() {
    if (displayContent.textContent.includes('.')) return false;

    return true;
}

function handleOperatorInput(event) {
    if (!event.target.classList.contains('button')) return;

    let operatorPressed = event.target.textContent;

    if (!operator) operator = operatorPressed;
    if (!numberA) result ? numberA = result : numberA = '0';

    if (numberA && operator && !numberB) operator = operatorPressed;

    if (operator && numberA && numberB) {
        runCalculation();
        operator = operatorPressed;
    }
}

function handleLowerButtonsInput(event) {
    let lowerButtonPressed = event.target.id;

    switch (lowerButtonPressed) {
        case 'equalsButton':
            runEquals();
            break;

        case 'clearButton':
            clearCurrentNumber();
            displayContent.textContent = awaitingInput;
            break;

        case 'clearAllButton':
            clearFullMemory();
            displayContent.textContent = awaitingInput;
            break;
    }

}

document.querySelector('#numberButtonContainer').addEventListener('click', handleNumberInput);
document.querySelector('#operatorButtonContainer').addEventListener('click', handleOperatorInput);
document.querySelector('#lowerButtonsContainer').addEventListener('click', handleLowerButtonsInput);