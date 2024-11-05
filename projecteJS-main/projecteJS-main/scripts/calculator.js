const display = document.getElementById('display');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');

let currentDisplay = '0';

const updateDisplay = () => {
    display.textContent = currentDisplay;
}

const appendNumber = (num) => {
    if (currentDisplay === 'Error') {
        currentDisplay = num;  // Reiniciar display si hay un error
    } else if (currentDisplay === '0') {
        currentDisplay = num;  // Cambia el cero inicial
    } else {
        currentDisplay += num; // Agrega número
    }
    updateDisplay();
}

const setOperation = (op) => {
    if (currentDisplay === '0' || currentDisplay === '' || currentDisplay === 'Error') return;
    currentDisplay += op; // Agrega operación o paréntesis
    updateDisplay();
}

const calculate = () => {
    try {
        currentDisplay = eval(currentDisplay).toString(); // Evaluar expresión
    } catch {
        currentDisplay = 'Error'; // Manejar error de evaluación
    }
    updateDisplay();
}

const clear = () => {
    currentDisplay = '0'; // Reiniciar display
    updateDisplay();
}

const deleteLast = () => {
    if (currentDisplay === 'Error') {
        currentDisplay = '0'; // Reiniciar display si hay un error
    } else if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1); // Eliminar el último carácter
    } else {
        currentDisplay = '0'; // Reiniciar display si solo queda un carácter
    }
    updateDisplay();
}


clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteLast);

document.querySelectorAll('[data-op]').forEach(button => {
    button.addEventListener('click', (event) => {
        setOperation(event.target.dataset.op);
    });
});

// Botones de números
for (let n = 1; n <= 9; n++) {
    const button = document.createElement('button');
    button.textContent = n;
    button.className = "bg-gray-600 hover:bg-gray-700 text-white p-4 rounded";
    button.addEventListener('click', () => appendNumber(n.toString()));
    document.querySelector('.grid').appendChild(button);
}

// Botón 0
const button0 = document.createElement('button');
button0.textContent = '0';
button0.className = "bg-gray-600 hover:bg-gray-700 text-white p-4 rounded";
button0.addEventListener('click', () => appendNumber('0'));
document.querySelector('.grid').appendChild(button0);

// Botón decimal
const buttonDecimal = document.createElement('button');
buttonDecimal.textContent = '.';
buttonDecimal.className = "bg-gray-600 hover:bg-gray-700 text-white p-4 rounded";
buttonDecimal.addEventListener('click', () => {
    if (currentDisplay.includes('.')) {
        currentDisplay += '.';
        updateDisplay();
    }
});
document.querySelector('.grid').appendChild(buttonDecimal);

// Botón igual
const buttonEquals = document.createElement('button');
buttonEquals.textContent = '=';
buttonEquals.className = "bg-green-500 hover:bg-green-600 text-white p-4 rounded";
buttonEquals.addEventListener('click', calculate);
document.querySelector('.grid').appendChild(buttonEquals);

