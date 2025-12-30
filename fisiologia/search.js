"use strict"
const searching = {
    filterAnOption(query) {
        function trimAndLowerStr(str) {
            str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            str = str.replaceAll(/\W/g, "").toLowerCase();
            return str;
        }
        function showOrHideElement(action, element) {
            action === "show" ? element.classList.remove("--hidden")
            : element.classList.add("--hidden")
        }
        // Filter or Search options
        query = trimAndLowerStr(query);
        const possiveisResultados = document.querySelectorAll(".title--fs-h2");
        for (const resultado of possiveisResultados) {
            trimAndLowerStr(resultado.textContent).includes(query) ? showOrHideElement("show", resultado.parentElement)
            : showOrHideElement("hide", resultado.parentElement);
        }
        let resultadosEncontrados = 0;
        for (const result of possiveisResultados) {
            if(!result.parentElement.matches(".--hidden")) {
                resultadosEncontrados++;
            }
        }
        resultadosEncontrados === 0 ? this.showNothingFoundMsg()
        : this.hideNothingFoundMsg();
        },
        showNothingFoundMsg() {
            const msgNothingFound = document.querySelector(".msg-nothing-found-to-searching-on-portfolio");
            msgNothingFound.textContent = "Sem correspondência."
            msgNothingFound.classList.remove("--display-none");
        },
        hideNothingFoundMsg() {
            const msgNothingFound = document.querySelector(".msg-nothing-found-to-searching-on-portfolio");
            msgNothingFound.classList.add("--display-none");
        }
}
let inputSearch = document.querySelector("#portfolio__input-search");
inputSearch.addEventListener("input", () => {
    searching.filterAnOption(inputSearch.value);
});
const lupa = document.querySelector(".svg-lupa-de-pesquisa");
lupa.addEventListener("click",  () => {
    lupa.parentElement.classList.add("--on");
    inputSearch.focus();
    inputSearch.value = "";
});
const btnOmitirInputSearch = document.querySelector(".portfolio__container-de-caixa-de-pesquisa__btn");
btnOmitirInputSearch.addEventListener("click", () => {
    btnOmitirInputSearch.parentElement.classList.remove("--on");
    const portfolioCards = document.querySelectorAll(".portfolio__advertising");
    for (const card of portfolioCards) {
        card.classList.remove("--hidden");
    }
    searching.hideNothingFoundMsg();
});