// DOM
const output = document.querySelector("output");
const charToShow = document.querySelectorAll(".show");
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals");



// GLOBAL VARIABLES
let outputBuffer = "";
let hasDecimalPoint = false;
let isEqualsReady = false;

const expression = {
    x: 0,
    sign: "",
    y: 0,
    result: 0,
}




function registerInput(e) {
    let pressedBtn = e.target.classList;

    if (pressedBtn.contains("add")) {
        if (expression.sign === "") {
            expression.x = +outputBuffer;
            expression.sign = "+";
            isEqualsReady = true;
            reset();
        }
        // else {
        //     expression.y = +outputBuffer;
        //     expression.sign = "+";
        //     reset();
        //     isEqualsReady = true;
        // }
    }
    else if (pressedBtn.contains("sub")) {
        if (expression.sign === "") {
            expression.x = +outputBuffer;
            expression.sign = "-";
            isEqualsReady = true;
            reset();
        }
        // else {
        //     expression.y = +outputBuffer;
        //     expression.sign = "-";
        //     reset();
        //     isEqualsReady = true;
        // }
    }
    else if (pressedBtn.contains("mul")) {
        if (expression.sign === "") {
            expression.x = +outputBuffer;
            expression.sign = "*";
            isEqualsReady = true;
            reset();
        }
        // else {
        //     expression.y = +outputBuffer;
        //     expression.sign = "*";
        //     reset();
        //     isEqualsReady = true;
        // }
    }
    else if (pressedBtn.contains("div")) {
        if (expression.sign === "") {
            expression.x = +outputBuffer;
            expression.sign = "/";
            isEqualsReady = true;
            reset();
        }
        // else {
        //     expression.y = +outputBuffer;
        //     expression.sign = "/";
        //     reset();
        //     isEqualsReady = true;
        // }
    }
}


// DISPLAY
function displayChars(e) {
    let pressedBtn = e.target.textContent;

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
            console.log(expression.result);
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
charToShow.forEach((button) => button.addEventListener("click", displayChars));
signs.forEach((button) => button.addEventListener("click", registerInput));

equals.addEventListener("click", () => {
    if (isEqualsReady) {
        expression.y = +outputBuffer;
        operate();
        reset()
        output.textContent = expression.result;
    }
});
