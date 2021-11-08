"use strict";
const limpaElementos = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild)
    }
}

const carregaStatus = (status,pesquisa) =>{
    const container = document.querySelector(".status");
    const newStatus = document.createElement("p")
    newStatus.classList = ".txt-padrao"
    newStatus.innerHTML = `${status.totalHits} fotos grátis para ${pesquisa}`
    container.appendChild(newStatus)
}

const pesquisaImagens = async(evento) =>{
    if(evento.key == "Enter"){
        const tipoImagem = document.querySelector(".categorias").value;
        const pesquisa = evento.target.value
        const url = `https://pixabay.com/api/?key=23670717-85b5103b3d880933d4e67c566&q=${pesquisa}&image_type=${tipoImagem}`
        const response = await fetch(url)
        const imagens = await response.json()
        console.log(imagens);

        limpaElementos(document.querySelector("#container-galeria"))
        limpaElementos(document.querySelector(".status"))

        carregaGaleria(imagens.hits)
        carregaStatus(imagens,pesquisa)
    }
}
const criaItem = item =>{
    const container = document.querySelector("#container-galeria")
    const newCard =document.createElement("div")
    const tags = item.tags.replace(/,+/g, '')
    newCard.innerHTML = `
                <a class="img-perfil" href="https://pixabay.com/users/${item.user}-${item.user_id}/">
                    <img class="img-perfil" src="${item.userImageURL}">
                </a>
                <div class="options">
                    <div class="info">${tags}</div>
                    <div class="row">
                        <div class="row info"><img src="img/like.png">${item.likes}</div>
                        <div class="row info"><img src="img/comentario.png">${item.comments}</div>
                        <div class="row info"><img src="img/favorito.png"></div>
                    </div>
                </div>
                <a class="card-image"href="${item.pageURL}">
                <img class="card-image" src="${item.webformatURL}">
                </a>
            
            `
    container.appendChild(newCard)
}


const carregaGaleria = imagens => imagens.forEach(criaItem)

document.querySelector("#pesquisa").addEventListener("keypress", pesquisaImagens)
document.querySelector(".categorias").addEventListener("selected", pesquisaImagens)