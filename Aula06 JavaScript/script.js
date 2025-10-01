const app = document.getElementById("app");

const calculator = document.createElement("div");
calculator.classList.add("calculator");

const display = document.createElement("div");
display.classList.add("display");
display.textContent = "0";

const buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttons");

const buttons = [
    { text: "AC", class: "gray" },
    { text: "+/-", class: "gray" },
    { text: "%", class: "gray" },
    { text: "÷", class: "orange" },
    { text: "7", class: "dark" },
    { text: "8", class: "dark" },
    { text: "9", class: "dark" },
    { text: "×", class: "orange" },
    { text: "4", class: "dark" },
    { text: "5", class: "dark" },
    { text: "6", class: "dark" },
    { text: "-", class: "orange" },
    { text: "1", class: "dark" },
    { text: "2", class: "dark" },
    { text: "3", class: "dark" },
    { text: "+", class: "orange" },
    { text: "0", class: "dark" },
    { text: ".", class: "dark" },
    { text: "=", class: "orange" },
];

let currentInput = "";
let operator = null;
let previousInput = "";

function updateDisplay() {
    display.textContent = currentInput || "0";
}

function handleClick(text) {
    if (!isNaN(text) || text === ".") {
        currentInput += text;
    } else if (text === "AC") {
        currentInput = "";
        previousInput = "";
        operator = null;
    } else if (["+", "-", "×", "÷", "%"].includes(text)) {
        operator = text;
        previousInput = currentInput;
        currentInput = "";
    } else if (text === "=") {
        if (operator && previousInput && currentInput) {
            let result;
            const prev = parseFloat(previousInput);
            const curr = parseFloat(currentInput);

            switch (operator) {
                case "+": result = prev + curr; break;
                case "-": result = prev - curr; break;
                case "×": result = prev * curr; break;
                case "÷": result = prev / curr; break;
                case "%": result = prev % curr; break;
            }

            currentInput = result.toString();
            operator = null;
            previousInput = "";
        }
    }
    updateDisplay();
}

buttons.forEach(btn => {
    const button = document.createElement("button");
    button.textContent = btn.text;
    button.classList.add(btn.class);
    button.onclick = () => handleClick(btn.text);
    buttonsDiv.appendChild(button);
});

calculator.appendChild(display);
calculator.appendChild(buttonsDiv);
app.appendChild(calculator);