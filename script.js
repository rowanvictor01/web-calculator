

// DOM
const output = document.querySelector("output");
const charToShow = document.querySelectorAll(".show");
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const ac = document.querySelector(".ac");


// GLOBAL VARIABLES
let outputBuffer = "";
let hasDecimalPoint = false;
let isEqualsReady = false;
let isResultShown = false;

const expression = {
    x: 0,
    sign: "",
    y: 0,
    result: 0,
}


function clearAll() {
    outputBuffer = "";
    hasDecimalPoint = false;
    isEqualsReady = false;
    isResultShown = false;

    expression.x = 0;
    expression.y = 0;
    expression.sign = "";
    expression.result = 0;
}


function clearChar() {
    const lastNum = outputBuffer.length;
    const updateOutput = outputBuffer.slice(0, lastNum - 1);

    return updateOutput;
}

function registerInput(e) {
    const pressedBtn = e.target.classList;

    if (pressedBtn.contains("add")) {
        if (!expression.sign && !expression.x) {
            expression.x = +outputBuffer;
            expression.sign = "+";
            reset();
        }
        else {
            expression.y = +outputBuffer;
            expression.sign = "+";
            isEqualsReady = true;
            reset();
        }
    }
    else if (pressedBtn.contains("sub")) {
        if (!expression.sign && !expression.x) {
            expression.x = +outputBuffer;
            expression.sign = "-";
            reset();
        }
        else {
            expression.y = +outputBuffer;
            expression.sign = "-";
            isEqualsReady = true;
            reset();
        }
    }
    else if (pressedBtn.contains("mul")) {
        if (!expression.sign && !expression.x) {
            expression.x = +outputBuffer;
            expression.sign = "*";
            reset();
        }
        else {
            expression.y = +outputBuffer;
            expression.sign = "*";
            isEqualsReady = true;
            reset();
        }
    }
    else if (pressedBtn.contains("div")) {
        if (!expression.sign && !expression.x) {
            expression.x = +outputBuffer;
            expression.sign = "/";
            reset();
        }
        else {
            expression.y = +outputBuffer;
            expression.sign = "/";
            isEqualsReady = true;
            reset();
        }
    }
}


// DISPLAY
function displayChars(e) {
    const pressedBtn = e.target.textContent;

    // decimal point check
    if (pressedBtn === '.' && !hasDecimalPoint) {
        hasDecimalPoint = true;
    }
    else if (pressedBtn === '.' && hasDecimalPoint) {
        return;
    }

    outputBuffer += e.target.textContent;
    output.textContent = outputBuffer;
}

function reset() {
    outputBuffer = "";
    hasDecimalPoint = false;
}


// CALCULATION
function operate() {
    switch (expression.sign) {
        case "+":
            expression.result = add(expression.x, expression.y);
            break;
        case "-":
            expression.result = subtract(expression.x, expression.y);
            break;
        case "*":
            expression.result = multiply(expression.x, expression.y);
            break;
        case "/":
            expression.result = divide(expression.x, expression.y);
            break;
    }
}


// OPERATIONS
function add(x, y) {
    const sum = x + y;
    const rounded = +sum.toFixed(5);

    return rounded;
}


function subtract(x, y) {
    const difference = x - y;
    const rounded = +difference.toFixed(5);

    return rounded;
}


function multiply(x, y) {
    const product = x * y;
    const rounded = +product.toFixed(5);

    return rounded;
}


function divide(x, y) {
    const quotient = x / y;
    const rounded = +quotient.toFixed(5);

    return rounded;
}


// Events

// display chars when nubmers are pressed
charToShow.forEach((button) => button.addEventListener("click", (e) => {
    if (isResultShown) {
        clearAll();
    }

    displayChars(e);
}));

// register number pressed when an operator is pressed
signs.forEach((button) => button.addEventListener("click", (e) => {
    let isNegativeSign = false;

    // check to determine whether it's a minus sign or a negative number
    if (!outputBuffer && e.target.classList.contains("sub") && !isResultShown) {
        outputBuffer += '-';
        output.textContent = outputBuffer;
        isNegativeSign = true;
    }
    else {
        isNegativeSign = false;
    }

    // check if there's already a registered sign
    if (expression.sign) {
        return;
    }

    // if its not a negative sign, then its the minus sign to trigger function to register operator
    if (!isNegativeSign) {
        registerInput(e);
    }

    isResultShown = false;
}));

// equals btn
equals.addEventListener("click", () => {
    expression.y = +outputBuffer;

    if (outputBuffer) {
        isEqualsReady = true;
    }

    if (isEqualsReady) {
        operate();
        reset()
        expression.sign = "";
        output.textContent = expression.result;
        isResultShown = true;

        expression.x = expression.result;
    }
});

// clear numbers one by one
clear.addEventListener("click", () => {
    // check if there's no user input
    if (!outputBuffer) {
        return;
    }

    const beforeClear = outputBuffer;

    outputBuffer = clearChar();
    output.textContent = outputBuffer;

    // check if there's a decimal point before and after clearing
    if (beforeClear.includes('.') && !outputBuffer.includes('.')) {
        hasDecimalPoint = false;
    }
});

// reset all
ac.addEventListener("click", () => {
    clearAll();
    output.textContent = '0';
});
