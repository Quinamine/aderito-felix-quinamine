"use strict"
const autoText = "Olá, Mundo (\uD83C\uDF0F)! Eis a biografia de Adérito Félix Quinamine:";
let textIndex = 0;
let textLength = autoText.length;
const outputElement = document.querySelector(".title--auto-typing");
function autoTyping() {
    if(textIndex < textLength) {
        outputElement.textContent += autoText[textIndex];
        textIndex++;
        setTimeout(autoTyping, 150);
    }
}
autoTyping();
(function actualizarAnoDeCopyrights() {
    const tempo = new Date();
    let anoActual = tempo.getFullYear();
    if(anoActual < 2022) return false;
    const currentYearOutput = document.querySelector(".footer__current-year");
    currentYearOutput.textContent = `-${anoActual}`;
}());
// Banner rotativo
let imgIndex = 1;
const imgs = document.querySelectorAll(".banner__img");
const progressCircles = document.querySelectorAll(".banner__progress__btn");
// Change Image Slide by click
progressCircles.forEach( pCircle => {
    pCircle.addEventListener("click", () => {
        for (let i = 0; i < progressCircles.length; i++) {
            if(progressCircles[i] === pCircle) {
                imgIndex = i;
            }
        }
    });
})
function slide() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].classList.remove("banner__img--current");
        progressCircles[i].classList.remove("banner__progress__btn--full");
    }
    imgs[imgIndex].classList.add("banner__img--current");
    progressCircles[imgIndex].classList.add("banner__progress__btn--full")
    imgIndex++;
    if(imgIndex === imgs.length) {
        imgIndex = 0;
    }
}
// Call slide on load
let slideInterval = setInterval(slide, 2500);
if(window.innerWidth > 425) {
    clearInterval(slideInterval);
}
// Call slide on resize the window
window.addEventListener("resize", () => {
    clearInterval(slideInterval);
    if(window.innerWidth <= 425) {
        slideInterval = setInterval(slide, 3000);
    }
});
// Call slide on scroll and Clear interval when the banner is out of viewport
window.addEventListener("scroll", () => {
    clearInterval(slideInterval);
    const banner = document.querySelector(".banner");
    let bannerPosition = banner.getBoundingClientRect();
    let bannerIsOnViewPort = bannerPosition.bottom > 90;

    if(bannerIsOnViewPort && window.innerWidth <= 425) {
        slideInterval = setInterval(slide, 3000);
    }
});

