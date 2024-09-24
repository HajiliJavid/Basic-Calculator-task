const themeIcon = document.getElementById("theme-icon");
const body = document.body;
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const delButton = document.getElementById("del");

let currentInput = "";
let operator = "";
let previousInput = "";
let lastNumber = "";

themeIcon.addEventListener("click", function() {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        themeIcon.textContent = "🌙";
    } else {
        body.classList.add("dark-mode");
        themeIcon.textContent = "☀️";
    }
});

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        const value = buttons[i].textContent;

        if (!isNaN(value) || value === ".") {
            currentInput += value;
            display.value = currentInput;
        } else if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = "";
            lastNumber = "";
            display.value = "";
        } else if (value === "Del") {
            display.value = display.value.slice(0, -1);
        }
        else if (value === "=") {
            if (operator && previousInput !== "" && currentInput !== "") {
                currentInput = calculate(previousInput, operator, currentInput);
                display.value = currentInput;
                operator = "";
                previousInput = "";
            }
        } else if (value === "%") {
            if (lastNumber !== "" && currentInput !== "") {
                const percentage = (parseFloat(currentInput) / 100) * parseFloat(lastNumber);
                display.value = percentage.toString;
            }
        } else {
            if (currentInput !== "") {
                lastNumber = currentInput; 
                previousInput = currentInput;
                currentInput = "";
                operator = value;
            }
        }
    });
}

delButton.addEventListener("click", function() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
});

function calculate(a, operator, b) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (operator === "+") {
        return (num1 + num2).toString();
    } else if (operator === "-") {
        return (num1 - num2).toString();
    } else if (operator === "*") {
        return (num1 * num2).toString();
    } else if (operator === "/") {
        if (num2 === 0) {
            return "Error";
        }
        return (num1 / num2).toString();
    }
    return "Error";
}
