const txt = "Olá, 🌏! O meu nome é Adérito e esta é a minha Biografia.";
const output = document.querySelector("h1");
const speed = 150;

let charIndex = 0;

function autoTyping() {
    if(charIndex < txt.length) {
        output.innerHTML+=txt[charIndex];
        charIndex++;
        setTimeout(autoTyping, speed);
    }
}
setTimeout(autoTyping, 2000);


/* Abertura de Imagem */
const imgs = document.querySelectorAll(".banner, img");
const body = document.querySelector("body");
const blurDiv = document.querySelector(".blur");
const btnCloseImg = document.querySelector(".close-img");

function abrirImagem(img) {
    img.parentElement.classList.add("when-innerIMG-clicked");
    body.classList.add("overflow-h");
    blurDiv.classList.add("on");
}

btnCloseImg.addEventListener("click", () => {
    for (const img of imgs) {
        img.parentElement.classList.remove("when-innerIMG-clicked");
        body.classList.remove("overflow-h");
        blurDiv.classList.remove("on");
        
    }
})

imgs.forEach( img => {
    img.addEventListener("click", () => {
        abrirImagem(img);
    })
});