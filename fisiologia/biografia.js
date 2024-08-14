"use strict"

const autoTxt = "Olá, Mundo (\uD83C\uDF0F)! Eis a biografia de Adérito Félix Quinamine:";
let txtIndex = 0;
let txtLength = autoTxt.length;
const output = document.querySelector(".title--auto-typing");

function autoDigitacao() {
    if(txtIndex < txtLength) {
        output.textContent += autoTxt[txtIndex];
        txtIndex++;
        setTimeout(autoDigitacao, 150);
    }
}

setTimeout(autoDigitacao, 150);

(function actualizarAno() {
    const tempo = new Date();
    let anoActual = tempo.getFullYear();

    if(anoActual < 2022) return false;

    const currentYearOutput = document.querySelector(".footer__current-year");
    currentYearOutput.textContent = `-${anoActual}`;
}());