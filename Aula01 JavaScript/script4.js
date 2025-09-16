function script4() {
    let dado = prompt("Digite algo:");

    let confirmar = confirm("Deseja verificar o tipo do dado informado?");
    
    if (confirmar) {
        document.body.innerHTML += "<p>O tipo do dado é: <strong>" + typeof(dado) + "</strong></p>";
    } else {
        document.body.innerHTML += "<p>Obrigado por visitar esta página</p>";
    }
}