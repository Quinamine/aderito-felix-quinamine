const visualizador = {
    visualizador: document.querySelector(".visualizador-de-imagens"),
    
    abrirImg(imgTarget) {
        const currentImg = document.querySelector(".visualizador-de-imagens__img-actual");
        const currentImgFigcaption = this.visualizador.querySelector(".visualizador-de-imagens__legenda");

        currentImg.src = imgTarget.src;
        currentImgFigcaption.textContent = imgTarget.alt;
        this.visualizador.classList.add("--open");
        this.gerenciarBtnsPrevEnext();
    },

    fecharImg() {
        this.visualizador.classList.remove("--open");
    },

    nextImg() {
        let nextImgIndex = this.retornarIndexDaImgActual() + 1;
        this.abrirImg(imgs[nextImgIndex]);
    },

    previousImg() {   
        let previousImgIndex = this.retornarIndexDaImgActual() - 1;
        this.abrirImg(imgs[previousImgIndex]);    
    },

    omitirBtn(btn) {
        btn.classList.add("--off");
    },

    mostrarBtn(btn) {
        btn.classList.remove("--off");
    },

    gerenciarBtnsPrevEnext() {
        let currentImgIndex = this.retornarIndexDaImgActual();
        imgsMaxLen = imgs.length - 1;

        currentImgIndex === imgsMaxLen ? this.omitirBtn(btnNext) : this.mostrarBtn(btnNext);
        currentImgIndex === 0 ? this.omitirBtn(btnPrevious) : this.mostrarBtn(btnPrevious);
    },

    retornarIndexDaImgActual() {
        const currentImg = document.querySelector(".visualizador-de-imagens__img-actual");
        let currentImgIndex = 0;
        for (let i = 0; i < imgs.length; i++) {
            if(imgs[i].src === currentImg.src) {
                currentImgIndex = i;
            }
        }

        return currentImgIndex;
    }
}

const imgs = document.querySelectorAll(".album img");
    imgs.forEach( img => img.addEventListener("click", () => {
    visualizador.abrirImg(img);
}));

const btnFecharImg = document.querySelector(".visualizador-de-imagens__btn--fechar");
btnFecharImg.addEventListener("click", () => {
    visualizador.fecharImg();
});

const btnNext = document.querySelector(".visualizador-de-imagens__btn--next");
btnNext.addEventListener("click", () => {
    visualizador.nextImg();
});

const btnPrevious = document.querySelector(".visualizador-de-imagens__btn--previous");
btnPrevious.addEventListener("click", () => {
    visualizador.previousImg();
});
