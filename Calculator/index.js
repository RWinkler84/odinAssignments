const displayContent = document.querySelector('#displayContent');

let numberA = '';
let numberB = '';
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
            if (result == Infinity) {
                displayContent.textContent = 'Error';
                result = 0;
                break;
            }

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

function pointInputAllowed(number) {
    if (number == '') number = '0';
    if (number.includes('.')) return false;
    return true;
}

function truncateFloats(number) {
    return number.toPrecision(9).replace(/\.?0+$/, '');
}

function handleZeroFirstInput(number) {}

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
    operator ? numberB = '' : numberA = '';
}

function clearCurrentCalculation() {
    numberA = '';
    numberB = '';
    operator = null;
}

function clearFullMemory() {
    numberA = '';
    numberB = '';
    operator = null;
    result = '';
}


//input event handlers
function handleNumberBlockInput(numberPressed) {
    if (!operator) {
        if (numberPressed == '.' && !pointInputAllowed(numberA)) return;
        if (numberA == '0') numberA = ''; //prevent leading zeros
        
        numberA += numberPressed;

        if (numberA == '.') numberA = '0.'; //prevents NaN when converting to number

        displayContent.textContent = numberA; 
    }

    if (operator) {
        if (numberPressed == '.' && !pointInputAllowed(numberB)) return;
        if (numberB == '0') numberB = ''; //prevent leading zeros

        numberB += numberPressed;

        if (numberB == '.') numberB = '0.'; //prevents NaN when converting to number

        displayContent.textContent = numberB;
    }
}

function handleOperatorInput(operatorPressed) {
    if (!operator) operator = operatorPressed;
    if (!numberA) result ? numberA = result : numberA = '0'; //no number entered, but operater pressed
    if (numberA && operator && !numberB) operator = operatorPressed; //change operater, if pressed repeatedly after first number is entered
    if (operator && numberA && numberB) {
        runCalculation();
        operator = operatorPressed;
    }
}

function handleLowerButtonsInput(lowerButtonPressed) {
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

        case 'backspaceButton':
            deleteLastEnteredDigit();
            break;
    }
}

function readInput(event) {
    event.preventDefault();
    if (!event.key && !event.target.classList.contains('button')) return;

    let input = event.key ? event.key : event.target.textContent;
    let numberBlockMatches = '1234567890.'
    let operatorBlockMatches = '+-*/';

    if (numberBlockMatches.includes(input)) {
        handleNumberBlockInput(input);
        return;
    }

    if (operatorBlockMatches.includes(input)) {
        handleOperatorInput(input);
        return;
    }

    //Equals Button Row
    if (event.target.id == 'equalsButton' || input == 'Enter') handleLowerButtonsInput('equalsButton');
    if (event.target.id == 'backspaceButton' || input == 'Backspace') handleLowerButtonsInput('backspaceButton');
    if (event.target.id == 'clearButton') handleLowerButtonsInput('clearButton');
    if (event.target.id == 'clearAllButton') handleLowerButtonsInput('clearAllButton');
}


document.querySelectorAll('.button').forEach(b => { b.setAttribute('tabindex', '-1') }); //prevent firing button clicks via tabulator key

document.querySelector('#buttonContainer').addEventListener('mousedown', readInput);
window.addEventListener('keyup', readInput);