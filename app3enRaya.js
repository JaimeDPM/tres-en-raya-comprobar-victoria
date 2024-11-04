"use strict";
//La expresión "use strict"; es una directiva de JavaScript que activa el modo estricto en tu código. Este modo impone restricciones más severas sobre cómo se pueden escribir las variables y otros elementos del lenguaje, ayudando a evitar errores comunes y a mejorar la seguridad y el rendimiento.

//Algunas de las principales características del modo estricto incluyen:

//1. Prohibición de variables no declaradas: No puedes usar variables sin haberlas declarado previamente con var, let o const.
//2. Errores silenciosos: Algunas operaciones que normalmente fallarían silenciosamente (como asignar un valor a una variable no writable) generarán errores.
//3. Eliminación de algunas características inseguras: Por ejemplo, no puedes usar this en el contexto global, y algunas palabras reservadas están prohibidas.
//4. Evita el uso de funciones y variables con el mismo nombre: Ayuda a prevenir colisiones en el ámbito global.

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
const FICHAS = ['X', 'O',];

const COMBINACIONES_GANADORAS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let turnoActual = 0;


function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}


function comprobarTablas() { //Nos devuelve un boolean
    if(turnoActual == 8) {
        return true;
    }

    return false;
}

function comprobarVictoria() {
    for(let combinacion of COMBINACIONES_GANADORAS) {
        let a = document.getElementById(`casilla-${combinacion[0]}`).textContent;
        let b = document.getElementById(`casilla-${combinacion[1]}`).textContent;
        let c = document.getElementById(`casilla-${combinacion[2]}`).textContent;

        // Si encuentro combinación ganadora
        if((a === b) && (a === c)) {
            return true;
        }
    }

    // de lo contrario...
    return false;
}



function comprobarFinDeJuego(casilla) {
    const numeroCasilla = casilla.textContent;

    // Comprobar si hay victoria
    if(comprobarVictoria()) {
        let mensajes = document.getElementById('mensajes');
        mensajes.textContent = 'Gana ' + FICHAS[turnoActual % 2];
        finalizarJuego();
        return;
    }

  // Comprobar si hay tablas
    if(comprobarTablas()) {
        let mensajes = document.getElementById('mensajes');
        mensajes.textContent = 'Tablas';
        finalizarJuego();
        return;
    }
  //Especificamos el turno del jugador  
    let mensajes = document.getElementById('mensajes');
    mensajes.textContent = 'Siguiente turno: ' + FICHAS[(turnoActual + 1) % 2]; 
}

//Vamos a crear esta funcion para comprobar la victoria justo despues de poner una ficha nueva
function casillaOnClick(event) {
    let casilla = event.target;
    console.log("click en casilla " + casilla.textContent);

    if (comprobarCasillaValida(casilla)) {
        casilla.textContent = FICHAS[turnoActual % 2];
        turnoActual++;  // Incrementar turno antes de comprobar el fin del juego
        comprobarFinDeJuego(casilla);  // Comprobar fin del juego después de actualizar la casilla
    }
}

function finalizarJuego() {
    for(let i = 1; i <= 9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.removeEventListener('click', casillaOnClick);
    }    
}

function casillaOnClick(event) {
    let casilla = event.target;
    console.log("click en casilla "+ casilla.textContent);

    if(comprobarCasillaValida(casilla)) {
        casilla.textContent = FICHAS[turnoActual % 2];
        comprobarFinDeJuego(casilla);
        turnoActual++;
    }
}

function main() {
    for(let i = 1; i <= 9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }

}

main();