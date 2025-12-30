const menuTresPontos = {
    menuContent: document.querySelector(".header__address"),
    abrirOuFechar() {
        this.menuContent.classList.toggle("--open");
    },
    fechar() {
        this.menuContent.classList.remove("--open");
    }
}
const menu3pontos = document.querySelector(".header__menu-see-more");
menu3pontos.addEventListener("click", () => {
    menuTresPontos.abrirOuFechar();
});
window.addEventListener("click", event => {
    let targetIsMenu = event.target == menu3pontos || event.target.parentElement == menu3pontos;
    !targetIsMenu && menuTresPontos.fechar();
})
window.addEventListener("scroll", () => menuTresPontos.fechar());
(function actualizarAnoDeCopyrights() {
    const tempo = new Date();
    let anoActual = tempo.getFullYear();
    if(anoActual < 2024) return false;
    const currentYearOutput = document.querySelector(".footer__current-year");
    currentYearOutput.textContent = `-${anoActual}`;
}());

