const title = document.title;
const description = document.querySelector("meta[name=description]").content
let url = location.href;
if(window.location.protocol == "file:") {
    url = url.split("/aderito-")[1];
    url = `https://quinamine.github.io/aderito-${url}`;
}
const data = {
    title: title,
    text: description,
    url: url
}
const btnPartilhar = document.querySelector(".main__btn-fixed--share");
btnPartilhar.addEventListener("click", () => {
    try {
        navigator.share(data).then(()=>console.log("Link partilhado com sucesso."))
        .catch(e=> console.log(`Não foi possivel partilhar o link devido ao erro: ${e}.`))
    } catch (e) {
        console.log("O seu navegador não tem suporte ao método 'navigator.share()'.")
    }
});