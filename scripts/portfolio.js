const menu = {
    abrir() {
        document.querySelector("div.enderecos").classList.toggle("on");
    }, 

    fechar() {
        document.querySelector("div.enderecos").classList.remove("on");
    }
}

// INVOCAÇÃO 
const menuReticencias = document.querySelector("div.menu-reticencias");
menuReticencias.addEventListener("click", () => menu.abrir());


// EVENTO DE FECHAMENTO DO MENU
window.addEventListener("click", event => {
    const tagsQueNaoFechamOmenu = document.querySelectorAll("div.menu-reticencias, div.menu-reticencias > div, div.enderecos > *");

    for (const tag of tagsQueNaoFechamOmenu) {
        if (event.target === tag) return false;
    }

    menu.fechar();
});

window.addEventListener("scroll", () => menu.fechar());
