class Nota{
    constructor(titulo, descricao){
        this.titulo = titulo;
        this.descricao = descricao;
    }
}

function save(){
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    const nota = new Nota(titulo, descricao);

    const id = createId(); 
    const json = JSON.stringify(nota);
    localStorage.setItem(id, json);
    updateId(id);
}

function createId(){
    let quant = localStorage.length;
    let lastId = 0;
    if(quant === 0){
        localStorage.setItem("lastId", lastId.toString());
    }else{
        lastId = localStorage.getItem("lastId");
    }

    return lastId;
}

function updateId(id){
    id++;
    localStorage.setItem("lastId", id.toString());
}


function getNotas(){
    let tamanho = localStorage.length;
    let keys = [];

    //pega todos os IDs
    for(let i = 0; i < tamanho; i++){
        keys.push(localStorage.key(i));
    }

    let listNotas = [];

    for(let i = 0; i < keys.length; i++){
        listNotas.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return listAll;
}

function listAll(){
    switchDisplay(document.getElementById("painel-new-note"), "none");
    let result = getNotas();
    createListHtml(result);
}

function switchDisplay(element, type){
    element.style.display = type;
}

function createListHtml(listNote){
    let div = document.createElement("div");
    let titulo = document.createElement("p");
    let descricao = document.createElement("textarea");
}