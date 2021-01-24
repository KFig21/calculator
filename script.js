function add(a, b){ return a + b }
function subtract(a, b){ return a - b }
function multiply(a, b){ return a * b }
function divide(a, b){ return a / b }
function exponent_f(a, b){ return a**b }

const operate = (a, operator, b) => {
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '^':
            return exponent_f(a, b);
    }
}

const body = document.querySelector('body')
const allButtons = document.querySelectorAll('button');
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const display = document.querySelector("#display");
const calculation = document.querySelector("#calculation");

let displayValue = "";
let num1 = "";
let num2 = "";
let operand = "";
let operandAnswer = "";
let equalsAnswer = "";

allButtons.forEach(button => button.addEventListener('click', buttonInput))
window.addEventListener('keydown', buttonInput);

// transitions
function removeTransition(e){
    if (e.propertyName !== 'transform') return; // skip it if its not a transform
    this.classList.remove('selection');
}
allButtons.forEach(button => button.addEventListener('transitionend', removeTransition));

function buttonInput(e){
    let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (e.key === undefined) {
        data = this.value;
        e.target.classList.add('selection');
    } else {
        data = e.key;
        key.classList.add('selection');
    }
    if
    // display numbers
    ('1234567890'.includes(data)){
        populateDisplay(data)
    } 
    // operators
    else if ('asdxe'.includes(data)){
        switch(data){
            case 'a':
                return operatorButton('+');
            case 's':
                return operatorButton('-');
            case 'd':
                return operatorButton('/');
            case 'x':
                return operatorButton('*');
            case 'e':
                return operatorButton('^');
        }
    } 
    // decimal
    else if ('.'.includes(data)){
        decimalButton(data)
    } 
    // change value +/-
    else if (data === 'v'){
        valueButton(data)
    } 
    // equals
    else if (data === 'Enter' || data === '='){
        data = '='
        equalsButton(data)
    } 
    // backspace
    else if (data === 'Backspace'){
        backspaceDisplay()
    }
    // clear
    else if (key.id === 'clear'){
        clearDisplay()
    }
}

// populate the calculator display
function populateDisplay(num){
    if(parseFloat(displayValue) === num2){
        displayValue = "";
        equalsAnswer = "";
        operand = "";
    }
    equalsAnswer = "";
    displayValue += num;
    let length = displayValue.toString().length;
    if (length > 9){
        display.textContent = "too big";
        return
    }
    display.textContent = displayValue
}

// decimal buttons
function decimalButton(e){
    if (displayValue.includes(".")){
        return
    }
    num = "."
    populateDisplay(num)
}

// operator buttons
function operatorButton(e){
    if(equalsAnswer !== ""){
        num1 = parseFloat(display.innerHTML)
        equalsAnswer = "";
        operand = e
        displayValue = ""
        calculation.innerHTML = num1 + " " + operand
    }
    else if (num1 !== "" && operand !== ""){
        num2 = parseFloat(display.innerHTML)
        operandAnswer = operate(num1, operand, num2)
        operand = e
        calculation.innerHTML = operandAnswer + " " + operand
        display.innerHTML = operandAnswer
        num1 = operandAnswer
        displayValue = ""
    }else if (operand === ""){       
        num1 = parseFloat(display.innerHTML)
        operand = e
        displayValue = ""
        calculation.innerHTML = num1 + " " + operand
    }
}

// value button
function valueButton(num){
    num = parseFloat(display.innerHTML) * -1;
    let intLength = parseInt(num).toString().length; 
    let remainingLength = 9 - parseInt(intLength);
    if (num.toString().length > 10){
        num = num   .toFixed(remainingLength)
    }
    display.textContent = num
}

// equals buttons
function equalsButton(e){
    num2 = parseFloat(display.innerHTML)
    if (num2 === 0 && operand === "/"){ return divideByZero(); }
    if (num1 === ""){ return clearDisplay(); }
    num1 = parseFloat(num1)
    equalsAnswer = operate(num1, operand, num2)
    let intLength = parseInt(equalsAnswer).toString().length; 
    let remainingLength = 9 - parseInt(intLength);
    if(parseFloat(equalsAnswer) > 999999999){
        display.textContent = "too big";
        return
    } else if (equalsAnswer.toString().length > 10){
        equalsAnswer = equalsAnswer.toFixed(remainingLength)
    }
    let length = equalsAnswer.toString().length;
    if(length > 10){
        display.textContent = "too big";
        return
    }
    display.textContent = equalsAnswer
    calculation.innerHTML = num1 + " " + operand + " " + num2
    operand = ""
}

// clear the calculator
clear.addEventListener("click", clearDisplay)

function clearDisplay(){ 
    displayValue = ""
    display.textContent = "0"
    num1 = "";
    num2 = "";
    answer = "";
    operand = "";
    calculation.innerHTML = " "
}

// backspace
function backspaceDisplay(){
    num = display.innerHTML
    console.log(num)
    displayValue = num.slice(0, -1)
    display.innerHTML = displayValue
}

function divideByZero(){
    display.textContent = "nope";
}




