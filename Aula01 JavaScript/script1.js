function script1() {
    let numero = parseInt(prompt("Digite um número inteiro positivo:"));

    if (isNaN(numero) || numero <= 0) {
        alert("Número inválido. Tente novamente.");
        return;
    }

    if (numero % 2 === 0) {
        alert("O número " + numero + " é PAR.");
    } else {
        alert("O número " + numero + " é ÍMPAR.");
    }
}