"use strict";

// VARIÁVEIS
const body = document.querySelector("body");
const quinaminePicViewer = document.querySelector(".quinamine-pic-viewer");
const frame = document.querySelector(".frame");
const imgs = document.querySelectorAll(".album-container img");
const currentImg = document.querySelector("#current-img");
const currentImgTitle = document.querySelector(".current-img-title");
const leftArrow = document.querySelector(".arrow.previous");
const rightArrow = document.querySelector(".arrow.next");
const zoomOutBtn = document.querySelector("button.zoom-out");
const zoomInBtn = document.querySelector("button.zoom-in");
const zoomOutput = document.querySelector(".zoom-output");
const closeQpvBtn = document.querySelector(".close-qpv");


// OBJECTO

const qpv = {

    abrirImagem() {
        for(let i=0; i<imgs.length; i++) {
            imgs[i].addEventListener("click", () => {
                currentImg.src = imgs[i].src;
                currentImgTitle.textContent = imgs[i].alt;
                quinaminePicViewer.classList.add("on");

                if(i<=0)this.gerenciarSetas("larr", "hide");
                else this.gerenciarSetas("larr", "show");

                if(i>=imgs.length - 1) this.gerenciarSetas("rarr", "hide");
                else this.gerenciarSetas("rarr", "show");

                this.handleOverflowBodyContent("hide");
                this.mostrarPercentagemDeZoom();
            })
        }
    },

    pularImagem(dir) {
        let currentImgIndex;
        for(let i=0; i<imgs.length; i++){
            if(currentImg.src==imgs[i].src) {
                currentImgIndex = i;
                break;
            }
        }
        currentImgIndex+=(dir);
        currentImg.src = imgs[currentImgIndex].src;
        currentImgTitle.textContent = imgs[currentImgIndex].alt;

        if(currentImgIndex<=0) this.gerenciarSetas("larr", "hide");
        else this.gerenciarSetas("larr", "show");

        if(currentImgIndex>=(imgs.length - 1)) this.gerenciarSetas("rarr", "hide")
        else this.gerenciarSetas("rarr", "show");
    },

    gerenciarSetas(seta, accao) {
        if((seta==="larr") && (accao==="hide")) {
            leftArrow.classList.add("off");
        }
        else if((seta==="larr") && (accao==="show")) {
            leftArrow.classList.remove("off");
        }
        else if((seta==="rarr") && (accao==="hide")) {
            rightArrow.classList.add("off");
        }
        else {
            rightArrow.classList.remove("off");
        }
        
        qpv.resetarZoom();
        qpv.mostrarPercentagemDeZoom();
    },

    mostrarPercentagemDeZoom() {
        const currentImgRenderedHeight = currentImg.clientHeight;
        const currentImgNaturalHeight = currentImg.naturalHeight;
        let currentImgZoom = (currentImgRenderedHeight * 100 / currentImgNaturalHeight).toFixed(0);
        
        if(!currentImg.hasAttribute("data-originalzoom")) {
            currentImg.setAttribute(`data-originalzoom`, `${currentImgZoom}`);
        }
        
        zoomOutput.textContent = `${currentImgZoom}%`;
    },

    gerenciarZoom(accao) {
        let increment = (currentImg.naturalHeight * 10 / 100).toFixed(0);

        let outputSize = Number(currentImg.clientHeight);
        let currentZoom = Number((zoomOutput.textContent).split("%")[0]);
        let originalZoom = Number(currentImg.dataset.originalzoom);

        if(accao === "ampliar") {
            outputSize += Number(increment);
            currentZoom+=10;
            if(currentZoom>1000) {
                currentZoom = 1000;
                return false;
            }
        } else if(accao === "reduzir") {
            outputSize -= Number(increment);
            currentZoom-=10;
            
            if(currentZoom < originalZoom) {
                currentZoom = originalZoom;
                return false;
            
            }
        } else if (accao === "zoom2x") {

            let isTrue = currentImg.hasAttribute("data-zoom2xstatus");
            let zoom2xStatus = currentImg.dataset.zoom2xstatus;
            let initialRenderedHeight = (originalZoom * currentImg.naturalHeight / 100).toFixed(0);

            if((!isTrue) && (currentZoom <= originalZoom) 
            || (zoom2xStatus==="false") && (currentZoom <= originalZoom)) {    
                currentZoom = originalZoom * 2;
                outputSize = initialRenderedHeight * 2;
                currentImg.setAttribute(`data-zoom2xstatus`, `true`);
            } else {
                currentZoom = originalZoom*2 / 2;
                outputSize = initialRenderedHeight*2 / 2;
                currentImg.setAttribute(`data-zoom2xstatus`, `false`)
            }

        }
        
        zoomOutput.textContent = `${currentZoom}%`;
        currentImg.style.cssText = `height: ${outputSize}px;`;
        currentImg.classList.add("maxWidth-n-maxHeight-initial");
        
        
    },

    resetarZoom() {
        currentImg.style.height = "auto";
        currentImg.classList.remove("maxWidth-n-maxHeight-initial");
    },

    handleOverflowBodyContent(action) {
        action === "hide" ? body.classList.add("overflow-h") : body.classList.remove("overflow-h");
    },

    fechar() {
        quinaminePicViewer.classList.remove("on");
        qpv.resetarZoom();
        qpv.handleOverflowBodyContent("show");
    }, 
}

qpv.abrirImagem();
leftArrow.addEventListener("click", () => qpv.pularImagem(-1));
rightArrow.addEventListener("click", () => qpv.pularImagem(1));
zoomOutBtn.addEventListener("click", () => qpv.gerenciarZoom("reduzir"));
zoomInBtn.addEventListener("click", () => qpv.gerenciarZoom("ampliar"));
currentImg.addEventListener("dblclick", () => qpv.gerenciarZoom("zoom2x"));
closeQpvBtn.addEventListener("click", qpv.fechar);
window.addEventListener("resize", qpv.mostrarPercentagemDeZoom);

// Pular imagem usando setas do teclado
window.addEventListener("keyup", event => {
    
    // Verificar se a imagem não tem scroll-x;
    let frameWidth = Number(frame.clientWidth);
    let imgWidth = Number(currentImg.clientWidth);

    // Se a imagem não tiver scroll-x, usar setas do teclado para pular;
    if(imgWidth < frameWidth) {
        let pressedKey = event.key;
        if(pressedKey.toLowerCase() === "arrowleft") {
            try {qpv.pularImagem(-1);} 
            catch (error) {alert("Sem imagens anteriores.");}
        } 
        else if (pressedKey.toLowerCase() === "arrowright") {
            try {qpv.pularImagem(1);} 
            catch (error) {alert("Sem imagens posteriores.");}
        }   
    }
})
