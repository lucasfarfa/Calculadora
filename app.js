"use strict"; // asi va todo de diego maradona

/** Me traigo del html los elementos **/
const input = document.getElementById('input'); // input [        ]
const operator = document.querySelectorAll('.operator'); // operadores +-/*
const number = document.querySelectorAll('.numero'); // numeros 0-9
const result = document.getElementById('resultado'); // boton de igual =
const clear = document.getElementById('clear'); // boton de clear C

let resultDisplayed = false; // flag para ver que se esta mostrando en el ouput

/** Evento click a cada numero**/
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {

        /** Guardo el input actual y su ultimo caracater (uso despues) **/
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML; // voy agregando los numeros al input
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") { // si se esta mostrando el resultado y el usuario presiona un operador tengo que seguir agregando al string para la siguiente operaicion
            resultDisplayed = false; // asi sigue agregando nnumeros
            input.innerHTML += e.target.innerHTML;
        } else {
            // Si el resultado esta mostrado y el usuario presiona un numero, limpio el input y pongo en false
            resultDisplayed = false;
            input.innerHTML = ""; // limpio input
            input.innerHTML += e.target.innerHTML;
        }
    });
}



/** Evento click a cada op**/
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {

        
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // Si el lutimo precionado es un operador, remplazo
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            console.log("enter a number first");
        } else {
            input.innerHTML += e.target.innerHTML;
        }

    });
}

//** Evento click a cada btn**/
result.addEventListener("click", function () {

    // str que procesa ej. -10+26+33-56*34/23
    var inputString = input.innerHTML;

    var numbers = inputString.split(/\+|\-|\×|\÷/g);

    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");


    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // muestro

    resultDisplayed = true; // cambio el flag a true
});

// limpio display
clear.addEventListener("click", function () {
    input.innerHTML = "";
})

