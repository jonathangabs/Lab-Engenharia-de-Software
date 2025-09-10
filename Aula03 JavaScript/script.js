let playlist = [];

window.onload = function () {
    const salva = localStorage.getItem("playlist");
    if (salva) {
        playlist = JSON.parse(salva);
        renderizarLista();
    }
}

function salvarPlaylist() {
    localStorage.setItem("playlist", JSON.stringify(playlist));
}

function adicionarMusica() {
    const input = document.getElementById("musica");
    const nome = input.value.trim();
    if (nome) {
        playlist.push(nome);
        salvarPlaylist();
        renderizarLista();
        input.value = "";
    }
}

function excluirMusica(index) {
    playlist.splice(index, 1);
    salvarPlaylist();
    renderizarLista();
}


function editarMusica(index) {
    const novoNome = prompt("Editar música:", playlist[index]);
    if (novoNome !== null && novoNome.trim() !== "") {
        playlist[index] = novoNome.trim();
        salvarPlaylist();
        renderizarLista();
    }
}

function ordenar() {
    playlist.sort((a, b) => a.localeCompare(b));;
    salvarPlaylist();
    renderizarLista();
}

function filtrarPorA() {
    const filtradas = playlist.filter(musica => musica.toLowerCase().startsWith('a'));
    renderizarLista(filtradas);
}

function renderizarLista(lista = playlist) {
    const ul = document.getElementById("lista");
    ul.innerHTML = "";
    lista.forEach((musica, index) => {
        const li = document.createElement("li");
        li.textContent = musica;

        const divAcoes = document.createElement("div");
        divAcoes.classList.add("acoes");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editarMusica(index);
        
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("excluir");
        btnExcluir.onclick = () => excluirMusica(index);

        divAcoes.appendChild(btnEditar);
        divAcoes.appendChild(btnExcluir);
        li.appendChild(divAcoes);

        ul.appendChild(li);
    });
}