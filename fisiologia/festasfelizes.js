"use strict"
const autoTxt = "Adérito Félix Quinamine deseja-lhe Festas Felizes e um Próspero Ano Novo!";
let txtIndex = 0;
let txtLength = autoTxt.length;
const output = document.querySelector(".topo-propaganda__paragrafo");
function desejarFestasFelizes() {
    if(txtIndex < txtLength) {
        output.textContent += autoTxt[txtIndex];
        txtIndex++;
        setTimeout(desejarFestasFelizes, 150);
    }
}
const tempo = new Date();
let mesIndex = tempo.getMonth();
let variavelDeSetTime;
if(mesIndex == 11) {
    document.body.classList.add("body-com-topo-propaganda");
    variavelDeSetTime = setTimeout(desejarFestasFelizes, 150);
}
// Fechar Topo Propaganda 
const btnXDetopoProgaganda = document.querySelector(".topo-propaganda__btn");
btnXDetopoProgaganda.addEventListener("click", () => {
    document.body.classList.remove("body-com-topo-propaganda");
    clearInterval(variavelDeSetTime);
});