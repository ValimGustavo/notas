class Nota{
    constructor(titulo, descricao){
        try {
            this.titulo = setTitulo(titulo);
            this.descricao = descricao;            
        } catch (error) {
            showError(error);
        }        
    }
    
    setTitulo(titulo){
        if(titulo !== null && titulo.length > 0)
            return titulo;
        else
            throw new Error("title", "Title is sadsadsa");        
    }  
    
}



class Error{
    constructor(name, message){
        this.name = name;
        this.message = message;
    }    
}

const showError = function(error){
    const panelError = document.getElementById("panel-attention");
    panelError.innerHTML = `Error: ${error.message}`;
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
        listNotas.push([keys[i],JSON.parse(localStorage.getItem(keys[i]))]);
    }
    return listNotas;
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
   
    const list = createElement('ol');

    for(let i = 0; i < listNote.length; i++){
        let li = createElement('li');
        let node = createNode(listNote[i][1].titulo);
        setId(li,listNote[i][0]);
        setNode(li, node);
        li.addEventListener("click", showInfo);
        setNode(list, li);

    }

    let div = document.getElementById("painel-list-note");
    setNode(div, list);
}

function createElement(elem){
    return document.createElement(elem);
}

function createNode(content){
   return document.createTextNode(content);
}

function setNode(elem, node){
    elem.appendChild(node);
}

function setId(elem, id){
    elem.setAttribute("id", id);
}


function showInfo(e){
    
    let titulo = document.getElementById("titulo");
    let descricao = document.getElementById("descricao");
    
    let nota = localStorage.getItem(e.path[0].id);
    nota = JSON.parse(nota);
    console.log(nota);
    titulo.value = nota.titulo;
    descricao.value = nota.descricao;
    switchDisplay(document.getElementById("painel-new-note"), "block");
}