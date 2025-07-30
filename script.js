// fix: chain calc almost there but if a number is pressed instead of an operator, issue arise


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

    console.log(expression);
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


    console.log(expression);
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
    return x + y;
}


function subtract(x, y) {
    return x - y;
}


function multiply(x, y) {
    return x * y;
}


function divide(x, y) {
    return x / y;
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
    // if (expression.sign) {
    //     return;
    // }

    registerInput(e);
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

        console.log(expression);
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
