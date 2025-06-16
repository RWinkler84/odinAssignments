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

//other operations
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

function runEquals() {
    if (!numberA && numberB && operator) result ? numberA = result : numberA = 0;  

    if (numberA && numberB && operator) {
        runCalculation();
        clearCurrentCalculation();
    }
}

function displayResult(result) {
    displayContent.textContent = result;
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
    let numberPressed = event.target.textContent;

    if (!operator) {
        numberA = !numberA ? numberPressed : numberA + numberPressed;
        if (Number(numberA) == 0) numberA = '0';
        displayContent.textContent = numberA;
    }

    if (operator) {
        numberB = !numberB ? numberPressed : numberB + numberPressed;
        if (Number(numberB) == 0) numberB = '0';
        displayContent.textContent = numberB;
    }
}

function handleOperatorInput(event) {
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
    let lowerButtonPressed = event.target.textContent;

    switch (lowerButtonPressed) {
        case '=':
            runEquals();
            break;

        case 'C':
            clearCurrentNumber();
            displayContent.textContent = awaitingInput;
            break;

        case 'CE':
            clearFullMemory();
            displayContent.textContent = awaitingInput;
            break;
    }

}

document.querySelector('#numberButtonContainer').addEventListener('click', handleNumberInput);
document.querySelector('#operatorButtonContainer').addEventListener('click', handleOperatorInput);
document.querySelector('#lowerButtonsContainer').addEventListener('click', handleLowerButtonsInput);