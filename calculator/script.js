document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                secondOperand = '';
                display.textContent = '';
            } else if (value === '=') {
                if (firstOperand !== '' && operator !== '' && currentInput !== '') {
                    secondOperand = currentInput;
                    currentInput = '';
                    display.textContent = calculate(firstOperand, secondOperand, operator);
                    firstOperand = display.textContent;
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === '') {
                    firstOperand = currentInput;
                } else if (currentInput !== '') {
                    secondOperand = currentInput;
                    display.textContent = calculate(firstOperand, secondOperand, operator);
                    firstOperand = display.textContent;
                }
                currentInput = '';
                operator = value;
                display.textContent = firstOperand + ' ' + operator;
            } else {
                currentInput += value;
                display.textContent = firstOperand + ' ' + operator + ' ' + currentInput;
            }
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
